import { Injectable } from '@angular/core';

//export var HOST = 'http://localhost:9002';
//export var HOST = 'http://10.176.56.211:9002';
//qa
//export var HOST = 'https://143.198.123.29:8443/CentralUsuariosQA';
//dev
export var HOST = 'https://143.198.123.29:8443/CentralUsuarios';

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
      // Dashboard
      urlCargarDashboard: `${HOST}/central/DashBoard/buscarDashBoardPorPerfil/`,
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
      // Usuarios
      urlConsultarUsuariosPorFiltros: `${HOST}/central/usuario/consultarUsuarioFiltros`,
      urlCrearUsuario: `${HOST}/central/usuario/crearUsuario`,
      urlModificarUsuario: `${HOST}/central/usuario/modificarUsuario`,
      urlLoginUsuario: `${HOST}/central/usuario/loginUsuario`,
      urlBuscarSedesActivasPorUsuario: `${HOST}/central/UsuarioSede/buscarSedesActivasPorUsuario`,
      // Cajas
      urlConsultarCajasPorFiltros: `${HOST}/central/caja/consultarCajaFiltros`,
      urlCrearCaja: `${HOST}/central/caja/crearCaja`,
      urlModificarCaja: `${HOST}/central/caja/modificarCaja`,
      urlBuscarEntrepanosActivosPorEstante: `${HOST}/central/Entrepano/buscarEntrepanosActivosPorEstante`,
      urlBuscarEstantesActivosPorCuerpo: `${HOST}/central/Estante/buscarEstantesActivosPorCuerpo`,
      urlBuscarCuerposActivosPorBloque: `${HOST}/central/Cuerpo/buscarCuerposActivosPorBloque`,
      urlBuscarBloquesActivosPorBodega: `${HOST}/central/Bloque/buscarBloquesActivosPorBodega`,
      urlBuscarBodegasActivasPorSede: `${HOST}/central/Bodega/buscarBodegasActivasPorSede`,
      urlConsultarCajasPorSociedad: `${HOST}/central/caja/consultarCajasPorSociedad`,
      // Unidad Documental
      urlConsultarUDPorFiltros: `${HOST}/central/unidadDocumental/consultarUnidadDocumentalFiltros`,
      urlCrearUD: `${HOST}/central/unidadDocumental/crearUnidadDocumental`,
      urlModificarUD: `${HOST}/central/unidadDocumental/modificarUnidadDocumental`,
      urlConsultarUnidadDocumentalPorCajaMasiva: `${HOST}/central/unidadDocumental/consultarUnidadDocumentalPorCajaMasiva`,
      urlCambiarCajaUnidadDocumentalMasiva: `${HOST}/central/unidadDocumental/cambiarCajaUnidadDocumentalMasiva`,
      urlConsultarUnidadDocumentalLista: `${HOST}/central/unidadDocumental/consultarUnidadDocumentalLista`,
      // Tipo Unidad Documental
      urlBuscarTipoUDActivos: `${HOST}/central/TipoUD/buscarTipoUDActivos`,
      // Contenedores
      urlBuscarContenedoresActivos: `${HOST}/central/Contenedor/buscarContenedoresActivos`,
      urlBuscarAreasActivasPorSociedad: `${HOST}/central/SociedadArea/buscarAreasActivasPorSociedad`,
      // Sociedades      
      urlConsultarSociedadActiva: `${HOST}/central/sociedad/consultarSociedadActiva`,
      // Clientes      
      urlConsultarClienteActiva: `${HOST}/central/Cliente/buscarClientesActivos`,
      // Archivos
      urlConsultarArchivos: `${HOST}/central/archivos/descargarArchivos`,
      urlCrearArchivos: `${HOST}/central/archivos/subirImagen`,
      urlBorrarArchivos: `${HOST}/central/archivos/borrarImagen`,
      urlObtenerArchivos: `${HOST}/central/archivos/obtenerArchivos`,
      // Parametrizaciones masivas
      urlConsultarMasivoPorFiltros: `${HOST}/central/Masivo/consultarMasivo`,
      urlCrearMasivo: `${HOST}/central/Masivo/crearMasivo`,
      urlModificarMasivo: `${HOST}/central/Masivo/modificarMasivo`,
      // Prestamo      
      urlConsultarPrestamo: `${HOST}/central/prestamo/consultarPrestamo`,
      urlModificarPrestamo: `${HOST}/central/prestamo/editarPrestamo`,

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
      actualDate: new Date(),
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
      passwordAES: 'B13EC3B0742D2308'
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

  getDataCaja() {
    return {
      id: '',
      descripcion: '',
      codigoAlterno: '',
      codigoBarras: '',
      qr: '',
      entrepano: this.getDataEntrepano(),
      cliente: this.getDataCliente(),
      fechaCreacion: '',
      usuarioCreacion: '',
      fechaActualizacion: '',
      usuarioActualizacion: '',
      estado: ''
    }
  };

  getDataEntrepano() {
    return {
      id: 0,
      codigo: '',
      estante: this.getDataEstante(),
      fechaCreacion: '',
      usuarioCreacion: '',
      fechaActualizacion: '',
      usuarioActualizacion: '',
      estado: ''
    }
  };

  getDataEstante() {
    return {
      id: 0,
      codigo: '',
      cuerpo: this.getDataCuerpo(),
      fechaCreacion: '',
      usuarioCreacion: '',
      fechaActualizacion: '',
      usuarioActualizacion: '',
      estado: ''
    }
  };

  getDataCuerpo() {
    return {
      id: 0,
      codigo: '',
      bloque: this.getDataBloque(),
      fechaCreacion: '',
      usuarioCreacion: '',
      fechaActualizacion: '',
      usuarioActualizacion: '',
      estado: ''
    }
  };

  getDataBloque() {
    return {
      id: 0,
      codigo: '',
      bodega: this.getDataBodega(),
      fechaCreacion: '',
      usuarioCreacion: '',
      fechaActualizacion: '',
      usuarioActualizacion: '',
      estado: ''
    }
  };

  getDataBodega() {
    return {
      id: 0,
      codigo: '',
      nombre: '',
      nombre10: '',
      ownerName: '',
      sede: this.getDataSede(),
      fechaCreacion: '',
      usuarioCreacion: '',
      fechaActualizacion: '',
      usuarioActualizacion: '',
      estado: ''
    }
  };

  getDataSede() {
    return {
      id: 0,
      codigo: '',
      nombre: '',
      nombre10: '',
      address: '',
      fechaCreacion: '',
      usuarioCreacion: '',
      fechaActualizacion: '',
      usuarioActualizacion: '',
      estado: ''
    }
  };

  getDataSociedad() {
    return {
      id: 0,
      nombre: '',
      nombre10: '',
      tax: '',
      cliente: this.getDataCliente(),
      fechaCreacion: '',
      usuarioCreacion: '',
      fechaActualizacion: '',
      usuarioActualizacion: '',
      estado: ''
    }
  };

  getDataCliente() {
    return {
      id: 0,
      nombre: '',
      tax: '',
      fechaCreacion: '',
      usuarioCreacion: '',
      fechaActualizacion: '',
      usuarioActualizacion: '',
      estado: ''
    }
  };

  getDataArea() {
    return {
      id: 0,
      nombre: '',
      nombre10: '',
      estado: 1,
      fechaCreacion: '',
      usuarioCreacion: '',
      fechaActualizacion: '',
      usuarioActualizacion: ''
    }
  };

  getDataSociedadArea() {
    return {
      id: 0,
      sociedad: this.getDataSociedad(),
      area: this.getDataArea(),
      estado: 1,
      fechaCreacion: '',
      usuarioCreacion: '',
      fechaActualizacion: '',
      usuarioActualizacion: ''
    }
  };

  getDataContenedor() {
    return {
      id: 0,
      nombre: '',
      estado: 1,
      fechaCreacion: '',
      usuarioCreacion: '',
      fechaActualizacion: '',
      usuarioActualizacion: ''
    }
  };

  getDataTipoDocumental() {
    return {
      id: 0,
      nombre: '',
      estado: 1,
      fechaCreacion: '',
      usuarioCreacion: '',
      fechaActualizacion: '',
      usuarioActualizacion: ''
    }
  };

  getDataUnidadDocumental() {
    return {
      id: 0,
      codigo: '',
      nombre: '',
      sociedadArea: this.getDataSociedadArea(),
      descripcion: '',
      caja: this.getDataCaja(),
      codigoBarra: '',
      qr: '',
      rutaArchivo: '',
      tipoDocumental: this.getDataTipoDocumental(),
      contenedor: this.getDataContenedor(),
      consecutivoIni: 0,
      consecutivoFin: 0,
      fechaIni: '',
      fechaFin: '',
      fechaRecibe: '',
      estado: 1,
      fechaCreacion: '',
      usuarioCreacion: '',
      fechaActualizacion: '',
      usuarioActualizacion: ''
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
      perfil: this.getDataPerfil(),
      registroInicial: 0,
      cantidadRegistro: 0
    }
  };

  getDataRequestConsultarRol() {
    return {
      rol: this.getDataRol(),
      registroInicial: 0,
      cantidadRegistro: 0
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
      perfil: this.getDataPerfil(),
      lstRoles: [],
      user: ''
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
      registroInicial: 0,
      cantidadRegistro: 0
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

  getDataRequestConsultarCaja() {
    return {
      caja: this.getDataCaja(),
      idSede: '',
      idBodega: '',
      idBloque: '',
      idCuerpo: '',
      idEstante: '',
      registroInicial: 0,
      cantidadRegistro: 0
    }
  };

  getDataResponseConsultarCaja() {
    return {
      resultado: [],
      registrosTotales: 0,
    }
  };

  getDataRequestConsultaCajasPorSociedad() {
    return {
      id: ''
    }
  };

  getDataRequestUnidadDocumental() {
    return {
      unidadDocumental: this.getDataUnidadDocumental(),
      registroInicial: 0,
      cantidadRegistro: 0
    }
  };

  getDataRequestObtenerArchivos() {
    return {
      idSociedad: 0,
      idCaja: '',
      idUnidadDocumental: '',
      idTipoUD: '',
      idArea: '',
      filtroBusqueda: ''
    }
  };

  getDataRequestAreasXSociedad() {
    return {
      id: ''
    }
  }

  getDataRequestSedesXUsuario() {
    return {
      email: ''
    }
  }

  getDataRequestBodegasXSedes() {
    return {
      idSede: ''
    }
  }

  getDataRequestBloquesXBodega() {
    return {
      idBodega: ''
    }
  }

  getDataRequestCuerposXBloque() {
    return {
      idBloque: ''
    }
  }

  getDataRequestEstantesXCuerpo() {
    return {
      idCuerpo: ''
    }
  }

  getDataRequestEntrepanosXEstante() {
    return {
      idEstante: ''
    }
  }

  getDataRequestConsultarUnidadDocumentalLista() {
    return {
      idCliente: '',
      idSociedad: '',
      idCaja: '',
      idUnidadDocumental: '',
      idTipoUD: '',
      idArea: '',
      idContenedor: ''
    }
  };

  getDataBox() {
    return {
      principalLabel: '',
      principalValue: '',
      upperLabel: '',
      upperValue: '',
      subtitleLabel: '',
      subtitleValue: '',
      color: ''
    }
  }

  getDataChart() {
    return {
      columns: [],
      color: '',
      label: '',
      type: ''
    }
  }

  getDataPersona() {
    return {
      usuario: '',
      nombre: '',
      fechaRegistro: '',
      rutaImagen: '',
      commit: '',
      fechaCommit: '',
      usage: '',
      payment: '',
      activity: '',
      satisfaction: ''
    }
  }

  getDataFactura() {
    return {
      numero: '',
      empresa: '',
      cliente: '',
      vatNo: '',
      fechaCreacion: '',
      estado: '',
      precio: ''
    }
  }

  getDataDashboardModel() {
    return {
      boxes1: {
        box1: this.getDataBox(),
        box2: this.getDataBox(),
        box3: this.getDataBox(),
        box4: this.getDataBox(),
        box5: this.getDataBox(),
        box6: this.getDataBox()
      },
      chartTable1: {
        data: [],
        table: {
          cabeceras: [],
          values: []
        }
      },
      chartPie1: {
        data: [],
      },
      chartPie2: {
        data: [],
      },
      boxes2: {
        box1: this.getDataBox(),
        box2: this.getDataBox()
      },
      boxes3: {
        box1: this.getDataBox(),
        box2: this.getDataBox(),
        box3: this.getDataBox(),
        box4: this.getDataBox()
      },
      table1: {
        cabeceras: [],
        values: []
      },
      table2: {
        cabeceras: [],
        values: []
      },
      table3: {
        cabeceras: [],
        values: []
      },
      table4: {
        cabeceras: [],
        values: []
      },
      chartBox1: {
        data: [],
        box: this.getDataBox()
      },
      chartBox2: {
        data: [],
        box: this.getDataBox()
      },
      chartBox3: {
        data: [],
        box: this.getDataBox()
      },
      chartBox4: {
        data: [],
        box: this.getDataBox()
      },
      table5: {
        cabeceras: [],
        values: []
      }
    }
  }

  getDataRequestConsultarUnidadDocumentalMasivo() {
    return {
      idCajaUno: 0,
      idCajaDos: 0
    }
  }

  getDataResponseConsultarUnidadDocumentalMasivo() {
    return {
      lstUnidadDocumentalCajaUno: [],
      lstUnidadDocumentalCajaDos: []
    }
  }

  getDataRequestCambiarUnidadDocumentalMasivo() {
    return {
      idCajaUno: '',
      idCajaDos: '',
      lstUnidadDocumentalCajaUno: [],
      lstUnidadDocumentalCajaDos: []
    }
  }

  getDataResponseCambiarUnidadDocumentalMasivo() {
    return {
      codigo: '',
      mensaje: ''
    }
  }

  getDataArchivo() {
    return {
      nombreArchivo: '',
      archivo: null
    }
  }

  getDataRequestArchivoDir() {
    return {
      idUnidadDocumental: 0
    }
  }

  getDataRequestArchivoFile() {
    return {
      idUnidadDocumental: 0,
      listaArchivosPorSubir: []
    }
  }

  getDataMasivoDTO() {
    return {
      idMasivo: 0,
      nombre1: '',
      nombre2: '',
      nombre3: '',
      estado: 0,
      fechaCreacion: '',
      usuarioCreacion: '',
      fechaActualizacion: '',
      usuarioActualizacion: ''
    }
  }

  getDataRequestMasivo() {
    return {
      tipoMasivo: 0,
      masivoDTO: this.getDataMasivoDTO()
    }
  }

  getDataRequestConsultaMasivo() {
    return {
      tipoMasivo: 0,
      masivo: this.getDataMasivoDTO(),
      registroInicial: 0,
      cantidadRegistro: 0
    }
  }

  getDataResponseConsultaMasivo() {
    return {
      resultado: [],
      registrosTotales: 0
    }
  }

  getDataPrestamo() {
    return {
      id: 0,
      idUd: 0,
      fechaPrestamo: '',
      responsable: '',
      observacion: '',
      estado: 0,
      fechaCreacion: '',
      usuarioCreacion: '',
      fechaActualizacion: '',
      usuarioActualizacion: ''

    }
  };

  getDataResponsePrestamo() {
    return {
      tienePrestamo: false,
      prestamo: this.getDataPrestamo(),
      listaPrestamo: []
    }
  };

  getDataRequestConsultaPrestamo() {
    return {
      idUd: 0
    }
  };

  getDataRequestModificarPrestamo() {
    return {
      esCrear: true,
      idUd: 0,
      responsable: '',
      observacion: '',
      usuarioCreacion: ''
    }
  };

  getDataResponseModificarPrestamo() {
    return {
      codigo: '',
      mensaje: ''
    }
  };
}