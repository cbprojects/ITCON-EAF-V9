import { Injectable } from '@angular/core';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { ServiceSessionDTO } from 'src/app/model/dto/service-session-dto';
import { Perfil } from 'src/app/model/perfilModel';
import { Rol } from 'src/app/model/RolModel';
import { Usuario } from 'src/app/model/usuariolModel';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  // Fases
  objServiceSesion: ServiceSessionDTO;
  objRolCargado: Rol;
  objPerfilCargado: Perfil;
  objUsuarioCargado: Usuario;

  constructor(public objectModelInitializer: ObjectModelInitializer) {
    this.inicializar();
    if (sessionStorage.getItem('objServiceSesion') !== undefined && sessionStorage.getItem('objServiceSesion') !== null) {
      this.objServiceSesion = JSON.parse(sessionStorage.getItem('objServiceSesion'));
    }
  }

  inicializar() {
    this.objServiceSesion = this.objectModelInitializer.getDataServiceSesion();
    this.objServiceSesion.phase = undefined;
    this.objServiceSesion.usuarioSesion = undefined;
    this.objServiceSesion.usuarioRegister = undefined;
    this.objServiceSesion.tokenSesion = undefined;
    this.objServiceSesion.decodedToken = undefined;
    this.objServiceSesion.expirationDate = undefined;
    this.objServiceSesion.mensajeError403 = undefined;
    this.objServiceSesion.mensajeError404 = undefined;
    this.objServiceSesion.mensajeError500 = undefined;
    this.objServiceSesion.mensajeConfirmacion = undefined;
    this.objServiceSesion.idioma = this.objectModelInitializer.getConst().idiomaEs;
  }

  getUsuarioSesionActual() {
    let result = null;
    if (typeof this.objServiceSesion.usuarioSesion !== 'undefined' && this.objServiceSesion.usuarioSesion !== null) {
      result = this.objServiceSesion.usuarioSesion;
    }
    return result;
  }

  isSesionActiva() {

  }

  tienePermisos(URLactual: String) {
    let resultTienePermisos = false;
    if (this.objServiceSesion.usuarioSesion.usuarioTB !== undefined && this.objServiceSesion.usuarioSesion.usuarioTB !== null && this.objServiceSesion.usuarioSesion.listaRolesTB !== undefined && this.objServiceSesion.usuarioSesion.listaRolesTB !== null) {
      for (let i in this.objServiceSesion.usuarioSesion.listaRolesTB) {
        let rolUsuario = this.objServiceSesion.usuarioSesion.listaRolesTB[i];

        if (!URLactual.includes("dashboard")) {
          resultTienePermisos = true;
          break;
        }
        else {
          resultTienePermisos = true;
          break;
        }
      }
    }

    return resultTienePermisos;
  }
}
