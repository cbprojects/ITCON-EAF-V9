import { Bodega } from "./bodegaModel";
import { Usuario } from "./usuarioModel";

export interface BodegaPermisos {
    id: any;
    bodega: Bodega;
    usuario: Usuario;
    crear: any;
    editar: any;
    consultar: any;
    eliminar: any;
    estado: any;
    fechaCreacion: any;
    usuarioCreacion: any;
    fechaActualizacion: any;
    usuarioActualizacion: any;

}