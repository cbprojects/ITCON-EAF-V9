import { Injectable } from '@angular/core';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { Bodega } from 'src/app/model/bodegaModel';
import { BodegaPermisos } from 'src/app/model/bodegaPermisosModel';
import { Caja } from 'src/app/model/cajaModel';
import { MasivoDTO } from 'src/app/model/dto/masivo-dto';
import { ServiceSessionDTO } from 'src/app/model/dto/service-session-dto';
import { Perfil } from 'src/app/model/perfilModel';
import { Proyecto } from 'src/app/model/proyectoModel';
import { Rol } from 'src/app/model/rolModel';
import { SociedadArea } from 'src/app/model/sociedadAreaModel';
import { Sociedad } from 'src/app/model/sociedadModel';
import { UnidadDocumental } from 'src/app/model/unidadDocumentalModel';
import { UsuarioCliente } from 'src/app/model/usuarioClienteModel';
import { Usuario } from 'src/app/model/usuarioModel';
import { UsuarioSede } from 'src/app/model/usuarioSedeModel';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  // Fases
  objServiceSesion!: ServiceSessionDTO;
  objRolCargado!: Rol;
  objPerfilCargado!: Perfil;
  objSociedadCargado!: Sociedad;
  objSociedadAreaCargado!: SociedadArea;
  objUsuarioSedeCargado!: UsuarioSede;
  objUsuarioCargado!: Usuario;
  objCajaCargado!: Caja;
  objUnidadDocumentalCargada!: UnidadDocumental;
  objParamMasivoCargado!: MasivoDTO;
  objBodegaCargado!: Bodega;
  objBodegaPermisos!: BodegaPermisos;
  objProyectoCargado!: Proyecto;
  objUsuarioClienteCargado!: UsuarioCliente;

  constructor(public objectModelInitializer: ObjectModelInitializer) {
    this.inicializar();
    let storageObjSession = sessionStorage.getItem('objServiceSesion');
    if (storageObjSession) {
      this.objServiceSesion = JSON.parse(storageObjSession);
    }
  }

  inicializar() {
    this.objServiceSesion = this.objectModelInitializer.getDataServiceSesion();
    this.objServiceSesion.phase = undefined;
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
    if (this.objServiceSesion.usuarioSesion.usuario !== undefined && this.objServiceSesion.usuarioSesion.usuario !== null && this.objServiceSesion.usuarioSesion.listaRoles !== undefined && this.objServiceSesion.usuarioSesion.listaRoles !== null) {
      for (let i in this.objServiceSesion.usuarioSesion.listaRoles) {
        let rolUsuario = this.objServiceSesion.usuarioSesion.listaRoles[i];
        resultTienePermisos = true;
      }
    }

    return resultTienePermisos;
  }
}
