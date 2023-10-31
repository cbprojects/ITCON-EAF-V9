import { UsuarioSede } from "../usuarioSedeModel";

export interface ResponseConsultaUsuarioSede {
    resultado: UsuarioSede[];
    registrosTotales: number;
}