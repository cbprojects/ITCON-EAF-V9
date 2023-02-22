import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { Area } from 'src/app/model/areaModel';
import { Contenedor } from 'src/app/model/contenedorModel';
import { Entrepano } from 'src/app/model/entrepanoModel';
import { RequestAreasXSociedad } from 'src/app/model/requestAreasXSociedad';
import { RequestConsultaUnidadDocumental } from 'src/app/model/requestConsultaUnidadDocumentalModel';
import { ResponseConsultaUnidadDocumental } from 'src/app/model/responseConsultaUnidadDocumentalModel';
import { TipoDocumental } from 'src/app/model/tipoDocumentalModel';
import { UnidadDocumental } from 'src/app/model/unidadDocumentalModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

declare var $: any;

@Component({
  selector: 'app-q-unidad-documental',
  templateUrl: './q-unidad-documental.component.html',
  styleUrls: ['./q-unidad-documental.component.scss'],
  providers: [RestService, MessageService]
})
export class QUnidadDocumentalComponent implements OnInit {
  @ViewChild('sc') sc;

  // Objetos de Sesion
  sesion: any;

  // Objetos de datos
  unidadDocumentalFiltro: UnidadDocumental;
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

  // Utilidades
  msg: any;
  const: any;
  rows: any;
  enumRows: any;
  totalRecords: number;
  loading: boolean;

  constructor(private router: Router, private route: ActivatedRoute, public restService: RestService, public textProperties: TextProperties, public util: Util, public objectModelInitializer: ObjectModelInitializer, public enumerados: Enumerados, public sesionService: SesionService, private messageService: MessageService) {
    this.sesion = this.objectModelInitializer.getDataServiceSesion();
    this.msg = this.textProperties.getProperties(this.sesionService.objServiceSesion.idioma);
    this.const = this.objectModelInitializer.getConst();
    this.enumRows = [5, 10, 15, 20, 50, 100];
    this.rows = this.enumRows[1];
  }

  ngOnInit() {
    this.inicializar();
  }

  ngOnDestroy() {
  }

  inicializar() {
    this.sesionService.objUnidadDocumentalCargada = null;
    this.unidadDocumentalFiltro = this.objectModelInitializer.getDataUnidadDocumental();
    this.sociedadFiltro = { value: this.objectModelInitializer.getDataSociedad(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.areaFiltro = { value: this.objectModelInitializer.getDataArea(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.tipoDocumentalFiltro = { value: this.objectModelInitializer.getDataTipoDocumental(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.contenedorFiltro = { value: this.objectModelInitializer.getDataContenedor(), label: this.msg.lbl_enum_generico_valor_vacio };

    this.consultarUnidadesDocumentales(0);
    this.consultarContenedores();
    this.consultarTiposDocumentales();
    this.consultarSociedades();
  }

  // Activar cambios vista listas desplegables

  activarCambiosContenedores() {
    this.listaContenedores = [];
    this.listaContenedores.push({ value: this.objectModelInitializer.getDataContenedor(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaContenedoresTemp.forEach(contenedor => {
      this.listaContenedores.push({ value: contenedor, label: contenedor.nombre });
    });
    this.contenedorFiltro = this.listaContenedores[0];
  }

  activarCambiosTiposDocumentales() {
    this.listaTipoDocumental = [];
    this.listaTipoDocumental.push({ value: this.objectModelInitializer.getDataTipoDocumental(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaTipoDocumentalTemp.forEach(tipoD => {
      this.listaTipoDocumental.push({ value: tipoD, label: tipoD.nombre });
    });
    this.tipoDocumentalFiltro = this.listaTipoDocumental[0];
  }

  activarCambiosSociedades() {
    this.listaSociedades = [];
    this.listaSociedades.push({ value: this.objectModelInitializer.getDataSociedad(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaSociedadesTemp.forEach(sociedad => {
      this.listaSociedades.push({ value: sociedad, label: sociedad.nombre });
    });
    this.sociedadFiltro = this.listaSociedades[0];
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

  cargarUnidadDocumental(unidadDocumental: UnidadDocumental) {
    this.sesionService.objUnidadDocumentalCargada = this.objectModelInitializer.getDataUnidadDocumental();
    this.sesionService.objUnidadDocumentalCargada = unidadDocumental;
    this.router.navigate(['/m-unidad-documental']);
  }

  consultarUnidadesDocumentales(primerItem) {
    this.listaUnidadesDocumentales = [];
    this.loading = true;
    try {
      let requestUnidadDocumentalFiltro: RequestConsultaUnidadDocumental = this.objectModelInitializer.getDataRequestUnidadDocumental();
      this.unidadDocumentalFiltro.caja = null;
      this.unidadDocumentalFiltro.sociedadArea = this.objectModelInitializer.getDataSociedadArea();
      this.unidadDocumentalFiltro.sociedadArea.sociedad = this.sociedadFiltro.value;
      this.unidadDocumentalFiltro.sociedadArea.area = this.areaFiltro.value;
      this.unidadDocumentalFiltro.tipoDocumental = this.tipoDocumentalFiltro.value;
      this.unidadDocumentalFiltro.contenedor = this.contenedorFiltro.value;
      requestUnidadDocumentalFiltro.unidadDocumental = this.unidadDocumentalFiltro;
      requestUnidadDocumentalFiltro.registroInicial = primerItem;
      requestUnidadDocumentalFiltro.cantidadRegistro = this.rows;
      // Formato fecha AAAA-MM-DD
      console.log(requestUnidadDocumentalFiltro);
      this.restService.postREST(this.const.urlConsultarUDPorFiltros, requestUnidadDocumentalFiltro)
        .subscribe(resp => {
          let temp: ResponseConsultaUnidadDocumental = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.resultado.length > 0) {
            this.listaUnidadesDocumentales = temp.resultado;
            this.totalRecords = temp.registrosTotales;
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
          })
    } catch (e) {
      console.log(e);
    }
  }

  cargarTabla(event: LazyLoadEvent) {
    setTimeout(() => {
      this.consultarUnidadesDocumentales(event.first);
    }, 100);
  }
}
