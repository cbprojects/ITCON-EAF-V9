import { Sede } from "./sedeModel";

export interface Bodega {
    id;
    codigo;
    nombre;
    nombre10;
    ownerName
    sede: Sede;
    estado;
    fechaCreacion;
    usuarioCreacion;
    fechaActualizacion;
    usuarioActualizacion;
}