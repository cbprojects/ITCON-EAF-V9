import { Bloque } from "./bloqueModel";

export interface Cuerpo {
    id: any;
    codigo: any;
    bloque: Bloque;
    estado: any;
    fechaCreacion: any;
    usuarioCreacion: any;
    fechaActualizacion: any;
    usuarioActualizacion: any;
}