import { UnidadDocumental } from "./unidadDocumentalModel";

export interface RequestCambiarUnidadDocumentalMasivo {
    idCajaUno;
    idCajaDos;  
    lstUnidadDocumentalCajaUno:UnidadDocumental[];
    lstUnidadDocumentalCajaDos:UnidadDocumental[];
}