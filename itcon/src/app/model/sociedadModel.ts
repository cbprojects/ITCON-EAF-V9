import { Cliente } from "./clienteModel";

export interface Sociedad {
    id;
    nombre;
    nombre10;
    tax;
    cliente: Cliente;
    estado;
    fechaCreacion;
    usuarioCreacion;
    fechaActualizacion;
    usuarioActualizacion;
}