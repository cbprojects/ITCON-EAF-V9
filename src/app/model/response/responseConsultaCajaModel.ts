import { Caja } from "../cajaModel";

export interface ResponseConsultaCaja {
    resultado: Caja[];
    registrosTotales: number;
}