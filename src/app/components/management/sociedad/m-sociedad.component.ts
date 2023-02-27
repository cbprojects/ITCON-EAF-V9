import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { Cliente } from 'src/app/model/clienteModel';
import { Perfil } from 'src/app/model/perfilModel';
import { RequestSociedadXCliente } from 'src/app/model/requestSociedadXCliente';
import { Servidor } from 'src/app/model/servidorModel';
import { Sociedad } from 'src/app/model/sociedadModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

declare var $: any;

@Component({
  selector: 'app-m-sociedad',
  templateUrl: './m-sociedad.component.html',
  styleUrls: ['./m-sociedad.component.scss'],
  providers: [RestService, MessageService]
})
export class MSociedadComponent implements OnInit {

  // Objetos de Sesion
  sesion: any;
  clienteFiltro: any;
  servidorFiltro: any;
  sociedadFiltro: any;

  // Objetos de datos
  sociedad: Sociedad;
  esNuevoSociedad: boolean;

  listaClientesTemp: any[];
  listaServidorTemp: any[];
  listaSociedadesTemp: any[];

  listaClientes: any[];
  listaServidor: any[];
  listaSociedades: any[];

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
    this.consultarClientes();
    this.consultarServidores();
    this.enumEstado = this.enums.estado.valores;
    this.sociedad = this.objectModelInitializer.getDataSociedad();
    this.sociedad.estado = this.util.getValorEnumerado(this.enumEstado, 1);
    this.esNuevoSociedad = true;
    if (this.sesionService.objSociedadCargado !== undefined && this.sesionService.objSociedadCargado !== null && this.sesionService.objSociedadCargado.id > 0) {
      this.sociedad = this.sesionService.objSociedadCargado;
      this.sociedad.estado = this.util.getValorEnumerado(this.enumEstado, this.sociedad.estado);
      this.esNuevoSociedad = false;
      console.log(this.sociedad.cliente);
      this.clienteFiltro = { value: this.sociedad.cliente, label: this.sociedad.cliente.nombre};
      this.servidorFiltro = { value: this.sociedad.servidor, label: this.sociedad.servidor.ip};
      this.cargarSociedadXClientes(this.clienteFiltro.value.id);
    }else{
      this.clienteFiltro = { value: this.objectModelInitializer.getDataCliente(), label: this.msg.lbl_enum_generico_valor_vacio };
      this.servidorFiltro = { value: this.objectModelInitializer.getDataServidor(), label: this.msg.lbl_enum_generico_valor_vacio };
    }
  }

  crearSociedad() {
    try {
      this.sociedad.cliente=this.clienteFiltro.value;
      this.sociedad.servidor=this.servidorFiltro.value;
      this.sociedad.estado = this.sociedad.estado.value;
      this.sociedad.usuarioCreacion=localStorage.getItem("cedula");
      this.sociedad.usuarioActualizacion=localStorage.getItem("cedula");
      this.restService.postREST(this.const.urlCrearSociedad, this.sociedad)
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
            this.sociedad.estado = this.util.getValorEnumerado(this.enumEstado, this.sociedad.estado);

            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  modificarSociedad() {
    try {
      this.sociedad.cliente=this.clienteFiltro.value;
      this.sociedad.servidor=this.servidorFiltro.value;
      this.sociedad.estado = this.sociedad.estado.value;
      this.sociedad.quienFacturar=this.sociedadFiltro.value.id;
      this.sociedad.usuarioActualizacion=localStorage.getItem("cedula");
      this.restService.putREST(this.const.urlModificarSociedad, this.sociedad)
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
            this.sociedad.estado = this.util.getValorEnumerado(this.enumEstado, this.sociedad.estado);
            if (this.sociedad.estado === 0) {
              this.sociedad.estado = 1;
            }

            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  eliminarPerfil() {
    this.sociedad.estado = 0;
    this.modificarSociedad();
  }

  volverConsulta() {
    this.router.navigate(['/q-sociedad']);
  }

  consultarClientes() {
    try {
      this.listaClientes = [];
      this.restService.getREST(this.const.urlConsultarClienteActiva)
        .subscribe(resp => {
          let temp: Cliente[] = JSON.parse(JSON.stringify(resp));
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
    setTimeout(() => this.activarCambiosClientes(), 1000);
  }

  activarCambiosClientes() {
    this.listaClientes = [];
    this.listaClientes.push({ value: this.objectModelInitializer.getDataCliente(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaClientesTemp.forEach(cliente => {
      this.listaClientes.push({ value: cliente, label: cliente.nombre });
    });
    
  }

  consultarServidores() {
    try {
      this.listaServidor = [];
      this.restService.getREST(this.const.urlConsultarServidorActiva)
        .subscribe(resp => {
          let temp: Servidor[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaServidorTemp= temp;
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
    setTimeout(() => this.activarCambiosServidores(), 1000);
  }

  activarCambiosServidores() {
    this.listaServidor = [];
    this.listaServidor.push({ value: this.objectModelInitializer.getDataServidor(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaServidorTemp.forEach(servidor => {
      this.listaServidor.push({ value: servidor, label: servidor.ip });
    });
    
  }

  cargarSociedadXClientes(id:Number) {
    this.listaSociedades = [];
    this.listaSociedadesTemp = [];
    this.clienteFiltro.id = id;
    try {
      let request: RequestSociedadXCliente = this.objectModelInitializer.getDataRequestSociedadXCliente();
      request.idCliente = this.clienteFiltro.id;
      this.restService.postREST(this.const.urlConsultarSociedadXClienteActiva, request)
        .subscribe(resp => {
          let temp: Sociedad[] = JSON.parse(JSON.stringify(resp));
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
    setTimeout(() => this.activarCambiosSociedad(), 1000);
  }
  activarCambiosSociedad() {
    let encontrado:Boolean = false;
    this.listaSociedades = [];
    this.listaSociedades.push({ value: this.objectModelInitializer.getDataSociedad(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaSociedadesTemp.forEach(sociedad => {
      this.listaSociedades.push({ value: sociedad, label: sociedad.nombre });
      if(sociedad.id== this.sociedad.quienFacturar){
        encontrado=true;
        this.sociedadFiltro ={ value: sociedad, label: sociedad.nombre };
      }
    });
    if(!encontrado){
      this.sociedadFiltro = this.listaSociedades[0];
    }
  }
}
