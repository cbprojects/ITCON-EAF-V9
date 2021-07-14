import { UnidadDocumental } from "./unidadDocumentalModel";

export interface RequestConsultaUnidadDocumental {
    unidadDocumental: UnidadDocumental;
    registroInicial;
    cantidadRegistro;
}