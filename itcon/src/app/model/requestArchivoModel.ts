import { Archivo } from "./archivoModel";

export interface RequestArchivo {
    idUnidadDocumental;
    listaArchivosPorSubir: Archivo[];
}