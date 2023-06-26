import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { Cliente } from 'src/app/model/clienteModel';
import { RequestRecepcionAprobada } from 'src/app/model/requestRecepcionAprobadaModel';
import { RequestRecepcion } from 'src/app/model/requestRecepcionModel';
import { ResponseConsultaUnidadDocumental } from 'src/app/model/responseConsultaUnidadDocumentalModel';
import { ResponseGenerarPdf } from 'src/app/model/responseGenerarPdfModel';
import { ResponseModificarPrestamo } from 'src/app/model/responseModificarPrestamo';
import { Rol } from 'src/app/model/rolModel';
import { UnidadDocumental } from 'src/app/model/unidadDocumentalModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styleUrls: ['./recepcion.component.scss'],
  providers: [RestService, MessageService]
})
export class RecepcionComponent implements OnInit {

  // Objetos de Sesion
  sesion: any;

  // Objetos de datos
  codigoFiltro: any = "";
  descripcionFiltro: any = "";
  listaUD: UnidadDocumental[];
  clienteFiltro: any;
  listaClientesTemp: any[];
  listaClientes: any[];
  activarCorreo:boolean=true;

  // Utilidades
  msg: any;
  const: any;
  rows: any;
  enumRows: any;
  totalRecords: number;
  loading: boolean;
  entrando:number=0;

  constructor(private router: Router, private route: ActivatedRoute, public restService: RestService, public textProperties: TextProperties, public util: Util, public objectModelInitializer: ObjectModelInitializer, public enumerados: Enumerados, public sesionService: SesionService, private messageService: MessageService) {
    this.sesion = this.objectModelInitializer.getDataServiceSesion();
    this.msg = this.textProperties.getProperties(this.sesionService.objServiceSesion.idioma);
    this.const = this.objectModelInitializer.getConst();
    this.enumRows = [5, 10, 15, 20, 50, 100];
    this.rows = this.enumRows[1];
  }

  ngOnInit() {
    this.listaUD = [];
    this.consultarClientes();
    this.clienteFiltro = { value: this.objectModelInitializer.getDataCliente(), label: this.msg.lbl_enum_generico_valor_vacio };
  }

  ngOnDestroy() {
  }

 

  consultarRecepcion(primerItem) {
    this.activarCorreo=true;
    this.listaUD = [];
    try {
      let requestRecepcion: RequestRecepcion = this.objectModelInitializer.getDataRequestRecepcion();
      let cliente = this.objectModelInitializer.getDataCliente();
      cliente=this.clienteFiltro.value;
      requestRecepcion.cliente = this.objectModelInitializer.getDataCliente();
      requestRecepcion.cliente = cliente;
      requestRecepcion.registroInicial = primerItem;
      requestRecepcion.cantidadRegistro = this.rows;
      this.restService.putREST(this.const.urlConsultarUnidadDocumentalRecepcion, requestRecepcion)
        .subscribe(resp => {
          let temp: ResponseConsultaUnidadDocumental = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.resultado.length > 0) {
            this.listaUD = temp.resultado;
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
      this.consultarRecepcion(event.first);
    }, 100);
  }

  consultarClientes() {
    try {
      this.listaClientes = [];
      this.restService.getREST(this.const.urlConsultarClienteActiva)
        .subscribe(resp => {
          let temp: Cliente[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaClientesTemp = temp;
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
    setTimeout(() => this.activarCambiosClientes(), 1000);
  }

  activarCambiosClientes() {
    this.listaClientes = [];
    this.listaClientes.push({ value: this.objectModelInitializer.getDataCliente(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaClientesTemp.forEach(cliente => {
      this.listaClientes.push({ value: cliente, label: cliente.nombre });
    });
    
  }

  aprobarRecepcion(ud:UnidadDocumental){
    this.activarCorreo=true;
    if(ud.recepcionAprobada){
      ud.recepcionAprobada=false;
    }else{
      ud.recepcionAprobada=true;
    }
    try {
      let requestRecepcionAprobada: RequestRecepcionAprobada=this.objectModelInitializer.getDataRequestRecepcionAprobada();
      requestRecepcionAprobada.idUD=ud.id;
      requestRecepcionAprobada.aprobacion=ud.recepcionAprobada;
      this.restService.postREST(this.const.urlAprobacionRecepcion,requestRecepcionAprobada)
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

  generarPdf(){
    this.activarCorreo=false;
    try {
      let requestRecepcion: RequestRecepcion = this.objectModelInitializer.getDataRequestRecepcion();
      let cliente = this.objectModelInitializer.getDataCliente();
      cliente=this.clienteFiltro.value;
      requestRecepcion.cliente = this.objectModelInitializer.getDataCliente();
      requestRecepcion.cliente = cliente;
      requestRecepcion.idUser=+localStorage.getItem("idUser");
      this.restService.postREST(this.const.urlGenerarPdf,requestRecepcion)
        .subscribe(resp => {
          let temp: ResponseGenerarPdf = JSON.parse(JSON.stringify(resp));
          let mensajeFinal;
          if (temp && temp.codigo === '0') {
            let vectorFile = temp.archivo.nombreArchivo.split('.');
              let mimeType = this.util.devolverMimeType('.' + vectorFile[vectorFile.length - 1]);
              let textbuffer = window.atob(temp.archivo.archivo);
              let binaryLen = textbuffer.length;
              let byte = new Uint8Array(binaryLen);
              for (let i = 0; i < binaryLen; i++) {
                let ascii = textbuffer.charCodeAt(i);
                byte[i] = ascii;
              }
              let blob = new Blob([byte], { type: mimeType });

              //My blob
              const url = URL.createObjectURL(blob);
              //const url = window.URL.createObjectURL(listaArchivos[0].archivo);
              const a = document.createElement('a');
              a.setAttribute('style', 'display:none');
              a.href = url;
              a.download = temp.archivo.nombreArchivo;
              a.click();
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

  enviarPdf(){
    try {
      let requestRecepcion: RequestRecepcion = this.objectModelInitializer.getDataRequestRecepcion();
      let cliente = this.objectModelInitializer.getDataCliente();
      cliente=this.clienteFiltro.value;
      requestRecepcion.cliente = this.objectModelInitializer.getDataCliente();
      requestRecepcion.cliente = cliente;
      requestRecepcion.idUser=+localStorage.getItem("idUser");
      this.restService.postREST(this.const.urlEnviarPdf,requestRecepcion)
        .subscribe(resp => {
          let temp: ResponseModificarPrestamo = JSON.parse(JSON.stringify(resp));
          let mensajeFinal;
          if (temp && temp.codigo === '0') {
            
            mensajeFinal = { severity: this.const.severity[1], summary: this.const.lbl_summary_success, detail: temp.mensaje, sticky: true };
            this.consultarRecepcion(0);
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
}
