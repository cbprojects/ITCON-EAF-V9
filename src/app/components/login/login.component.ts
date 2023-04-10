import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { UsuarioDTO } from 'src/app/model/dto/usuario-dto';
import { Usuario } from 'src/app/model/usuarioModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Objetos de Sesion
  sesion: any;

  // Objetos de datos
  verLogin: boolean = true;
  usuarioLogin: Usuario;
  usuarioReset: Usuario;

  // Utilidades
  msg: any;
  const: any;
  enumEstado: any;
  enums: any;
  value2: any;

  constructor(private router: Router, private route: ActivatedRoute, public restService: RestService, public textProperties: TextProperties, public util: Util, public objectModelInitializer: ObjectModelInitializer, public enumerados: Enumerados, public sesionService: SesionService, private messageService: MessageService) {
    this.sesion = this.objectModelInitializer.getDataServiceSesion();
    this.msg = this.textProperties.getProperties(this.sesionService.objServiceSesion.idioma);
    this.const = this.objectModelInitializer.getConst();
    this.enums = this.enumerados.getEnumerados();
  }

  ngOnInit() {
    localStorage.clear();
    this.usuarioLogin = this.objectModelInitializer.getDataUsuario();
    this.usuarioReset = this.objectModelInitializer.getDataUsuario();
  }

  mostrarRegister() {
    this.verLogin = false;
  }

  mostrarLogin() {
    this.verLogin = true;
  }

  login() {
    if (this.usuarioLogin.email !== undefined && this.usuarioLogin.email !== null && this.usuarioLogin.email !== '' && this.usuarioLogin.email !== ' ' && this.usuarioLogin.contrasena !== undefined && this.usuarioLogin.contrasena !== null && this.usuarioLogin.contrasena !== '' && this.usuarioLogin.contrasena !== ' ') {
      try {
        this.restService.postREST(this.const.urlLoginUsuario, this.usuarioLogin)
          .subscribe(resp => {
            let respuesta: UsuarioDTO = JSON.parse(JSON.stringify(resp));
            if (respuesta !== null) {
              this.sesionService.objServiceSesion.usuarioSesion = this.objectModelInitializer.getDataDTOUsuario();
              this.sesionService.objServiceSesion.usuarioSesion=respuesta;
              this.sesionService.objServiceSesion.usuarioSesion.esAdmin = true;
              localStorage.setItem('usuarioSesion', JSON.stringify(this.sesionService.objServiceSesion.usuarioSesion));
              localStorage.setItem('cedula', respuesta.usuario.documento);
              localStorage.setItem('idUser', JSON.stringify(respuesta.usuario.id));
              this.router.navigate(['/home']);  
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
    else {
      this.messageService.clear();
      this.messageService.add({ severity: this.const.severity[2], summary: this.msg.lbl_summary_warning, detail: this.msg.lbl_llenar_datos, sticky: true });
    }
  }

  recordarClave() {
    if (this.usuarioReset.email !== undefined && this.usuarioReset.email !== null && this.usuarioReset.email !== '' && this.usuarioReset.email !== ' ') {
      if (this.util.validarEstructuraEmail(this.usuarioReset.email)) {
        try {
          this.restService.postREST(this.const.urlRestaurarClave, this.usuarioReset)
            .subscribe(resp => {
              let respuesta: Usuario = JSON.parse(JSON.stringify(resp));
              if (respuesta !== null) {
                // Mostrar mensaje exitoso y consultar de nuevo
                this.messageService.clear();
                this.messageService.add({ severity: this.const.severity[1], summary: this.msg.lbl_summary_succes, detail: this.msg.lbl_info_proceso_completo, sticky: true });
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
      } else {
        this.messageService.clear();
        this.messageService.add({ severity: this.const.severity[2], summary: this.msg.lbl_summary_warning, detail: this.msg.lbl_header_correo_invalido, sticky: true });
      }
    } else {
      this.messageService.clear();
      this.messageService.add({ severity: this.const.severity[2], summary: this.msg.lbl_summary_warning, detail: this.msg.lbl_llenar_datos, sticky: true });
    }
  }

}
