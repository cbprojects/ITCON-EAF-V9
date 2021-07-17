import { Usuario } from "./usuarioModel";

export interface RequestConsultaUsuario {
    usuario: Usuario;
    registroInicial;
    cantidadRegistro;
}