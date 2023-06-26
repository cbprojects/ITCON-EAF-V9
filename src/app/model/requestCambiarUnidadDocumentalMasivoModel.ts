import { UnidadDocumental } from "./unidadDocumentalModel";

export interface RequestCambiarUnidadDocumentalMasivo {
    idCajaUno: any;
    idCajaDos: any;  
    lstUnidadDocumentalCajaUno:UnidadDocumental[];
    lstUnidadDocumentalCajaDos:UnidadDocumental[];
}