import { BodegaPermisos } from "../bodegaPermisosModel";

export interface ResponseConsultaBodegaPermisos {
    resultado: BodegaPermisos[];
    registrosTotales: number;
}