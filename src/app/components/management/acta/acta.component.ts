import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { Acta } from 'src/app/model/actaModel';
import { RequestConsultaActa } from 'src/app/model/request/requestConsultaActaModel';
import { RequestConsultaRol } from 'src/app/model/request/requestConsultaRolModel';
import { RequestRecepcionAprobada } from 'src/app/model/request/requestRecepcionAprobadaModel';
import { ResponseConsultaActa } from 'src/app/model/response/responseConsultaActaModel';
import { ResponseConsultaRol } from 'src/app/model/response/responseConsultaRolModel';
import { ResponseModificarPrestamo } from 'src/app/model/response/responseModificarPrestamo';
import { Rol } from 'src/app/model/rolModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

@Component({
  selector: 'app-acta',
  templateUrl: './acta.component.html',
  styleUrls: ['./acta.component.scss'],
  providers: [RestService, MessageService]
})
export class ActaComponent implements OnInit {

  // Objetos de Sesion
  sesion: any;

  // Objetos de datos
  codigoFiltro: any = "";
  descripcionFiltro: any = "";
  listaActas: Acta[];
  actaApro:any;

  ingresoPrimer:boolean=true;

  // Utilidades
  msg: any;
  const: any;
  rows: any;
  enumRows: any;
  totalRecords: number;
  loading: boolean;
  enumEstado: any;
  enums: any;

  constructor(private router: Router, private route: ActivatedRoute, public restService: RestService, public textProperties: TextProperties, public util: Util, public objectModelInitializer: ObjectModelInitializer, public enumerados: Enumerados, public sesionService: SesionService, private messageService: MessageService) {
    this.sesion = this.objectModelInitializer.getDataServiceSesion();
    this.msg = this.textProperties.getProperties(this.sesionService.objServiceSesion.idioma);
    this.const = this.objectModelInitializer.getConst();
    this.enumRows = [5, 10, 15, 20, 50, 100];
    this.rows = this.enumRows[1];
    this.enums = this.enumerados.getEnumerados();
  }

  ngOnInit() {
    this.enumEstado = this.enums.actas.valores;
    this.listaActas = [];
  }

  ngOnDestroy() {
  }

  

  aprobarActa(acta: Acta) {
    if(acta.aprobada){
      acta.aprobada=false;
    }else{
      acta.aprobada=true;
    }
    try {
      let requestRecepcionAprobada: RequestRecepcionAprobada=this.objectModelInitializer.getDataRequestRecepcionAprobada();
      requestRecepcionAprobada.idUD=acta.id;
      requestRecepcionAprobada.aprobacion=acta.aprobada;
      this.restService.postREST(this.const.urlAprobacionActa,requestRecepcionAprobada)
        .subscribe(resp => {
          let temp: ResponseModificarPrestamo = JSON.parse(JSON.stringify(resp));
          let mensajeFinal;
          if (temp && temp.codigo === '0') {
            

            mensajeFinal = { severity: this.const.severity[1], summary: this.const.lbl_summary_success, detail: temp.mensaje, sticky: true };
          } else {
            mensajeFinal = { severity: this.const.severity[2], summary: this.const.lbl_summary_warning, detail: temp.mensaje, sticky: true };
          }

          this.messageService.clear();
          this.messageService.add(mensajeFinal);
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

  consultarActas(primerItem) {
    console.log("paso2");
    this.listaActas = [];
    try {
      let requestConsultaActa: RequestConsultaActa = this.objectModelInitializer.getRequestConsultarActa();
      requestConsultaActa.esAdmin=this.validarRol('ITCADM');
      requestConsultaActa.registroInicial = primerItem;
      requestConsultaActa.idUsuario=+localStorage.getItem("idUser");
      requestConsultaActa.tipoAprobado=this.actaApro.value;
      requestConsultaActa.cantidadRegistro = this.rows;
      this.restService.postREST(this.const.urlConsultarActaFiltros, requestConsultaActa)
        .subscribe(resp => {
          let temp: ResponseConsultaActa = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.resultado.length > 0) {
            this.listaActas = temp.resultado;
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
    console.log("paso");
    setTimeout(() => {
      if(this.ingresoPrimer){
        this.ingresoPrimer=false;
      }else{
      this.consultarActas(event.first);
      }
    }, 100);
  }

  validarRol(rol: string) {
    let validar = false;
    this.sesionService.objServiceSesion.usuarioSesion.listaRoles.forEach(roles => {
      if (!validar) {
        if (roles.codigo == rol) {
          validar = true;
        }
      }
    });
    return validar;
  }

}
