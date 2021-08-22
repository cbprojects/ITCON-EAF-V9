import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { Perfil } from 'src/app/model/perfilModel';
import { RequestConsultaUsuario } from 'src/app/model/requestConsultaUsuarioModel';
import { ResponseConsultaUsuario } from 'src/app/model/responseConsultaUsuarioModel';
import { Usuario } from 'src/app/model/usuarioModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './q-usuario.component.html',
  styleUrls: ['./q-usuario.component.scss']
})
export class QUsuarioComponent implements OnInit {
  @ViewChild('sc') sc;
  // Objetos de Sesion
  sesion: any;

  //Obj de datos
  usuarioFiltro: Usuario;
  listaUsuarios: Usuario[] = [];
  listaPerfiles: Perfil[] = [];

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
    this.rows = this.enumRows[0];
  }

  ngOnInit(): void {
    this.inicializar();
  }

  inicializar() {
    this.usuarioFiltro = this.objectModelInitializer.getDataUsuario();
    this.sesionService.objUsuarioCargado = null;
    this.listarPerfilesActivos();
    this.consultarUsuarios(0);
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

  consultarUsuarios(primerItem) {
    this.listaUsuarios = [];
    this.loading = true;
    try {
      let requestUsuarioFiltro: RequestConsultaUsuario = this.objectModelInitializer.getDataRequestConsultarUsuario();
      //usuarioFiltro = this.objectModelInitializer.getDataUsuario();
      requestUsuarioFiltro.usuario = this.objectModelInitializer.getDataUsuario();
      requestUsuarioFiltro.usuario = this.usuarioFiltro;
      requestUsuarioFiltro.registroInicial = primerItem;
      requestUsuarioFiltro.cantidadRegistro = this.rows;
      this.restService.postREST(this.const.urlConsultarUsuariosPorFiltros, requestUsuarioFiltro)
        .subscribe(resp => {
          let temp: ResponseConsultaUsuario = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.resultado.length > 0) {
            this.listaUsuarios = temp.resultado;
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

  cargarUsuario(usuario: Usuario) {
    this.sesionService.objUsuarioCargado = this.objectModelInitializer.getDataUsuario();
    this.sesionService.objUsuarioCargado = usuario;
    this.sesionService.objUsuarioCargado.celular = this.util.isBlank(this.sesionService.objUsuarioCargado.celular) ? '' : this.util.desencriptarAES(this.sesionService.objUsuarioCargado.celular.trim(), this.const.passwordAES);
    this.sesionService.objUsuarioCargado.direccion = this.util.isBlank(this.sesionService.objUsuarioCargado.celular) ? '' : this.util.desencriptarAES(this.sesionService.objUsuarioCargado.direccion.trim(), this.const.passwordAES);
    //this.sesionService.objUsuarioCargado.contrasena = this.util.desencriptarAES(this.sesionService.objUsuarioCargado.contrasena.trim(), this.const.passwordAES);
    this.sesionService.objUsuarioCargado.email = this.sesionService.objUsuarioCargado.email.trim();

    this.router.navigate(['/m-usuario']);
  }

  cargarTabla(event: LazyLoadEvent) {
    setTimeout(() => {
      this.consultarUsuarios(event.first);
    }, 1000);
  }

  posicionarAbajo() {
    let sc = this.sc;
    setTimeout(function () {
      sc.scrollTop(sc.containerViewChild.nativeElement.offsetHeight);
    }, 200);
  }

}
