import { Rol } from "./RolModel";

export interface RequestConsultaRol {
    rol: Rol;
    registroInicial;
    cantidadRegistro;
}