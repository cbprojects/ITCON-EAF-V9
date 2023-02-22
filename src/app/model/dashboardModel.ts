import { Box } from "./boxModel";
import { DataChartTable } from "./dataChartTableModel";
import { Factura } from "./facturaModel";
import { Persona } from "./personaModel";

export interface Dashboard {
    boxes1: {
        box1: Box;
        box2: Box;
        box3: Box;
        box4: Box;
        box5: Box;
        box6: Box;
    };
    chartTable1: {
        data: DataChartTable[];
        table: {
            cabeceras: string[];
            values: Persona[];
        }
    };
    chartPie1: {
        data: DataChartTable[];
    };
    chartPie2: {
        data: DataChartTable[];
    };
    boxes2: {
        box1: Box;
        box2: Box;
    };
    boxes3: {
        box1: Box;
        box2: Box;
        box3: Box;
        box4: Box;
    };
    table1: {
        cabeceras: string[];
        values: Persona[];
    };
    table2: {
        cabeceras: string[];
        values: Persona[];
    };
    table3: {
        cabeceras: string[];
        values: Persona[];
    };
    table4: {
        cabeceras: string[];
        values: Persona[];
    };
    chartBox1: {
        data: DataChartTable[];
        box: Box;
    };
    chartBox2: {
        data: DataChartTable[];
        box: Box;
    };
    chartBox3: {
        data: DataChartTable[];
        box: Box;
    };
    chartBox4: {
        data: DataChartTable[];
        box: Box;
    };
    table5: {
        cabeceras: string[];
        values: Factura[];
    };
}