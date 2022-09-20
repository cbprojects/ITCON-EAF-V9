import { Cliente } from "./clienteModel";
import { Entrepano } from "./entrepanoModel";

export interface Caja {
    id;
    descripcion;
    codigoAlterno;
    codigoBarras;
    qr;
    entrepano: Entrepano;
    cliente: Cliente;
    estado;
    fechaCreacion;
    usuarioCreacion;
    fechaActualizacion;
    usuarioActualizacion;
}