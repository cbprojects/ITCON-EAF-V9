import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { Area } from 'src/app/model/areaModel';
import { Cliente } from 'src/app/model/clienteModel';
import { RequestConsultaSociedadArea } from 'src/app/model/requestConsultaSociedadAreaModel';
import { RequestSociedadXCliente } from 'src/app/model/requestSociedadXCliente';
import { ResponseConsultaSociedadArea } from 'src/app/model/responseConsultaSociedadAreaModel';
import { SociedadArea } from 'src/app/model/sociedadAreaModel';
import { Sociedad } from 'src/app/model/sociedadModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

@Component({
  selector: 'app-q-sociedad-area',
  templateUrl: './q-sociedad-area.component.html',
  styleUrls: ['./q-sociedad-area.component.scss'],
  providers: [RestService, MessageService]
})
export class QSociedadAreaComponent implements OnInit {
  @ViewChild('sc') sc;
  // Objetos de Sesion
  sesion: any;

  // Objetos de datos
  clienteFiltro: any;
  sociedadFiltro: any;
  areasFiltro: any;
  listaSociedadesAreas: SociedadArea[];

  listaClientesTemp: any[];
  listaSociedadesTemp: any[];
  listaAreasTemp: any[];

  listaClientes: any[];
  listaSociedades: any[];
  listaAreas: any[];

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
    this.sesionService.objSociedadAreaCargado = null;
    this.clienteFiltro = { value: this.objectModelInitializer.getDataCliente(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.sociedadFiltro = { value: this.objectModelInitializer.getDataSociedad(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.areasFiltro = { value: this.objectModelInitializer.getDataArea(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.consultarSociedadesAreas(0);
    this.consultarClientes();
    this.consultarAreas();

  }

  cargarSociedadArea(sociedadArea: SociedadArea) {
    this.sesionService.objSociedadAreaCargado = this.objectModelInitializer.getDataSociedadArea();
    this.sesionService.objSociedadAreaCargado = sociedadArea;
    this.router.navigate(['/m-sociedad-area']);
  }

  consultarSociedadesAreas(primerItem) {
    this.listaSociedadesAreas = [];
    this.loading = true;
    try {
      let requestSociedadFiltro: RequestConsultaSociedadArea = this.objectModelInitializer.getDataRequestConsultarSociedadArea();
      let areaFiltro= this.objectModelInitializer.getDataArea();
      let sociedadFiltro = this.objectModelInitializer.getDataSociedad();
      let sociedadAreFiltro = this.objectModelInitializer.getDataSociedadArea();
      areaFiltro=this.areasFiltro.value;
      sociedadFiltro= this.sociedadFiltro.value;
      sociedadAreFiltro.area=areaFiltro;
      sociedadAreFiltro.sociedad=sociedadFiltro;
      requestSociedadFiltro.sociedadArea = this.objectModelInitializer.getDataSociedadArea()
      requestSociedadFiltro.sociedadArea = sociedadAreFiltro;
      requestSociedadFiltro.registroInicial = primerItem;
      requestSociedadFiltro.cantidadRegistro = this.rows;
      this.restService.postREST(this.const.urlConsultarSociedadAreasPorFiltro, requestSociedadFiltro)
        .subscribe(resp => {
          let temp: ResponseConsultaSociedadArea = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.resultado.length > 0) {
            this.listaSociedadesAreas = temp.resultado;
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
      this.consultarSociedadesAreas(event.first);
    }, 100);
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
    this.clienteFiltro = this.listaClientes[0];
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
    this.areasFiltro = this.listaAreas[0];
  }

  cargarSociedadXClientes(event) {
    this.listaSociedades = [];
    this.listaSociedadesTemp = [];
    this.clienteFiltro.id = event.value.id;
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
    this.sociedadFiltro = this.listaSociedades[0];
  }

}
