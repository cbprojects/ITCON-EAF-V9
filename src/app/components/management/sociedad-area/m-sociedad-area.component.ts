import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { Area } from 'src/app/model/areaModel';
import { Cliente } from 'src/app/model/clienteModel';
import { RequestSociedadXCliente } from 'src/app/model/request/requestSociedadXCliente';
import { SociedadArea } from 'src/app/model/sociedadAreaModel';
import { Sociedad } from 'src/app/model/sociedadModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

declare var $: any;

@Component({
  selector: 'app-m-sociedad-area',
  templateUrl: './m-sociedad-area.component.html',
  styleUrls: ['./m-sociedad-area.component.scss'],
  providers: [RestService, MessageService]
})
export class MSociedadAreaComponent implements OnInit {

  // Objetos de Sesion
  sesion: any;
  clienteFiltro: any;
  areasFiltro: any;
  sociedadFiltro: any;

  // Objetos de datos
  sociedadArea: SociedadArea;
  esNuevoSociedadArea: boolean;

  listaClientesTemp: any[];
  listaAreasTemp: any[];
  listaSociedadesTemp: any[];

  listaClientes: any[];
  listaAreas: any[];
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
    this.consultarAreas();
    this.enumEstado = this.enums.estado.valores;
    this.sociedadArea = this.objectModelInitializer.getDataSociedadArea();
    this.sociedadArea.estado = this.util.getValorEnumerado(this.enumEstado, 1);
    this.esNuevoSociedadArea = true;
    if (this.sesionService.objSociedadAreaCargado !== undefined && this.sesionService.objSociedadAreaCargado !== null && this.sesionService.objSociedadAreaCargado.id > 0) {
      this.sociedadArea = this.sesionService.objSociedadAreaCargado;
      this.sociedadArea.estado = this.util.getValorEnumerado(this.enumEstado, this.sociedadArea.estado);
      this.esNuevoSociedadArea = false;
      this.clienteFiltro = { value: this.sociedadArea.sociedad.cliente, label: this.sociedadArea.sociedad.cliente.nombre};
      this.areasFiltro = { value: this.sociedadArea.area, label: this.sociedadArea.area.nombre};
      this.cargarSociedadXClientes(this.clienteFiltro.value.id);
      this.sociedadFiltro = { value: this.sociedadArea.sociedad, label: this.sociedadArea.sociedad.nombre};
    }else{
      this.clienteFiltro = { value: this.objectModelInitializer.getDataCliente(), label: this.msg.lbl_enum_generico_valor_vacio };
      this.areasFiltro = { value: this.objectModelInitializer.getDataArea(), label: this.msg.lbl_enum_generico_valor_vacio };
      
    }
  }

  crearSociedadArea() {
    try {
      this.sociedadArea.sociedad=this.sociedadFiltro.value;
      this.sociedadArea.area=this.areasFiltro.value;
      this.sociedadArea.estado = this.sociedadArea.estado.value;
      this.sociedadArea.usuarioCreacion=localStorage.getItem("cedula");
      this.sociedadArea.usuarioActualizacion=localStorage.getItem("cedula");
      this.restService.postREST(this.const.urlCrearSociedadArea, this.sociedadArea)
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
            this.sociedadArea.estado = this.util.getValorEnumerado(this.enumEstado, this.sociedadArea.estado);

            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  modificarSociedadArea() {
    try {
      this.sociedadArea.sociedad=this.sociedadFiltro.value;
      this.sociedadArea.area=this.areasFiltro.value;
      this.sociedadArea.estado = this.sociedadArea.estado.value;
      this.sociedadArea.usuarioActualizacion=localStorage.getItem("cedula");
      this.restService.putREST(this.const.urlModificarSociedadArea, this.sociedadArea)
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
            this.sociedadArea.estado = this.util.getValorEnumerado(this.enumEstado, this.sociedadArea.estado);
            if (this.sociedadArea.estado === 0) {
              this.sociedadArea.estado = 1;
            }

            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  eliminarSociedadArea() {
    this.sociedadArea.estado = 0;
    this.modificarSociedadArea();
  }

  volverConsulta() {
    this.router.navigate(['/q-sociedad-area']);
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

  consultarAreas() {
    try {
      this.listaAreas = [];
      this.restService.getREST(this.const.urlConsultarAreasActivas)
        .subscribe(resp => {
          let temp: Area[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaAreasTemp= temp;
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

  activarCambiosAreas() {
    this.listaAreas = [];
    this.listaAreas.push({ value: this.objectModelInitializer.getDataArea(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaAreasTemp.forEach(area => {
      this.listaAreas.push({ value: area, label: area.nombre });
    });
    
  }

  cargarSociedadXClientes(id:Number) {
    this.sociedadFiltro = { value: this.objectModelInitializer.getDataSociedad(), label: this.msg.lbl_enum_generico_valor_vacio };
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
    this.listaSociedades = [];
    this.listaSociedades.push({ value: this.objectModelInitializer.getDataSociedad(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaSociedadesTemp.forEach(sociedad => {
      this.listaSociedades.push({ value: sociedad, label: sociedad.nombre });
    });
    if(this.esNuevoSociedadArea){
      this.sociedadFiltro = this.listaSociedades[0];
    }
  }

}
