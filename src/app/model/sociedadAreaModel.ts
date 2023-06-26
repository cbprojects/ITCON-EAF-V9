import { Area } from "./areaModel";
import { Sociedad } from "./sociedadModel";

export interface SociedadArea {
    id: number;
    sociedad: Sociedad;
    area: Area;
    estado: any;
    fechaCreacion: any;
    usuarioCreacion: any;
    fechaActualizacion: any;
    usuarioActualizacion: any;
}