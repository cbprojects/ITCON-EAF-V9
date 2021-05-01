import { Usuario } from "./UsuariolModel";

export interface ResponseConsultaUsuario {
    resultado: Usuario[];
    registrosTotales;
}