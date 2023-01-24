import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { Area } from 'src/app/model/areaModel';
import { Contenedor } from 'src/app/model/contenedorModel';
import { Entrepano } from 'src/app/model/entrepanoModel';
import { RequestAreasXSociedad } from 'src/app/model/requestAreasXSociedad';
import { TipoDocumental } from 'src/app/model/tipoDocumentalModel';
import { UnidadDocumental } from 'src/app/model/unidadDocumentalModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

declare var $: any;

@Component({
  selector: 'app-m-unidad-documental',
  templateUrl: './m-unidad-documental.component.html',
  styleUrls: ['./m-unidad-documental.component.scss'],
  providers: [RestService, MessageService]
})
export class MUnidadDocumentalComponent implements OnInit {
  // Objetos de Sesion
  sesion: any;

  // Objetos de datos
  unidadDocumental: UnidadDocumental;
  esNuevaUnidadDocumental: boolean;
  sociedadFiltro: any;
  areaFiltro: any;
  tipoDocumentalFiltro: any;
  contenedorFiltro: any;

  listaSociedadesTemp: any[];
  listaAreasTemp: any[];
  listaTipoDocumentalTemp: any[];
  listaContenedoresTemp: any[];

  listaUnidadesDocumentales: UnidadDocumental[];
  listaSociedades: any[];
  listaAreas: any[];
  listaTipoDocumental: any[];
  listaContenedores: any[];
  creacion: any;

  // Utilidades
  msg: any;
  const: any;
  enumEstado: any;
  enums: any;

  constructor(private router: Router, private route: ActivatedRoute, public restService: RestService, public textProperties: TextProperties, public util: Util, public objectModelInitializer: ObjectModelInitializer, public enumerados: Enumerados, public sesionService: SesionService, private messageService: MessageService) {
    this.sesion = this.objectModelInitializer.getDataServiceSesion();
    this.msg = this.textProperties.getProperties(this.sesionService.objServiceSesion.idioma);
    this.const = this.objectModelInitializer.getConst();
    this.enums = this.enumerados.getEnumerados();
  }

  ngOnInit() {
    this.inicializar();
  }

  ngOnDestroy() {
  }

  inicializar() {
    this.creacion=localStorage.getItem("cedula");
    this.consultarContenedores();
    this.consultarTiposDocumentales();
    this.consultarSociedades();
    this.enumEstado = this.enums.estado.valores;
    this.unidadDocumental = this.objectModelInitializer.getDataUnidadDocumental();
    this.unidadDocumental.usuarioCreacion
    this.unidadDocumental.sociedadArea = this.objectModelInitializer.getDataSociedadArea();
    this.unidadDocumental.estado = this.util.getValorEnumerado(this.enumEstado, 1);
    this.esNuevaUnidadDocumental = true;
    if (this.sesionService.objUnidadDocumentalCargada !== undefined && this.sesionService.objUnidadDocumentalCargada !== null && this.sesionService.objUnidadDocumentalCargada.nombre !== null && this.sesionService.objUnidadDocumentalCargada.nombre !== '') {
      this.unidadDocumental = this.sesionService.objUnidadDocumentalCargada;
      this.unidadDocumental.estado = this.util.getValorEnumerado(this.enumEstado, this.unidadDocumental.estado);
      this.unidadDocumental.fechaRecibe = this.unidadDocumental.fechaRecibe !== undefined && this.unidadDocumental.fechaRecibe !== null && this.unidadDocumental.fechaRecibe !== '' ? new Date(this.unidadDocumental.fechaRecibe) : '';
      this.unidadDocumental.fechaIni = this.unidadDocumental.fechaIni !== undefined && this.unidadDocumental.fechaIni !== null && this.unidadDocumental.fechaIni !== '' ? new Date(this.unidadDocumental.fechaIni) : '';
      this.unidadDocumental.fechaFin = this.unidadDocumental.fechaFin !== undefined && this.unidadDocumental.fechaFin !== null && this.unidadDocumental.fechaFin !== '' ? new Date(this.unidadDocumental.fechaFin) : '';
      this.esNuevaUnidadDocumental = false;
      // Cargando datos
      this.areaFiltro = { value: this.unidadDocumental.sociedadArea.area, label: this.unidadDocumental.sociedadArea.area.nombre };
      this.contenedorFiltro = { value: this.unidadDocumental.contenedor, label: this.unidadDocumental.contenedor.nombre };
      this.tipoDocumentalFiltro = { value: this.unidadDocumental.tipoDocumental, label: this.unidadDocumental.tipoDocumental.nombre };
    } else {
      this.sociedadFiltro = { value: this.objectModelInitializer.getDataSociedad(), label: this.msg.lbl_enum_generico_valor_vacio };
      this.areaFiltro = { value: this.objectModelInitializer.getDataArea(), label: this.msg.lbl_enum_generico_valor_vacio };
      this.contenedorFiltro = { value: this.objectModelInitializer.getDataContenedor(), label: this.msg.lbl_enum_generico_valor_vacio };
      this.tipoDocumentalFiltro = { value: this.objectModelInitializer.getDataTipoDocumental(), label: this.msg.lbl_enum_generico_valor_vacio };
    }
  }

  // Activar cambios vista listas desplegables

  activarCambiosContenedores() {
    this.listaContenedores = [];
    this.listaContenedores.push({ value: this.objectModelInitializer.getDataContenedor(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaContenedoresTemp.forEach(contenedor => {
      this.listaContenedores.push({ value: contenedor, label: contenedor.nombre });
    });

    if (this.sesionService.objUnidadDocumentalCargada !== undefined && this.sesionService.objUnidadDocumentalCargada !== null && this.sesionService.objUnidadDocumentalCargada.descripcion !== null && this.sesionService.objUnidadDocumentalCargada.descripcion !== '') {
      this.contenedorFiltro = { value: this.unidadDocumental.contenedor, label: this.unidadDocumental.contenedor.nombre };
    } else {
      this.contenedorFiltro = this.listaContenedores[0];
    }
  }

  activarCambiosTiposDocumentales() {
    this.listaTipoDocumental = [];
    this.listaTipoDocumental.push({ value: this.objectModelInitializer.getDataTipoDocumental(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaTipoDocumentalTemp.forEach(tipoD => {
      this.listaTipoDocumental.push({ value: tipoD, label: tipoD.nombre });
    });
    if (this.sesionService.objUnidadDocumentalCargada !== undefined && this.sesionService.objUnidadDocumentalCargada !== null && this.sesionService.objUnidadDocumentalCargada.descripcion !== null && this.sesionService.objUnidadDocumentalCargada.descripcion !== '') {
      this.tipoDocumentalFiltro = { value: this.unidadDocumental.tipoDocumental, label: this.unidadDocumental.tipoDocumental.nombre };
    } else {
      this.tipoDocumentalFiltro = this.listaTipoDocumental[0];
    }
  }

  activarCambiosSociedades() {
    this.listaSociedades = [];
    this.listaSociedades.push({ value: this.objectModelInitializer.getDataSociedad(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaSociedadesTemp.forEach(sociedad => {
      this.listaSociedades.push({ value: sociedad, label: sociedad.nombre });
    });
    if (this.sesionService.objUnidadDocumentalCargada !== undefined && this.sesionService.objUnidadDocumentalCargada !== null && this.sesionService.objUnidadDocumentalCargada.descripcion !== null && this.sesionService.objUnidadDocumentalCargada.descripcion !== '') {
      this.sociedadFiltro = { value: this.unidadDocumental.sociedadArea.sociedad, label: this.unidadDocumental.sociedadArea.sociedad.nombre };
    } else {
      this.sociedadFiltro = this.listaSociedades[0];
    }
  }

  activarCambiosAreas() {
    this.listaAreas = [];
    this.listaAreas.push({ value: this.objectModelInitializer.getDataArea(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaAreasTemp.forEach(area => {
      this.listaAreas.push({ value: area, label: area.nombre });
    });
    this.areaFiltro = this.listaAreas[0];
  }

  // Carga ngselects

  consultarSociedades() {
    try {
      this.listaSociedades = [];
      this.restService.getREST(this.const.urlConsultarSociedadActiva)
        .subscribe(resp => {
          let temp: Entrepano[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaSociedadesTemp = temp;
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
          })
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => this.activarCambiosSociedades(), 1000);
  }

  consultarContenedores() {
    try {
      this.listaContenedores = [];
      this.restService.getREST(this.const.urlBuscarContenedoresActivos)
        .subscribe(resp => {
          let temp: Contenedor[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaContenedoresTemp = temp;
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
          })
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => this.activarCambiosContenedores(), 1000);
  }

  consultarTiposDocumentales() {
    try {
      this.listaTipoDocumental = [];
      this.restService.getREST(this.const.urlBuscarTipoUDActivos)
        .subscribe(resp => {
          let temp: TipoDocumental[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaTipoDocumentalTemp = temp;
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
          })
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => this.activarCambiosTiposDocumentales(), 1000);
  }

  cargarAreasXSociedad(event) {
    this.listaAreas = [];
    this.sociedadFiltro.id = event.value.id;
    try {
      let request: RequestAreasXSociedad = this.objectModelInitializer.getDataRequestAreasXSociedad();
      request.id = this.sociedadFiltro.id;
      this.restService.postREST(this.const.urlBuscarAreasActivasPorSociedad, request)
        .subscribe(resp => {
          let temp: Area[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaAreasTemp = temp;
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
          })
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => this.activarCambiosAreas(), 1000);
  }

  crearUD() {
    try {
      this.unidadDocumental.sociedadArea.id = 0;
      this.unidadDocumental.sociedadArea.area = this.areaFiltro.value;
      this.unidadDocumental.sociedadArea.sociedad = this.sociedadFiltro.value;
      this.unidadDocumental.contenedor = this.contenedorFiltro.value;
      this.unidadDocumental.tipoDocumental = this.tipoDocumentalFiltro.value;
      this.unidadDocumental.estado = this.unidadDocumental.estado.value;
      this.unidadDocumental.usuarioCreacion=this.creacion;
      this.unidadDocumental.usuarioActualizacion=this.creacion;
      this.restService.postREST(this.const.urlCrearUD, this.unidadDocumental)
        .subscribe(resp => {
          let respuesta: UnidadDocumental = JSON.parse(JSON.stringify(resp));
          if (respuesta !== null) {
            // Mostrar mensaje exitoso y consultar de nuevo
            this.messageService.clear();
            this.messageService.add({ severity: this.const.severity[1], summary: this.msg.lbl_summary_succes, detail: this.msg.lbl_info_proceso_completo, sticky: true });

            this.volverConsulta();
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
            this.unidadDocumental.estado = this.util.getValorEnumerado(this.enumEstado, this.unidadDocumental.estado);

            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  modificarUD() {
    try {
      this.unidadDocumental.sociedadArea.id = 0;
      this.unidadDocumental.sociedadArea.area = this.areaFiltro.value;
      this.unidadDocumental.sociedadArea.sociedad = this.sociedadFiltro.value;
      this.unidadDocumental.contenedor = this.contenedorFiltro.value;
      this.unidadDocumental.tipoDocumental = this.tipoDocumentalFiltro.value;
      this.unidadDocumental.estado = this.unidadDocumental.estado.value;
      this.unidadDocumental.usuarioActualizacion=this.creacion;
      this.restService.putREST(this.const.urlModificarUD, this.unidadDocumental)
        .subscribe(resp => {
          let respuesta: UnidadDocumental = JSON.parse(JSON.stringify(resp));
          if (respuesta !== null) {
            // Mostrar mensaje exitoso y consultar de nuevo
            this.messageService.clear();
            this.messageService.add({ severity: this.const.severity[1], summary: this.msg.lbl_summary_succes, detail: this.msg.lbl_info_proceso_completo, sticky: true });

            this.volverConsulta();
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
            this.unidadDocumental.estado = this.util.getValorEnumerado(this.enumEstado, this.unidadDocumental.estado);
            if (this.unidadDocumental.estado === 0) {
              this.unidadDocumental.estado = 1;
            }

            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  eliminarUD() {
    this.unidadDocumental.estado = 0;
    this.modificarUD();
  }

  volverConsulta() {
    this.router.navigate(['/q-unidad-documental']);
  }
}
