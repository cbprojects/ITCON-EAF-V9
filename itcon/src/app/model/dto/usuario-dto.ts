import { Rol } from "../RolModel";
import { Usuario } from "../usuariolModel";

export interface UsuarioDTO {
    usuarioTB: Usuario;
    listaRolesTB: Rol[];
    esAdmin: boolean;
}