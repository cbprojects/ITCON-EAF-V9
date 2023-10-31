import { Sociedad } from "../sociedadModel";

export interface RequestConsultaSociedad {
    sociedad: Sociedad;
    registroInicial: any;
    cantidadRegistro: any;
}