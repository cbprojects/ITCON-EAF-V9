import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { Sede } from 'src/app/model/sedeModel';
import { Sociedad } from 'src/app/model/sociedadModel';
import { Usuario } from 'src/app/model/usuarioModel';
import { UsuarioSede } from 'src/app/model/usuarioSedeModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

declare var $: any;

@Component({
  selector: 'app-m-usuario-sede',
  templateUrl: './m-usuario-sede.component.html',
  styleUrls: ['./m-usuario-sede.component.scss'],
  providers: [RestService, MessageService]
})
export class MUsuarioSedeComponent implements OnInit {

  // Objetos de Sesion
  sesion: any;
  usuarioFiltro: any;
  sedeFiltro: any;
  
  // Objetos de datos
  usuarioSede: UsuarioSede;
  esNuevoUsuarioSede: boolean;

  listaUsuariosTemp: any[];
  listaSedesTemp: any[];
  
  listaUsuarios: any[];
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
    this.consultarUsuarios();
    this.consultarSedes();
    this.enumEstado = this.enums.estado.valores;
    this.usuarioSede = this.objectModelInitializer.getUsuarioSede();
    this.usuarioSede.estado = this.util.getValorEnumerado(this.enumEstado, 1);
    this.esNuevoUsuarioSede = true;
    if (this.sesionService.objUsuarioSedeCargado !== undefined && this.sesionService.objUsuarioSedeCargado !== null && this.sesionService.objUsuarioSedeCargado.id > 0) {
      this.usuarioSede = this.sesionService.objUsuarioSedeCargado;
      this.usuarioSede.estado = this.util.getValorEnumerado(this.enumEstado, this.usuarioSede.estado);
      this.esNuevoUsuarioSede = false;
      this.usuarioFiltro = { value: this.usuarioSede.usuario, label: this.usuarioSede.usuario.nombre};
      this.sedeFiltro = { value: this.usuarioSede.sede, label: this.usuarioSede.sede.nombre};
    }else{
      this.usuarioFiltro = { value: this.objectModelInitializer.getDataUsuario(), label: this.msg.lbl_enum_generico_valor_vacio };
      this.sedeFiltro = { value: this.objectModelInitializer.getDataSede(), label: this.msg.lbl_enum_generico_valor_vacio };
    }
  }

  crearUsuarioSede() {
    try {
      this.usuarioSede.usuario=this.usuarioFiltro.value;
      this.usuarioSede.sede=this.sedeFiltro.value;
      this.usuarioSede.estado = this.usuarioSede.estado.value;
      this.usuarioSede.usuarioCreacion=localStorage.getItem("cedula");
      this.usuarioSede.usuarioActualizacion=localStorage.getItem("cedula");
      this.restService.postREST(this.const.urlCrearUsuarioSede, this.usuarioSede)
        .subscribe(resp => {
          let respuesta: Sociedad = JSON.parse(JSON.stringify(resp));
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
            this.usuarioSede.estado = this.util.getValorEnumerado(this.enumEstado, this.usuarioSede.estado);

            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  modificarUsuarioSede() {
    try {
      this.usuarioSede.usuario=this.usuarioFiltro.value;
      this.usuarioSede.sede=this.sedeFiltro.value;
      this.usuarioSede.estado = this.usuarioSede.estado.value;
      this.usuarioSede.usuarioActualizacion=localStorage.getItem("cedula");
      this.restService.putREST(this.const.urlModificarUsuarioSede, this.usuarioSede)
        .subscribe(resp => {
          let respuesta: Sociedad = JSON.parse(JSON.stringify(resp));
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
            this.usuarioSede.estado = this.util.getValorEnumerado(this.enumEstado, this.usuarioSede.estado);
            if (this.usuarioSede.estado === 0) {
              this.usuarioSede.estado = 1;
            }

            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  eliminarUsuarioSede() {
    this.usuarioSede.estado = 0;
    this.modificarUsuarioSede();
  }

  volverConsulta() {
    this.router.navigate(['/q-usuario-sede']);
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
    
  }
}
