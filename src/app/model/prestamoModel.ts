export interface Prestamo {
    id: number;
    idUd: number;
    fechaPrestamo: any;
    responsable: string;
    observacion: string;

    estado: number;
    fechaCreacion: any;
    usuarioCreacion: string;
    fechaActualizacion: any;
    usuarioActualizacion: string;
}