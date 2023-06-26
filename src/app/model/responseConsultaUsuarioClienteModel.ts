import { UsuarioCliente } from "./usuarioClienteModel";

export interface ResponseConsultaUsuarioCliente {
    resultado: UsuarioCliente[];
    registrosTotales: number;
}