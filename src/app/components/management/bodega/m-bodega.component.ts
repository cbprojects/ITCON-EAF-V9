import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { Bodega } from 'src/app/model/bodegaModel';
import { RequestCrearBodega } from 'src/app/model/requestCrearBodegaModel';
import { Sede } from 'src/app/model/sedeModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

@Component({
  selector: 'app-m-bodega',
  templateUrl: './m-bodega.component.html',
  styleUrls: ['./m-bodega.component.scss'],
  providers: [RestService, MessageService]
})
export class MBodegaComponent implements OnInit {
// Objetos de Sesion
sesion: any;

sedeFiltro: any;

// Objetos de datos
bloques: any;
cuerpos: any;
estantes: any;
entrepanos: any;
bodega: Bodega;
esNuevoBodega: boolean;


listaSedesTemp: any[];


listaSedes: any[];

// Utilidades
msg: any;
const: any;
enumEstado: any;
enums: any;

constructor(private router: Router, private route: ActivatedRoute, public restService: RestService, public textProperties: TextProperties, public util: Util, public objectModelInitializer: ObjectModelInitializer, public enumerados: Enumerados, public sesionService: SesionService, private messageService: MessageService) {
  this.sesion = this.objectModelInitializer.getDataServiceSesion();
  this.msg = this.textProperties.getProperties(this.sesionService.objServiceSesion.idioma);
  this.const = this.objectModelInitializer.getConst();
  this.enums = this.enumerados.getEnumerados();
}

ngOnInit() {
  this.inicializar();
}

ngOnDestroy() {
}

inicializar() {
  this.consultarSedes();
  this.enumEstado = this.enums.estado.valores;
  this.bodega = this.objectModelInitializer.getDataBodega();
  this.bodega.estado = this.util.getValorEnumerado(this.enumEstado, 1);
  this.esNuevoBodega = true;
  if (this.sesionService.objBodegaCargado !== undefined && this.sesionService.objBodegaCargado !== null && this.sesionService.objBodegaCargado.id > 0) {
    this.bodega = this.sesionService.objBodegaCargado;
    this.bodega.estado = this.util.getValorEnumerado(this.enumEstado, this.bodega.estado);
    this.esNuevoBodega = false;
    this.sedeFiltro = { value: this.bodega.sede, label: this.bodega.sede.nombre};
  }else{
    this.sedeFiltro = { value: this.objectModelInitializer.getDataSede(), label: this.msg.lbl_enum_generico_valor_vacio };
  }
}

crearBodega() {
  try {
    let requestCrearBodega: RequestCrearBodega = this.objectModelInitializer.getRequestCrearBodega();
    let sedFiltro = this.objectModelInitializer.getDataSede();
    sedFiltro= this.sedeFiltro.value;
    requestCrearBodega.sedeId = sedFiltro.id;
    requestCrearBodega.nombreBodega=this.bodega.nombre;
    requestCrearBodega.nombre10Bodega=this.bodega.nombre10;
    requestCrearBodega.codigoBodega=this.bodega.codigo;
    requestCrearBodega.ownerNameBodega=this.bodega.ownerName;
    requestCrearBodega.cantidadBloques=this.bloques;
    requestCrearBodega.cantidadCuerposXBloque=this.cuerpos;
    requestCrearBodega.cantidadEstantesXCuerpo=this.estantes;
    requestCrearBodega.cantidadEntrepanoXEstante=this.entrepanos;
    requestCrearBodega.usuarioCreacion=localStorage.getItem("cedula");
    this.restService.postREST(this.const.urlCrearBodega, requestCrearBodega)
      .subscribe(resp => {
        let respuesta: Bodega = JSON.parse(JSON.stringify(resp));
        if (respuesta !== null) {
          // Mostrar mensaje exitoso y consultar de nuevo
          this.messageService.clear();
          this.messageService.add({ severity: this.const.severity[1], summary: this.msg.lbl_summary_succes, detail: this.msg.lbl_info_proceso_completo, sticky: true });

          this.volverConsulta();
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
          this.bodega.estado = this.util.getValorEnumerado(this.enumEstado, this.bodega.estado);

          console.log(error, "error");
        })
  } catch (e) {
    console.log(e);
  }
}

modificarBodega() {
  try {
    this.bodega.sede=this.sedeFiltro.value;
    this.bodega.estado = this.bodega.estado.value;
    this.bodega.usuarioActualizacion=localStorage.getItem("cedula");
    this.restService.putREST(this.const.urlModificarBodega, this.bodega)
      .subscribe(resp => {
        let respuesta: Bodega = JSON.parse(JSON.stringify(resp));
        if (respuesta !== null) {
          // Mostrar mensaje exitoso y consultar de nuevo
          this.messageService.clear();
          this.messageService.add({ severity: this.const.severity[1], summary: this.msg.lbl_summary_succes, detail: this.msg.lbl_info_proceso_completo, sticky: true });

          this.volverConsulta();
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
          this.bodega.estado = this.util.getValorEnumerado(this.enumEstado, this.bodega.estado);
          if (this.bodega.estado === 0) {
            this.bodega.estado = 1;
          }

          console.log(error, "error");
        })
  } catch (e) {
    console.log(e);
  }
}

eliminarUsuarioSede() {
  this.bodega.estado = 0;
  this.modificarBodega();
}

volverConsulta() {
  this.router.navigate(['/q-bodega']);
}

consultarSedes() {
  try {
    this.listaSedes = [];
    this.restService.getREST(this.const.urlConsultarSedeActivos)
      .subscribe(resp => {
        let temp: Sede[] = JSON.parse(JSON.stringify(resp));
        if (temp !== undefined && temp.length > 0) {
          this.listaSedesTemp= temp;
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
  setTimeout(() => this.activarCambiosSedes(), 1000);
}

activarCambiosSedes() {
  this.listaSedes = [];
  this.listaSedes.push({ value: this.objectModelInitializer.getDataSede(), label: this.msg.lbl_enum_generico_valor_vacio });
  this.listaSedesTemp.forEach(sede => {
    this.listaSedes.push({ value: sede, label: sede.nombre });
  });
  
}

}
