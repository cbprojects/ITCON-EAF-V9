import { Sociedad } from "./sociedadModel";

export interface Proyecto {
    id: any;
    sociedad: Sociedad;
    nombre: any;
    estado: any;
    fechaCreacion: any;
    usuarioCreacion: any;
    fechaActualizacion: any;
    usuarioActualizacion: any;

}