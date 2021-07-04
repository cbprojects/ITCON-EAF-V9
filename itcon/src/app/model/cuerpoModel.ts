import { Bloque } from "./bloqueModel";

export interface Cuerpo {
    id;
    codigo;
    bloque: Bloque;
    estado;
    fechaCreacion;
    usuarioCreacion;
    fechaActualizacion;
    usuarioActualizacion;
}