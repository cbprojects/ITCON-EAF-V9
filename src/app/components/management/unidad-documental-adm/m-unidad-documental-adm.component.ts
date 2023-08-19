import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { Area } from 'src/app/model/areaModel';
import { Cliente } from 'src/app/model/clienteModel';
import { Contenedor } from 'src/app/model/contenedorModel';
import { Entrepano } from 'src/app/model/entrepanoModel';
import { Proyecto } from 'src/app/model/proyectoModel';
import { RequestAreasXSociedad } from 'src/app/model/requestAreasXSociedad';
import { TipoDocumental } from 'src/app/model/tipoDocumentalModel';
import { UnidadDocumental } from 'src/app/model/unidadDocumentalModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

@Component({
  selector: 'app-m-unidad-documental-adm',
  templateUrl: './m-unidad-documental-adm.component.html',
  styleUrls: ['./m-unidad-documental-adm.component.scss'],
  providers: [RestService, MessageService]
})
export class MUnidadDocumentalAdmComponent implements OnInit {

  // Objetos de Sesion
  sesion: any;

  // Objetos de datos
  unidadDocumental: UnidadDocumental;
  esNuevaUnidadDocumental: boolean;
  sociedadFiltro: any;
  areaFiltro: any;
  tipoDocumentalFiltro: any;
  contenedorFiltro: any;
  proyectoFiltro: any;
  clienteFiltro: any;

  listaSociedadesTemp: any[];
  listaAreasTemp: any[];
  listaTipoDocumentalTemp: any[];
  listaContenedoresTemp: any[];
  listaProyectosTemp: any[];
  listaClientesTemp: any[];

  listaClientes: any[];
  listaProyectos: any[];
  listaUnidadesDocumentales: UnidadDocumental[];
  listaSociedades: any[];
  listaAreas: any[];
  listaTipoDocumental: any[];
  listaContenedores: any[];
  creacion: any;

  // Utilidades
  msg: any;
  const: any;
  enums: any;
  enumEstado: any;

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
    this.creacion = localStorage.getItem("cedula");
    this.consultarContenedores();
    this.consultarTiposDocumentales();
    this.consultarClientes();
    this.enumEstado = this.enums.estado.valores;
    this.unidadDocumental = this.objectModelInitializer.getDataUnidadDocumental();
    // this.unidadDocumental.usuarioCreacion = this.creacion
    this.unidadDocumental.sociedadArea = this.objectModelInitializer.getDataSociedadArea();
    this.unidadDocumental.estado = this.util.getValorEnumerado(this.enumEstado, 1);
    this.esNuevaUnidadDocumental = true;
    if (this.sesionService.objUnidadDocumentalCargada !== undefined && this.sesionService.objUnidadDocumentalCargada !== null && this.sesionService.objUnidadDocumentalCargada.nombre !== null && this.sesionService.objUnidadDocumentalCargada.nombre !== '') {
      this.unidadDocumental = this.sesionService.objUnidadDocumentalCargada;
      this.unidadDocumental.estado = this.util.getValorEnumerado(this.enumEstado, this.unidadDocumental.estado);
      let fechaR: Date = new Date(this.unidadDocumental.fechaRecibe);
      fechaR.setDate(fechaR.getDate() + 1);
      this.unidadDocumental.fechaRecibe = fechaR;
      let fechaI: Date = new Date(this.unidadDocumental.fechaIni);
      fechaI.setDate(fechaI.getDate() + 1);
      this.unidadDocumental.fechaIni = fechaI;
      let fechaF: Date = new Date(this.unidadDocumental.fechaFin);
      fechaF.setDate(fechaF.getDate() + 1);
      this.unidadDocumental.fechaFin = fechaF;
      this.esNuevaUnidadDocumental = false;
      // Cargando datos
      this.clienteFiltro = { value: this.unidadDocumental.sociedadArea.sociedad.cliente, label: this.unidadDocumental.sociedadArea.sociedad.cliente.nombre };
      this.sociedadFiltro = { value: this.unidadDocumental.sociedadArea.sociedad, label: this.unidadDocumental.sociedadArea.sociedad.nombre };
      this.areaFiltro = { value: this.unidadDocumental.sociedadArea.area, label: this.unidadDocumental.sociedadArea.area.nombre };
      this.contenedorFiltro = { value: this.unidadDocumental.contenedor, label: this.unidadDocumental.contenedor.nombre };
      this.tipoDocumentalFiltro = { value: this.unidadDocumental.tipoDocumental, label: this.unidadDocumental.tipoDocumental.nombre };
      this.cargarProyectosXSociedad(this.unidadDocumental.sociedadArea.sociedad.id);
      this.proyectoFiltro = { value: this.unidadDocumental.proyecto, label: this.unidadDocumental.proyecto.nombre };
    } else {
      this.sociedadFiltro = { value: this.objectModelInitializer.getDataSociedad(), label: this.msg.lbl_enum_generico_valor_vacio };
      this.areaFiltro = { value: this.objectModelInitializer.getDataArea(), label: this.msg.lbl_enum_generico_valor_vacio };
      this.contenedorFiltro = { value: this.objectModelInitializer.getDataContenedor(), label: this.msg.lbl_enum_generico_valor_vacio };
      this.tipoDocumentalFiltro = { value: this.objectModelInitializer.getDataTipoDocumental(), label: this.msg.lbl_enum_generico_valor_vacio };
      this.proyectoFiltro = { value: this.objectModelInitializer.getDataProyecto(), label: this.msg.lbl_enum_generico_valor_vacio };
    }
  }

  // Activar cambios vista listas desplegables

  activarCambiosContenedores() {
    this.listaContenedores = [];
    this.listaContenedores.push({ value: this.objectModelInitializer.getDataContenedor(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaContenedoresTemp.forEach(contenedor => {
      this.listaContenedores.push({ value: contenedor, label: contenedor.nombre });
    });

    if (this.esNuevaUnidadDocumental) {
      this.contenedorFiltro = this.listaContenedores[0];
    }
  }

  activarCambiosTiposDocumentales() {
    this.listaTipoDocumental = [];
    this.listaTipoDocumental.push({ value: this.objectModelInitializer.getDataTipoDocumental(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaTipoDocumentalTemp.forEach(tipoD => {
      this.listaTipoDocumental.push({ value: tipoD, label: tipoD.nombre });
    });
    if (this.esNuevaUnidadDocumental) {
      this.tipoDocumentalFiltro = this.listaTipoDocumental[0];
    }
  }

  activarCambiosSociedades() {
    this.listaSociedades = [];
    this.listaSociedades.push({ value: this.objectModelInitializer.getDataSociedad(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaSociedadesTemp.forEach(sociedad => {
      this.listaSociedades.push({ value: sociedad, label: sociedad.nombre });
    });
    if (this.esNuevaUnidadDocumental) {
      this.sociedadFiltro = this.listaSociedades[0];
    }
  }

  activarCambiosAreas() {

    this.listaAreas = [];
    this.listaAreas.push({ value: this.objectModelInitializer.getDataArea(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaAreasTemp.forEach(area => {
      this.listaAreas.push({ value: area, label: area.nombre });
    });
    this.areaFiltro = this.listaAreas[0];
  }

  // Carga ngselects

  consultarSociedades() {
    try {
      this.listaSociedades = [];
      this.restService.getREST(this.const.urlConsultarSociedadActiva)
        .subscribe(resp => {
          let temp: Entrepano[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaSociedadesTemp = temp;
            this.activarCambiosSociedades();
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

  consultarContenedores() {
    try {
      this.listaContenedores = [];
      this.restService.getREST(this.const.urlBuscarContenedoresActivos)
        .subscribe(resp => {
          let temp: Contenedor[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaContenedoresTemp = temp;
            this.activarCambiosContenedores();
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

  consultarTiposDocumentales() {
    try {
      this.listaTipoDocumental = [];
      this.restService.getREST(this.const.urlBuscarTipoUDActivos)
        .subscribe(resp => {
          let temp: TipoDocumental[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaTipoDocumentalTemp = temp;
            this.activarCambiosTiposDocumentales();
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

  cargarAreasXSociedad(event) {
    this.listaAreas = [];
    this.listaAreasTemp = [];
    this.sociedadFiltro.id = event.value.id;
    try {
      let request: RequestAreasXSociedad = this.objectModelInitializer.getDataRequestAreasXSociedad();
      request.id = this.sociedadFiltro.id;
      this.restService.postREST(this.const.urlBuscarAreasActivasPorSociedad, request)
        .subscribe(resp => {
          let temp: Area[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaAreasTemp = temp;
            this.activarCambiosAreas();
          }
          this.cargarProyectosXSociedad(this.sociedadFiltro.id);
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

  cargarProyectosXSociedad(id: Number) {
    this.listaProyectos = [];
    this.listaProyectosTemp = [];
    try {
      let request: RequestAreasXSociedad = this.objectModelInitializer.getDataRequestAreasXSociedad();
      request.id = id;
      this.restService.postREST(this.const.urlConsultarProyectosPorSociedad, request)
        .subscribe(resp => {
          let temp: Proyecto[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaProyectosTemp = temp;
            this.activarCambiosProyectos();
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

  activarCambiosProyectos() {
    this.listaProyectos = [];
    this.listaProyectos.push({ value: this.objectModelInitializer.getDataProyecto(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaProyectosTemp.forEach(proyecto => {
      this.listaProyectos.push({ value: proyecto, label: proyecto.nombre });
    });
    if (this.esNuevaUnidadDocumental) {
      this.proyectoFiltro = this.listaProyectos[0];
    }
  }

  crearUD() {
    try {
      this.unidadDocumental.sociedadArea.id = 0;
      this.unidadDocumental.sociedadArea.area = this.areaFiltro.value;
      this.unidadDocumental.sociedadArea.sociedad = this.sociedadFiltro.value;
      this.unidadDocumental.proyecto = this.proyectoFiltro.value;
      this.unidadDocumental.contenedor = this.contenedorFiltro.value;
      this.unidadDocumental.tipoDocumental = this.tipoDocumentalFiltro.value;
      this.unidadDocumental.estado = this.unidadDocumental.estado.value;
      this.unidadDocumental.usuarioCreacion = this.creacion;
      this.unidadDocumental.usuarioActualizacion = this.creacion;
      this.restService.postREST(this.const.urlCrearUD, this.unidadDocumental)
        .subscribe(resp => {
          let respuesta: UnidadDocumental = JSON.parse(JSON.stringify(resp));
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
            this.unidadDocumental.estado = this.util.getValorEnumerado(this.enumEstado, this.unidadDocumental.estado);

            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  modificarUD() {
    try {
      this.unidadDocumental.sociedadArea.id = 0;
      this.unidadDocumental.sociedadArea.area = this.areaFiltro.value;
      this.unidadDocumental.sociedadArea.sociedad = this.sociedadFiltro.value;
      this.unidadDocumental.contenedor = this.contenedorFiltro.value;
      this.unidadDocumental.proyecto = this.proyectoFiltro.value;
      this.unidadDocumental.tipoDocumental = this.tipoDocumentalFiltro.value;
      this.unidadDocumental.estado = this.unidadDocumental.estado.value;
      this.unidadDocumental.usuarioActualizacion = this.creacion;
      this.restService.putREST(this.const.urlModificarUD, this.unidadDocumental)
        .subscribe(resp => {
          let respuesta: UnidadDocumental = JSON.parse(JSON.stringify(resp));
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
            this.unidadDocumental.estado = this.util.getValorEnumerado(this.enumEstado, this.unidadDocumental.estado);
            if (this.unidadDocumental.estado === 0) {
              this.unidadDocumental.estado = 1;
            }

            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  eliminarUD() {
    this.unidadDocumental.estado = 0;
    this.modificarUD();
  }

  volverConsulta() {
    this.router.navigate(['/q-unidad-documental-adm']);
  }

  consultarClientes() {
    try {
      let request: RequestAreasXSociedad = this.objectModelInitializer.getDataRequestAreasXSociedad();
      request.id = +localStorage.getItem("idUser");
      this.restService.postREST(this.const.urlBuscarClientesActivosPorUsuario, request)
        .subscribe(resp => {
          let temp: Cliente[] = JSON.parse(JSON.stringify(resp));
          if (temp !== undefined && temp.length > 0) {
            this.listaClientesTemp = temp;
          }
          this.activarCambiosCliente()
          if (this.listaClientes.length > 1) {
            this.consultarSociedades();
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

  activarCambiosCliente() {
    this.listaClientes = [];
    this.listaClientes.push({ value: this.objectModelInitializer.getDataSociedad(), label: this.msg.lbl_enum_generico_valor_vacio });
    this.listaClientesTemp.forEach(cliente => {
      this.listaClientes.push({ value: cliente, label: cliente.nombre });
    });
    if (this.listaClientes.length > 1) {
      this.clienteFiltro = this.listaClientes[1];
    } else {
      this.clienteFiltro = this.listaClientes[0];
    }
  }

}
