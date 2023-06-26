import { BodegaPermisos } from "./bodegaPermisosModel";

export interface RequestConsultaBodegaPermisos {
    permisosBodega: BodegaPermisos;
    registroInicial: any;
    cantidadRegistro: any;
}