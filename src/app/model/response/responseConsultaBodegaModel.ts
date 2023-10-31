import { Bodega } from "../bodegaModel";

export interface ResponseConsultaBodega {
    resultado: Bodega[];
    registrosTotales: number;
}