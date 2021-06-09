import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { RequestConsultaUsuario } from 'src/app/model/requestConsultaUsuarioModel';
import { ResponseConsultaUsuario } from 'src/app/model/responseConsultaUsuarioModel';
import { Usuario } from 'src/app/model/usuariolModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

@Component({
  selector: 'app-restaurar-clave',
  templateUrl: './restaurar-clave.component.html',
  styleUrls: ['./restaurar-clave.component.scss'],
  styles: [':host ::ng-deep .p-password input {width: 15rem}']
})
export class RestaurarClaveComponent implements OnInit {
  // Objetos de Sesion
  sesion: any;

  // Objetos de datos
  usuarioReset: Usuario;
  clave: string;
  confirmaClave: string;
  correoReset: string;
  mostrarFormulario: boolean;

  // Utilidades
  msg: any;
  const: any;
  enumEstado: any;
  listaRefPorcentajesUri: any[];

  constructor(private router: Router, private route: ActivatedRoute, public restService: RestService, public textProperties: TextProperties, public util: Util, public objectModelInitializer: ObjectModelInitializer, public enumerados: Enumerados, public sesionService: SesionService, private messageService: MessageService) {
    this.sesion = this.objectModelInitializer.getDataServiceSesion();
    this.msg = this.textProperties.getProperties(this.sesionService.objServiceSesion.idioma);
    this.const = this.objectModelInitializer.getConst();
    this.listaRefPorcentajesUri = this.util.cargarMatrizPorcentajeUri();
  }

  ngOnInit() {
    this.usuarioReset = this.objectModelInitializer.getDataUsuario();
    let userReset = sessionStorage.getItem('usuarioReset');
    if (userReset !== undefined && userReset !== null) {
      this.usuarioReset = JSON.parse(userReset);
      this.mostrarFormulario = true;
    } else {
      let URLactual = window.location.href;
      let URLTransformada = this.util.transformarSimboloUri(URLactual, this.listaRefPorcentajesUri);
      if (URLTransformada.split('?').length === 2) {
        let variableITCON = URLTransformada.split("#")[1].split("?")[1].split("=")[0];
        let correoUsuario: string = URLTransformada.split("#")[1].split("?")[1].split("=")[1];
        this.correoReset = correoUsuario;
        if (this.correoReset !== undefined && this.correoReset !== null && variableITCON === this.const.tokenRecordarClave) {
          this.consultarUsuarioPorEmail();
        } else {
          this.router.navigate(['/login']);
        }
      }
    }
  }

  consultarUsuarioPorEmail() {
    try {
      let requestUsuarioFiltro: RequestConsultaUsuario = this.objectModelInitializer.getDataRequestConsultarUsuario();
      let usuarioFiltro = this.objectModelInitializer.getDataUsuario();
      usuarioFiltro.email = this.correoReset;
      requestUsuarioFiltro.usuario = usuarioFiltro;
      requestUsuarioFiltro.registroInicial = 0;
      requestUsuarioFiltro.cantidadRegistro = 10;
      this.restService.postREST(this.const.urlConsultarUsuariosPorFiltros, requestUsuarioFiltro)
        .subscribe(resp => {
          let temp: ResponseConsultaUsuario = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.resultado.length > 0) {
            this.usuarioReset = temp.resultado[0];
            sessionStorage.setItem('usuarioReset', JSON.stringify(this.usuarioReset));
            this.listaRefPorcentajesUri = [];
            this.router.navigate(['/restaurar-clave']);
            this.mostrarFormulario = true;
          } else {
            this.router.navigate(['/login']);
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

  tiene_minusculas(texto) {
    for (var index = 0; index < texto.length; index++) {
      var letraActual = texto.charAt(index);
      //validar que no sea un número
      if (isNaN(letraActual)) {
        if (letraActual === letraActual.toLowerCase()) {
          return true;
        }
      }
    }
    return false;
  }

  tiene_mayusculas(texto) {
    for (var index = 0; index < texto.length; index++) {
      var letraActual = texto.charAt(index);
      //validar que no sea un número
      if (isNaN(letraActual)) {
        if (letraActual === letraActual.toUpperCase()) {
          return true;
        }
      }
    }
    return false;
  }

  tiene_numero(texto) {
    var numeros = "0123456789";
    for (var i = 0; i < texto.length; i++) {
      if (numeros.indexOf(texto.charAt(i), 0) != -1) {
        return true;
      }
    }
    return false;
  }

  validarContrasena() {
    let bret = true;
    this.messageService.clear();
    if (this.clave !== undefined && this.clave !== null && this.confirmaClave !== undefined && this.confirmaClave !== null) {
      if (this.clave === this.confirmaClave) {
        if (this.clave.length < 8) {
          bret = false;
          this.messageService.add({ severity: this.const.severity[2], summary: this.msg.lbl_summary_warning, detail: this.msg.lbl_ochoCaract, sticky: true });
        }
        if (!this.tiene_minusculas(this.clave)) {
          bret = false;
          this.messageService.add({ severity: this.const.severity[2], summary: this.msg.lbl_summary_warning, detail: this.msg.lbl_unaMinus, sticky: true });
        }

        if (!this.tiene_mayusculas(this.clave)) {
          bret = false;
          this.messageService.add({ severity: this.const.severity[2], summary: this.msg.lbl_summary_warning, detail: this.msg.lbl_unaMayus, sticky: true });
        }

        if (!this.tiene_numero(this.clave)) {
          bret = false;
          this.messageService.add({ severity: this.const.severity[2], summary: this.msg.lbl_summary_warning, detail: this.msg.lbl_unNume, sticky: true });
        }

      } else {
        bret = false;
        this.messageService.add({ severity: this.const.severity[2], summary: this.msg.lbl_summary_warning, detail: this.msg.lbl_msg_claves_no_coinciden, sticky: true });
      }
    } else {
      bret = false;
      this.messageService.add({ severity: this.const.severity[2], summary: this.msg.lbl_summary_warning, detail: this.msg.lbl_llenar_datos, sticky: true });
    }
    return bret;
  }

  reestablecerClave() {
    try {
      if (this.validarContrasena()) {
        this.usuarioReset.contrasena = this.clave;
        this.restService.postREST(this.const.urlModificarUsuario, this.usuarioReset)
          .subscribe(resp => {
            let respuesta: Usuario = JSON.parse(JSON.stringify(resp));
            if (respuesta !== null) {
              // Mostrar mensaje exitoso y consultar comentarios de nuevo
              this.messageService.clear();
              this.messageService.add({ severity: this.const.severity[1], summary: this.msg.lbl_summary_succes, detail: this.msg.lbl_info_proceso_completo, sticky: true });
              //this.router.navigate(['/login']);
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
      }
    } catch (e) {
      console.log(e);
    }
  }

}
