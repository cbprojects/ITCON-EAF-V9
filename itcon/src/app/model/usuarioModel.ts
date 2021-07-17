import { Perfil } from "./perfilModel";

export interface Usuario {
    id;
    perfil: Perfil;
    contrasena;
    tipoDocumento;
    documento;
    nombre;
    celular;
    direccion;
    email;
    fechaCreacion;
    usuarioCreacion;
    fechaActualizacion;
    estado;
}