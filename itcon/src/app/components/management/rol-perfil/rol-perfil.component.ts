import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { Perfil } from 'src/app/model/perfilModel';
import { RequestConsultaPerfil } from 'src/app/model/requestConsultaPerfilModel';
import { RequestCrearRolPerfil } from 'src/app/model/requestCrearRolPerfilModel';
import { ResponseConsultaRol } from 'src/app/model/responseConsultaRolModel';
import { ResponseConsultaRolPerfil } from 'src/app/model/responseConsultaRolPerfilModel';
import { ResponseCrearRolPerfil } from 'src/app/model/responseCrearRolPerfilModel';
import { Rol } from 'src/app/model/RolModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

declare var $: any;

@Component({
  selector: 'app-rol-perfil',
  templateUrl: './rol-perfil.component.html',
  styleUrls: ['./rol-perfil.component.scss'],
  providers: [RestService, MessageService]
})
export class RolPerfilComponent implements OnInit {

  // Objetos de Sesion
  sesion: any;
  objPerfilCargado: Perfil

  // Objetos de datos
  codigoFiltro: any = "";
  descripcionFiltro: any = "";
  listaPerfiles: Perfil[] = [];
  sourceProducts: Rol[] = [];
  targetProducts: Rol[] = [];

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
    this.objPerfilCargado = null;
    this.consultarPerfiles(0);
  }

  cargarPerfil(perfil: Perfil) {
    this.objPerfilCargado = this.objectModelInitializer.getDataPerfil();
    this.objPerfilCargado = perfil;
    this.sourceProducts = [];
    this.targetProducts = [];
    try {
      let requestPerfil: Perfil = this.objPerfilCargado;
      this.restService.postREST(this.const.urlConsultarRolPerfil, requestPerfil)
        .subscribe(resp => {
          let temp: ResponseConsultaRolPerfil = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined) {
            if (temp.rolesAsociados.length > 0) {
              temp.rolesAsociados.forEach(rol => {
                this.targetProducts.push(rol);
              });
            }
            if (temp.rolesNoAsociados.length > 0) {
              temp.rolesNoAsociados.forEach(rol => {
                this.sourceProducts.push(rol);
              });
            }
            $($($($($('#asoRolPerfil')[0]).children()[0]).children()[0]).children()[0]).click();
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
  GuardarRolesPerfiles() {
    try {
      let requestCrearRolPerfil: RequestCrearRolPerfil = this.objectModelInitializer.getDataRequestCrearRolPerfil();
      requestCrearRolPerfil.perfil = this.objPerfilCargado;
      requestCrearRolPerfil.lstRoles = this.targetProducts;
      this.restService.postREST(this.const.urlCrearRolPerfil, requestCrearRolPerfil)
        .subscribe(resp => {
          let respuesta: ResponseCrearRolPerfil = JSON.parse(JSON.stringify(resp));
          if (respuesta !== null) {
            // Mostrar mensaje exitoso y consultar comentarios de nuevo
            this.messageService.clear();
            this.messageService.add({ severity: this.const.severity[1], summary: this.msg.lbl_summary_succes, detail: this.msg.lbl_info_proceso_completo, sticky: true });

            this.objPerfilCargado = null;
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

  consultarPerfilesPorFiltros() {
    this.listaPerfiles = [];
    try {
      let requestPerfilFiltro: RequestConsultaPerfil = this.objectModelInitializer.getDataRequestConsultarPerfil();
      let perfilFiltro = this.objectModelInitializer.getDataPerfil();
      perfilFiltro.codigo = this.codigoFiltro;
      perfilFiltro.descripcion = this.descripcionFiltro;
      requestPerfilFiltro.perfil = perfilFiltro;
      requestPerfilFiltro.registroInicial = "0";
      requestPerfilFiltro.cantidadRegistro = "5";
      this.restService.postREST(this.const.urlConsultarPerfilesPorFiltrosActivos, requestPerfilFiltro)
        .subscribe(resp => {
          let temp: ResponseConsultaRol = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.resultado.length > 0) {
            temp.resultado.forEach(perfil => {
              this.listaPerfiles.push(perfil);
            });
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

  consultarPerfiles(primerItem) {
    this.listaPerfiles = [];
    this.loading = true;
    try {
      let requestPerfilFiltro: RequestConsultaPerfil = this.objectModelInitializer.getDataRequestConsultarPerfil();
      let perfilFiltro = this.objectModelInitializer.getDataPerfil();
      perfilFiltro.codigo = this.codigoFiltro;
      perfilFiltro.descripcion = this.descripcionFiltro;
      requestPerfilFiltro.perfil = perfilFiltro;
      requestPerfilFiltro.registroInicial = primerItem;
      requestPerfilFiltro.cantidadRegistro = this.rows;
      this.restService.postREST(this.const.urlConsultarPerfilesPorFiltrosActivos, requestPerfilFiltro)
        .subscribe(resp => {
          let temp: ResponseConsultaRol = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.resultado.length > 0) {
            this.listaPerfiles = [];
            temp.resultado.forEach(perfil => {
              this.listaPerfiles.push(perfil);
            });
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
