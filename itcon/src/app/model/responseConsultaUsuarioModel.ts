import { Usuario } from "./usuariolModel";

export interface ResponseConsultaUsuario {
    resultado: Usuario[];
    registrosTotales;
}