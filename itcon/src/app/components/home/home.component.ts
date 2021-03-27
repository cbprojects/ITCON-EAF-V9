import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../.././services/rest.service';
import { MessageService } from 'primeng/api';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { Enumerados } from 'src/app/config/Enumerados';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

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
    localStorage.clear();
    sessionStorage.clear();
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
    this.sesionService.objContactoCargado = null;
  }

  ngAfterViewChecked(): void {
  }
}