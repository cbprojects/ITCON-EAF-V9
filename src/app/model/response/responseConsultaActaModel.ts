import { Acta } from "../actaModel";

export interface ResponseConsultaActa {
    resultado: Acta[];
    registrosTotales: number;
}