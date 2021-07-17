import { Usuario } from "./usuarioModel";

export interface ResponseConsultaUsuario {
    resultado: Usuario[];
    registrosTotales;
}