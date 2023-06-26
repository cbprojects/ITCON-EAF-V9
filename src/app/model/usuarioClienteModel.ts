import { Cliente } from "./clienteModel";
import { Usuario } from "./usuarioModel";

export interface UsuarioCliente {
    id: number;
    usuario: Usuario;
    cliente: Cliente;
    estado: any;
    fechaCreacion: any;
    usuarioCreacion: any;
    fechaActualizacion: any;
    usuarioActualizacion: any;
}