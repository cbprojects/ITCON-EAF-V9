import { UsuarioCliente } from "./usuarioClienteModel";

export interface RequestConsultaUsuarioCliente {
    usuarioCliente: UsuarioCliente;
    registroInicial: any;
    cantidadRegistro: any;
}