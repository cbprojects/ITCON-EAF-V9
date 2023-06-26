import { Archivo } from "./archivoModel";

export interface ResponseGenerarPdf {
    codigo: string;
    mensaje: string;
    archivo: Archivo;
}