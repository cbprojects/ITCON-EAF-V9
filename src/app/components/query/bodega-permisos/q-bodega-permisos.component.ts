import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { Bodega } from 'src/app/model/bodegaModel';
import { BodegaPermisos } from 'src/app/model/bodegaPermisosModel';
import { RequestBodegasXSede } from 'src/app/model/request/requestBodegasXSedeModel';
import { RequestConsultaBodegaPermisos } from 'src/app/model/request/requestConsultaBodegaPermisosModel';
import { ResponseConsultaBodegaPermisos } from 'src/app/model/response/responseConsultaBodegaPermisosModel';
import { Sede } from 'src/app/model/sedeModel';
import { Usuario } from 'src/app/model/usuarioModel';
import { UsuarioSede } from 'src/app/model/usuarioSedeModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

@Component({
  selector: 'app-q-bodega-permisos',
  templateUrl: './q-bodega-permisos.component.html',
  styleUrls: ['./q-bodega-permisos.component.scss'],
  providers: [RestService, MessageService]
})
export class QBodegaPermisosComponent implements OnInit {

  @ViewChild('sc') sc;
  // Objetos de Sesion
  sesion: any;

  // Objetos de datos
  
  usuarioFiltro: any;
  sedeFiltro: any;
  bodegaFiltro: any;
  listaBodegasPermisos: BodegaPermisos[];

  listaUsuariosTemp: any[];
  listaSedesTemp: any[];
  listaBodegasTemp: any[];

  listaUsuarios: any[];
  listaSedes: any[];
  listaBodegas: any[];

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
    this.sesionService.objUsuarioSedeCargado = null;
    this.usuarioFiltro = { value: this.objectModelInitializer.getDataUsuario(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.sedeFiltro = { value: this.objectModelInitializer.getDataSede(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.bodegaFiltro = { value: this.objectModelInitializer.getDataBodega(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.consultarBodegaPermisos(0);
    this.consultarUsuarios();
    this.consultarSedes();

  }

  cargarBodegaPermisos(bodegaPermisos: BodegaPermisos) {
    this.sesionService.objBodegaPermisos = this.objectModelInitializer.getDataBodegaPermisos();
    this.sesionService.objBodegaPermisos = bodegaPermisos;
    this.router.navigate(['/m-bodega-permisos']);
  }

  consultarBodegaPermisos(primerItem) {
    this.listaBodegasPermisos = [];
    this.loading = true;
    try {
      let requestConsultaBodegaPermisos: RequestConsultaBodegaPermisos = this.objectModelInitializer.getRequestConsultaBodegaPermisos();
      let usuFiltro= this.objectModelInitializer.getDataUsuario();
      let bodFiltro = this.objectModelInitializer.getDataBodega();
      let bodPerFiltro = this.objectModelInitializer.getDataBodegaPermisos();
      usuFiltro=this.usuarioFiltro.value;
      bodFiltro= this.bodegaFiltro.value;
      bodPerFiltro.usuario=usuFiltro;
      bodPerFiltro.bodega=bodFiltro;
      requestConsultaBodegaPermisos.permisosBodega = this.objectModelInitializer.getDataBodegaPermisos();
      requestConsultaBodegaPermisos.permisosBodega = bodPerFiltro;
      requestConsultaBodegaPermisos.registroInicial = primerItem;
      requestConsultaBodegaPermisos.cantidadRegistro = this.rows;
      this.restService.postREST(this.const.urlConsultarPermisosBodegaFiltros, requestConsultaBodegaPermisos)
        .subscribe(resp => {
          let temp: ResponseConsultaBodegaPermisos = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.resultado.length > 0) {
            this.listaBodegasPermisos = temp.resultado;
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
      this.consultarBodegaPermisos(event.first);
    }, 100);
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
    this.usuarioFiltro = this.listaUsuarios[0];
  }

  consultarSedes() {
    try {
      this.listaSedes = [];
      this.restService.getREST(this.const.urlConsultarSedeActivos)
        .subscribe(resp => {
          let temp: Sede[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaSedesTemp= temp;
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
    this.sedeFiltro = this.listaSedes[0];
  }

  cargarBodegasXSede(event) {
    this.listaBodegas = [];
    this.listaBodegasTemp = [];
    let idSede:Number= event.value.id;
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
    this.bodegaFiltro = this.listaBodegas[0];
  }
}
