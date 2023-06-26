import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { Area } from 'src/app/model/areaModel';
import { Cliente } from 'src/app/model/clienteModel';
import { Proyecto } from 'src/app/model/proyectoModel';
import { RequestSociedadXCliente } from 'src/app/model/requestSociedadXCliente';
import { Sociedad } from 'src/app/model/sociedadModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

@Component({
  selector: 'app-m-proyecto',
  templateUrl: './m-proyecto.component.html',
  styleUrls: ['./m-proyecto.component.scss'],
  providers: [RestService, MessageService]
})
export class MProyectoComponent implements OnInit {
// Objetos de Sesion
sesion: any;
clienteFiltro: any;

sociedadFiltro: any;

// Objetos de datos
proyecto: Proyecto;
esNuevoProyecto: boolean;

listaClientesTemp: any[];

listaSociedadesTemp: any[];

listaClientes: any[];

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
  this.enumEstado = this.enums.estado.valores;
  this.proyecto = this.objectModelInitializer.getDataProyecto();
  this.proyecto.estado = this.util.getValorEnumerado(this.enumEstado, 1);
  this.esNuevoProyecto = true;
  if (this.sesionService.objProyectoCargado !== undefined && this.sesionService.objProyectoCargado !== null && this.sesionService.objProyectoCargado.id > 0) {
    this.proyecto = this.sesionService.objProyectoCargado;
    this.proyecto.estado = this.util.getValorEnumerado(this.enumEstado, this.proyecto.estado);
    this.esNuevoProyecto = false;
    this.clienteFiltro = { value: this.proyecto.sociedad.cliente, label: this.proyecto.sociedad.cliente.nombre};
    this.cargarSociedadXClientes(this.clienteFiltro.value.id);
    this.sociedadFiltro = { value: this.proyecto.sociedad, label: this.proyecto.sociedad.nombre};
  }else{
    this.clienteFiltro = { value: this.objectModelInitializer.getDataCliente(), label: this.msg.lbl_enum_generico_valor_vacio };
    
  }
}

crearProyecto() {
  try {
    this.proyecto.sociedad=this.sociedadFiltro.value;
    this.proyecto.estado = this.proyecto.estado.value;
    this.proyecto.usuarioCreacion=localStorage.getItem("cedula");
    this.proyecto.usuarioActualizacion=localStorage.getItem("cedula");
    this.restService.postREST(this.const.urlCrearProyecto, this.proyecto)
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
          this.proyecto.estado = this.util.getValorEnumerado(this.enumEstado, this.proyecto.estado);

          console.log(error, "error");
        })
  } catch (e) {
    console.log(e);
  }
}

modificarProyecto() {
  try {
    this.proyecto.sociedad=this.sociedadFiltro.value;
    this.proyecto.estado = this.proyecto.estado.value;
    this.proyecto.usuarioActualizacion=localStorage.getItem("cedula");
    this.restService.putREST(this.const.urlModificarProyecto, this.proyecto)
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
          this.proyecto.estado = this.util.getValorEnumerado(this.enumEstado, this.proyecto.estado);
          if (this.proyecto.estado === 0) {
            this.proyecto.estado = 1;
          }

          console.log(error, "error");
        })
  } catch (e) {
    console.log(e);
  }
}

eliminarSociedadArea() {
  this.proyecto.estado = 0;
  this.modificarProyecto();
}

volverConsulta() {
  this.router.navigate(['/q-proyecto']);
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
  if(this.esNuevoProyecto){
    this.sociedadFiltro = this.listaSociedades[0];
  }
}

}
