import { Cliente } from "./clienteModel";
import { Usuario } from "./usuarioModel";

export interface Acta {
    id: any;
    numeroFactura: any;
    cantidad: any;
    aprobada: any;
    usuario: Usuario;
    cliente: Cliente;
    estado: any;
    fechaCreacion: any;
    usuarioCreacion: any;
    fechaActualizacion: any;
    usuarioActualizacion: any;

}