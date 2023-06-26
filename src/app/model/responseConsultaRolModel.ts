import { Rol } from "./rolModel";

export interface ResponseConsultaRol {
    resultado: Rol[];
    registrosTotales: number;
}