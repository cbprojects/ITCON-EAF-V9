import { Bodega } from "./bodegaModel";

export interface Bloque {
    id;
    codigo;
    bodega: Bodega;
    estado;
    fechaCreacion;
    usuarioCreacion;
    fechaActualizacion;
    usuarioActualizacion;
}