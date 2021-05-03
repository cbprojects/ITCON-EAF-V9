import { Usuario } from "./usuariolModel";

export interface RequestConsultaUsuario {
    usuario: Usuario;
    registroInicial;
    cantidadRegistro;
}