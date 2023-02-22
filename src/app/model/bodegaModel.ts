import { Sede } from "./sedeModel";

export interface Bodega {
    id: any;
    codigo: any;
    nombre: any;
    nombre10: any;
    ownerName: any
    sede: Sede;
    estado: any;
    fechaCreacion: any;
    usuarioCreacion: any;
    fechaActualizacion: any;
    usuarioActualizacion: any;
}