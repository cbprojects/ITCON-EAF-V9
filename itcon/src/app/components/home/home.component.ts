import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../.././services/rest.service';
import { MessageService } from 'primeng/api';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { Enumerados } from 'src/app/config/Enumerados';
import { SesionService } from 'src/app/services/sesionService/sesion.service';
import { Dashboard } from 'src/app/model/dashboardModel';

declare var $: any;
declare var chartDevelopmentActivity: any;
declare var chartDonut: any;
declare var chartPie: any;
declare var chartBgUsers1: any;
declare var chartBgUsers2: any;
declare var chartBgUsers3: any;
declare var chartBgUsers4: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [RestService, MessageService]
})

export class HomeComponent implements OnInit {
  // Objetos de Sesion
  sesion: any;
  dashboardModel: Dashboard;

  // Objetos de datos

  // Utilidades
  msg: any;
  const: any;

  constructor(private router: Router, private route: ActivatedRoute, public restService: RestService, public textProperties: TextProperties, public util: Util, public objectModelInitializer: ObjectModelInitializer, public enumerados: Enumerados, public sesionService: SesionService, private messageService: MessageService) {
    this.sesion = this.objectModelInitializer.getDataServiceSesion();
    this.msg = this.textProperties.getProperties(this.sesionService.objServiceSesion.idioma);
    this.const = this.objectModelInitializer.getConst();
  }

  ngOnInit() {
    this.inicializar();
  }

  ngOnDestroy() {
  }

  inicializar() {
    chartDevelopmentActivity();
    chartDonut();
    chartPie();
    chartBgUsers1();
    chartBgUsers2();
    chartBgUsers3();
    chartBgUsers4();
    $('.datatable').DataTable();
    this.sesionService.objRolCargado = null;
    this.cargarDashboard();
  }

  cargarDashboard() {
    try {
      let request = { idUser: this.sesionService.objServiceSesion.usuarioSesion.usuario };
      let box = this.objectModelInitializer.getDataBox();
      console.log(box);
      let chart = this.objectModelInitializer.getDataChart();
      console.log(chart);
      let persona = this.objectModelInitializer.getDataPersona();
      console.log(persona);
      let factura = this.objectModelInitializer.getDataFactura();
      console.log(factura);
      let ejemploResponse = this.objectModelInitializer.getDataDashboardModel();
      console.log(ejemploResponse);
      this.restService.postREST(this.const.urlCargarDashboard, request)
        .subscribe(resp => {
          let respuesta: Dashboard = JSON.parse(JSON.stringify(resp));
          if (respuesta !== null) {
            this.dashboardModel = respuesta;
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
}