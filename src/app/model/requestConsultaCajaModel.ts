import { Caja } from "./cajaModel";

export interface RequestConsultaCaja {
    caja: Caja;
    idSede: any;
    idBodega: any;
    idBloque: any;
    idCuerpo: any;
    idEstante: any;
    registroInicial: any;
    cantidadRegistro: any;
}