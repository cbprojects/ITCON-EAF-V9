import { MasivoDTO } from "../dto/masivo-dto";

export interface ResponseConsultaMasivo {
    resultado: MasivoDTO[];
    registrosTotales;
}