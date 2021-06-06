import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { Perfil } from 'src/app/model/perfilModel';
import { Usuario } from 'src/app/model/UsuariolModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

@Component({
  selector: 'app-m-usuario.component',
  templateUrl: './m-usuario.component.html',
  styleUrls: ['./m-usuario.component.scss']
})
export class MUsuarioComponent implements OnInit {

  // Objetos de Sesion
  sesion: any;

  // Objetos de datos
  usuario: Usuario;
  esNuevoUsuario: boolean;
  confirmarContrasena: any
  listaPerfiles: Perfil[] = [];;

  // Utilidades
  msg: any;
  const: any;
  enumEstado: any;
  enumTipoDoc: any;
  enums: any;

  constructor(private router: Router, private route: ActivatedRoute, public restService: RestService, public textProperties: TextProperties, public util: Util, public objectModelInitializer: ObjectModelInitializer, public enumerados: Enumerados, public sesionService: SesionService, private messageService: MessageService) {
    this.sesion = this.objectModelInitializer.getDataServiceSesion();
    this.msg = this.textProperties.getProperties(this.sesionService.objServiceSesion.idioma);
    this.const = this.objectModelInitializer.getConst();
    this.enums = this.enumerados.getEnumerados();
  }

  ngOnInit(): void {
    this.inicializar();
  }

  inicializar() {
    this.listarPerfilesActivos();
    this.enumEstado = this.enums.estado.valores;
    this.enumTipoDoc = this.enums.tipoDocumento.valores;
    this.usuario = this.objectModelInitializer.getDataUsuario();
    this.esNuevoUsuario = true;
    this.usuario.estado = this.util.getValorEnumerado(this.enumEstado, 1);
    this.usuario.tipoDocumento = this.util.getValorEnumerado(this.enumTipoDoc, 1);
    if (this.sesionService.objUsuarioCargado !== undefined && this.sesionService.objUsuarioCargado !== null && this.sesionService.objUsuarioCargado.id > 0) {
      this.usuario = this.sesionService.objUsuarioCargado;
      this.usuario.tipoDocumento = this.util.getValorEnumerado(this.enumTipoDoc, this.usuario.tipoDocumento);
      this.usuario.estado = this.util.getValorEnumerado(this.enumEstado, this.usuario.estado);
      this.esNuevoUsuario = false;
    }
  }

  crearUsuario() {
    try {

      if (this.validaciones()) {
        this.usuario.tipoDocumento = this.usuario.tipoDocumento.value;
        this.usuario.estado = this.usuario.estado.value;
        this.restService.postREST(this.const.urlCrearUsuario, this.usuario)
          .subscribe(resp => {
            let respuesta: Usuario = JSON.parse(JSON.stringify(resp));
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
              this.usuario.estado = this.util.getValorEnumerado(this.enumEstado, this.usuario.estado);

              console.log(error, "error");
            })
      }
    } catch (e) {
      console.log(e);
    }
  }

  modificarUsuario() {
    try {
      this.usuario.tipoDocumento = this.usuario.tipoDocumento.value;
      this.usuario.estado = this.usuario.estado.value;
      if (this.validaciones()) {
        this.restService.putREST(this.const.urlModificarUsuario, this.usuario)
          .subscribe(resp => {
            let respuesta: Usuario = JSON.parse(JSON.stringify(resp));
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
              this.usuario.estado = this.util.getValorEnumerado(this.enumEstado, this.usuario.estado);
              if (this.usuario.estado === 0) {
                this.usuario.estado = 1;
              }

              console.log(error, "error");
            })
      }
    } catch (e) {
      console.log(e);
    }
  }

  listarPerfilesActivos() {
    this.listaPerfiles = [];
    try {
      this.restService.getREST(this.const.urlConsultarPerfilesActivos)
        .subscribe(resp => {
          this.listaPerfiles = JSON.parse(JSON.stringify(resp));
          this.listaPerfiles.unshift(this.objectModelInitializer.getDataPerfil());

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

  volverConsulta() {
    this.router.navigate(['/q-usuario']);
  }

  validaciones() {
    let bret = true;
    this.messageService.clear();
    //bret = this.confirmarContrasenia();
    if (this.util.isBlank(this.usuario.tipoDocumento)) {

      this.messageService.add({ severity: this.const.severity[3], summary: this.msg.lbl_summary_danger, detail: this.msg.lbl_validar_tipoDoc, sticky: true });
      bret = false;
    }
    if (this.util.isBlank(this.usuario.documento)) {
      this.messageService.add({ severity: this.const.severity[3], summary: this.msg.lbl_summary_danger, detail: this.msg.lbl_validar_documento, sticky: true });
      bret = false;
    }
    if (this.util.isBlank(this.usuario.nombre)) {
      this.messageService.add({ severity: this.const.severity[3], summary: this.msg.lbl_summary_danger, detail: this.msg.lbl_validar_nombre, sticky: true });
      bret = false;
    }
    if (this.util.isBlank(this.usuario.email)) {
      this.messageService.add({ severity: this.const.severity[3], summary: this.msg.lbl_summary_danger, detail: this.msg.lbl_validar_email, sticky: true });
      bret = false;
    }
    if (this.util.isBlank(this.usuario.perfil.codigo)) {
      this.messageService.add({ severity: this.const.severity[3], summary: this.msg.lbl_summary_danger, detail: this.msg.lbl_validar_perfil, sticky: true });
      bret = false;
    }
    if (this.usuario.estado.value == 0) {
      this.messageService.add({ severity: this.const.severity[3], summary: this.msg.lbl_summary_danger, detail: this.msg.lbl_validar_estado, sticky: true });
      bret = false;
    }

    return bret;
  }

  confirmarContrasenia() {
    let bRet = this.usuario.contrasena == this.confirmarContrasena;
    if (!bRet) {
      this.messageService.clear();
      this.messageService.add({ severity: this.const.severity[3], summary: this.msg.lbl_summary_danger, detail: this.msg.lbl_validar_contrasena, sticky: true });

    } else {
      this.messageService.clear();
    }
    return bRet;
  }
}
