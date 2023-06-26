import { Injectable } from '@angular/core';
import { Functions } from './Functions';
import { TextProperties } from './TextProperties';
import { ObjectModelInitializer } from './ObjectModelInitializer';
import { Enumerados } from './Enumerados';
import { SesionService } from '../services/sesionService/sesion.service';
import { MessageService } from 'primeng/api';
import * as CryptoJS from 'crypto-js';

declare var $: any;

export var objs: any;

@Injectable()
export class Util {
  msg: any;
  mensaje: any;
  const: any;
  enums: any;
  modeloTablas: any;
  func: any;
  usuarioEjemplo: any;

  constructor(public textProperties: TextProperties, public objectModelInitializer: ObjectModelInitializer, public enumerados: Enumerados, public sesionService: SesionService, dataFunctions: Functions, private messageService: MessageService) {
    this.mensaje = this.objectModelInitializer.getDataMessage();
    this.const = this.objectModelInitializer.getConst();
    this.msg = this.textProperties.getProperties(this.sesionService.objServiceSesion.idioma);
    this.func = dataFunctions;
    this.enums = this.enumerados.getEnumerados();
    this.modeloTablas = this.objectModelInitializer.getDataModeloTablas();
  }

  cargarMatrizPorcentajeUri() {
    // SÍMBOLOS URI
    let listaRefPorcentajesUri = [];

    //%20	%21	%22	%23	%24	%25	%26	%27	%28	%29	
    //     !   "	 #	 $	 %   &	 '	 (	 )
    let ESPACIO = this.objectModelInitializer.getDataPorcentajeURIWeb('%20', ' ');
    let CIERRA_ADMIRACION = this.objectModelInitializer.getDataPorcentajeURIWeb('%21', '!');
    let COMILLA_DOBLE = this.objectModelInitializer.getDataPorcentajeURIWeb('%22', '\"');
    let NUMERAL = this.objectModelInitializer.getDataPorcentajeURIWeb('%23', '#');
    let DOLAR = this.objectModelInitializer.getDataPorcentajeURIWeb('%24', '$');
    let PORCENTAJE = this.objectModelInitializer.getDataPorcentajeURIWeb('%25', '%');
    let AMPER = this.objectModelInitializer.getDataPorcentajeURIWeb('%26', '&');
    let COMILLA_SIMPLE = this.objectModelInitializer.getDataPorcentajeURIWeb('%27', '\'');
    let ABRE_PARENTESIS = this.objectModelInitializer.getDataPorcentajeURIWeb('%28', '(');
    let CIERRA_PARENTESIS = this.objectModelInitializer.getDataPorcentajeURIWeb('%29', ')');
    listaRefPorcentajesUri.push(ESPACIO);
    listaRefPorcentajesUri.push(CIERRA_ADMIRACION);
    listaRefPorcentajesUri.push(COMILLA_DOBLE);
    listaRefPorcentajesUri.push(NUMERAL);
    listaRefPorcentajesUri.push(DOLAR);
    listaRefPorcentajesUri.push(PORCENTAJE);
    listaRefPorcentajesUri.push(AMPER);
    listaRefPorcentajesUri.push(COMILLA_SIMPLE);
    listaRefPorcentajesUri.push(ABRE_PARENTESIS);
    listaRefPorcentajesUri.push(CIERRA_PARENTESIS);

    //%2A	%2B %2C	%2D	%2E	%2F	
    // *	 +   ,	 -   .   /
    let ASTERISCO = this.objectModelInitializer.getDataPorcentajeURIWeb('%2A', '*');
    let SIGNO_MAS = this.objectModelInitializer.getDataPorcentajeURIWeb('%2B', '+');
    let COMA = this.objectModelInitializer.getDataPorcentajeURIWeb('%2C', ',');
    let SIGNO_MENOS = this.objectModelInitializer.getDataPorcentajeURIWeb('%2D', '-');
    let PUNTO = this.objectModelInitializer.getDataPorcentajeURIWeb('%2E', '.');
    let SLASH = this.objectModelInitializer.getDataPorcentajeURIWeb('%2F', '/');
    listaRefPorcentajesUri.push(ASTERISCO);
    listaRefPorcentajesUri.push(SIGNO_MAS);
    listaRefPorcentajesUri.push(COMA);
    listaRefPorcentajesUri.push(SIGNO_MENOS);
    listaRefPorcentajesUri.push(PUNTO);
    listaRefPorcentajesUri.push(SLASH);

    //%3A	%3B	%3C	%3D	%3E	%3F	%40
    // :	 ;	 <   =	 >   ?	 @
    let DOS_PUNTOS = this.objectModelInitializer.getDataPorcentajeURIWeb('%3A', ':');
    let PUNTO_COMA = this.objectModelInitializer.getDataPorcentajeURIWeb('%3B', ';');
    let MENOR_QUE = this.objectModelInitializer.getDataPorcentajeURIWeb('%3C', '<');
    let SIGNO_IGUAL = this.objectModelInitializer.getDataPorcentajeURIWeb('%3D', '=');
    let MAYOR_QUE = this.objectModelInitializer.getDataPorcentajeURIWeb('%3E', '>');
    let CIERRA_PREGUNTA = this.objectModelInitializer.getDataPorcentajeURIWeb('%3F', '?');
    let ARROBA = this.objectModelInitializer.getDataPorcentajeURIWeb('%40', '@');
    listaRefPorcentajesUri.push(DOS_PUNTOS);
    listaRefPorcentajesUri.push(PUNTO_COMA);
    listaRefPorcentajesUri.push(MENOR_QUE);
    listaRefPorcentajesUri.push(SIGNO_IGUAL);
    listaRefPorcentajesUri.push(MAYOR_QUE);
    listaRefPorcentajesUri.push(CIERRA_PREGUNTA);
    listaRefPorcentajesUri.push(ARROBA);

    // ACENTOS
    let TILDE_A = this.objectModelInitializer.getDataPorcentajeURIWeb('%C3%A1', 'á');
    let TILDE_E = this.objectModelInitializer.getDataPorcentajeURIWeb('%C3%A9', 'é');
    let TILDE_I = this.objectModelInitializer.getDataPorcentajeURIWeb('%ED', 'í');
    let TILDE_O = this.objectModelInitializer.getDataPorcentajeURIWeb('%F3', 'ó');
    let TILDE_U = this.objectModelInitializer.getDataPorcentajeURIWeb('%FA', 'ú');
    listaRefPorcentajesUri.push(TILDE_A);
    listaRefPorcentajesUri.push(TILDE_E);
    listaRefPorcentajesUri.push(TILDE_I);
    listaRefPorcentajesUri.push(TILDE_O);
    listaRefPorcentajesUri.push(TILDE_U);

    //%5B	%5D %5C	%5E	%5F	%60	%7B	%7C	%7D	%7E	%C2%B4
    // [	 ]   \	 ^	 _   `	 { 	 |	 }	 ~ 	  ´  
    let ABRE_LLAVE_ANGULAR = this.objectModelInitializer.getDataPorcentajeURIWeb('%5B', '[');
    let CIERRA_LLAVE_ANGULAR = this.objectModelInitializer.getDataPorcentajeURIWeb('%5D', ']');
    let SLASH_INVERTIDO = this.objectModelInitializer.getDataPorcentajeURIWeb('%5C', '\\');
    let CIRCUNFLEJO = this.objectModelInitializer.getDataPorcentajeURIWeb('%5E', '^');
    let GUION_BAJO = this.objectModelInitializer.getDataPorcentajeURIWeb('%5F', '_');
    let ACENTO_INVERTIDO = this.objectModelInitializer.getDataPorcentajeURIWeb('%60', '`');
    let ABRE_LLAVE = this.objectModelInitializer.getDataPorcentajeURIWeb('%7B', '{');
    let PIPE = this.objectModelInitializer.getDataPorcentajeURIWeb('%7C', '|');
    let CIERRA_LLAVE = this.objectModelInitializer.getDataPorcentajeURIWeb('%7D', '}');
    let APROXIMADO = this.objectModelInitializer.getDataPorcentajeURIWeb('%7E', '~');
    let ACENTO = this.objectModelInitializer.getDataPorcentajeURIWeb('%C2%B4', '´');
    listaRefPorcentajesUri.push(ABRE_LLAVE_ANGULAR);
    listaRefPorcentajesUri.push(CIERRA_LLAVE_ANGULAR);
    listaRefPorcentajesUri.push(SLASH_INVERTIDO);
    listaRefPorcentajesUri.push(CIRCUNFLEJO);
    listaRefPorcentajesUri.push(GUION_BAJO);
    listaRefPorcentajesUri.push(ACENTO_INVERTIDO);
    listaRefPorcentajesUri.push(ABRE_LLAVE);
    listaRefPorcentajesUri.push(PIPE);
    listaRefPorcentajesUri.push(CIERRA_LLAVE);
    listaRefPorcentajesUri.push(APROXIMADO);
    listaRefPorcentajesUri.push(ACENTO);

    return listaRefPorcentajesUri;
  }

  transformarSimboloUri(uriSimbolos, listaRefPorcentajesUri) {
    for (let uriObject of listaRefPorcentajesUri) {
      uriSimbolos = uriSimbolos.split(uriObject.codigo).join(uriObject.simbolo);
    }

    return uriSimbolos;
  }

  limpiarExcepcion() {
    console.clear;
    this.messageService.clear();
  }

  actualizarLista(listaRemover, listaActualizar) {
    if (listaRemover.length <= 0) {
      return listaActualizar;
    }
    let nuevaLista = [];
    let lista = listaRemover;
    listaActualizar.forEach(function (element, index) {
      if (listaRemover.indexOf(index) < 0) {
        nuevaLista.push(element);
      }
    })
    return nuevaLista;
  }

  llenarListaRemover(listaRemover, indiceLista) {
    let p = listaRemover.indexOf(indiceLista)
    if (p < 0) {
      listaRemover.push(indiceLista);
    } else {
      delete listaRemover[p];
    }
  }

  readOnlyXphase(listaPhases) {
    if (listaPhases === null || listaPhases.length <= 0) {
      return false;
    }
    for (let item in listaPhases) {
      if (listaPhases[item].toString().toUpperCase() === this.sesionService.objServiceSesion.phase.toString().toUpperCase()) {
        return true;
      }
    }
    return false;
  }

  readOnlyXpermiso(accion) {

    return false;
  }

  visebleXphase(listaPhases) {
    if (listaPhases === null || listaPhases.length <= 0) {
      return false;
    }
    for (let item in listaPhases) {
      if (listaPhases[item].toString().toUpperCase() === this.sesionService.objServiceSesion.phase.toString().toUpperCase()) {
        return true;
      }
    }
    return false;
  }

  limpiarConsolaStorage() {
    sessionStorage.clear();
    sessionStorage.clear();
    console.clear();
    return true;
  }

  getEnumValString(array) {
    let lis = [];
    for (let ind in array) {
      let obj = { value: 0, label: '' };
      obj.value = array[ind].value.toString();
      obj.label = array[ind].label;
      lis.push(obj);
    }
    return lis;
  }

  getEmunName(enumerado, id) {
    let name = '';
    enumerado.forEach(function (obj) {
      if (obj.value === id) {
        name = obj.label;
      }
    })
    return name;
  }

  getValorEnumerado(enumerado, id) {
    let valor = { value: 0, label: '' };

    for (var obj of enumerado) {
      if (obj.value === id) {
        valor = obj;
        break;
      }
    }

    return valor;
  }

  //mostrar o ocultar un modal
  ocultarMostrarModal(idModal, cuerpoModal) {
    if (cuerpoModal !== null) {
      this.cambiarTextoModal(idModal, cuerpoModal)
    }
    this.classToggleModalParam(idModal);
  }
  classToggleModal(idModal) {
    $('#' + idModal).toggleClass('show');
    $('#' + idModal).toggleClass('modalVisible');
  }
  classToggleModalParam(id) {
    $('#' + id).toggleClass('show');
    $('#' + id).toggleClass('modalVisible');
    return true;
  }
  tipoDeVariable(obj) {
    return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
  }
  cambiarTextoModal(idModal, cuerpoModal) {
    $('#' + idModal + ' .replc').html(function (buscayreemplaza, reemplaza) {
      return reemplaza.replace('XXX', cuerpoModal);
    });
  }

  clonarObj(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    var temp = obj.constructor();
    for (var key in obj) {
      temp[key] = this.clonarObj(obj[key]);
    }

    return temp;
  }

  abrirNav(event) {
    let element = $(event.target);
    while (element.get(0).tagName.toString().toUpperCase() !== 'LI') {
      element = $(element).parent();
    }
    element.toggleClass('open');
  }

  abrirDropMenu(event) {
    let element = $(event.target);
    let isOpened = element.get(0).getAttribute('aria-expanded');
    if (isOpened === 'true') {
      element.get(0).setAttribute('aria-expanded', false);
    }
    else {
      element.get(0).setAttribute('aria-expanded', true);
    }
    $(element).parent().toggleClass('open');
  }

  abrirDropButton(event) {
    let element = $(event.target);

    while (element.get(0).tagName.toString().toUpperCase() !== 'BUTTON') {
      element = $(element).parent();
    }
    let isOpened = element.get(0).getAttribute('aria-expanded');
    if (isOpened === 'true') {
      element.get(0).setAttribute('aria-expanded', false);
    }
    else {
      element.get(0).setAttribute('aria-expanded', true);
    }
    element.parent().toggleClass('open');
  }

  getUrlActual() {
    let url = window.location.href.toString();
    return url.split('4200')[1];
  }

  showPopUpById(id) {
    $('#' + id).fadeIn();
    $('#' + id).toggleClass('in');
    $('body').append($('<div>', { class: 'modal-backdrop fade in' }));
  }

  hidePopUpById(id) {
    $('#' + id).fadeOut();
    $('#' + id).toggleClass('in');
    $('.modal-backdrop').remove();
  }

  // Función que arma el enumerado de Ubicaciones desde la lista
  obtenerEnumeradoDeListaUbicacion(lista, tipoUbicacion) {
    let enumerado = [];
    for (let i in lista) {
      let ubicacion = lista[i];
      let nombreUbicacion = tipoUbicacion === 0 ? ubicacion.nombrePais : (tipoUbicacion === 1 ? ubicacion.nombreDepartamento + ' - (' + ubicacion.nombrePais + ')' : ubicacion.nombreCiudad + ' - (' + ubicacion.nombreDepartamento + ')');
      let enumObj = { value: ubicacion, label: nombreUbicacion };
      enumerado.push(enumObj);
    }

    return enumerado;
  }

  // Función que arma el enumerado de Terceros desde la lista
  obtenerEnumeradoDeListaTercero(lista) {
    let enumerado = [];
    for (let i in lista) {
      let tercero = lista[i];
      let nombreTercero = tercero.razonSocial;
      let enumObj = { value: tercero, label: nombreTercero };
      enumerado.push(enumObj);
    }

    return enumerado;
  }

  // Función que arma el model de las tablas de la aplicación
  armarTabla(cabeceras, lista) {
    let cols = [];

    if (lista !== null && lista.length > 0) {
      let rows = Object.keys(lista[0]);
      for (let j in rows) {
        for (let c in cabeceras) {
          let head = cabeceras[c];
          let campo = rows[j].toString();
          if (head.campoLista === campo) {
            let obj = { field: '', header: '' };
            Object.assign(this.modeloTablas, obj);
            obj.header = head.nombreCabecera;
            obj.field = campo;

            cols.push(obj);
          }
        }
      }
    }

    return cols;
  }

  // Funcion que muestra notificaciones de errores, advertencias o informativos
  mostrarNotificacion(exc) {
    let listaMensajes: any = [];
    if (exc !== null && exc.mensaje !== null && typeof exc.mensaje !== 'undefined' && exc.mensaje.length > 0) {
      let title = exc.mensaje.split(":")[0];
      let validaciones = exc.mensaje.split(":")[1].split("<br>");

      let mensajeTitulo = { severity: '', summary: '', detail: '' };
      Object.assign(this.mensaje, mensajeTitulo);
      mensajeTitulo.severity = title.length > 0 ? this.const.severity[2] : this.const.severity[3];
      mensajeTitulo.summary = title.length > 0 ? this.msg.lbl_summary_warning : this.msg.lbl_summary_unknown_danger;
      mensajeTitulo.detail = title.length > 0 ? title : this.msg.lbl_mensaje_sin_detalles_error;
      listaMensajes.push(mensajeTitulo);

      for (let valid of validaciones) {
        let validacion = valid.trim();
        if (validacion.length > 0) {
          let campo = validacion.split("-")[0];
          let mensaje = validacion.split("-")[1];

          let msgValidacion = { severity: '', summary: '', detail: '' };
          Object.assign(this.mensaje, msgValidacion);
          msgValidacion.severity = mensajeTitulo.severity;
          msgValidacion.summary = campo;
          msgValidacion.detail = mensaje;
          listaMensajes.push(msgValidacion);
        }
      }
    }
    else {
      return [{ severity: this.const.severity[3], summary: this.msg.lbl_summary_danger, detail: this.msg.lbl_mensaje_no_conexion_servidor }];
    }

    let audio = new Audio();
    audio.src = "assets/audio/guitarBad.mp3";
    audio.load();
    audio.play();

    return listaMensajes;
  }

  // Reproducir sonido error
  playError() {
    let audio = new Audio();
    audio.src = "assets/audio/guitarBad.mp3";
    fetch('assets/audio/guitarBad.mp3')
      .then(response => response.blob())
      .then(blob => {
        audio.load();
        return audio.play();
      })
      .then(_ => {
        console.log('Video playback started');
      })
      .catch(e => {
        console.log('Video playback failed');
      });
  }

  // Función para obtener el objeto ubicacion de una lista con el Id que está en un combo
  obtenerUbicacionDeEnum(idUbicacionEnum, listaUbicaciones) {
    let ubicacion: any;
    for (let i in listaUbicaciones) {
      let ubi = listaUbicaciones[i];
      if (ubi.idUbicacion === idUbicacionEnum) {
        ubicacion = ubi;
        break;
      }
    }
    return ubicacion;
  }

  // Función para obtener el objeto ubicacion de una lista con el código
  obtenerUbicacionPorCodigo(codigoUbicacion, listaUbicaciones, tipoUbicacion) {
    let ubicacion: any;
    let label = "";

    for (let i in listaUbicaciones) {
      let ubi = listaUbicaciones[i];

      if (tipoUbicacion === 0) {
        if (ubi.codigoPais === codigoUbicacion) {
          label = ubi.nombrePais;
          ubicacion = ubi;
          break;
        }
      }
      else if (tipoUbicacion === 1) {
        if (ubi.codigoDepartamento === codigoUbicacion) {
          label = ubi.nombreDepartamento;
          ubicacion = ubi;
          break;
        }
      }
      else if (tipoUbicacion === 2) {
        if (ubi.codigoCiudad === codigoUbicacion) {
          label = ubi.nombreCiudad;
          ubicacion = ubi;
          break;
        }
      }
    }
    return { value: ubicacion, label: label };
  }

  // Función para obtener el objeto Tercero de una lista con el Id que está en un combo
  obtenerTerceroDeEnum(idTerceroEnum, listaTerceros) {
    let tercero: any;
    for (let i in listaTerceros) {
      let ter = listaTerceros[i];
      if (ter.idTercero === idTerceroEnum) {
        tercero = ter;
        break;
      }
    }
    return tercero;
  }

  // Función que permite validar la estructura de un Email de acuerdo a un patrón REGEX
  validarEstructuraEmail(email) {
    let emailRegex = new RegExp('^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$');

    return emailRegex.test(email);
  }

  // Función para buscar el código de un usuario en una lista de usuarios
  usuarioInLista(usuario, listaUsuarios) {
    let result = false;
    for (let i in listaUsuarios) {
      let user = listaUsuarios[i];
      if (user.usuario === usuario) {
        result = true;
        break;
      }
    }
    return result;
  }

  // Función para buscar el email de un usuario en una lista de usuarios
  emailInLista(email, listaUsuarios) {
    let result = false;
    for (let i in listaUsuarios) {
      let user = listaUsuarios[i];
      if (user.email === email) {
        result = true;
        break;
      }
    }
    return result;
  }

  // Función para buscar el numero de documento y tipo de documento de un usuario en una lista de usuarios
  documentoInLista(tipoDocumento, numeroDocumento, listaUsuarios) {
    let result = false;
    for (let i in listaUsuarios) {
      let user = listaUsuarios[i];
      if (user.tipoDocumento === tipoDocumento && user.numeroDocumento === numeroDocumento) {
        result = true;
        break;
      }
    }
    return result;
  }

  // Función que simula un click en un componente dado su ID
  simularClick(id) {
    document.getElementById(id).click();
  }

  // Función que copia de uno a otro elemento
  copiarElemento(source, target) {
    return Object.assign(target, source);
  }

  cargarColorBadge(i) {
    let color = "dark";
    switch (i) {
      case 1:
        color = "secondary";
        break;
      case 2:
        color = "primary";
        break;
      case 3:
        color = "success";
        break;
      case 4:
        color = "danger";
        break;
      case 5:
        color = "warning";
        break;
      case 6:
        color = "info";
        break;
    }
    return color;
  }

  construirMensajeExcepcion(error, summary) {
    let listaMensajes = [];

    if (error !== undefined && error !== null && error.mensaje !== undefined && error.mensaje !== null) {
      // Extraemos por el split de mensajes |
      let listaErrores = error.mensaje.split('|');
      listaErrores.forEach(errorMSG => {
        let mensaje = { severity: '', summary: '', detail: '', sticky: true };
        Object.assign(this.mensaje, mensaje);
        mensaje.severity = this.const.severity[3];
        mensaje.summary = summary;
        mensaje.detail = errorMSG;
        if (errorMSG.length > 0) {
          listaMensajes.push(mensaje);
        }
      });
    } else {
      let mensaje = { severity: '', summary: '', detail: '', sticky: true };
      mensaje.severity = this.const.severity[3];
      mensaje.summary = summary;
      mensaje.detail = this.msg.lbl_mensaje_sin_detalles_error;
      listaMensajes.push(mensaje);
    }
    return listaMensajes;
  }

  soloNumeros(e) {
    if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
      let key = window.Event ? e.which : e.keyCode;
      return (key >= 37 && key <= 40) || (key >= 48 && key <= 57) || (key === 46) || (key === 8) || (e.shiftKey === 1) || (key === 190);
    } else {
      return false;
    }
  }

  isBlank(texto) {
    if (texto == undefined || texto == null || texto == '') {
      return true;
    } else {
      return false;
    }
  }

  //desencriptado AES
  encriptarAES(texto, llave) {
    const iv = CryptoJS.enc.Hex.parse(llave);
    const key = CryptoJS.enc.Utf8.parse(llave);
    var textoEncriptado = CryptoJS.AES.encrypt(texto, key, { iv, mode: CryptoJS.mode.ECB });
    //console.log("encriptado: " + textoEncriptado.toString());
    return textoEncriptado.toString();
  }

  //desencriptado AES
  desencriptarAES(textoEncriptado, llave) {
    const iv = CryptoJS.enc.Hex.parse(llave);
    const key = CryptoJS.enc.Utf8.parse(llave);
    const textoDesencriptado = CryptoJS.AES.decrypt(textoEncriptado, key,
      {
        iv,
        mode: CryptoJS.mode.ECB,
      }
    )
    //console.log('Desencriptado: ' + textoDesencriptado.toString(CryptoJS.enc.Utf8));
    return textoDesencriptado.toString(CryptoJS.enc.Utf8);
  }

  toggleCollapseByID(id) {
    $('#' + id).toggleClass('card-collapsed');
  }

  devolverMimeType(ext) {
    let mapaMimeType = this.mapaMimeType();
    return mapaMimeType.get(ext);
  }

  mapaMimeType() {
    let mapaMimeType = new Map();
    // Otros docs
    mapaMimeType.set('.abw', 'application/x-abiword');
    mapaMimeType.set('.arc', 'application/x-freearc');
    mapaMimeType.set('.azw', 'application/vnd.amazon.ebook');
    mapaMimeType.set('.bin', 'application/octet-stream');
    mapaMimeType.set('.bz', 'application/x-bzip');
    mapaMimeType.set('.bz2', 'application/x-bzip2');
    mapaMimeType.set('.csh', 'application/x-csh');
    mapaMimeType.set('.doc', 'application/msword');
    mapaMimeType.set('.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    mapaMimeType.set('.eot', 'application/vnd.ms-fontobject');
    mapaMimeType.set('.epub', 'application/epub+zip');
    mapaMimeType.set('.gz', 'application/gzip');
    mapaMimeType.set('.jar', 'application/java-archive');
    mapaMimeType.set('.json', 'application/json');
    mapaMimeType.set('.jsonld', 'application/ld+json');
    mapaMimeType.set('.mpkg', 'application/vnd.apple.installer+xml');
    mapaMimeType.set('.odp', 'application/vnd.oasis.opendocument.presentation');
    mapaMimeType.set('.ods', 'application/vnd.oasis.opendocument.spreadsheet');
    mapaMimeType.set('.odt', 'application/vnd.oasis.opendocument.text');
    mapaMimeType.set('.ogx', 'application/ogg');
    mapaMimeType.set('.pdf', 'application/pdf');
    mapaMimeType.set('.php', 'application/x-httpd-php');
    mapaMimeType.set('.ppt', 'application/vnd.ms-powerpoint');
    mapaMimeType.set('.pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
    mapaMimeType.set('.rar', 'application/vnd.rar');
    mapaMimeType.set('.rtf', 'application/rtf');
    mapaMimeType.set('.sh', 'application/x-sh');
    mapaMimeType.set('.vsd', 'application/vnd.visio');
    mapaMimeType.set('.xhtml', 'application/xhtml+xml');
    mapaMimeType.set('.xls', 'application/vnd.ms-excel');
    mapaMimeType.set('.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    mapaMimeType.set('.xml', 'application/xml text/xml');
    mapaMimeType.set('.xul', 'application/vnd.mozilla.xul+xml');
    mapaMimeType.set('.zip', 'application/zip');
    mapaMimeType.set('.7z', 'application/x-7z-compressed');
    mapaMimeType.set('.swf', 'application/x-shockwave-flash');
    mapaMimeType.set('.tar', 'application/x-tar');

    // Video
    mapaMimeType.set('.avi', 'video/x-msvideo');
    mapaMimeType.set('.mpeg', 'video/mpeg');
    mapaMimeType.set('.ogv', 'video/ogg');
    mapaMimeType.set('.ts', 'video/mp2t');
    mapaMimeType.set('.webm', 'video/webm');
    mapaMimeType.set('.3gp', 'video/3gpp');
    mapaMimeType.set('.3g2', 'video/3gpp2');

    // Imagen
    mapaMimeType.set('.bmp', 'image/bmp');
    mapaMimeType.set('.gif', 'image/gif');
    mapaMimeType.set('.ico', 'image/vnd.microsoft.icon');
    mapaMimeType.set('.jpg', 'image/jpeg');
    mapaMimeType.set('.jpeg', 'image/jpeg');
    mapaMimeType.set('.png', 'image/png');
    mapaMimeType.set('.svg', 'image/svg+xml');
    mapaMimeType.set('.tif', 'image/tiff');
    mapaMimeType.set('.tiff', 'image/tiff');
    mapaMimeType.set('.webp', 'image/webp');

    // Texto Plano
    mapaMimeType.set('.css', 'text/css');
    mapaMimeType.set('.csv', 'text/csv');
    mapaMimeType.set('.htm', 'text/html');
    mapaMimeType.set('.ics', 'text/calendar');
    mapaMimeType.set('.js', 'text/javascript');
    mapaMimeType.set('.mjs', 'text/javascript');
    mapaMimeType.set('.txt', 'text/plain');

    // Audio
    mapaMimeType.set('.aac', 'audio/aac');
    mapaMimeType.set('.mid', 'audio/midi');
    mapaMimeType.set('.midi', 'audio/x-midi');
    mapaMimeType.set('.mp3', 'audio/mpeg');
    mapaMimeType.set('.oga', 'audio/ogg');
    mapaMimeType.set('.opus', 'audio/opus');
    mapaMimeType.set('.wav', 'audio/wav');
    mapaMimeType.set('.weba', 'audio/webm');
    mapaMimeType.set('.3gp', 'audio/3gpp');
    mapaMimeType.set('.3g2', 'audio/3gpp2');

    // Fuentes
    mapaMimeType.set('.otf', 'font/otf');
    mapaMimeType.set('.ttf', 'font/ttf');
    mapaMimeType.set('.woff', 'font/woff');
    mapaMimeType.set('.woff2', 'font/woff2');

    return mapaMimeType;
  }
}