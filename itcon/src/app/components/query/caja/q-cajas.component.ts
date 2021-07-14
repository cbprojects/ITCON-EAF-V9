import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { Bloque } from 'src/app/model/bloqueModel';
import { Bodega } from 'src/app/model/bodegaModel';
import { Caja } from 'src/app/model/cajaModel';
import { Cuerpo } from 'src/app/model/cuerpoModel';
import { Entrepano } from 'src/app/model/entrepanoModel';
import { Estante } from 'src/app/model/estanteModel';
import { RequestBloquesXBodega } from 'src/app/model/requestBloquesXBodegaModel';
import { RequestBodegasXSede } from 'src/app/model/requestBodegasXSedeModel';
import { RequestConsultaCaja } from 'src/app/model/requestConsultaCajaModel';
import { RequestCuerposXBloque } from 'src/app/model/requestCuerposXBloqueModel';
import { RequestEntrepanosXEstante } from 'src/app/model/requestEntrepanosXEstanteModel';
import { RequestEstantesXCuerpo } from 'src/app/model/requestEstantesXCuerpoModel';
import { RequestSedesXUsuario } from 'src/app/model/requestSedesXUsuarioModel';
import { ResponseConsultaCaja } from 'src/app/model/responseConsultaCajaModel';
import { Sede } from 'src/app/model/sedeModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

declare var $: any;

@Component({
  selector: 'app-q-cajas',
  templateUrl: './q-cajas.component.html',
  styleUrls: ['./q-cajas.component.scss'],
  providers: [RestService, MessageService]
})
export class QCajaComponent implements OnInit {
  @ViewChild('sc') sc;

  // Objetos de Sesion
  sesion: any;

  // Objetos de datos
  cajaFiltro: Caja;
  entrepanoFiltro: any;
  estanteFiltro: any;
  cuerpoFiltro: any;
  bloqueFiltro: any;
  bodegaFiltro: any;
  sedeFiltro: any;
  sociedadFiltro: any;

  listaSedesTemp: any[];
  listaBodegasTemp: any[];
  listaEntrepanosTemp: any[];
  listaEstantesTemp: any[];
  listaCuerposTemp: any[];
  listaBloquesTemp: any[];
  listaSociedadesTemp: any[];

  listaCajas: Caja[];
  listaEntrepanos: any[];
  listaEstantes: any[];
  listaCuerpos: any[];
  listaBloques: any[];
  listaBodegas: any[];
  listaSedes: any[];
  listaSociedades: any[];

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
    this.sesionService.objCajaCargado = null;
    this.cajaFiltro = this.objectModelInitializer.getDataCaja();
    this.entrepanoFiltro = { value: this.objectModelInitializer.getDataEntrepano(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.estanteFiltro = { value: this.objectModelInitializer.getDataEstante(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.cuerpoFiltro = { value: this.objectModelInitializer.getDataCuerpo(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.bloqueFiltro = { value: this.objectModelInitializer.getDataBloque(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.bodegaFiltro = { value: this.objectModelInitializer.getDataBodega(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.sedeFiltro = { value: this.objectModelInitializer.getDataSede(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.sociedadFiltro = { value: this.objectModelInitializer.getDataSociedad(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.consultarCajas(0);
    this.cargarSedesXUsuario();
    this.consultarSociedades();
  }

  // Activar cambios vista listas desplegables

  activarCambiosSedes() {
    this.listaSedes = [];
    this.listaSedes.push({ value: this.objectModelInitializer.getDataSede(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaSedesTemp.forEach(sede => {
      this.listaSedes.push({ value: sede, label: sede.nombre });
    });
    this.sedeFiltro = this.listaSedes[0];
  }

  activarCambiosBodegas() {
    this.listaBodegas = [];
    this.listaBodegas.push({ value: this.objectModelInitializer.getDataBodega(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaBodegasTemp.forEach(bodega => {
      this.listaBodegas.push({ value: bodega, label: bodega.nombre });
    });
    this.bodegaFiltro = this.listaBodegas[0];
  }

  activarCambiosBloques() {
    this.listaBloques = [];
    this.listaBloques.push({ value: this.objectModelInitializer.getDataBloque(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaBloquesTemp.forEach(bloque => {
      this.listaBloques.push({ value: bloque, label: bloque.codigo });
    });
    this.bloqueFiltro = this.listaBloques[0];
  }

  activarCambiosCuerpos() {
    this.listaCuerpos = [];
    this.listaCuerpos.push({ value: this.objectModelInitializer.getDataCuerpo(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaCuerposTemp.forEach(cuerpo => {
      this.listaCuerpos.push({ value: cuerpo, label: cuerpo.codigo });
    });
    this.cuerpoFiltro = this.listaCuerpos[0];
  }

  activarCambiosEstantes() {
    this.listaEstantes = [];
    this.listaEstantes.push({ value: this.objectModelInitializer.getDataEstante(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaEstantesTemp.forEach(estante => {
      this.listaEstantes.push({ value: estante, label: estante.codigo });
    });
    this.estanteFiltro = this.listaEstantes[0];
  }

  activarCambiosEntrepanos() {
    this.listaEntrepanos = [];
    this.listaEntrepanos.push({ value: this.objectModelInitializer.getDataEntrepano(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaEntrepanosTemp.forEach(entrepano => {
      this.listaEntrepanos.push({ value: entrepano, label: entrepano.codigo });
    });
    this.entrepanoFiltro = this.listaEntrepanos[0];
  }

  activarCambiosSociedades() {
    this.listaSociedades = [];
    this.listaSociedades.push({ value: this.objectModelInitializer.getDataSociedad(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaSociedadesTemp.forEach(sociedad => {
      this.listaSociedades.push({ value: sociedad, label: sociedad.nombre });
    });
    this.sociedadFiltro = this.listaSociedades[0];
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

  cargarSedesXUsuario() {
    this.listaSedesTemp = [];
    try {
      let requestSedeXUser: RequestSedesXUsuario = this.objectModelInitializer.getDataRequestSedesXUsuario();
      requestSedeXUser.email = this.sesionService.objServiceSesion.usuarioSesion.usuario.email;
      this.restService.postREST(this.const.urlBuscarSedesActivasPorUsuario, requestSedeXUser)
        .subscribe(resp => {
          let temp: Sede[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaSedesTemp = temp;
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
    setTimeout(() => this.activarCambiosSedes(), 1000);
  }

  cargarBodegasXSede(event) {
    this.listaEntrepanos = [];
    this.listaEstantes = [];
    this.listaCuerpos = [];
    this.listaBloques = [];
    this.entrepanoFiltro = { value: this.objectModelInitializer.getDataEntrepano(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.estanteFiltro = { value: this.objectModelInitializer.getDataEstante(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.cuerpoFiltro = { value: this.objectModelInitializer.getDataCuerpo(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.bloqueFiltro = { value: this.objectModelInitializer.getDataBloque(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.bodegaFiltro = { value: this.objectModelInitializer.getDataBodega(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.sedeFiltro.id = event.value.id;
    this.listaBodegas = [];
    try {
      let request: RequestBodegasXSede = this.objectModelInitializer.getDataRequestBodegasXSedes();
      request.idSede = this.sedeFiltro.id;
      this.restService.postREST(this.const.urlBuscarBodegasActivasPorSede, request)
        .subscribe(resp => {
          let temp: Bodega[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaBodegasTemp = temp;
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
    setTimeout(() => this.activarCambiosBodegas(), 1000);
  }

  cargarBloquesXBodega(event) {
    this.listaEntrepanos = [];
    this.listaEstantes = [];
    this.listaCuerpos = [];
    this.entrepanoFiltro = { value: this.objectModelInitializer.getDataEntrepano(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.estanteFiltro = { value: this.objectModelInitializer.getDataEstante(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.cuerpoFiltro = { value: this.objectModelInitializer.getDataCuerpo(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.bloqueFiltro = { value: this.objectModelInitializer.getDataBloque(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.bodegaFiltro.id = event.value.id;
    this.listaBloques = [];
    try {
      let request: RequestBloquesXBodega = this.objectModelInitializer.getDataRequestBloquesXBodega();
      request.idBodega = this.bodegaFiltro.id;
      this.restService.postREST(this.const.urlBuscarBloquesActivosPorBodega, request)
        .subscribe(resp => {
          let temp: Bloque[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaBloquesTemp = temp;
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
    setTimeout(() => this.activarCambiosBloques(), 1000);
  }

  cargarCuerposXBloque(event) {
    this.listaEntrepanos = [];
    this.listaEstantes = [];
    this.entrepanoFiltro = { value: this.objectModelInitializer.getDataEntrepano(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.estanteFiltro = { value: this.objectModelInitializer.getDataEstante(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.cuerpoFiltro = { value: this.objectModelInitializer.getDataCuerpo(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.bloqueFiltro.id = event.value.id;
    this.listaCuerpos = [];
    try {
      let request: RequestCuerposXBloque = this.objectModelInitializer.getDataRequestCuerposXBloque();
      request.idBloque = this.bloqueFiltro.id;
      this.restService.postREST(this.const.urlBuscarCuerposActivosPorBloque, request)
        .subscribe(resp => {
          let temp: Cuerpo[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaCuerposTemp = temp;
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
    setTimeout(() => this.activarCambiosCuerpos(), 1000);
  }

  cargarEstantesXCuerpo(event) {
    this.listaEntrepanos = [];
    this.listaEstantes = [];
    this.entrepanoFiltro = { value: this.objectModelInitializer.getDataEntrepano(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.estanteFiltro = { value: this.objectModelInitializer.getDataEstante(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.cuerpoFiltro.id = event.value.id;
    this.listaEstantes = [];
    try {
      let request: RequestEstantesXCuerpo = this.objectModelInitializer.getDataRequestEstantesXCuerpo();
      request.idCuerpo = this.cuerpoFiltro.id;
      this.restService.postREST(this.const.urlBuscarEstantesActivosPorCuerpo, request)
        .subscribe(resp => {
          let temp: Estante[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaEstantesTemp = temp;
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
    setTimeout(() => this.activarCambiosEstantes(), 1000);
  }

  cargarEntrepanosXEstante(event) {
    this.entrepanoFiltro = { value: this.objectModelInitializer.getDataEntrepano(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.estanteFiltro.id = event.value.id;
    this.listaEntrepanos = [];
    try {
      let request: RequestEntrepanosXEstante = this.objectModelInitializer.getDataRequestEntrepanosXEstante();
      request.idEstante = this.estanteFiltro.id;
      this.restService.postREST(this.const.urlBuscarEntrepanosActivosPorEstante, request)
        .subscribe(resp => {
          let temp: Entrepano[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaEntrepanosTemp = temp;
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
    setTimeout(() => this.activarCambiosEntrepanos(), 1000);
  }

  cargarCaja(caja: Caja) {
    this.sesionService.objCajaCargado = this.objectModelInitializer.getDataCaja();
    this.sesionService.objCajaCargado = caja;
    this.router.navigate(['/m-caja']);
  }

  consultarCajas(primerItem) {
    this.listaCajas = [];
    this.loading = true;
    try {
      let requestCajaFiltro: RequestConsultaCaja = this.objectModelInitializer.getDataRequestConsultarCaja();
      this.cajaFiltro.entrepano = this.entrepanoFiltro.value;
      this.cajaFiltro.sociedad = this.sociedadFiltro.value;
      requestCajaFiltro.caja = this.cajaFiltro;
      requestCajaFiltro.idSede = this.sedeFiltro.id;
      requestCajaFiltro.idBodega = this.bodegaFiltro.id;
      requestCajaFiltro.idBloque = this.bloqueFiltro.id;
      requestCajaFiltro.idCuerpo = this.cuerpoFiltro.id;
      requestCajaFiltro.idEstante = this.estanteFiltro.id;
      requestCajaFiltro.registroInicial = primerItem;
      requestCajaFiltro.cantidadRegistro = this.rows;
      this.restService.postREST(this.const.urlConsultarCajasPorFiltros, requestCajaFiltro)
        .subscribe(resp => {
          let temp: ResponseConsultaCaja = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.resultado.length > 0) {
            this.listaCajas = temp.resultado;
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
      this.consultarCajas(event.first);
    }, 100);
  }
}
