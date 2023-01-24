import { Rol } from "./RolModel";

export interface RequestCrearRolPerfil {
    perfil;
    lstRoles: Rol[];
    user; 
}