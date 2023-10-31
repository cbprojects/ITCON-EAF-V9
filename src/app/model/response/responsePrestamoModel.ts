import { Prestamo } from "../prestamoModel";

export interface ResponsePrestamo {
    tienePrestamo: boolean;
    prestamo: Prestamo;
    listaPrestamo: Prestamo[];
}