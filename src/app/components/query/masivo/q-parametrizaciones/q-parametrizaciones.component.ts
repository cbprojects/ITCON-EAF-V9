import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { MasivoDTO } from 'src/app/model/dto/masivo-dto';
import { RequestConsultaMasivo } from 'src/app/model/masivo/requestConsultaMasivoModel';
import { ResponseConsultaMasivo } from 'src/app/model/masivo/responseConsultaMasivoModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

declare var $: any;
@Component({
  selector: 'app-q-parametrizaciones',
  templateUrl: './q-parametrizaciones.component.html',
  styleUrls: ['./q-parametrizaciones.component.scss']
})
export class QParametrizacionesComponent implements OnInit {
  // Objetos de Sesion
  sesion: any;

  // Objetos de datos
  masivoFiltro: MasivoDTO;
  listaParametrizacionesMasivo: MasivoDTO[];
  title: string;
  pathSplit: string;
  tipo: number;

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
    debugger
    let url = window.location.href;
    let urlSplit = url.split("/");
    this.pathSplit = urlSplit[urlSplit.length - 1];
    console.log(this.pathSplit);
    this.cargarTipoCrud();
    this.sesionService.objParamMasivoCargado = null;
    this.masivoFiltro = this.objectModelInitializer.getDataMasivoDTO();
    this.consultarParametrizaciones(0);
  }

  cargarTipoCrud() {
    console.log('Entro');
    switch (this.pathSplit) {
      case "area":
        this.tipo = 1;
        this.title = "Área";
        break;
      case "cliente":
        this.tipo = 2;
        this.title = "Cliente";
        break;
      case "contenedor":
        this.tipo = 3;
        this.title = "Contenedor";
        break;
      case "tipo-documental":
        console.log('Ingreso');
        this.tipo = 4;
        this.title = "Tipo Documental";
        break;
      case "sede":
        console.log('Ingreso sede');
        this.tipo = 5;
        this.title = "Sede";
        break;
    }
  }

  cargarParametrizacion(masivoDTO: MasivoDTO) {
    this.sesionService.objParamMasivoCargado = this.objectModelInitializer.getDataMasivoDTO();
    this.sesionService.objParamMasivoCargado = masivoDTO;
    this.router.navigate([`/m-parametrizacion/${this.pathSplit}`]);
  }

  consultarParametrizaciones(primerItem) {
    this.listaParametrizacionesMasivo = [];
    try {
      let requestMasivoFiltro: RequestConsultaMasivo = this.objectModelInitializer.getDataRequestConsultaMasivo();
      requestMasivoFiltro.tipoMasivo = this.tipo;
      requestMasivoFiltro.masivo = this.masivoFiltro;
      requestMasivoFiltro.registroInicial = primerItem;
      requestMasivoFiltro.cantidadRegistro = this.rows;
      console.log(requestMasivoFiltro);
      this.restService.postREST(this.const.urlConsultarMasivoPorFiltros, requestMasivoFiltro)
        .subscribe(resp => {
          let temp: ResponseConsultaMasivo = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.resultado.length > 0) {
            this.listaParametrizacionesMasivo = temp.resultado;
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
      this.consultarParametrizaciones(event.first);
    }, 100);
  }
}
