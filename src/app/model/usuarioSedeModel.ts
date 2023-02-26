import { Sede } from "./sedeModel";
import { Usuario } from "./usuarioModel";

export interface UsuarioSede {
    id: number;
    usuario: Usuario;
    sede: Sede;
    estado: any;
    fechaCreacion: any;
    usuarioCreacion: any;
    fechaActualizacion: any;
    usuarioActualizacion: any;
}