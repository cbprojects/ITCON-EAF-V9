import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService, TreeNode } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { Archivo } from 'src/app/model/archivoModel';
import { Area } from 'src/app/model/areaModel';
import { Caja } from 'src/app/model/cajaModel';
import { CajaTree } from 'src/app/model/cajaTreeModel';
import { RequestArchivo } from 'src/app/model/requestArchivoModel';
import { RequestConsultaUDXCaja } from 'src/app/model/requestConsultarUnidadDocumentalMasivoModel';
import { RequestDirectorio } from 'src/app/model/requestDirectorioModel';
import { ResponseConsultarUnidadDocumentalMasivo } from 'src/app/model/responseConsultarUnidadDocumentalMasivoModel';
import { Sociedad } from 'src/app/model/sociedadModel';
import { TipoDocumental } from 'src/app/model/tipoDocumentalModel';
import { UnidadDocumental } from 'src/app/model/unidadDocumentalModel';
import { UniDocuTree } from 'src/app/model/uniDocuTreeModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

declare var $: any;

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
  listaAreas: Area[] = [];
  listaCajas: CajaTree[] = [];
  listaCajasFiltro: Caja[] = [];
  listaUniDocu: UnidadDocumental[] = [];
  listaTipoUniDocu: TipoDocumental[] = [];

  sociedadSelect: any;
  areaSelect: any;
  cajaSelect: any;
  uniDocuSelect: any;
  archivoFiltro: any;
  tipoUniDocuSelect: any;
  requestObtenerArchivos: any;
  requestUnidadDocumentalMasivo: any[];
  responseUnidadDocumentalMasivo: any;
  requestCambiarUnidadDocumentalMasivo: any;
  responseCambiarUnidadDocumentalMasivo: any;
  files: TreeNode[];
  selectedFiles: TreeNode;
  items: MenuItem[];
  fileUploadPrecargado: any;
  archivosPrecargados: any[];

  // Utilidades
  msg: any;
  const: any;
  loading: boolean;

  constructor(private router: Router, private route: ActivatedRoute, public restService: RestService, public textProperties: TextProperties, public util: Util, public objectModelInitializer: ObjectModelInitializer, public enumerados: Enumerados, public sesionService: SesionService, private messageService: MessageService, private confirmationService: ConfirmationService) {
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
    this.areaSelect = { value: this.objectModelInitializer.getDataArea(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.cajaSelect = { value: this.objectModelInitializer.getDataCaja(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.uniDocuSelect = { value: this.objectModelInitializer.getDataUnidadDocumental(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.tipoUniDocuSelect = { value: this.objectModelInitializer.getDataTipoDocumental(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.consultarSociedades();
    this.consultarTipoUD();
    this.items = [
      { label: 'Descargar', icon: 'pi pi-download', command: (event) => this.descargarArchivo(this.selectedFiles) },
      { label: 'Eliminar', icon: 'pi pi-trash', command: (event) => this.mostrarConfirmarPopUp() },
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

  limpiarUDYtipoUD() {
    this.files=[];
    this.uniDocuSelect = this.objectModelInitializer.getDataUnidadDocumental();
    this.tipoUniDocuSelect = this.objectModelInitializer.getDataTipoDocumental();
  }
  consultarAreasPorSociedad() {
    this.listaAreas = [];
    this.listaCajasFiltro = [];
    this.areaSelect = this.objectModelInitializer.getDataArea();
    this.cajaSelect = this.objectModelInitializer.getDataCaja();
    this.uniDocuSelect = this.objectModelInitializer.getDataUnidadDocumental();
    this.loading = true;
    try {
      var requestAreaPorSociedad = this.objectModelInitializer.getDataRequestConsultaCajasPorSociedad();
      requestAreaPorSociedad.id = this.sociedadSelect.id;
      this.restService.postREST(this.const.urlBuscarAreasActivasPorSociedad, requestAreaPorSociedad)
        .subscribe(resp => {
          let temp: Area[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaAreas = temp;
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

  counstarAreaYCaja() {
    this.files = [];
    this.consultarAreasPorSociedad();
    this.consultarCajaPorSociedad();
  }


  consultarCajaPorSociedad() {
    this.listaCajasFiltro = [];
    this.loading = true;
    try {
      var requestCajaPorSociedad = this.objectModelInitializer.getDataRequestConsultaCajasPorSociedad();
      requestCajaPorSociedad.id = this.sociedadSelect.id;
      this.restService.postREST(this.const.urlConsultarCajasPorSociedad, requestCajaPorSociedad)
        .subscribe(resp => {
          let temp: Caja[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaCajasFiltro = temp;
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

  consultarUDPorFiltros() {
    this.uniDocuSelect = this.objectModelInitializer.getDataUnidadDocumental();
    this.files=[];
    this.listaUniDocu = [];
    this.loading = true;
    try {
      var requestUDPorFiltros = this.objectModelInitializer.getDataRequestConsultarUnidadDocumentalLista();
      requestUDPorFiltros.idSociedad = this.sociedadSelect.id;
      if (this.areaSelect.id === 0) {
        requestUDPorFiltros.idArea = null;
      } else {
        requestUDPorFiltros.idArea = this.areaSelect.id;
      }
      if (this.tipoUniDocuSelect.id === 0) {
        requestUDPorFiltros.idTipoUD = null;
      } else {
        requestUDPorFiltros.idTipoUD = this.tipoUniDocuSelect.id;
      }
      requestUDPorFiltros.idCaja = this.cajaSelect.id;
      this.restService.postREST(this.const.urlConsultarUnidadDocumentalLista, requestUDPorFiltros)
        .subscribe(resp => {
          let temp: UnidadDocumental[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaUniDocu = temp;
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

  consultarTipoUD() {
    this.listaTipoUniDocu = [];
    this.loading = true;
    try {
      this.restService.getREST(this.const.urlBuscarTipoUDActivos)
        .subscribe(resp => {
          let temp: Sociedad[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaTipoUniDocu = temp;
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


  obtenerArchivos() {
    this.files = [];
    this.limpiarUnidadDocumental();
    this.listaCajas = [];
    this.loading = true;
    try {
      this.requestObtenerArchivos = this.objectModelInitializer.getDataRequestObtenerArchivos();
      if (this.sociedadSelect != undefined && this.sociedadSelect != null && this.sociedadSelect.id > 0) {
        this.requestObtenerArchivos.idSociedad = this.sociedadSelect.id;
        if(this.cajaSelect.id===0){
          this.requestObtenerArchivos.idCaja=null;
        }else{
          this.requestObtenerArchivos.idCaja = this.cajaSelect.id;
        }
        if(this.uniDocuSelect.idUD===0){
          this.requestObtenerArchivos.idUnidadDocumental = null;
        }else{
          this.requestObtenerArchivos.idUnidadDocumental = this.uniDocuSelect.idUD;
        }
        if(this.tipoUniDocuSelect.id===0){
          this.requestObtenerArchivos.idTipoUD = null;
        }else{
          this.requestObtenerArchivos.idTipoUD = this.tipoUniDocuSelect.id;
        }
        if (this.areaSelect.id === 0) {
          this.requestObtenerArchivos.idArea = null;
        } else {
          this.requestObtenerArchivos.idArea = this.areaSelect.id;
        }
        this.requestObtenerArchivos.filtroBusqueda = this.archivoFiltro;

        this.restService.postREST(this.const.urlObtenerArchivos, this.requestObtenerArchivos)
          .subscribe(resp => {
            let temp: CajaTree[] = JSON.parse(JSON.stringify(resp));
            if (temp !== undefined && temp.length > 0) {
              this.listaCajas = temp;
              this.construirArbolCajas();
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
  /* nodeSelect(event) {
     if (event.node.label.includes('(Caja)')) {
       this.cargarUDXCaja(event.node.data);
     } else if (event.node.label.includes('(UD)')) {
       this.cargarArchivosXUD(event.node.parent.data, event.node.data);
     }
     console.clear();
     this.messageService.add({ severity: 'info', summary: 'Seleccionado', detail: event.node.label });
   }*/

  nodeUnselect(event) {
    this.messageService.add({ severity: 'info', summary: 'No seleccionado', detail: event.node.label });
  }

  // Cargar elementos para los treenode
  /* cargarUDXCaja(idCaja) {
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
   }*/

  /*cargarArchivosXUD(idCaja, idUnidadDoc) {
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
  }*/

  // Construir treenode
  construirArbolCajas() {
    this.files = [];
    this.listaCajas.forEach(caja => {
      let nodoCaja = this.construirNodoPadre(caja);
      let nodoUD = this.construirNodosHijosUD(caja.lstUdTotales);
      nodoCaja.children = nodoUD;
      this.files.push(nodoCaja);
    });
  }

  construirNodoPadre(caja: CajaTree) {
    return {
      "label": caja.codigoCaja + " (Caja)",
      "data": caja.idCaja,
      "expandedIcon": "pi pi-folder-open",
      "collapsedIcon": "pi pi-folder",
      "children": []
    };
  }

  /*construirArbolUDs(idCaja, listaUD: UnidadDocumental[]) {
    this.files.forEach(nodoCaja => {
      if (nodoCaja.data === idCaja) {
        let listaNodoUD = this.construirNodosHijosUD(listaUD);
        nodoCaja.children = listaNodoUD;
      }
    });
  }*/

  construirNodosHijosUD(listaUnidadDoc: UniDocuTree[]) {
    let listaNodosUD = [];

    listaUnidadDoc.forEach(unidadDoc => {
      let nodoUD = {
        "label": unidadDoc.codigoUd + " (UD)",
        "data": unidadDoc.idUd,
        "expandedIcon": "pi pi-folder-open",
        "collapsedIcon": "pi pi-folder",
        "children": []
      };
      let nodoArchivo = this.construirNodosHijosArchivo(unidadDoc.idUd, unidadDoc.documentosUd);
      nodoUD.children = nodoArchivo;

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


  construirNodosHijosArchivo(idUnidadDoc, listaArchivos) {
    let hijosFile = []
    listaArchivos.forEach(archivo => {
      let nodoFile = {
        "label": archivo,
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
              let vectorFile = listaArchivos[0].nombreArchivo.split('.');
              let mimeType = this.util.devolverMimeType('.' + vectorFile[vectorFile.length - 1]);
              let textbuffer = window.atob(listaArchivos[0].archivo);
              let binaryLen = textbuffer.length;
              let byte = new Uint8Array(binaryLen);
              for (let i = 0; i < binaryLen; i++) {
                let ascii = textbuffer.charCodeAt(i);
                byte[i] = ascii;
              }
              let blob = new Blob([byte], { type: mimeType });

              //My blob
              const url = URL.createObjectURL(blob);
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

  // Cargar Archivos y directorios del server

  consumirWSEliminarArchivo(idUnidadDoc, nombreDoc) {
    try {
      let requestEliminarArchivos: RequestArchivo = this.objectModelInitializer.getDataRequestArchivoFile();
      requestEliminarArchivos.idUnidadDocumental = idUnidadDoc;
      let archivo: Archivo = this.objectModelInitializer.getDataArchivo();
      archivo.nombreArchivo = nombreDoc;
      requestEliminarArchivos.listaArchivosPorSubir.push(archivo);
      this.restService.postFileTextREST(this.const.urlBorrarArchivos, requestEliminarArchivos)
        .subscribe(resp => {
          let temp = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp !== null) {
            let listaArchivos: Archivo[] = JSON.parse(temp.replaceAll('\"', '"'));

            this.construirArbolArchivos(this.selectedFiles.parent.parent.data, this.selectedFiles.parent.data, listaArchivos);
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

  cargarArchivo(requestCrearArchivos) {
    try {
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
    this.messageService.clear();
    this.uploadedFiles = [];
    this.fileUploadPrecargado = undefined;
    this.archivosPrecargados = [];
    if (this.selectedFiles !== undefined && this.selectedFiles !== null && this.selectedFiles.label.includes('(UD)')) {
      let coincidenciaEncontrada = false;
      let namesArchivos = [];
      this.selectedFiles.children.forEach(archivo => {
        namesArchivos.push(archivo.label);
      });

      let namesIguales = "[";
      for (let file of event.files) {
        if (namesArchivos.includes(file.name)) {
          coincidenciaEncontrada = true;
          namesIguales = namesIguales + file.name + ", ";
        }
      }
      namesIguales = namesIguales.substring(0, (namesIguales.length - 2)) + "]";

      if (coincidenciaEncontrada) {
        this.fileUploadPrecargado = fileUpload;
        this.archivosPrecargados = event.files;
        this.mostrarConfirmarPopUpCoincidencias();
        this.messageService.add({ sticky: true, severity: 'info', summary: 'Los siguientes nombres de archivos ya se encuentran en la Unidad Documental: ' + namesIguales, detail: '' });
      } else {
        for (let file of event.files) {
          this.uploadedFiles.push(file);
        }

        let requestCrearArchivos: RequestArchivo = this.objectModelInitializer.getDataRequestArchivoFile();
        requestCrearArchivos.idUnidadDocumental = this.selectedFiles.data;
        this.uploadedFiles.forEach(file => {
          let archivo: Archivo = this.objectModelInitializer.getDataArchivo();
          archivo.nombreArchivo = file.name;
          archivo.archivo = file;
          requestCrearArchivos.listaArchivosPorSubir.push(archivo);
        });

        let readers = [];
        requestCrearArchivos.listaArchivosPorSubir.forEach(file => {
          readers.push(this.readFileAsText(file));
        });

      Promise.all(readers).then((values) => {
        //file.archivo = e.target.result.split('base64,')[1];
        this.cargarArchivo(requestCrearArchivos);
        this.messageService.add({ severity: 'info', summary: 'Archivo Cargado', detail: '' });

          fileUpload.clear();
        });
      }
    } else {
      this.messageService.add({ severity: 'info', summary: 'No ha seleccionado una Unidad Documental', detail: '' });
    }
  }

  // Contextmenu archivos

  descargarArchivo(file: TreeNode) {
    this.obtenerArchivo(file.data, file.label, true);
  }

  eliminarArchivo(file: TreeNode) {
    if (this.selectedFiles.icon === 'pi pi-file') {
      this.consumirWSEliminarArchivo(file.data, file.label);
    }
  }

  readFileAsText(file) {
    return new Promise(function (resolve, reject) {
      let fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        file.archivo = e.target.result.split('base64,')[1];
        resolve(fileReader.result);
      };

      fileReader.onerror = function () {
        reject(fileReader);
      };

      fileReader.readAsDataURL(file.archivo);
    });
  }

  confirmCoincidencias(event: Event) {
    this.confirmationService.confirm({
      target: event.target,
      message: '¿Está seguro que desea reemplazar los archivos con nombres iguales?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.msg.lbl_enum_si,
      rejectLabel: this.msg.lbl_enum_no,
      accept: () => {
        for (let file of this.archivosPrecargados) {
          this.uploadedFiles.push(file);
        }

        let requestCrearArchivos: RequestArchivo = this.objectModelInitializer.getDataRequestArchivoFile();
        requestCrearArchivos.idUnidadDocumental = this.selectedFiles.data;
        this.uploadedFiles.forEach(file => {
          let archivo: Archivo = this.objectModelInitializer.getDataArchivo();
          archivo.nombreArchivo = file.name;
          archivo.archivo = file;
          requestCrearArchivos.listaArchivosPorSubir.push(archivo);
        });

        let readers = [];
        requestCrearArchivos.listaArchivosPorSubir.forEach(file => {
          readers.push(this.readFileAsText(file));
        });

        Promise.all(readers).then((values) => {
          //file.archivo = e.target.result.split('base64,')[1];
          this.cargarArchivo(requestCrearArchivos);
          this.messageService.add({ severity: 'info', summary: 'Archivo Cargado', detail: '' });

          this.fileUploadPrecargado.clear();
        });
      },
      reject: () => {

      }
    });
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target,
      message: '¿Está seguro que desea eliminar el archivo seleccionado?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.msg.lbl_enum_si,
      rejectLabel: this.msg.lbl_enum_no,
      accept: () => {
        this.eliminarArchivo(this.selectedFiles)
      },
      reject: () => {

      }
    });
  }

  mostrarConfirmarPopUp() {
    setTimeout(() => $('#confirmPP').click(), 100);
  }

  mostrarConfirmarPopUpCoincidencias() {
    setTimeout(() => $('#confirmPPCoincidencias').click(), 100);
  }
}