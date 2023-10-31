import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { Perfil } from 'src/app/model/perfilModel';
import { RequestConsultaPerfil } from 'src/app/model/request/requestConsultaPerfilModel';
import { ResponseConsultaPerfil } from 'src/app/model/response/responseConsultaPerfilModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

declare var $: any;

@Component({
  selector: 'app-q-perfiles',
  templateUrl: './q-perfiles.component.html',
  styleUrls: ['./q-perfiles.component.scss'],
  providers: [RestService, MessageService]
})
export class QPerfilesComponent implements OnInit {
  @ViewChild('sc') sc;

  // Objetos de Sesion
  sesion: any;

  // Objetos de datos
  codigoFiltro: any = "";
  descripcionFiltro: any = "";
  listaPerfiles: Perfil[];

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
    this.sesionService.objPerfilCargado = null;
    this.consultarPerfiles(0);
  }

  cargarPerfil(perfil: Perfil) {
    this.sesionService.objPerfilCargado = this.objectModelInitializer.getDataPerfil();
    this.sesionService.objPerfilCargado = perfil;
    this.router.navigate(['/m-perfil']);
  }

  consultarPerfiles(primerItem) {
    this.listaPerfiles = [];
    this.loading = true;
    try {
      let requestPerfilFiltro: RequestConsultaPerfil = this.objectModelInitializer.getDataRequestConsultarPerfil();
      let perfilFiltro = this.objectModelInitializer.getDataPerfil();
      perfilFiltro.codigo = this.codigoFiltro;
      perfilFiltro.descripcion = this.descripcionFiltro;
      requestPerfilFiltro.perfil = this.objectModelInitializer.getDataPerfil();
      requestPerfilFiltro.perfil = perfilFiltro;
      requestPerfilFiltro.registroInicial = primerItem;
      requestPerfilFiltro.cantidadRegistro = this.rows;
      this.restService.postREST(this.const.urlConsultarPerfilesPorFiltros, requestPerfilFiltro)
        .subscribe(resp => {
          let temp: ResponseConsultaPerfil = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.resultado.length > 0) {
            this.listaPerfiles = temp.resultado;
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
      this.consultarPerfiles(event.first);
    }, 100);
  }
}
