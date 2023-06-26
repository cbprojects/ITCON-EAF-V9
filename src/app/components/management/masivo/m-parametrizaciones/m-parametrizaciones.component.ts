import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { MasivoDTO } from 'src/app/model/dto/masivo-dto';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

declare var $: any;

@Component({
  selector: 'app-m-parametrizaciones',
  templateUrl: './m-parametrizaciones.component.html',
  styleUrls: ['./m-parametrizaciones.component.scss']
})
export class MParametrizacionesComponent implements OnInit {
  // Objetos de Sesion
  sesion: any;

  // Objetos de datos
  masivo: MasivoDTO;
  esNuevoMasivo: boolean;
  title: string;
  pathSplit: string;
  tipo: number;

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
    let url = window.location.href;
    let urlSplit = url.split("/");
    this.pathSplit = urlSplit[urlSplit.length - 1];
    this.cargarTipoCrud();
    this.enumEstado = this.enums.estado.valores;
    this.masivo = this.objectModelInitializer.getDataMasivoDTO();
    this.esNuevoMasivo = true;
    this.masivo.estado = this.util.getValorEnumerado(this.enumEstado, 1);
    if (this.sesionService.objParamMasivoCargado !== undefined && this.sesionService.objParamMasivoCargado !== null && this.sesionService.objParamMasivoCargado.idMasivo > 0) {
      this.masivo = this.sesionService.objParamMasivoCargado;
      this.masivo.estado = this.util.getValorEnumerado(this.enumEstado, this.masivo.estado);
      this.esNuevoMasivo = false;
    }
  }


  cargarTipoCrud() {
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
        this.tipo = 4;
        this.title = "Tipo Documental";
        break;
      case "sede":
        this.tipo = 5;
        this.title = "Sede";
        break;
    }
  }

  crearMasivo() {
    try {
      this.masivo.estado = this.masivo.estado.value;
      let requestMasivo = this.objectModelInitializer.getDataRequestMasivo();
      requestMasivo.tipoMasivo = this.tipo;
      requestMasivo.masivoDTO = this.masivo;
      this.restService.postREST(this.const.urlCrearMasivo, requestMasivo)
        .subscribe(resp => {
          let respuesta: MasivoDTO = JSON.parse(JSON.stringify(resp));
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
            this.masivo.estado = this.util.getValorEnumerado(this.enumEstado, this.masivo.estado);

            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  modificarMasivo() {
    try {
      this.masivo.estado = this.masivo.estado.value;
      let requestMasivo = this.objectModelInitializer.getDataRequestMasivo();
      requestMasivo.tipoMasivo = this.tipo;
      requestMasivo.masivoDTO = this.masivo;
      this.restService.putREST(this.const.urlModificarMasivo, requestMasivo)
        .subscribe(resp => {
          let respuesta: MasivoDTO = JSON.parse(JSON.stringify(resp));
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
            this.masivo.estado = this.util.getValorEnumerado(this.enumEstado, this.masivo.estado);
            if (this.masivo.estado === 0) {
              this.masivo.estado = 1;
            }

            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  eliminarMasivo() {
    this.masivo.estado = 0;
    this.modificarMasivo();
  }

  volverConsulta() {
    this.router.navigate([`/q-parametrizacion/${this.pathSplit}`]);
  }
}
