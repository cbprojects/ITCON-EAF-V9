import { UsuarioDTO } from "./usuario-dto";

export interface ServiceSessionDTO {
    // data
    phase: any;
    usuarioSesion: UsuarioDTO;
    usuarioRegister: UsuarioDTO;
    tokenSesion: any;
    decodedToken: any;
    expirationDate: any;
    idioma: any;

    // Excepciones
    mensajeError403: any;
    mensajeError404: any;
    mensajeError500: any;

    // Mensajes
    mensajeConfirmacion: any;
}