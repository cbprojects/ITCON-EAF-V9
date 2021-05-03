import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { RequestConsultaRol } from 'src/app/model/requestConsultaRolModel';
import { ResponseConsultaRol } from 'src/app/model/responseConsultaRolModel';
import { Rol } from 'src/app/model/RolModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

declare var $: any;

@Component({
  selector: 'app-q-roles',
  templateUrl: './q-roles.component.html',
  styleUrls: ['./q-roles.component.scss'],
  providers: [RestService, MessageService]
})
export class QRolesComponent implements OnInit {
  // Objetos de Sesion
  sesion: any;

  // Objetos de datos
  codigoFiltro: any = "";
  descripcionFiltro: any = "";
  listaRoles: Rol[];

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
    this.sesionService.objRolCargado = null;
    this.consultarRoles(0);
  }

  cargarRol(rol: Rol) {
    this.sesionService.objRolCargado = this.objectModelInitializer.getDataRol();
    this.sesionService.objRolCargado = rol;
    this.router.navigate(['/m-rol']);
  }

  consultarRoles(primerItem) {
    this.listaRoles = [];
    try {
      let requestRolFiltro: RequestConsultaRol = this.objectModelInitializer.getDataRequestConsultarRol();
      let rolFiltro = this.objectModelInitializer.getDataRol();
      rolFiltro.codigo = this.codigoFiltro;
      rolFiltro.descripcion = this.descripcionFiltro;
      requestRolFiltro.rol = this.objectModelInitializer.getDataRol();
      requestRolFiltro.rol = rolFiltro;
      requestRolFiltro.registroInicial = primerItem;
      requestRolFiltro.cantidadRegistro = this.rows;
      this.restService.postREST(this.const.urlConsultarRolesPorFiltros, requestRolFiltro)
        .subscribe(resp => {
          let temp: ResponseConsultaRol = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.resultado.length > 0) {
            this.listaRoles = temp.resultado;
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
      this.consultarRoles(event.first);
    }, 100);
  }
}
