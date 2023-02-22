import { MasivoDTO } from "../dto/masivo-dto";

export interface RequestConsultaMasivo {
    tipoMasivo;
    masivo: MasivoDTO;
    registroInicial;
    cantidadRegistro;
}