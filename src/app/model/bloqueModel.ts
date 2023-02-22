import { Bodega } from "./bodegaModel";

export interface Bloque {
    id: any;
    codigo: any;
    bodega: Bodega;
    estado: any;
    fechaCreacion: any;
    usuarioCreacion: any;
    fechaActualizacion: any;
    usuarioActualizacion: any;
}