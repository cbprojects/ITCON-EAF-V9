import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { Archivo } from 'src/app/model/archivoModel';
import { Caja } from 'src/app/model/cajaModel';
import { RequestArchivo } from 'src/app/model/requestArchivoModel';
import { RequestConsultaUDXCaja } from 'src/app/model/requestConsultarUnidadDocumentalMasivoModel';
import { RequestDirectorio } from 'src/app/model/requestDirectorioModel';
import { ResponseConsultarUnidadDocumentalMasivo } from 'src/app/model/responseConsultarUnidadDocumentalMasivoModel';
import { Sociedad } from 'src/app/model/sociedadModel';
import { UnidadDocumental } from 'src/app/model/unidadDocumentalModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

@Component({
  selector: 'app-digitalizar-unidad-documental',
  templateUrl: './digitalizar-unidad-documental.component.html',
  styleUrls: ['./digitalizar-unidad-documental.component.scss'],
  providers: [RestService, MessageService]
})
export class DigitalizarUnidadDocumentalComponent implements OnInit {

  // Objetos de Sesion
  sesion: any;

  // Objetos de datos
  uploadedFiles: any[] = [];
  listaSociedades: Sociedad[] = [];
  listaCajas: Caja[] = [];
  sociedadSelect: any;
  requestConsultaCajasPorSociedad: any;
  requestUnidadDocumentalMasivo: any[];
  responseUnidadDocumentalMasivo: any;
  requestCambiarUnidadDocumentalMasivo: any;
  responseCambiarUnidadDocumentalMasivo: any;
  files: TreeNode[];
  selectedFiles: TreeNode;
  items: MenuItem[];

  // Utilidades
  msg: any;
  const: any;
  loading: boolean;

  constructor(private router: Router, private route: ActivatedRoute, public restService: RestService, public textProperties: TextProperties, public util: Util, public objectModelInitializer: ObjectModelInitializer, public enumerados: Enumerados, public sesionService: SesionService, private messageService: MessageService) {
    this.sesion = this.objectModelInitializer.getDataServiceSesion();
    this.msg = this.textProperties.getProperties(this.sesionService.objServiceSesion.idioma);
    this.const = this.objectModelInitializer.getConst();
  }

  ngOnInit(): void {
    this.inicializar();
  }

  inicializar() {
    this.files = [];
    this.sociedadSelect = { value: this.objectModelInitializer.getDataSociedad(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.consultarSociedades();
    this.items = [
      { label: 'Ver', icon: 'pi pi-eye', command: (event) => this.visualizarArchivo(this.selectedFiles) },
      { label: 'Descargar', icon: 'pi pi-download', command: (event) => this.descargarArchivo(this.selectedFiles) }
    ];
  }

  consultarSociedades() {
    this.listaSociedades = [];
    this.loading = true;
    try {
      this.restService.getREST(this.const.urlConsultarSociedadActiva)
        .subscribe(resp => {
          let temp: Sociedad[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaSociedades = temp;
            this.loading = false;
          }
        },
          error => {
            let listaMensajes = this.util.construirMensajeExcepcion(error.error, this.msg.lbl_summary_danger);
            let titleError = listaMensajes[0];
            listaMensajes.splice(0, 1);
            let mensajeFinal = { severity: titleError.severity, summary: titleError.detail, detail: '', sticky: true };
            this.messageService.clear();

            listaMensajes.forEach(mensaje => {
              mensajeFinal.detail = mensajeFinal.detail + mensaje.detail + " ";
            });
            this.messageService.add(mensajeFinal);

            console.log(error, "error");
          });
    } catch (e) {
      console.log(e);
    }
  }

  consultarCajasPorSociedad() {
    this.limpiarUnidadDocumental();
    this.listaCajas = [];
    this.loading = true;
    try {
      this.requestConsultaCajasPorSociedad = this.objectModelInitializer.getDataRequestConsultaCajasPorSociedad();
      if (this.sociedadSelect != undefined && this.sociedadSelect != null && this.sociedadSelect.id > 0) {
        this.requestConsultaCajasPorSociedad.id = this.sociedadSelect.id;

        this.restService.postREST(this.const.urlConsultarCajasPorSociedad, this.requestConsultaCajasPorSociedad)
          .subscribe(resp => {
            let temp: Caja[] = JSON.parse(JSON.stringify(resp));
            if (temp !== undefined && temp.length > 0) {
              this.listaCajas = temp;
              this.construirArbolCajas();
              //this.consultarUnidadDocumentalMasivo();
              this.loading = false;
            }
          },
            error => {
              let listaMensajes = this.util.construirMensajeExcepcion(error.error, this.msg.lbl_summary_danger);
              let titleError = listaMensajes[0];
              listaMensajes.splice(0, 1);
              let mensajeFinal = { severity: titleError.severity, summary: titleError.detail, detail: '', sticky: true };
              this.messageService.clear();

              listaMensajes.forEach(mensaje => {
                mensajeFinal.detail = mensajeFinal.detail + mensaje.detail + " ";
              });
              this.messageService.add(mensajeFinal);

              console.log(error, "error");
            });
      } else {
        this.messageService.clear();
        this.messageService.add({ severity: this.const.severity[2], summary: this.msg.lbl_summary_danger, detail: this.msg.lbl_sociedad_obligatorio, sticky: true });
      }
    } catch (e) {
      console.log(e);
    }
  }

  limpiarUnidadDocumental() {
    this.responseUnidadDocumentalMasivo = null;
  }


  // Seleccionar nodos
  nodeSelect(event) {
    if (event.node.label.includes('(Caja)')) {
      this.cargarUDXCaja(event.node.data);
    } else if (event.node.label.includes('(UD)')) {
      this.cargarArchivosXUD(event.node.parent.data, event.node.data);
    }
    console.clear();
    this.messageService.add({ severity: 'info', summary: 'Seleccionado', detail: event.node.label });
  }

  nodeUnselect(event) {
    this.messageService.add({ severity: 'info', summary: 'No seleccionado', detail: event.node.label });
  }

  // Cargar elementos para los treenode
  cargarUDXCaja(idCaja) {
    this.loading = true;
    try {
      let requestUdXCaja: RequestConsultaUDXCaja = this.objectModelInitializer.getDataRequestConsultarUnidadDocumentalMasivo();
      requestUdXCaja.idCajaUno = idCaja;

      this.restService.postREST(this.const.urlConsultarUnidadDocumentalPorCajaMasiva, requestUdXCaja)
        .subscribe(resp => {
          let temp: ResponseConsultarUnidadDocumentalMasivo = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp !== null) {
            this.responseUnidadDocumentalMasivo = temp;
            this.construirArbolUDs(idCaja, this.responseUnidadDocumentalMasivo.lstUnidadDocumentalCajaUno);
            this.loading = false;
          }
        },
          error => {
            let listaMensajes = this.util.construirMensajeExcepcion(error.error, this.msg.lbl_summary_danger);
            let titleError = listaMensajes[0];
            listaMensajes.splice(0, 1);
            let mensajeFinal = { severity: titleError.severity, summary: titleError.detail, detail: '', sticky: true };
            this.messageService.clear();

            listaMensajes.forEach(mensaje => {
              mensajeFinal.detail = mensajeFinal.detail + mensaje.detail + " ";
            });
            this.messageService.add(mensajeFinal);

            console.log(error, "error");
          });
    } catch (e) {
      console.log(e);
    }
  }

  cargarArchivosXUD(idCaja, idUnidadDoc) {
    try {
      let requestArchivos: RequestDirectorio = this.objectModelInitializer.getDataRequestArchivoDir();
      requestArchivos.idUnidadDocumental = idUnidadDoc;

      this.restService.postFileTextREST(this.const.urlConsultarArchivos, requestArchivos)
        .subscribe(resp => {
          let temp = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp !== null) {
            let archivosXUD: Archivo[] = JSON.parse(temp.replaceAll('\"', '"'));

            this.construirArbolArchivos(idCaja, idUnidadDoc, archivosXUD);
            this.loading = false;
          }
        },
          error => {
            let listaMensajes = this.util.construirMensajeExcepcion(error.error, this.msg.lbl_summary_danger);
            let titleError = listaMensajes[0];
            listaMensajes.splice(0, 1);
            let mensajeFinal = { severity: titleError.severity, summary: titleError.detail, detail: '', sticky: true };
            this.messageService.clear();

            listaMensajes.forEach(mensaje => {
              mensajeFinal.detail = mensajeFinal.detail + mensaje.detail + " ";
            });
            this.messageService.add(mensajeFinal);

            console.log(error, "error");
          });
    } catch (e) {
      console.log(e);
    }
  }

  // Construir treenode
  construirArbolCajas() {
    this.files = [];
    this.listaCajas.forEach(caja => {
      let nodoCaja = this.construirNodoPadre(caja);
      this.files.push(nodoCaja);
    });
  }

  construirNodoPadre(caja: Caja) {
    return {
      "label": caja.descripcion + " (Caja)",
      "data": caja.id,
      "expandedIcon": "pi pi-folder-open",
      "collapsedIcon": "pi pi-folder",
      "children": []
    };
  }

  construirArbolUDs(idCaja, listaUD: UnidadDocumental[]) {
    this.files.forEach(nodoCaja => {
      if (nodoCaja.data === idCaja) {
        let listaNodoUD = this.construirNodosHijosUD(listaUD);
        nodoCaja.children = listaNodoUD;
      }
    });
  }

  construirNodosHijosUD(listaUnidadDoc: UnidadDocumental[]) {
    let listaNodosUD = [];

    listaUnidadDoc.forEach(unidadDoc => {
      let nodoUD = {
        "label": unidadDoc.nombre + " (UD)",
        "data": unidadDoc.id,
        "expandedIcon": "pi pi-folder-open",
        "collapsedIcon": "pi pi-folder",
        "children": []
      };

      listaNodosUD.push(nodoUD);
    });

    return listaNodosUD;
  }

  construirArbolArchivos(idCaja, idUnidadDoc, listaArchivos: Archivo[]) {
    this.files.forEach(nodoCaja => {
      if (nodoCaja.data === idCaja) {
        nodoCaja.children.forEach(nodoUnidadDoc => {
          if (nodoUnidadDoc.data === idUnidadDoc) {
            let listaNodoUD = this.construirNodosHijosArchivo(idUnidadDoc, listaArchivos);
            nodoUnidadDoc.children = listaNodoUD;
          }
        });
      }
    });
  }


  construirNodosHijosArchivo(idUnidadDoc, listaArchivos: Archivo[]) {
    let hijosFile = []
    listaArchivos.forEach(archivo => {
      let nodoFile = {
        "label": archivo.nombreArchivo,
        "data": idUnidadDoc,
        "icon": "pi pi-file"
      };
      hijosFile.push(nodoFile);
    });

    return hijosFile;
  }

  // Cargar Archivos y directorios del server

  obtenerArchivo(idUnidadDoc, nombreDoc, seDescarga) {
    try {
      let requestConsultarArchivos: RequestArchivo = this.objectModelInitializer.getDataRequestArchivoFile();
      requestConsultarArchivos.idUnidadDocumental = idUnidadDoc;
      let archivo: Archivo = this.objectModelInitializer.getDataArchivo();
      archivo.nombreArchivo = nombreDoc;
      requestConsultarArchivos.listaArchivosPorSubir.push(archivo);
      this.restService.postFileTextREST(this.const.urlConsultarArchivos, requestConsultarArchivos)
        .subscribe(resp => {
          let temp = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp !== null) {
            let listaArchivos: Archivo[] = JSON.parse(temp.replaceAll('\"', '"'));
            if (seDescarga) {
              var binaryData = [];
              binaryData.push(listaArchivos[0].archivo); //My blob
              const url = URL.createObjectURL(new Blob(binaryData, { type: "application/text" }));
              //const url = window.URL.createObjectURL(listaArchivos[0].archivo);
              const a = document.createElement('a');
              a.setAttribute('style', 'display:none');
              a.href = url;
              a.download = listaArchivos[0].nombreArchivo;
              a.click();
            } else {

            }
          }
        },
          error => {
            let listaMensajes = this.util.construirMensajeExcepcion(error.error, this.msg.lbl_summary_danger);
            let titleError = listaMensajes[0];
            listaMensajes.splice(0, 1);
            let mensajeFinal = { severity: titleError.severity, summary: titleError.detail, detail: '', sticky: true };
            this.messageService.clear();

            listaMensajes.forEach(mensaje => {
              mensajeFinal.detail = mensajeFinal.detail + mensaje.detail + " ";
            });
            this.messageService.add(mensajeFinal);

            console.log(error, "error");
          });
    } catch (e) {
      console.log(e);
    }
  }

  cargarArchivo() {
    try {
      let requestCrearArchivos: RequestArchivo = this.objectModelInitializer.getDataRequestArchivoFile();
      requestCrearArchivos.idUnidadDocumental = this.selectedFiles.data;
      this.uploadedFiles.forEach(file => {
        let archivo: Archivo = this.objectModelInitializer.getDataArchivo();
        archivo.nombreArchivo = file.name;
        archivo.archivo = 'UmVxdWVzdCANCg0KPHNvYXBlbnY6RW52ZWxvcGUgeG1sbnM6c29hcGVudj0iaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvc29hcC9lbnZlbG9wZS8iIHhtbG5zOnNlcj0iaHR0cDovL3NlcnZpY2VzLmJlZXNpb24uY29tIj4NCiAgIDxzb2FwZW52OkhlYWRlci8+DQogICA8c29hcGVudjpCb2R5Pg0KICAgICAgPHNlcjpXc0dldFZpc3RhMzYwPg0KICAgICAgICAgPHNlcjpiaWxsaW5nQWNjb3VudENvZGU+NDM3NTU5ODk8L3NlcjpiaWxsaW5nQWNjb3VudENvZGU+DQogICAgICAgICA8IS0tT3B0aW9uYWw6LS0+DQogICAgICAgICA8c2VyOmJpbGxpbmdBY2NvdW50SWQ+PC9zZXI6YmlsbGluZ0FjY291bnRJZD4NCiAgICAgIDwvc2VyOldzR2V0VmlzdGEzNjA+DQogICA8L3NvYXBlbnY6Qm9keT4NCjwvc29hcGVudjpFbnZlbG9wZT4NCg0KUmVzcG9uc2UNCg0KPHM6RW52ZWxvcGUgeG1sbnM6cz0iaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvc29hcC9lbnZlbG9wZS8iPg0KICAgPHM6Qm9keT4NCiAgICAgIDxzOkZhdWx0Pg0KICAgICAgICAgPGZhdWx0Y29kZSB4bWxuczphPSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDUvMDUvYWRkcmVzc2luZy9ub25lIj5hOkFjdGlvbk5vdFN1cHBvcnRlZDwvZmF1bHRjb2RlPg0KICAgICAgICAgPGZhdWx0c3RyaW5nIHhtbDpsYW5nPSJlbi1VUyI+VGhlIG1lc3NhZ2Ugd2l0aCBBY3Rpb24gJ2h0dHA6Ly9zZXJ2aWNlcy5iZWVzaW9uLmNvbS9Xc0Z1bGxTdGFjazIvV3NHZXRWaXN0YTM2MCcgY2Fubm90IGJlIHByb2Nlc3NlZCBhdCB0aGUgcmVjZWl2ZXIsIGR1ZSB0byBhIENvbnRyYWN0RmlsdGVyIG1pc21hdGNoIGF0IHRoZSBFbmRwb2ludERpc3BhdGNoZXIuIFRoaXMgbWF5IGJlIGJlY2F1c2Ugb2YgZWl0aGVyIGEgY29udHJhY3QgbWlzbWF0Y2ggKG1pc21hdGNoZWQgQWN0aW9ucyBiZXR3ZWVuIHNlbmRlciBhbmQgcmVjZWl2ZXIpIG9yIGEgYmluZGluZy9zZWN1cml0eSBtaXNtYXRjaCBiZXR3ZWVuIHRoZSBzZW5kZXIgYW5kIHRoZSByZWNlaXZlci4gIENoZWNrIHRoYXQgc2VuZGVyIGFuZCByZWNlaXZlciBoYXZlIHRoZSBzYW1lIGNvbnRyYWN0IGFuZCB0aGUgc2FtZSBiaW5kaW5nIChpbmNsdWRpbmcgc2VjdXJpdHkgcmVxdWlyZW1lbnRzLCBlLmcuIE1lc3NhZ2UsIFRyYW5zcG9ydCwgTm9uZSkuPC9mYXVsdHN0cmluZz4NCiAgICAgIDwvczpGYXVsdD4NCiAgIDwvczpCb2R5Pg0KPC9zOkVudmVsb3BlPg==';
        requestCrearArchivos.listaArchivosPorSubir.push(archivo);
      });


      this.restService.postREST(this.const.urlCrearArchivos, requestCrearArchivos)
        .subscribe(resp => {
          let temp = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp !== null) {
            let listaUDs: Archivo[] = temp;

            this.construirArbolArchivos(this.selectedFiles.parent.data, this.selectedFiles.data, listaUDs);
            this.loading = false;
          }
        },
          error => {
            let listaMensajes = this.util.construirMensajeExcepcion(error.error, this.msg.lbl_summary_danger);
            let titleError = listaMensajes[0];
            listaMensajes.splice(0, 1);
            let mensajeFinal = { severity: titleError.severity, summary: titleError.detail, detail: '', sticky: true };
            this.messageService.clear();

            listaMensajes.forEach(mensaje => {
              mensajeFinal.detail = mensajeFinal.detail + mensaje.detail + " ";
            });
            this.messageService.add(mensajeFinal);

            console.log(error, "error");
          });
    } catch (e) {
      console.log(e);
    }
  }

  onBasicUpload(event, fileUpload) {
    this.uploadedFiles = [];
    if (this.selectedFiles !== undefined && this.selectedFiles !== null && this.selectedFiles.label.includes('(UD)')) {
      for (let file of event.files) {
        this.uploadedFiles.push(file);
      }

      this.cargarArchivo();
      this.messageService.add({ severity: 'info', summary: 'Archivo Cargado', detail: '' });
      fileUpload.clear();
    } else {
      this.messageService.add({ severity: 'info', summary: 'No ha seleccionado una Unidad Documental', detail: '' });
    }
  }

  // Contextmenu archivos

  descargarArchivo(file: TreeNode) {
    this.obtenerArchivo(file.data, file.label, true);
  }

  visualizarArchivo(file: TreeNode) {
    this.obtenerArchivo(file.data, file.label, false);
  }

}