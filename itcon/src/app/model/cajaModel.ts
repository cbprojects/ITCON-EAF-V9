import { Entrepano } from "./entrepanoModel";
import { Sociedad } from "./sociedadModel";

export interface Caja {
    id;
    descripcion;
    codigoAlterno;
    codigoBarras;
    qr;
    entrepano: Entrepano;
    sociedad: Sociedad;
    estado;
    fechaCreacion;
    usuarioCreacion;
    fechaActualizacion;
    usuarioActualizacion;
}