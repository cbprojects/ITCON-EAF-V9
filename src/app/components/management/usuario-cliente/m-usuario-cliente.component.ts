import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { Cliente } from 'src/app/model/clienteModel';
import { Usuario } from 'src/app/model/usuarioModel';
import { UsuarioCliente } from 'src/app/model/usuarioClienteModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

@Component({
  selector: 'app-m-usuario-cliente',
  templateUrl: './m-usuario-cliente.component.html',
  styleUrls: ['./m-usuario-cliente.component.scss'],
  providers: [RestService, MessageService]
})
export class MUsuarioClienteComponent implements OnInit {

  // Objetos de Sesion
  sesion: any;
  usuarioFiltro: any;
  clienteFiltro: any;
  
  // Objetos de datos
  usuarioCliente: UsuarioCliente;
  esNuevoUsuarioCliente: boolean;

  listaUsuariosTemp: any[];
  listaClienteTemp: any[];
  
  listaUsuarios: any[];
  listaCliente: any[];
  
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
    this.consultarClientes();
    this.enumEstado = this.enums.estado.valores;
    this.usuarioCliente = this.objectModelInitializer.getDataUsuarioCliente();
    this.usuarioCliente.estado = this.util.getValorEnumerado(this.enumEstado, 1);
    this.esNuevoUsuarioCliente = true;
    if (this.sesionService.objUsuarioClienteCargado !== undefined && this.sesionService.objUsuarioClienteCargado !== null && this.sesionService.objUsuarioClienteCargado.id > 0) {
      this.usuarioCliente = this.sesionService.objUsuarioClienteCargado;
      this.usuarioCliente.estado = this.util.getValorEnumerado(this.enumEstado, this.usuarioCliente.estado);
      this.esNuevoUsuarioCliente = false;
      this.usuarioFiltro = { value: this.usuarioCliente.usuario, label: this.usuarioCliente.usuario.nombre};
      this.clienteFiltro = { value: this.usuarioCliente.cliente, label: this.usuarioCliente.cliente.nombre};
    }else{
      this.usuarioFiltro = { value: this.objectModelInitializer.getDataUsuario(), label: this.msg.lbl_enum_generico_valor_vacio };
      this.clienteFiltro = { value: this.objectModelInitializer.getDataCliente(), label: this.msg.lbl_enum_generico_valor_vacio };
    }
  }

  crearUsuarioCliente() {
    try {
      this.usuarioCliente.usuario=this.usuarioFiltro.value;
      this.usuarioCliente.cliente=this.clienteFiltro.value;
      this.usuarioCliente.estado = this.usuarioCliente.estado.value;
      this.usuarioCliente.usuarioCreacion=localStorage.getItem("cedula");
      this.usuarioCliente.usuarioActualizacion=localStorage.getItem("cedula");
      this.restService.postREST(this.const.urlCrearUsuarioCliente, this.usuarioCliente)
        .subscribe(resp => {
          let respuesta: UsuarioCliente = JSON.parse(JSON.stringify(resp));
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
            this.usuarioCliente.estado = this.util.getValorEnumerado(this.enumEstado, this.usuarioCliente.estado);

            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  modificarUsuarioCliente() {
    try {
      this.usuarioCliente.usuario=this.usuarioFiltro.value;
      this.usuarioCliente.cliente=this.clienteFiltro.value;
      this.usuarioCliente.estado = this.usuarioCliente.estado.value;
      this.usuarioCliente.usuarioActualizacion=localStorage.getItem("cedula");
      this.restService.putREST(this.const.urlModificarUsuarioCliente, this.usuarioCliente)
        .subscribe(resp => {
          let respuesta: UsuarioCliente = JSON.parse(JSON.stringify(resp));
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
            this.usuarioCliente.estado = this.util.getValorEnumerado(this.enumEstado, this.usuarioCliente.estado);
            if (this.usuarioCliente.estado === 0) {
              this.usuarioCliente.estado = 1;
            }

            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  eliminarUsuarioCliente() {
    this.usuarioCliente.estado = 0;
    this.modificarUsuarioCliente();
  }

  volverConsulta() {
    this.router.navigate(['/q-usuario-cliente']);
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

  consultarClientes() {
    try {
      this.listaCliente = [];
      this.restService.getREST(this.const.urlConsultarClienteActiva)
        .subscribe(resp => {
          let temp: Cliente[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaClienteTemp= temp;
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
    setTimeout(() => this.activarCambiosClientes(), 1000);
  }

  activarCambiosClientes() {
    this.listaCliente = [];
    this.listaCliente.push({ value: this.objectModelInitializer.getDataCliente(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaClienteTemp.forEach(cliente => {
      this.listaCliente.push({ value: cliente, label: cliente.nombre });
    });
    
  }

}
