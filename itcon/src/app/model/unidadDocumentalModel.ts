import { Caja } from "./cajaModel";
import { Contenedor } from "./contenedorModel";
import { SociedadArea } from "./sociedadAreaModel";
import { TipoDocumental } from "./tipoDocumentalModel";

export interface UnidadDocumental {
    id;
    codigo,
    nombre;
    sociedadArea: SociedadArea;
    descripcion;
    caja: Caja;
    codigoBarra;
    qr;
    rutaArchivo;
    tipoDocumental: TipoDocumental;
    contenedor: Contenedor;
    consecutivoIni;
    consecutivoFin;
    fechaIni;
    fechaFin;
    fechaRecibe;
    fechaCreacion;
    usuarioCreacion;
    fechaActualizacion;
    usuarioActualizacion;
    estado;
}