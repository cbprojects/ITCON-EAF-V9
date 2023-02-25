import { Cliente } from "./clienteModel";
import { Servidor } from "./servidorModel";

export interface Sociedad {
    id: any;
    nombre: any;
    nombre10: any;
    tax: any;
    cliente: Cliente;
    servidor: Servidor;
    quienFacturar: any;
    estado: any;
    fechaCreacion: any;
    usuarioCreacion: any;
    fechaActualizacion: any;
    usuarioActualizacion: any;
}