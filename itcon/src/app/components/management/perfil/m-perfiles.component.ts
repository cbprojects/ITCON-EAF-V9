import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { Perfil } from 'src/app/model/perfilModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

declare var $: any;

@Component({
  selector: 'app-m-perfiles',
  templateUrl: './m-perfiles.component.html',
  styleUrls: ['./m-perfiles.component.scss'],
  providers: [RestService, MessageService]
})
export class MPerfilesComponent implements OnInit {
  // Objetos de Sesion
  sesion: any;

  // Objetos de datos
  perfil: Perfil;
  esNuevoPerfil: boolean;

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
    this.enumEstado = this.enums.estado.valores;
    this.perfil = this.objectModelInitializer.getDataPerfil();
    this.perfil.estado = this.util.getValorEnumerado(this.enumEstado, 1);
    this.esNuevoPerfil = true;
    if (this.sesionService.objPerfilCargado !== undefined && this.sesionService.objPerfilCargado !== null && this.sesionService.objPerfilCargado.id > 0) {
      this.perfil = this.sesionService.objPerfilCargado;
      this.perfil.estado = this.util.getValorEnumerado(this.enumEstado, this.perfil.estado);
      this.esNuevoPerfil = false;
    }
  }

  crearPerfil() {
    try {
      this.perfil.estado = this.perfil.estado.value;
      this.restService.postREST(this.const.urlCrearPerfil, this.perfil)
        .subscribe(resp => {
          let respuesta: Perfil = JSON.parse(JSON.stringify(resp));
          if (respuesta !== null) {
            // Mostrar mensaje exitoso y consultar comentarios de nuevo
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
            this.perfil.estado = this.util.getValorEnumerado(this.enumEstado, this.perfil.estado);

            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  modificarPerfil() {
    try {
      this.perfil.estado = this.perfil.estado.value;
      this.restService.putREST(this.const.urlModificarPerfil, this.perfil)
        .subscribe(resp => {
          let respuesta: Perfil = JSON.parse(JSON.stringify(resp));
          if (respuesta !== null) {
            // Mostrar mensaje exitoso y consultar comentarios de nuevo
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
            this.perfil.estado = this.util.getValorEnumerado(this.enumEstado, this.perfil.estado);
            if (this.perfil.estado === 0) {
              this.perfil.estado = 1;
            }

            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  eliminarPerfil() {
    this.perfil.estado = 0;
    this.modificarPerfil();
  }

  volverConsulta() {
    this.router.navigate(['/q-perfil']);
  }
}
