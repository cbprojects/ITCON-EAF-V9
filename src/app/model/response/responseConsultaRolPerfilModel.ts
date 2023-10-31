import { Rol } from "../rolModel";

export interface ResponseConsultaRolPerfil {
    rolesAsociados: Rol[];
    rolesNoAsociados: Rol[];
}