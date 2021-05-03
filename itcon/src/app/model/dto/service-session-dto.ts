import { UsuarioDTO } from "./usuario-dto";

export interface ServiceSessionDTO {
    // data
    phase;
    usuarioSesion: UsuarioDTO,
    usuarioRegister: UsuarioDTO;
    tokenSesion;
    decodedToken;
    expirationDate;
    idioma;

    // Excepciones
    mensajeError403;
    mensajeError404;
    mensajeError500;

    // Mensajes
    mensajeConfirmacion;
}