import { Estante } from "./estanteModel";

export interface Entrepano {
    id;
    codigo;
    estante: Estante;
    estado;
    fechaCreacion;
    usuarioCreacion;
    fechaActualizacion;
    usuarioActualizacion;
}