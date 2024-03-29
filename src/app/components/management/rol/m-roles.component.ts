import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { Rol } from 'src/app/model/rolModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

declare var $: any;

@Component({
  selector: 'app-m-roles',
  templateUrl: './m-roles.component.html',
  styleUrls: ['./m-roles.component.scss'],
  providers: [RestService, MessageService]
})
export class MRolesComponent implements OnInit {
  // Objetos de Sesion
  sesion: any;

  // Objetos de datos
  rol: Rol;
  esNuevoRol: boolean;

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
    this.rol = this.objectModelInitializer.getDataRol();
    this.esNuevoRol = true;
    this.rol.estado = this.util.getValorEnumerado(this.enumEstado, 1);
    if (this.sesionService.objRolCargado !== undefined && this.sesionService.objRolCargado !== null && this.sesionService.objRolCargado.id > 0) {
      this.rol = this.sesionService.objRolCargado;
      this.rol.estado = this.util.getValorEnumerado(this.enumEstado, this.rol.estado);
      this.esNuevoRol = false;
    }
  }

  crearRol() {
    try {
      this.rol.estado = this.rol.estado.value;
      this.restService.postREST(this.const.urlCrearRol, this.rol)
        .subscribe(resp => {
          let respuesta: Rol = JSON.parse(JSON.stringify(resp));
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
            this.rol.estado = this.util.getValorEnumerado(this.enumEstado, this.rol.estado);

            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  modificarRol() {
    try {
      this.rol.estado = this.rol.estado.value;
      this.restService.putREST(this.const.urlModificarRol, this.rol)
        .subscribe(resp => {
          let respuesta: Rol = JSON.parse(JSON.stringify(resp));
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
            this.rol.estado = this.util.getValorEnumerado(this.enumEstado, this.rol.estado);
            if (this.rol.estado === 0) {
              this.rol.estado = 1;
            }

            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  eliminarRol() {
    this.rol.estado = 0;
    this.modificarRol();
  }

  volverConsulta() {
    this.router.navigate(['/q-rol']);
  }
}
