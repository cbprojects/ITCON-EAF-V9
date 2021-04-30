import { Usuario } from "./UsuariolModel";

export interface RequestConsultaUsuario {
    usuario: Usuario;
    registroInicial;
    cantidadRegistro;
}