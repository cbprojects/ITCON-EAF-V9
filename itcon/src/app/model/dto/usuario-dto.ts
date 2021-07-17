import { Rol } from "../RolModel";
import { Usuario } from "../usuarioModel";

export interface UsuarioDTO {
    usuario: Usuario;
    listaRoles: Rol[];
    esAdmin: boolean;
}