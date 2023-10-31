import { Rol } from "../rolModel";
import { Perfil } from "../perfilModel";

export interface RequestCrearRolPerfil {
    perfil: Perfil;
    lstRoles: Rol[];
    user:  any; 
}