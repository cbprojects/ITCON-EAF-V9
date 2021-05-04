import { Injectable } from '@angular/core';

//export var HOST = 'http://localhost:9002';
//export var HOST = 'http://10.176.56.211:9002';
export var HOST = 'https://cbaeneprojects.com:8443/CentralUsuarios';

//export var SYSTEM = 'http://localhost:4200';
//export var SYSTEM = 'http://10.176.56.211:7001';
export var SYSTEM = 'https://www.itcon.cbaeneprojects.com';

@Injectable()
export class ObjectModelInitializer {

  constructor() {
  }

  getLocaleESForCalendar() {
    return {
      firstDayOfWeek: 1,
      dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      today: 'Hoy',
      clear: 'Borrar'
    }
  };

  getLocaleENForCalendar() {
    return {
      firstDayOfWeek: 1,
      dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      today: 'Today',
      clear: 'Clear'
    }
  };

  getConst() {
    return {
      // URL'S + Info del Sistema
      urlDomain: `${SYSTEM}/`,
      urlRestService: `${HOST}/`,
      urlRestOauth: `${HOST}/oauth/token`,
      urlVCode: `${SYSTEM}/vCode/`,
      // Login
      urlLogin: `${HOST}/central/usuario/login`,
      urlRestaurarClave: `${HOST}/central/usuario/restaurarClave`,
      // Roles
      urlContarRoles: `${HOST}/central/rol/contarRoles`,
      urlConsultarRolesPorFiltros: `${HOST}/central/rol/consultarRolFiltros`,
      urlCrearRol: `${HOST}/central/rol/crearRol`,
      urlModificarRol: `${HOST}/central/rol/modificarRol`,
      // Perfiles
      urlContarPerfiles: `${HOST}/central/perfil/contarPerfiles`,
      urlConsultarPerfilesPorFiltros: `${HOST}/central/perfil/consultarPerfilFiltros`,
      urlConsultarPerfilesPorFiltrosActivos: `${HOST}/central/perfil/consultarPerfilFiltrosActivos`,
      urlCrearPerfil: `${HOST}/central/perfil/crearPerfil`,
      urlModificarPerfil: `${HOST}/central/perfil/modificarPerfil`,
      urlConsultarPerfilesActivos: `${HOST}/central/perfil/consultarPerfilesActivos`,
      //Usuarios
      urlConsultarUsuariosPorFiltros: `${HOST}/central/usuario/consultarUsuarioFiltros`,
      urlCrearUsuario: `${HOST}/central/usuario/crearUsuario`,
      urlModificarUsuario: `${HOST}/central/usuario/modificarUsuario`,
      urlLoginUsuario:`${HOST}/central/usuario/loginUsuario`,

      tokenUsernameAUTH: 'BaeneApp',
      tokenPasswordAUTH: 'Baene2021codex',
      tokenNameAUTH: 'access_token',
      codigoADMIN: 'RMRADM',
      tokenRecordarClave: 'ItCoN2021',

      // Rol-Perfiles
      urlConsultarRolPerfil: `${HOST}/central/rolPerfil/consultarRolPerfilFiltros`,
      urlCrearRolPerfil: `${HOST}/central/rolPerfil/crearRolPerfil`,

      // Model rango de fechas para NGBDatePicker
      minDate: { year: 1000, month: 1, day: 1 },
      maxDate: new Date(),
      formatoFecha: 'dd/mm/yy',
      rangoYears: '1900:3000',

      // Otras Variables
      idiomaEs: 1,
      idiomaEn: 2,
      phaseAdd: 'add',
      phaseDelete: 'delete',
      phaseSearch: 'search',
      phaseEdit: 'edit',
      phasePlus: 'plus',
      tipoCampoTexto: 1,
      tipoCampoEnum: 2,
      disabled: 'disabled',
      readOnly: 'readOnly',
      severity: ['info', 'success', 'warn', 'error'],
      actionModal: { 'show': 1, 'hidde': 2 },
      collectionSize: 0,
      maxSize: 1,
      rotate: true,
      pageSize: 1,
      menuConfiguracion: "C",
      menuAdministracion: "A",
      menuInventario: "I",
      menuAgenda: "G",
      menuMovimientos: "M",
      estadoActivoNumString: 1,
      estadoInactivoNumString: 0,
      passwordAES:'B13EC3B0742D2308'
    }
  };

  getDataServiceSesion() {
    return {
      // data
      phase: '',
      usuarioSesion: this.getDataDTOUsuario(),
      usuarioRegister: this.getDataDTOUsuario(),
      tokenSesion: '',
      decodedToken: '',
      expirationDate: '',
      idioma: '',

      // Excepciones
      mensajeError403: '',
      mensajeError404: '',
      mensajeError500: '',

      // Mensajes
      mensajeConfirmacion: ''
    }
  }

  getTokenSesion() {
    return {
      name: '',
      token: ''
    }
  }

  getDataModeloTablas() {
    return {
      // Campo de la tabla
      field: '',
      // Encabezado
      header: ''
    }
  };

  getDataMessage() {
    return {
      // info, success, warning, danger
      severity: '',
      // Title of MSG
      summary: '',
      // Description of MSG
      detail: ''
    }
  };

  getDataImagenGalleria(nombreImagen, rutaImagen) {
    return {
      previewImageSrc: rutaImagen,
      thumbnailImageSrc: rutaImagen,
      alt: nombreImagen,
      title: nombreImagen
    }
  };

  getDataContactoModel() {
    return {
      idContacto: 0,
      nombreEmpresa: '',
      telefonoEmpresa: '',
      descripcionEmpresa: '',
      nombreContacto: '',
      correoContacto: '',
      cargoContacto: '',
      telefonoContacto: '',
      procesoContacto: 0,

      // Auditoria
      estado: '',
      fechaCreacion: '',
      fechaActualizacion: '',
      usuarioCreacion: '',
      usuarioActualizacion: '',
    }
  };

  getDataRol() {
    return {
      id: 0,
      codigo: '',
      descripcion: '',
      estado: 0,
      fechaCreacion: '',
      usuarioCreacion: '',
      fechaActualizacion: '',
      usuarioActualizacion: ''
    }
  };

  getDataPerfil() {
    return {
      id: 0,
      codigo: '',
      descripcion: '',
      estado: 0,
      fechaCreacion: '',
      usuarioCreacion: '',
      fechaActualizacion: '',
      usuarioActualizacion: ''
    }
  };

  getDataUsuario() {
    return {
      id: 0,
      perfil: this.getDataPerfil(),
      contrasena: '',
      tipoDocumento: '',
      documento: '',
      nombre: '',
      celular: '',
      direccion: '',
      email: '',
      fechaCreacion: '',
      usuarioCreacion: '',
      fechaActualizacion: '',
      usuarioActualizacion: '',
      estado: ''

    }
  };

  getDataDTOUsuario() {
    return {
      usuario: this.getDataUsuario(),
      listaRoles: [],
      esAdmin: false
    }
  };

  getDataRequestConsultarPerfil() {
    return {
      perfil: {},
      registroInicial: '',
      cantidadRegistro: ''
    }
  };

  getDataRequestConsultarRol() {
    return {
      rol: {},
      registroInicial: '',
      cantidadRegistro: ''
    }
  };

  getDataResponseConsultarRol() {
    return {
      resultado: [],
      registrosTotales: 0,
    }
  };

  getDataResponseConsultarRolPerfil() {
    return {
      rolesAsociados: [],
      rolesNoAsociados: [],
    }
  };

  getDataRequestCrearRolPerfil() {
    return {
      perfil: {},
      lstRoles: [],
    }
  };

  getDataResponseCrearRolPerfil() {
    return {
      codigo: '',
      mensaje: ''
    }
  };
  getDataResponseConsultarPerfil() {
    return {
      resultado: [],
      registrosTotales: 0,
    }
  };

  getDataRequestConsultarUsuario() {
    return {
      usuario: this.getDataUsuario(),
      registroInicial: '',
      cantidadRegistro: ''
    }
  };

  getDataResponseConsultarUsuario() {
    return {
      resultado: [],
      registrosTotales: 0,
    }
  };

  getDataEnumerado() {
    return {
      label: '',
      value: ''
    }
  };

  getDataPorcentajeURIWeb(code: String, symbol: String) {
    return {
      codigo: code,
      simbolo: symbol
    }
  };
}