import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { Cliente } from 'src/app/model/clienteModel';
import { RequestConsultaSociedad } from 'src/app/model/requestConsultaSociedadModel';
import { ResponseConsultaSociedad } from 'src/app/model/responseConsultaSociedadModel';
import { Servidor } from 'src/app/model/servidorModel';
import { Sociedad } from 'src/app/model/sociedadModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

@Component({
  selector: 'app-q-sociedad',
  templateUrl: './q-sociedad.component.html',
  styleUrls: ['./q-sociedad.component.scss'],
  providers: [RestService, MessageService]
})
export class QSociedadComponent implements OnInit {
  @ViewChild('sc') sc;
  // Objetos de Sesion
  sesion: any;

  // Objetos de datos
  nombreFiltro: any = "";
  nombre10Filtro: any = "";
  taxFiltro: any = "";
  clienteFiltro: any;
  servidorFiltro: any;
  listaSociedades: Sociedad[];

  listaClientesTemp: any[];
  listaServidorTemp: any[];

  listaClientes: any[];
  listaServidor: any[];

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
    this.sesionService.objSociedadCargado = null;
    this.clienteFiltro = { value: this.objectModelInitializer.getDataCliente(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.servidorFiltro = { value: this.objectModelInitializer.getDataServidor(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.consultarSociedades(0);
    this.consultarClientes();
    this.consultarServidores();

  }

  cargarSociedad(sociedad: Sociedad) {
    this.sesionService.objSociedadCargado = this.objectModelInitializer.getDataSociedad();
    this.sesionService.objSociedadCargado = sociedad;
    this.router.navigate(['/m-sociedad']);
  }

  consultarSociedades(primerItem) {
    this.listaSociedades = [];
    this.loading = true;
    try {
      let requestSociedadFiltro: RequestConsultaSociedad = this.objectModelInitializer.getDataRequestConsultarSociedad();
      let sociedadFiltro = this.objectModelInitializer.getDataSociedad();
      sociedadFiltro.nombre = this.nombreFiltro;
      sociedadFiltro.nombre10 = this.nombre10Filtro;
      sociedadFiltro.tax= this.taxFiltro;
      sociedadFiltro.cliente= this.clienteFiltro.value;
      sociedadFiltro.servidor= this.servidorFiltro.value;
      requestSociedadFiltro.sociedad = this.objectModelInitializer.getDataSociedad();
      requestSociedadFiltro.sociedad = sociedadFiltro;
      requestSociedadFiltro.registroInicial = primerItem;
      requestSociedadFiltro.cantidadRegistro = this.rows;
      this.restService.postREST(this.const.urlConsultarSociedadPorFiltros, requestSociedadFiltro)
        .subscribe(resp => {
          let temp: ResponseConsultaSociedad = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.resultado.length > 0) {
            this.listaSociedades = temp.resultado;
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
      this.consultarSociedades(event.first);
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
    this.clienteFiltro = this.listaServidor[0];
  }
}
