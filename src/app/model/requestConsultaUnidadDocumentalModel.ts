import { UnidadDocumental } from "./unidadDocumentalModel";

export interface RequestConsultaUnidadDocumental {
    unidadDocumental: UnidadDocumental;
    registroInicial: any;
    cantidadRegistro: any;
}