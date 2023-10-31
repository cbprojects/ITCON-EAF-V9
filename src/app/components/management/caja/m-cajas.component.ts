import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
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
import { RequestBloquesXBodega } from 'src/app/model/request/requestBloquesXBodegaModel';
import { RequestBodegasXSede } from 'src/app/model/request/requestBodegasXSedeModel';
import { RequestCuerposXBloque } from 'src/app/model/request/requestCuerposXBloqueModel';
import { RequestEntrepanosXEstante } from 'src/app/model/request/requestEntrepanosXEstanteModel';
import { RequestEstantesXCuerpo } from 'src/app/model/request/requestEstantesXCuerpoModel';
import { RequestSedesXUsuario } from 'src/app/model/request/requestSedesXUsuarioModel';
import { Sede } from 'src/app/model/sedeModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

declare var $: any;

@Component({
  selector: 'app-m-cajas',
  templateUrl: './m-cajas.component.html',
  styleUrls: ['./m-cajas.component.scss'],
  providers: [RestService, MessageService]
})
export class MCajaComponent implements OnInit {
  // Objetos de Sesion
  sesion: any;

  // Objetos de datos
  caja: Caja;
  esNuevaCaja: boolean;
  entrepanoFiltro: any;
  estanteFiltro: any;
  cuerpoFiltro: any;
  bloqueFiltro: any;
  bodegaFiltro: any;
  sedeFiltro: any;
  clienteFiltro: any;

  listaClientesTemp: any[];
  listaSedesTemp: any[];
  listaBodegasTemp: any[];
  listaEntrepanosTemp: any[];
  listaEstantesTemp: any[];
  listaCuerposTemp: any[];
  listaBloquesTemp: any[];

  listaClientes: any[];
  listaEntrepanos: any[];
  listaEstantes: any[];
  listaCuerpos: any[];
  listaBloques: any[];
  listaBodegas: any[];
  listaSedes: any[];

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
    this.cargarSedesXUsuario();
    this.consultarSociedades();
    this.enumEstado = this.enums.estado.valores;
    this.caja = this.objectModelInitializer.getDataCaja();
    this.caja.estado = this.util.getValorEnumerado(this.enumEstado, 1);
    this.esNuevaCaja = true;
    if (this.sesionService.objCajaCargado !== undefined && this.sesionService.objCajaCargado !== null && this.sesionService.objCajaCargado.codigoAlterno !== null && this.sesionService.objCajaCargado.codigoAlterno !== '') {
      this.caja = this.sesionService.objCajaCargado;
      this.caja.estado = this.util.getValorEnumerado(this.enumEstado, this.caja.estado);
      this.esNuevaCaja = false;
      // Cargando datos
      this.entrepanoFiltro = { value: this.caja.entrepano, label: this.caja.entrepano.codigo };
      this.estanteFiltro = { value: this.caja.entrepano.estante, label: this.caja.entrepano.estante.codigo };
      this.cuerpoFiltro = { value: this.caja.entrepano.estante.cuerpo, label: this.caja.entrepano.estante.cuerpo.codigo };
      this.bloqueFiltro = { value: this.caja.entrepano.estante.cuerpo.bloque, label: this.caja.entrepano.estante.cuerpo.bloque.codigo };
      this.bodegaFiltro = { value: this.caja.entrepano.estante.cuerpo.bloque.bodega, label: this.caja.entrepano.estante.cuerpo.bloque.bodega.nombre };
    } else {
      this.entrepanoFiltro = { value: this.objectModelInitializer.getDataEntrepano(), label: this.msg.lbl_enum_generico_valor_vacio };
      this.estanteFiltro = { value: this.objectModelInitializer.getDataEstante(), label: this.msg.lbl_enum_generico_valor_vacio };
      this.cuerpoFiltro = { value: this.objectModelInitializer.getDataCuerpo(), label: this.msg.lbl_enum_generico_valor_vacio };
      this.bloqueFiltro = { value: this.objectModelInitializer.getDataBloque(), label: this.msg.lbl_enum_generico_valor_vacio };
      this.bodegaFiltro = { value: this.objectModelInitializer.getDataBodega(), label: this.msg.lbl_enum_generico_valor_vacio };
      this.sedeFiltro = { value: this.objectModelInitializer.getDataSede(), label: this.msg.lbl_enum_generico_valor_vacio };
      this.clienteFiltro = { value: this.objectModelInitializer.getDataCliente(), label: this.msg.lbl_enum_generico_valor_vacio };
    }
  }

  // Activar cambios vista listas desplegables

  activarCambiosSedes() {
    this.listaSedes = [];
    this.listaSedes.push({ value: this.objectModelInitializer.getDataSede(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaSedesTemp.forEach(sede => {
      this.listaSedes.push({ value: sede, label: sede.nombre });
    });
    if (this.sesionService.objCajaCargado !== undefined && this.sesionService.objCajaCargado !== null && this.sesionService.objCajaCargado.descripcion !== null && this.sesionService.objCajaCargado.descripcion !== '') {
      this.sedeFiltro = { value: this.caja.entrepano.estante.cuerpo.bloque.bodega.sede, label: this.caja.entrepano.estante.cuerpo.bloque.bodega.sede.nombre };
    } else {
      this.sedeFiltro = this.listaSedes[0];
    }
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
    this.listaClientes = [];
    this.listaClientes.push({ value: this.objectModelInitializer.getDataCliente, label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaClientesTemp.forEach(clientes => {
      this.listaClientes.push({ value: clientes, label: clientes.nombre });
    });
    if (this.sesionService.objCajaCargado !== undefined && this.sesionService.objCajaCargado !== null && this.sesionService.objCajaCargado.descripcion !== null && this.sesionService.objCajaCargado.descripcion !== '') {
      this.clienteFiltro = { value: this.caja.cliente, label: this.caja.cliente.nombre };
    } else {
      this.clienteFiltro = this.listaClientes[0];
    }

  }

  // Carga ngselects

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

  consultarSociedades() {
    try {
      this.listaClientes = [];
      this.restService.getREST(this.const.urlConsultarClienteActiva)
        .subscribe(resp => {
          let temp: Entrepano[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaClientesTemp = temp;
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

  crearCaja() {
    try {
      this.caja.entrepano = this.entrepanoFiltro.value;
      this.caja.entrepano.estante = this.estanteFiltro.value;
      this.caja.entrepano.estante.cuerpo = this.cuerpoFiltro.value;
      this.caja.entrepano.estante.cuerpo.bloque = this.bloqueFiltro.value;
      this.caja.entrepano.estante.cuerpo.bloque.bodega = this.bodegaFiltro.value;
      this.caja.entrepano.estante.cuerpo.bloque.bodega.sede = this.sedeFiltro.value;
      this.caja.cliente = this.clienteFiltro.value;
      this.caja.estado = this.caja.estado.value;
      this.restService.postREST(this.const.urlCrearCaja, this.caja)
        .subscribe(resp => {
          let respuesta: Caja = JSON.parse(JSON.stringify(resp));
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
            this.caja.estado = this.util.getValorEnumerado(this.enumEstado, this.caja.estado);

            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  modificarCaja() {
    try {
      this.caja.entrepano = this.entrepanoFiltro.value;
      this.caja.entrepano.estante = this.estanteFiltro.value;
      this.caja.entrepano.estante.cuerpo = this.cuerpoFiltro.value;
      this.caja.entrepano.estante.cuerpo.bloque = this.bloqueFiltro.value;
      this.caja.entrepano.estante.cuerpo.bloque.bodega = this.bodegaFiltro.value;
      this.caja.entrepano.estante.cuerpo.bloque.bodega.sede = this.sedeFiltro.value;
      this.caja.cliente = this.clienteFiltro.value;
      this.caja.estado = this.caja.estado.value;
      this.restService.putREST(this.const.urlModificarCaja, this.caja)
        .subscribe(resp => {
          let respuesta: Caja = JSON.parse(JSON.stringify(resp));
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
            this.caja.estado = this.util.getValorEnumerado(this.enumEstado, this.caja.estado);
            if (this.caja.estado === 0) {
              this.caja.estado = 1;
            }

            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  eliminarCaja() {
    this.caja.estado = 0;
    this.modificarCaja();
  }

  volverConsulta() {
    this.router.navigate(['/q-caja']);
  }
}
