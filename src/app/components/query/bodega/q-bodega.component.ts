import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { Bodega } from 'src/app/model/bodegaModel';
import { RequestConsultaBodega } from 'src/app/model/requestConsultaBodegaModel';
import { ResponseConsultaBodega } from 'src/app/model/responseConsultaBodegaModel';
import { Sede } from 'src/app/model/sedeModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

@Component({
  selector: 'app-q-bodega',
  templateUrl: './q-bodega.component.html',
  styleUrls: ['./q-bodega.component.scss'],
  providers: [RestService, MessageService]
})
export class QBodegaComponent implements OnInit {

  @ViewChild('sc') sc;
  // Objetos de Sesion
  sesion: any;

  // Objetos de datos
  codigo: any;
  nombre: any;
  nombre10: any;
  sedeFiltro: any;
  listaBodegas: Bodega[];

  
  listaSedesTemp: any[];

  
  listaSedes: any[];

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

  ngOnInit(): void {
    this.inicializar();
  }

  inicializar() {
    this.sesionService.objUsuarioSedeCargado = null;
    this.sedeFiltro = { value: this.objectModelInitializer.getDataSede(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.consultarBodega(0);
    this.consultarSedes();

  }

  cargarBodega(bodega: Bodega) {
    this.sesionService.objBodegaCargado = this.objectModelInitializer.getDataBodega();
    this.sesionService.objBodegaCargado = bodega;
    this.router.navigate(['/m-bodega']);
  }

  consultarBodega(primerItem) {
    this.listaBodegas = [];
    this.loading = true;
    try {
      let requestConsultaBodega: RequestConsultaBodega = this.objectModelInitializer.getRequestConsultaBodega();
      let sedFiltro = this.objectModelInitializer.getDataSede();
      sedFiltro= this.sedeFiltro.value;
      requestConsultaBodega.idSede = sedFiltro.id;
      requestConsultaBodega.codigo =this.codigo;
      requestConsultaBodega.nombre =this.nombre;
      requestConsultaBodega.nombre10 =this.nombre10;
      requestConsultaBodega.registroInicial = primerItem;
      requestConsultaBodega.cantidadRegistro = this.rows;
      
      this.restService.postREST(this.const.urlConsultarBodegaFiltros, requestConsultaBodega)
        .subscribe(resp => {
          let temp: ResponseConsultaBodega = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.resultado.length > 0) {
            this.listaBodegas = temp.resultado;
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
      this.consultarBodega(event.first);
    }, 100);
  }

  

  consultarSedes() {
    try {
      this.listaSedes = [];
      this.restService.getREST(this.const.urlConsultarSedeActivos)
        .subscribe(resp => {
          let temp: Sede[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaSedesTemp= temp;
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
    setTimeout(() => this.activarCambiosSedes(), 1000);
  }

  activarCambiosSedes() {
    this.listaSedes = [];
    this.listaSedes.push({ value: this.objectModelInitializer.getDataSede(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaSedesTemp.forEach(sede => {
      this.listaSedes.push({ value: sede, label: sede.nombre });
    });
    this.sedeFiltro = this.listaSedes[0];
  }
}
