import { Cuerpo } from "./cuerpoModel";

export interface Estante {
    id: any;
    codigo: any;
    cuerpo: Cuerpo;
    estado: any;
    fechaCreacion: any;
    usuarioCreacion: any;
    fechaActualizacion: any;
    usuarioActualizacion: any;
}