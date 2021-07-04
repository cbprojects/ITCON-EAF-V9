import { Cuerpo } from "./cuerpoModel";

export interface Estante {
    id;
    codigo;
    cuerpo: Cuerpo;
    estado;
    fechaCreacion;
    usuarioCreacion;
    fechaActualizacion;
    usuarioActualizacion;
}