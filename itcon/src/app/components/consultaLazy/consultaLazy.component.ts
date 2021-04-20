import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DomSanitizer } from '@angular/platform-browser';
import { RestService } from 'src/app/services/rest.service';
import { tada, fadeIn } from 'ng-animate';
import { trigger, transition, useAnimation } from '@angular/animations';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';

@Component({
  selector: 'app-consulta-lazy',
  templateUrl: './consultaLazy.component.html',
  styleUrls: ['./consultaLazy.component.scss'],
  providers: [RestService, MessageService],
  animations: [
    trigger('tada', [transition('* => open', useAnimation(tada))]),
    trigger('fadeIn', [transition('* => open', useAnimation(fadeIn))])
  ]
})

export class ConsultaLazyComponent implements OnInit {
  @Input() mostrarPaginador: boolean;
  @Input() lista: any[];
  @Input() cabeceras: any[];
  @Input() btnEditar: any[];
  @Input() btnEliminar: any[];
  @Input() btnVer: any[];
  @Input() totalRecords: number;
  @Input() loading: boolean;
  @Input() rows: any;
  @Output() enviarObjetoEditar: EventEmitter<any> = new EventEmitter();
  @Output() enviarObjetoEliminar: EventEmitter<any> = new EventEmitter();
  @Output() enviarObjetoVer: EventEmitter<any> = new EventEmitter();
  @Output() enviarObjetoCargarTabla: EventEmitter<any> = new EventEmitter();

  // Objetos de Animaciones
  tada: any;
  fadeIn: any;

  // Utilidades
  util: any;
  msg: any;
  const: any;
  locale: any;
  minDate = new Date();
  srcImgIconsSvg: any;
  textProperties: any;
  objectModelInitializer: any;
  enumRows: any;
  cols: any[];
  p: number = 1;

  // Enumerados
  enums: any;
  enumIdioma = [];
  idiomaSeleccionado: any;

  constructor(private router: Router, private route: ActivatedRoute, public restService: RestService, enums: Enumerados, textProperties: TextProperties, objectModelInitializer: ObjectModelInitializer, util: Util, private messageService: MessageService, private sanitization: DomSanitizer) {
    // Objetos inmutables   
    this.textProperties = textProperties;
    this.objectModelInitializer = objectModelInitializer;
    this.util = util;
    this.const = objectModelInitializer.getConst();
    this.enums = enums.getEnumerados();
    this.srcImgIconsSvg = 'assets/images/icons/';
    this.enumRows = [5, 10, 15, 20, 50, 100];

    // Objetos mutables
    this.locale = objectModelInitializer.getLocaleESForCalendar();
    this.msg = textProperties.getProperties(this.const.idiomaEs);
    this.idiomaSeleccionado = this.objectModelInitializer.getDataEnumerado();
    this.idiomaSeleccionado.label = this.msg.lbl_idioma_es;
    this.idiomaSeleccionado.value = 1;
  }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    this.cols = this.util.armarTabla(this.cabeceras, this.lista);
  }

  editar(obj) {
    this.enviarObjetoEditar.emit(obj);
    return true;
  }

  eliminar(obj) {
    this.enviarObjetoEliminar.emit(obj);
    return true;
  }

  ver(obj) {
    this.enviarObjetoVer.emit(obj);
    return true;
  }

  cargarImagen(dato: any, tipoArchivo) {
    if (tipoArchivo === 'svg') {
      return this.sanitization.bypassSecurityTrustResourceUrl('data:image/svg+xml;base64,' + dato);
    } else {
      tipoArchivo = tipoArchivo + ';base64,';
      return 'data:image/' + tipoArchivo + dato;
    }
  }

  esValModificado(rowData) {
    let result = false;
    try {
      let M = rowData.valorEditable.split("|")[1].toUpperCase();
      if (M === 'M') {
        result = true;
      }
    } catch (e) {
      result = false;
    }

    return result;
  }

  obtenerValorLabelField(rowData, field) {
    try {
      let valor = rowData[field];
      return field === "propiedad" ? this.homologarCampoMatrizHDC(valor.toString().split("|")[0]) : (field !== "propiedad" && rowData.propiedad === "cupoCredito" ? this.formatearMoneda(valor.toString().split("|")[0]) : valor.toString().split("|")[0]);
    } catch (e) {
      return '';
    }
  }

  homologarCampoMatrizHDC(valor) {
    try {
      let result = '';
      let palabras: string[] = valor.split('/').pop().split(/(?=[A-Z])/);
      if (palabras !== undefined && palabras !== null) {
        palabras.forEach(palabra => {
          let word = palabra[0].toUpperCase() + palabra.slice(1);
          result = result + " " + word;
        });
      }
      return result;
    }
    catch (e) {
      return '';
    }
  }

  formatearMoneda(valor) {
    try {
      let result = '$' + new Intl.NumberFormat().format(parseFloat(valor));
      return result;
    }
    catch (e) {
      return '$ 0';
    }
  }

  cargarTabla(event) {
    this.enviarObjetoCargarTabla.emit(event);
    return true;
  }
}