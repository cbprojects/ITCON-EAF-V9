import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { RequestConsultaUsuarioSede } from 'src/app/model/requestConsultaUsuarioSedeModel';
import { ResponseConsultaUsuarioSede } from 'src/app/model/responseConsultaUsuarioSedeModel';
import { Sede } from 'src/app/model/sedeModel';
import { Usuario } from 'src/app/model/usuarioModel';
import { UsuarioSede } from 'src/app/model/usuarioSedeModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

@Component({
  selector: 'app-q-usuario-sede',
  templateUrl: './q-usuario-sede.component.html',
  styleUrls: ['./q-usuario-sede.component.scss'],
  providers: [RestService, MessageService]
})
export class QUsuarioSedeComponent implements OnInit {
  @ViewChild('sc') sc;
  // Objetos de Sesion
  sesion: any;

  // Objetos de datos
  
  usuarioFiltro: any;
  sedeFiltro: any;
  listaUsuariosSedes: UsuarioSede[];

  listaUsuariosTemp: any[];
  listaSedesTemp: any[];

  listaUsuarios: any[];
  listaSedes: any[];

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
    this.consultarUsuarioSede(0);
    this.consultarUsuarios();
    this.consultarSedes();

  }

  cargarUsuarioSede(usuarioSede: UsuarioSede) {
    this.sesionService.objUsuarioSedeCargado = this.objectModelInitializer.getUsuarioSede();
    this.sesionService.objUsuarioSedeCargado = usuarioSede;
    this.router.navigate(['/m-usuario-sede']);
  }

  consultarUsuarioSede(primerItem) {
    this.listaUsuariosSedes = [];
    this.loading = true;
    try {
      let requestUsuarioSedeFiltro: RequestConsultaUsuarioSede = this.objectModelInitializer.getDataRequestConsultarUsuarioSede();
      let usuFiltro= this.objectModelInitializer.getDataUsuario();
      let sedFiltro = this.objectModelInitializer.getDataSede();
      let usuSedFiltro = this.objectModelInitializer.getUsuarioSede();
      usuFiltro=this.usuarioFiltro.value;
      sedFiltro= this.sedeFiltro.value;
      usuSedFiltro.usuario=usuFiltro;
      usuSedFiltro.sede=sedFiltro;
      requestUsuarioSedeFiltro.usuarioSede = this.objectModelInitializer.getUsuarioSede();
      requestUsuarioSedeFiltro.usuarioSede = usuSedFiltro;
      requestUsuarioSedeFiltro.registroInicial = primerItem;
      requestUsuarioSedeFiltro.cantidadRegistro = this.rows;
      this.restService.postREST(this.const.urlConsultarUsuarioSedePorFiltros, requestUsuarioSedeFiltro)
        .subscribe(resp => {
          let temp: ResponseConsultaUsuarioSede = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.resultado.length > 0) {
            this.listaUsuariosSedes = temp.resultado;
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
      this.consultarUsuarioSede(event.first);
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

  
}
