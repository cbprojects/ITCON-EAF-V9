import { Rol } from "../RolModel";
import { Usuario } from "../usuariolModel";

export interface UsuarioDTO {
    usuario: Usuario;
    listaRoles: Rol[];
    esAdmin: boolean;
}