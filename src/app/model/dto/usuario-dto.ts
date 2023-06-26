import { Rol } from '../rolModel';
import { Usuario } from "../usuarioModel";

export interface UsuarioDTO {
    usuario: Usuario;
    listaRoles: Rol[];
    esAdmin: boolean;
}