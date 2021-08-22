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
declare var chartsCircles: any;

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
    this.sesionService.objRolCargado = null;
    this.cargarDashboard();
  }

  cargarDashboard() {
    try {
      let url = this.const.urlCargarDashboard + this.sesionService.objServiceSesion.usuarioSesion.usuario.id;
      this.restService.getREST(url)
        .subscribe(resp => {
          let respuesta: Dashboard = JSON.parse(JSON.stringify(resp));
          if (respuesta !== null) {
            this.dashboardModel = respuesta;

            $('.datatable').DataTable();
            chartDevelopmentActivity(this.dashboardModel.chartTable1.data);
            chartDonut(this.dashboardModel.chartPie1.data);
            chartPie(this.dashboardModel.chartPie2.data);
            chartBgUsers1(this.dashboardModel.chartBox1.data);
            chartBgUsers2(this.dashboardModel.chartBox2.data);
            chartBgUsers3(this.dashboardModel.chartBox3.data);
            chartBgUsers4(this.dashboardModel.chartBox4.data);
            chartsCircles();
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

  urlImagenUsuario(rutaImagen) {
    return 'background-image: url(' + rutaImagen + ');';
  }

  colorBox(color) {
    return 'color: ' + color + ' !important;';
  }

  bgColorBox(color) {
    return 'background-color: ' + color + ' !important;';
  }

  bgColorAndProgressValueBox(color, valueProgress) {
    return 'background-color: ' + color + ' !important; width: ' + valueProgress + '%;';
  }

  valueOfPercentStr(value) {
    return Number.parseFloat(value.substring(0, value.length - 1));
  }

  calcPercent(value) {
    return Number.parseFloat(value.substring(1, value.length)) / 100;
  }

}