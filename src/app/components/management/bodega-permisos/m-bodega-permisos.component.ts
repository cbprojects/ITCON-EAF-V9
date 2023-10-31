import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { Bodega } from 'src/app/model/bodegaModel';
import { BodegaPermisos } from 'src/app/model/bodegaPermisosModel';
import { RequestBodegasXSede } from 'src/app/model/request/requestBodegasXSedeModel';
import { Sede } from 'src/app/model/sedeModel';
import { Sociedad } from 'src/app/model/sociedadModel';
import { Usuario } from 'src/app/model/usuarioModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

@Component({
  selector: 'app-m-bodega-permisos',
  templateUrl: './m-bodega-permisos.component.html',
  styleUrls: ['./m-bodega-permisos.component.scss'],
  providers: [RestService, MessageService]
})
export class MBodegaPermisosComponent implements OnInit {
  // Objetos de Sesion
  sesion: any;
  usuarioFiltro: any;
  sedeFiltro: any;
  bodegaFiltro: any;

  // Objetos de datos
  bodegaPermisos: BodegaPermisos;
  esNuevoBodegaPermisos: boolean;

  listaUsuariosTemp: any[];
  listaSedesTemp: any[];
  listaBodegasTemp: any[];

  listaUsuarios: any[];
  listaSedes: any[];
  listaBodegas: any[];

  // Utilidades
  crear: any;
  editar: any;
  consultar: any;
  eliminar: any;
  msg: any;
  const: any;
  enumEstado: any;
  enumValorBoolean: any;
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
    this.consultarUsuarios();
    this.consultarSedes();
    this.enumEstado = this.enums.estado.valores;
    this.bodegaPermisos = this.objectModelInitializer.getDataBodegaPermisos();
    this.bodegaPermisos.estado = this.util.getValorEnumerado(this.enumEstado, 1);
    this.crear = this.util.getValorEnumerado(this.enumEstado, 0);
    this.editar = this.util.getValorEnumerado(this.enumEstado, 0);
    this.consultar = this.util.getValorEnumerado(this.enumEstado, 0);
    this.eliminar = this.util.getValorEnumerado(this.enumEstado, 0);
    this.esNuevoBodegaPermisos = true;

    if (this.sesionService.objBodegaPermisos !== undefined && this.sesionService.objBodegaPermisos !== null && this.sesionService.objBodegaPermisos.id > 0) {
      this.bodegaPermisos = this.sesionService.objBodegaPermisos;
      this.bodegaPermisos.estado = this.util.getValorEnumerado(this.enumEstado, this.bodegaPermisos.estado);
      this.crear = this.util.getValorEnumerado(this.enumEstado, this.transformarBoleanId(this.bodegaPermisos.crear));
      this.editar = this.util.getValorEnumerado(this.enumEstado, this.transformarBoleanId(this.bodegaPermisos.editar));
      this.consultar = this.util.getValorEnumerado(this.enumEstado, this.transformarBoleanId(this.bodegaPermisos.consultar));
      this.eliminar = this.util.getValorEnumerado(this.enumEstado, this.transformarBoleanId(this.bodegaPermisos.eliminar));
      this.esNuevoBodegaPermisos = false;
      this.usuarioFiltro = { value: this.bodegaPermisos.usuario, label: this.bodegaPermisos.usuario.nombre };
      this.sedeFiltro = { value: this.bodegaPermisos.bodega.sede, label: this.bodegaPermisos.bodega.sede.nombre };
      this.cargarBodegasXSede(this.bodegaPermisos.bodega.sede.id);
      this.bodegaFiltro = { value: this.bodegaPermisos.bodega, label: this.bodegaPermisos.bodega.nombre };
    } else {
      this.usuarioFiltro = { value: this.objectModelInitializer.getDataUsuario(), label: this.msg.lbl_enum_generico_valor_vacio };
      this.sedeFiltro = { value: this.objectModelInitializer.getDataSede(), label: this.msg.lbl_enum_generico_valor_vacio };
      this.bodegaFiltro = { value: this.bodegaPermisos.bodega, label: this.bodegaPermisos.bodega.nombre };
    }
  }
  transformarBoleanId(dato: Boolean) {
    let id: Number = 0;
    if (dato === true) {
      id = 1;
    }
    return id;
  }

  transformarIdBolean(dato: Number) {
    let id: Boolean = false;
    if (dato === 1) {
      id = true;
    }
    return id;
  }
  crearBodegaPermisos() {
    try {
      this.bodegaPermisos.usuario = this.usuarioFiltro.value;
      this.bodegaPermisos.bodega = this.bodegaFiltro.value;
      this.bodegaPermisos.estado = this.bodegaPermisos.estado.value;
      this.bodegaPermisos.crear = this.transformarIdBolean(this.crear.value);
      this.bodegaPermisos.editar = this.transformarIdBolean(this.editar.value);
      this.bodegaPermisos.consultar = this.transformarIdBolean(this.consultar.value);
      this.bodegaPermisos.eliminar = this.transformarIdBolean(this.eliminar.value);
      this.bodegaPermisos.usuarioCreacion = localStorage.getItem("cedula");
      this.bodegaPermisos.usuarioActualizacion = localStorage.getItem("cedula");
      this.restService.postREST(this.const.urlCrearPermisosBodega, this.bodegaPermisos)
        .subscribe(resp => {
          let respuesta: BodegaPermisos = JSON.parse(JSON.stringify(resp));
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
            this.bodegaPermisos.estado = this.util.getValorEnumerado(this.enumEstado, this.bodegaPermisos.estado);

            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  modificarBodegaPermisos() {
    try {
      this.bodegaPermisos.usuario = this.usuarioFiltro.value;
      this.bodegaPermisos.bodega = this.bodegaFiltro.value;
      this.bodegaPermisos.estado = this.bodegaPermisos.estado.value;
      this.bodegaPermisos.crear = this.transformarIdBolean(this.crear.value);
      this.bodegaPermisos.editar = this.transformarIdBolean(this.editar.value);
      this.bodegaPermisos.consultar = this.transformarIdBolean(this.consultar.value);
      this.bodegaPermisos.eliminar = this.transformarIdBolean(this.eliminar.value);
      this.bodegaPermisos.usuarioActualizacion = localStorage.getItem("cedula");
      this.restService.putREST(this.const.urlModificarPermisosBodega, this.bodegaPermisos)
        .subscribe(resp => {
          let respuesta: BodegaPermisos = JSON.parse(JSON.stringify(resp));
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
            this.bodegaPermisos.estado = this.util.getValorEnumerado(this.enumEstado, this.bodegaPermisos.estado);
            if (this.bodegaPermisos.estado === 0) {
              this.bodegaPermisos.estado = 1;
            }

            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  eliminarUsuarioSede() {
    this.bodegaPermisos.estado = 0;
    this.modificarBodegaPermisos();
  }

  volverConsulta() {
    this.router.navigate(['/q-bodega-permisos']);
  }

  consultarUsuarios() {
    try {
      this.listaUsuarios = [];
      this.restService.getREST(this.const.urlConsultarUsuariosActivos)
        .subscribe(resp => {
          let temp: Usuario[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaUsuariosTemp = temp;
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
    setTimeout(() => this.activarCambiosUsuarios(), 1000);
  }

  activarCambiosUsuarios() {
    this.listaUsuarios = [];
    this.listaUsuarios.push({ value: this.objectModelInitializer.getDataUsuario(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaUsuariosTemp.forEach(usuario => {
      this.listaUsuarios.push({ value: usuario, label: usuario.nombre });
    });

  }

  consultarSedes() {
    try {
      this.listaSedes = [];
      this.restService.getREST(this.const.urlConsultarSedeActivos)
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

  activarCambiosSedes() {
    this.listaSedes = [];
    this.listaSedes.push({ value: this.objectModelInitializer.getDataSede(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaSedesTemp.forEach(sede => {
      this.listaSedes.push({ value: sede, label: sede.nombre });
    });

  }

  cargarBodegasXSede(id: Number) {
    this.listaBodegas = [];
    this.listaBodegasTemp = [];
    let idSede: Number = id;
    try {
      let request: RequestBodegasXSede = this.objectModelInitializer.getDataRequestBodegasXSedes();
      request.idSede = idSede;
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
  activarCambiosBodegas() {
    this.listaBodegas = [];
    this.listaBodegas.push({ value: this.objectModelInitializer.getDataBodega(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaBodegasTemp.forEach(sociedad => {
      this.listaBodegas.push({ value: sociedad, label: sociedad.nombre });
    });
    if (this.esNuevoBodegaPermisos) {
      this.bodegaFiltro = this.listaBodegas[0];
    }
  }
}
