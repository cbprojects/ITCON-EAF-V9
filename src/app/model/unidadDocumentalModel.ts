import { Caja } from "./cajaModel";
import { Contenedor } from "./contenedorModel";
import { SociedadArea } from "./sociedadAreaModel";
import { TipoDocumental } from "./tipoDocumentalModel";

export interface UnidadDocumental {
    id: any;
    codigo: any,
    nombre: any;
    sociedadArea: SociedadArea;
    descripcion: any;
    caja: Caja;
    codigoBarra: any;
    qr: any;
    rutaArchivo: any;
    tipoDocumental: TipoDocumental;
    contenedor: Contenedor;
    consecutivoIni: any;
    consecutivoFin: any;
    fechaIni: any;
    fechaFin: any;
    fechaRecibe: any;
    cajaRecibido: any;
    recepcionAprobada: any;
    fechaCreacion: any;
    usuarioCreacion: any;
    fechaActualizacion: any;
    usuarioActualizacion: any;
    estado: any;
}