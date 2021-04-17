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
    this.perfil = this.objectModelInitializer.getDataRol();
    this.esNuevoPerfil = true;
    if (this.sesionService.objPerfilCargado !== undefined && this.sesionService.objPerfilCargado !== null && this.sesionService.objPerfilCargado.id > 0) {
      this.perfil = this.sesionService.objPerfilCargado;
      this.esNuevoPerfil = false;
    }
  }

  ngAfterViewChecked(): void {
    //$('ng-select').niceSelect();
    //$($('select#selectProceso').siblings()[1]).children()[0].innerHTML = this.contacto.procesoContacto.label;
    if (this.esNuevoPerfil) {
      //$('.card').bootstrapMaterialDesign();
    }
  }

  crearPerfil() {
    try {
      this.perfil.estado = 1;
      this.restService.postREST(this.const.urlCrearPerfil, this.perfil)
        .subscribe(resp => {
          let respuesta: Perfil = JSON.parse(JSON.stringify(resp));
          if (respuesta !== null) {
            // Mostrar mensaje exitoso y consultar comentarios de nuevo
            this.messageService.clear();
            this.messageService.add({ severity: this.const.severity[1], summary: this.msg.lbl_summary_succes, detail: this.msg.lbl_info_proceso_completo, sticky: true });

            this.ngOnInit();
            //$('.card').bootstrapMaterialDesign();
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

  modificarPerfil() {
    try {
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
