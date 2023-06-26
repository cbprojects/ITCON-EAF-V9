import { Proyecto } from "./proyectoModel";

export interface RequestConsultaProyecto {
    proyecto: Proyecto;
    registroInicial: any;
    cantidadRegistro: any;
}