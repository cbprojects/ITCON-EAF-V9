import { Caja } from "./cajaModel";

export interface RequestConsultaCaja {
    caja: Caja;
    idSede;
    idBodega;
    idBloque;
    idCuerpo;
    idEstante;
    registroInicial;
    cantidadRegistro;
}