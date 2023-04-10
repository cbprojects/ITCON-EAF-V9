import { Cliente } from "./clienteModel";

export interface RequestRecepcion {
    cliente: Cliente;
    idUser: any;
    registroInicial: any;
    cantidadRegistro: any;
}