import { UnidadDocumental } from "./unidadDocumentalModel";

export interface ResponseConsultaUnidadDocumental {
    resultado: UnidadDocumental[];
    registrosTotales;
}