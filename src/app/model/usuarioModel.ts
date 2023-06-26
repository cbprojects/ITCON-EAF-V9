import { Perfil } from "./perfilModel";

export interface Usuario {
    id: number;
    perfil: Perfil;
    contrasena: string | null | undefined;
    tipoDocumento: any;
    documento: string;
    nombre: any;
    celular: string;
    direccion: string;
    email: string | null | undefined;
    fechaCreacion: any;
    usuarioCreacion: any;
    fechaActualizacion: any;
    estado: any;
}