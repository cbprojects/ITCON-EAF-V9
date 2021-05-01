import { Rol } from "./RolModel";

export interface ResponseConsultaRolPerfil {
    rolesAsociados: Rol[];
    rolesNoAsociados: Rol[];
}