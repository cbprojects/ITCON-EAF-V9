import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { Caja } from 'src/app/model/cajaModel';
import { Cliente } from 'src/app/model/clienteModel';
import { ResponseCambiarUnidadDocumentalMasivo } from 'src/app/model/response/responseCambiarUnidadDocumentalMasivoModel';
import { ResponseConsultarUnidadDocumentalMasivo } from 'src/app/model/response/responseConsultarUnidadDocumentalMasivoModel';
import { Sociedad } from 'src/app/model/sociedadModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

@Component({
  selector: 'app-traslado-unidad-documental',
  templateUrl: './traslado-unidad-documental.component.html',
  styleUrls: ['./traslado-unidad-documental.component.scss'],
  providers: [RestService, MessageService]
})
export class TrasladoUnidadDocumentalComponent implements OnInit {

  // Objetos de Sesion
  sesion: any;

  // Objetos de datos
  listaClientes: Cliente[] = [];
  listaCajas: Caja[] = [];
  clienteSelect: any;
  caja1Select: any;
  caja2Select: any;
  requestConsultaCajasPorCliente: any;
  requestUnidadDocumentalMasivo: any;
  responseUnidadDocumentalMasivo: any;
  requestCambiarUnidadDocumentalMasivo: any;
  responseCambiarUnidadDocumentalMasivo: any;

  // Utilidades
  msg: any;
  const: any;
  loading: boolean;

  constructor(private router: Router, private route: ActivatedRoute, public restService: RestService, public textProperties: TextProperties, public util: Util, public objectModelInitializer: ObjectModelInitializer, public enumerados: Enumerados, public sesionService: SesionService, private messageService: MessageService) {
    this.sesion = this.objectModelInitializer.getDataServiceSesion();
    this.msg = this.textProperties.getProperties(this.sesionService.objServiceSesion.idioma);
    this.const = this.objectModelInitializer.getConst();
  }

  ngOnInit(): void {
    this.inicializar();
  }

  inicializar() {
    this.clienteSelect = { value: this.objectModelInitializer.getDataSociedad(), label: this.msg.lbl_enum_generico_valor_vacio };
    this.caja1Select = { value: this.objectModelInitializer.getDataCaja, label: this.msg.lbl_enum_generico_valor_vacio };
    this.caja2Select = { value: this.objectModelInitializer.getDataCaja, label: this.msg.lbl_enum_generico_valor_vacio };
    this.consultarSociedades();
  }

  consultarSociedades() {
    this.listaClientes = [];
    this.loading = true;
    try {
      this.restService.getREST(this.const.urlConsultarClienteActiva)
        .subscribe(resp => {
          let temp: Cliente[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaClientes = temp;
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

  consultarCajasPorSociedad() {
    this.limpiarCajas();
    this.limpiarUnidadDocumental();
    this.listaCajas = [];
    this.loading = true;
    try {
      this.requestConsultaCajasPorCliente = this.objectModelInitializer.getDataRequestConsultaCajasPorSociedad();
      if (this.clienteSelect != null) {
        this.requestConsultaCajasPorCliente.id = this.clienteSelect.id;

        this.restService.postREST(this.const.urlConsultarCajasPorCliente, this.requestConsultaCajasPorCliente)
          .subscribe(resp => {
            let temp: Caja[] = JSON.parse(JSON.stringify(resp));
            if (temp !== undefined && temp.length > 0) {
              this.listaCajas = temp;
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
      }
    } catch (e) {
      console.log(e);
    }
  }

  consultarUnidadDocumentalMasivo() {
    this.loading = true;
    this.limpiarUnidadDocumental();
    try {
      this.requestUnidadDocumentalMasivo = { value: this.objectModelInitializer.getDataRequestConsultarUnidadDocumentalMasivo(), label: this.msg.lbl_enum_generico_valor_vacio };
      this.responseUnidadDocumentalMasivo = { value: this.objectModelInitializer.getDataResponseConsultarUnidadDocumentalMasivo(), label: this.msg.lbl_enum_generico_valor_vacio };
      if (this.caja1Select != null && this.caja2Select != null) {
        if (this.caja1Select.id !== this.caja2Select.id) {
          this.requestUnidadDocumentalMasivo.idCajaUno = this.caja1Select.id;
          this.requestUnidadDocumentalMasivo.idCajaDos = this.caja2Select.id;
          this.restService.postREST(this.const.urlConsultarUnidadDocumentalPorCajaMasiva, this.requestUnidadDocumentalMasivo)
            .subscribe(resp => {
              let temp: ResponseConsultarUnidadDocumentalMasivo = JSON.parse(JSON.stringify(resp));
              if (temp !== undefined && temp !== null) {
                this.responseUnidadDocumentalMasivo = temp;
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
        } else {
          this.responseUnidadDocumentalMasivo=null;
          this.messageService.clear();
          this.messageService.add({ severity: this.const.severity[2], summary: this.msg.lbl_summary_danger, detail: this.msg.lbl_caja_repetida, sticky: true });
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  cambiarUnidadDocumentalMasivo() {
    this.loading = true;
    try {
      this.requestCambiarUnidadDocumentalMasivo = { value: this.objectModelInitializer.getDataRequestCambiarUnidadDocumentalMasivo, label: this.msg.lbl_enum_generico_valor_vacio };
      this.responseCambiarUnidadDocumentalMasivo = { value: this.objectModelInitializer.getDataResponseCambiarUnidadDocumentalMasivo, label: this.msg.lbl_enum_generico_valor_vacio };
      if (this.responseUnidadDocumentalMasivo != null) {
        this.requestCambiarUnidadDocumentalMasivo.idCajaUno = this.caja1Select.id;
        this.requestCambiarUnidadDocumentalMasivo.idCajaDos = this.caja2Select.id;
        this.requestCambiarUnidadDocumentalMasivo.lstUnidadDocumentalCajaUno = this.responseUnidadDocumentalMasivo.lstUnidadDocumentalCajaUno;
        this.requestCambiarUnidadDocumentalMasivo.lstUnidadDocumentalCajaDos = this.responseUnidadDocumentalMasivo.lstUnidadDocumentalCajaDos;
        this.restService.postREST(this.const.urlCambiarCajaUnidadDocumentalMasiva, this.requestCambiarUnidadDocumentalMasivo)
          .subscribe(resp => {
            let temp: ResponseCambiarUnidadDocumentalMasivo = JSON.parse(JSON.stringify(resp));
            if (temp !== undefined && temp !== null) {
              if (temp.codigo === '0') {
                // Mostrar mensaje exitoso
                this.messageService.clear();
                this.messageService.add({ severity: this.const.severity[1], summary: this.msg.lbl_summary_succes, detail: this.msg.lbl_info_proceso_completo, sticky: true });

              } else {
                alert(temp.mensaje);
              }
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

  limpiarCajas() {
    this.caja1Select = { value: this.objectModelInitializer.getDataCaja, label: this.msg.lbl_enum_generico_valor_vacio };
    this.caja2Select = { value: this.objectModelInitializer.getDataCaja, label: this.msg.lbl_enum_generico_valor_vacio };
  }
  limpiarUnidadDocumental() {
    this.responseUnidadDocumentalMasivo = null;
  }

}
