import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { Cliente } from 'src/app/model/clienteModel';
import { RequestConsultaUsuarioCliente } from 'src/app/model/request/requestConsultaUsuarioClienteModel';
import { ResponseConsultaUsuarioCliente } from 'src/app/model/response/responseConsultaUsuarioClienteModel';
import { UsuarioCliente } from 'src/app/model/usuarioClienteModel';
import { Usuario } from 'src/app/model/usuarioModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

@Component({
  selector: 'app-q-usuario-cliente',
  templateUrl: './q-usuario-cliente.component.html',
  styleUrls: ['./q-usuario-cliente.component.scss'],
  providers: [RestService, MessageService]
})
export class QUsuarioClienteComponent implements OnInit {

  @ViewChild('sc') sc;
  // Objetos de Sesion
  sesion: any;

  // Objetos de datos
  
  usuarioFiltro: any;
  clienteFiltro: any;
  listaUsuariosClientes: UsuarioCliente[];

  listaUsuariosTemp: any[];
  listaClientesTemp: any[];

  listaUsuarios: any[];
  listaClientes: any[];

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
    this.sesionService.objUsuarioClienteCargado = null;
    this.usuarioFiltro = { value: this.objectModelInitializer.getDataUsuario(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.clienteFiltro = { value: this.objectModelInitializer.getDataCliente(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.consultarUsuarioCliente(0);
    this.consultarUsuarios();
    this.consultarClientes();

  }

  cargarUsuarioCliente(usuarioCliente: UsuarioCliente) {
    this.sesionService.objUsuarioClienteCargado = this.objectModelInitializer.getDataUsuarioCliente();
    this.sesionService.objUsuarioClienteCargado = usuarioCliente;
    this.router.navigate(['/m-usuario-cliente']);
  }

  consultarUsuarioCliente(primerItem) {
    this.listaUsuariosClientes = [];
    this.loading = true;
    try {
      let requestUsuarioClienteFiltro: RequestConsultaUsuarioCliente = this.objectModelInitializer.getRequestConsultaUsuarioCliente();
      let usuFiltro= this.objectModelInitializer.getDataUsuario();
      let clienteFiltro = this.objectModelInitializer.getDataCliente();
      let usuCliFiltro = this.objectModelInitializer.getDataUsuarioCliente();
      usuFiltro=this.usuarioFiltro.value;
      clienteFiltro= this.clienteFiltro.value;
      usuCliFiltro.usuario=usuFiltro;
      usuCliFiltro.cliente=clienteFiltro;
      requestUsuarioClienteFiltro.usuarioCliente = this.objectModelInitializer.getDataUsuarioCliente();
      requestUsuarioClienteFiltro.usuarioCliente = usuCliFiltro;
      requestUsuarioClienteFiltro.registroInicial = primerItem;
      requestUsuarioClienteFiltro.cantidadRegistro = this.rows;
      this.restService.postREST(this.const.urlConsultarUsuarioClienteFiltros, requestUsuarioClienteFiltro)
        .subscribe(resp => {
          let temp: ResponseConsultaUsuarioCliente = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.resultado.length > 0) {
            this.listaUsuariosClientes = temp.resultado;
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
      this.consultarUsuarioCliente(event.first);
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

  consultarClientes() {
    try {
      this.listaClientes = [];
      this.restService.getREST(this.const.urlConsultarClienteActiva)
        .subscribe(resp => {
          let temp: Cliente[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaClientesTemp= temp;
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
    this.listaClientes = [];
    this.listaClientes.push({ value: this.objectModelInitializer.getDataCliente(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaClientesTemp.forEach(cliente => {
      this.listaClientes.push({ value: cliente, label: cliente.nombre });
    });
    this.clienteFiltro = this.listaClientes[0];
  }


}
