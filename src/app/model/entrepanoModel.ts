import { Estante } from "./estanteModel";

export interface Entrepano {
    id: any;
    codigo: any;
    estante: Estante;
    estado: any;
    fechaCreacion: any;
    usuarioCreacion: any;
    fechaActualizacion: any;
    usuarioActualizacion: any;
}