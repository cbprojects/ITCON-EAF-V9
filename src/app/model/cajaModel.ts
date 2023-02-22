import { Cliente } from "./clienteModel";
import { Entrepano } from "./entrepanoModel";

export interface Caja {
    id: any;
    descripcion: any;
    codigoAlterno: any;
    codigoBarras: any;
    qr: any;
    entrepano: Entrepano;
    cliente: Cliente;
    estado: any;
    fechaCreacion: any;
    usuarioCreacion: any;
    fechaActualizacion: any;
    usuarioActualizacion: any;
}