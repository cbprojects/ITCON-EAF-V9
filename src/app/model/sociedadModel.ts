import { Cliente } from "./clienteModel";

export interface Sociedad {
    id: any;
    nombre: any;
    nombre10: any;
    tax: any;
    cliente: Cliente;
    estado: any;
    fechaCreacion: any;
    usuarioCreacion: any;
    fechaActualizacion: any;
    usuarioActualizacion: any;
}