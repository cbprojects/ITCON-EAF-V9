import { Proyecto } from "./proyectoModel";

export interface ResponseConsultaProyecto {
    resultado: Proyecto[];
    registrosTotales: number;
}