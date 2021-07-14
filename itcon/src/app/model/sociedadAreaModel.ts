import { Area } from "./areaModel";
import { Sociedad } from "./sociedadModel";

export interface SociedadArea {
    id;
    sociedad: Sociedad;
    area: Area;
    estado;
    fechaCreacion;
    usuarioCreacion;
    fechaActualizacion;
    usuarioActualizacion;
}