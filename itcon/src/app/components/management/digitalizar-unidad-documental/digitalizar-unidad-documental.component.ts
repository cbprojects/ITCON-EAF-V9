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
import { RequestDirectorio } from 'src/app/model/requestDirectorioModel';
import { ResponseConsultarUnidadDocumentalMasivo } from 'src/app/model/responseConsultarUnidadDocumentalMasivoModel';
import { Sociedad } from 'src/app/model/sociedadModel';
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
              this.consultarUnidadDocumentalMasivo();
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

  consultarUnidadDocumentalMasivo() {
    this.loading = true;
    this.limpiarUnidadDocumental();
    try {
      this.requestUnidadDocumentalMasivo = [];
      this.listaCajas.forEach(caja => {
        let unidadDocumentalRQ = this.objectModelInitializer.getDataRequestConsultarUnidadDocumentalMasivo();
        unidadDocumentalRQ.idCajaUno = caja.id;
        this.requestUnidadDocumentalMasivo.push(unidadDocumentalRQ);
      });

      this.responseUnidadDocumentalMasivo = this.objectModelInitializer.getDataResponseConsultarUnidadDocumentalMasivo();

      this.restService.postMultipleREST(this.const.urlConsultarUnidadDocumentalPorCajaMasiva, this.requestUnidadDocumentalMasivo)
        .subscribe(resp => {
          let temp: ResponseConsultarUnidadDocumentalMasivo = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp !== null) {
            this.responseUnidadDocumentalMasivo = temp;
            this.construirArbol();
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

  limpiarUnidadDocumental() {
    this.responseUnidadDocumentalMasivo = null;
  }

  nodeSelect(event) {
    this.messageService.add({ severity: 'info', summary: 'Seleccionado', detail: event.node.label });
  }

  nodeUnselect(event) {
    this.messageService.add({ severity: 'info', summary: 'No seleccionado', detail: event.node.label });
  }

  construirArbol() {
    this.files = [];
    let listaIdsUnidadDocumental = [];

    for (let i = 0; i < this.listaCajas.length; i++) {
      let caja = this.listaCajas[i];
      let responseUDCaja = this.responseUnidadDocumentalMasivo[i];
      if (responseUDCaja.lstUnidadDocumentalCajaUno.length > 0) {
        let nodoCaja = this.construirNodoPadre(caja.descripcion);
        nodoCaja.children = this.agregarHijosUD(responseUDCaja.lstUnidadDocumentalCajaUno);
        this.files.push(nodoCaja);
      }
      if (responseUDCaja.lstUnidadDocumentalCajaUno.length > 0) {
        responseUDCaja.lstUnidadDocumentalCajaUno.forEach(udCaja => {
          // Guardamos el id de UD
          listaIdsUnidadDocumental.push(udCaja.id);
        });
      }
    }

    try {
      let listaRQArchivos: RequestDirectorio[] = [];
      listaIdsUnidadDocumental.forEach(idUD => {
        let requestConsultarArchivos: RequestDirectorio = this.objectModelInitializer.getDataRequestArchivoDir();
        requestConsultarArchivos.idUnidadDocumental = idUD;
        listaRQArchivos.push(requestConsultarArchivos);
      });
      this.restService.postFileMultipleREST(this.const.urlConsultarArchivos, listaRQArchivos)
        .subscribe(resp => {
          let temp = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp !== null) {
            let archivosXUD: Archivo[] = [];
            temp.forEach(t => {
              archivosXUD.push(JSON.parse(t.replaceAll('\"', '"')));
            });
            var mapaCajasXUD = new Map();

            for (let i = 0; i < listaIdsUnidadDocumental.length; i++) {
              let unidadDocId = listaIdsUnidadDocumental[i];
              mapaCajasXUD.set(unidadDocId, archivosXUD[i]);
            }

            this.files.forEach(caja => {
              caja.children.forEach(unidadDoc => {
                unidadDoc.children = this.agregarHijosArchivos(unidadDoc.data, mapaCajasXUD.get(unidadDoc.data));
              });
            });
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

  construirNodoPadre(nombre) {
    return {
      "label": nombre + " (Caja)",
      "data": nombre,
      "expandedIcon": "pi pi-folder-open",
      "collapsedIcon": "pi pi-folder",
      "children": []
    };
  }

  agregarHijosUD(listaUdCaja) {
    let hijosUD = []
    listaUdCaja.forEach(udCaja => {
      let udCarpeta = {
        "label": udCaja.nombre + " (UD)",
        "data": udCaja.id,
        "expandedIcon": "pi pi-folder-open",
        "collapsedIcon": "pi pi-folder",
        "children": []
      };
      hijosUD.push(udCarpeta);
    });

    return hijosUD;
  }

  agregarHijosArchivos(unidadDocId, listaArchivos) {
    let hijosFile = []
    listaArchivos.forEach(archivo => {
      let nodoFile = {
        "label": archivo.nombreArchivo,
        "data": unidadDocId,
        "icon": "pi pi-file"
      };
      hijosFile.push(nodoFile);
    });

    return hijosFile;
  }

  obtenerArchivo(idUnidadDoc, nombreDoc, seDescarga) {
    try {
      let requestConsultarArchivos: RequestArchivo = this.objectModelInitializer.getDataRequestArchivoFile();
      requestConsultarArchivos.idUnidadDocumental = idUnidadDoc;
      let archivo: Archivo = this.objectModelInitializer.getDataArchivo();
      archivo.nombreArchivo = nombreDoc;
      requestConsultarArchivos.listaArchivosPorSubir.push(archivo);
      this.restService.postFileOnlyDownREST(this.const.urlConsultarArchivos, requestConsultarArchivos)
        .subscribe(resp => {
          let temp = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp !== null) {
            let archivo: Archivo = JSON.parse(temp.replaceAll('\"', '"'));
            if (seDescarga) {
              const url = window.URL.createObjectURL(archivo[0].archivo);
              const a = document.createElement('a');
              a.setAttribute('style', 'display:none');
              a.href = url;
              a.download = archivo[0].nombreArchivo;
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

  descargarArchivo(file: TreeNode) {
    this.obtenerArchivo(file[0].data, file[0].label, true);
  }

  visualizarArchivo(file: TreeNode) {
    this.obtenerArchivo(file[0].data, file[0].label, false);
  }

}
