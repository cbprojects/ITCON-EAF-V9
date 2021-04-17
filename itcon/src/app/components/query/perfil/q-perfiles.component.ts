import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { Perfil } from 'src/app/model/perfilModel';
import { RequestConsultaPerfil } from 'src/app/model/requestConsultaPerfilModel';
import { ResponseConsultaPerfil } from 'src/app/model/ResponseConsultaPerfilModel';
import { Rol } from 'src/app/model/RolModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

declare var $: any;

@Component({
  selector: 'app-q-perfiles',
  templateUrl: './q-perfiles.component.html',
  styleUrls: ['./q-perfiles.component.scss'],
  providers: [RestService, MessageService]
})
export class QPerfilesComponent implements OnInit {
  // Objetos de Sesion
  sesion: any;

  // Objetos de datos
  codigoFiltro: any = "";
  descripcionFiltro: any = "";
  listaPerfiles: Perfil[] = [];

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

  ngAfterViewChecked(): void {
  }

  inicializar() {
    this.sesionService.objPerfilCargado = null;
    this.consultarPerfiles();
  }

  cargarPerfil(rol: Rol) {
    this.sesionService.objPerfilCargado = this.objectModelInitializer.getDataPerfil();
    this.sesionService.objPerfilCargado = rol;
    this.router.navigate(['/m-perfil']);
  }

  consultarPerfilesPorFiltros() {
    this.listaPerfiles = [];
    try {
      let requestPerfilFiltro: RequestConsultaPerfil = this.objectModelInitializer.getDataRequestConsultarPerfil();
      let perfilFiltro = this.objectModelInitializer.getDataPerfil();
      perfilFiltro.codigo = this.codigoFiltro;
      perfilFiltro.descripcion = this.descripcionFiltro;
      perfilFiltro.estado = 1;
      requestPerfilFiltro.perfil = perfilFiltro;
      requestPerfilFiltro.registroInicial = "0";
      requestPerfilFiltro.cantidadRegistro = "5";
      this.restService.postREST(this.const.urlConsultarPerfilesPorFiltros, requestPerfilFiltro)
        .subscribe(resp => {
          let temp: ResponseConsultaPerfil = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.resultado.length > 0) {
            temp.resultado.forEach(perfil => {
              if (perfil.estado === 1) {
                this.listaPerfiles.push(perfil);
              }
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

  consultarPerfiles() {
    this.listaPerfiles = [];
    try {
      let requestPerfilFiltro: RequestConsultaPerfil = this.objectModelInitializer.getDataRequestConsultarPerfil();
      requestPerfilFiltro.perfil = this.objectModelInitializer.getDataPerfil();
      requestPerfilFiltro.registroInicial = "0";
      requestPerfilFiltro.cantidadRegistro = "5";
      this.restService.postREST(this.const.urlConsultarPerfilesPorFiltros, requestPerfilFiltro)
        .subscribe(resp => {
          let temp: ResponseConsultaPerfil = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.resultado.length > 0) {
            temp.resultado.forEach(perfil => {
              if (perfil.estado === 1) {
                this.listaPerfiles.push(perfil);
              }
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
}
