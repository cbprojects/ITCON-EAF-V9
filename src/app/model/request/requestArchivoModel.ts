import { Archivo } from "../archivoModel";

export interface RequestArchivo {
    idUnidadDocumental: any;
    listaArchivosPorSubir: Archivo[];
}