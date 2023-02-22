import { Perfil } from "./perfilModel";

export interface ResponseConsultaPerfil {
    resultado: Perfil[];
    registrosTotales: number;
}