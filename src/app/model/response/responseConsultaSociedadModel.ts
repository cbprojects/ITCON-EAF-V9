import { Sociedad } from "../sociedadModel";

export interface ResponseConsultaSociedad {
    resultado: Sociedad[];
    registrosTotales: number;
}