function crearMapaGraficaDeLista(lista) {
    var mapaGrafica = new Map();
    lista.forEach(punto => {
        if (mapaGrafica.size === 0) {
            var listaInterna = [punto];
            mapaGrafica.set(punto.column, listaInterna);
        } else {
            if (mapaGrafica.has(punto.column)) {
                mapaGrafica.get(punto.column).push(punto);
            } else {
                var listaInterna = [punto];
                mapaGrafica.set(punto.column, listaInterna);
            }
        }
    });
    return mapaGrafica;
}

function chartDevelopmentActivity(dataEJM) {
    if (dataEJM !== undefined && dataEJM !== null) {
        // Armamos mapa de las gráficas
        var mapaGrafica = this.crearMapaGraficaDeLista(dataEJM);
        var keysGrafica = [...mapaGrafica.keys()];
        var columnas = [];
        var strColores = "{";
        var strLabels = "{";
        keysGrafica.forEach(key => {
            // Colores
            strColores = strColores + '"' + key + '": "' + mapaGrafica.get(key)[0].color + '", ';

            // Labels
            strLabels = strLabels + '"' + key + '": "' + mapaGrafica.get(key)[0].label + '", ';

            // Columnas
            var columnInterno = [key];
            mapaGrafica.get(key).forEach(punto => {
                columnInterno.push(punto.value);
            });

            columnas.push(columnInterno);
        });
        strColores = strColores.substring(0, strColores.length - 2) + "}";
        strLabels = strLabels.substring(0, strLabels.length - 2) + "}";
        var objColores = JSON.parse(strColores);
        var objLabels = JSON.parse(strLabels);

        $(document).ready(function () {
            var chart = c3.generate({
                bindto: '#chart-development-activity', // id of chart wrapper
                data: {
                    columns: columnas,
                    type: 'area', // default type of chart
                    groups: [
                        keysGrafica
                    ],
                    colors: objColores,
                    names: objLabels
                },
                axis: {
                    y: {
                        padding: {
                            bottom: 0,
                        },
                        show: false,
                        tick: {
                            outer: false
                        }
                    },
                    x: {
                        padding: {
                            left: 0,
                            right: 0
                        },
                        show: false
                    }
                },
                legend: {
                    position: 'inset',
                    padding: 0,
                    inset: {
                        anchor: 'top-left',
                        x: 20,
                        y: 8,
                        step: 10
                    }
                },
                tooltip: {
                    format: {
                        title: function (d) { return 'Data ' + d; },
                        value: function (value, ratio, id) {
                            var format = id === 'data1' ? d3.format(',') : d3.format('$');
                            return format(value);
                        }
                    }
                },
                padding: {
                    bottom: 0,
                    left: -1,
                    right: -1
                },
                point: {
                    show: false
                }
            });
        });
    }
}

function chartDonut(dataEJM) {
    if (dataEJM !== undefined && dataEJM !== null) {
        // Armamos mapa de las gráficas
        var mapaGrafica = this.crearMapaGraficaDeLista(dataEJM);
        var keysGrafica = [...mapaGrafica.keys()];
        var columnas = [];
        var strColores = "{";
        var strLabels = "{";
        keysGrafica.forEach(key => {
            // Colores
            strColores = strColores + '"' + key + '": "' + mapaGrafica.get(key)[0].color + '", ';

            // Labels
            strLabels = strLabels + '"' + key + '": "' + mapaGrafica.get(key)[0].label + '", ';

            // Columnas
            var columnInterno = [key];
            mapaGrafica.get(key).forEach(punto => {
                columnInterno.push(punto.value);
            });

            columnas.push(columnInterno);
        });
        strColores = strColores.substring(0, strColores.length - 2) + "}";
        strLabels = strLabels.substring(0, strLabels.length - 2) + "}";
        var objColores = JSON.parse(strColores);
        var objLabels = JSON.parse(strLabels);

        $(document).ready(function () {
            var chart = c3.generate({
                bindto: '#chart-donut', // id of chart wrapper
                data: {
                    columns: columnas,
                    type: 'donut', // default type of chart
                    groups: [
                        keysGrafica
                    ],
                    colors: objColores,
                    names: objLabels
                },
                axis: {
                },
                legend: {
                    show: false, //hide legend
                },
                padding: {
                    bottom: 0,
                    top: 0
                },
            });
        });
    }
}

function chartPie(dataEJM) {
    if (dataEJM !== undefined && dataEJM !== null) {
        // Armamos mapa de las gráficas
        var mapaGrafica = this.crearMapaGraficaDeLista(dataEJM);
        var keysGrafica = [...mapaGrafica.keys()];
        var columnas = [];
        var strColores = "{";
        var strLabels = "{";
        keysGrafica.forEach(key => {
            // Colores
            strColores = strColores + '"' + key + '": "' + mapaGrafica.get(key)[0].color + '", ';

            // Labels
            strLabels = strLabels + '"' + key + '": "' + mapaGrafica.get(key)[0].label + '", ';

            // Columnas
            var columnInterno = [key];
            mapaGrafica.get(key).forEach(punto => {
                columnInterno.push(punto.value);
            });

            columnas.push(columnInterno);
        });
        strColores = strColores.substring(0, strColores.length - 2) + "}";
        strLabels = strLabels.substring(0, strLabels.length - 2) + "}";
        var objColores = JSON.parse(strColores);
        var objLabels = JSON.parse(strLabels);

        $(document).ready(function () {
            var chart = c3.generate({
                bindto: '#chart-pie', // id of chart wrapper
                data: {
                    columns: columnas,
                    type: 'pie', // default type of chart
                    groups: [
                        keysGrafica
                    ],
                    colors: objColores,
                    names: objLabels
                },
                axis: {
                },
                legend: {
                    show: false, //hide legend
                },
                padding: {
                    bottom: 0,
                    top: 0
                },
            });
        });
    }
}

function chartBgUsers1(dataEJM) {
    if (dataEJM !== undefined && dataEJM !== null) {
        // Armamos mapa de las gráficas
        var mapaGrafica = this.crearMapaGraficaDeLista(dataEJM);
        var keysGrafica = [...mapaGrafica.keys()];
        var columnas = [];
        var strColores = "{";
        var strLabels = "{";
        keysGrafica.forEach(key => {
            // Colores
            strColores = strColores + '"' + key + '": "' + mapaGrafica.get(key)[0].color + '", ';

            // Labels
            strLabels = strLabels + '"' + key + '": "' + mapaGrafica.get(key)[0].label + '", ';

            // Columnas
            var columnInterno = [key];
            mapaGrafica.get(key).forEach(punto => {
                columnInterno.push(punto.value);
            });

            columnas.push(columnInterno);
        });
        strColores = strColores.substring(0, strColores.length - 2) + "}";
        strLabels = strLabels.substring(0, strLabels.length - 2) + "}";
        var objColores = JSON.parse(strColores);
        var objLabels = JSON.parse(strLabels);
        $(document).ready(function () {
            var chart = c3.generate({
                bindto: '#chart-bg-users-1',
                padding: {
                    bottom: -10,
                    left: -1,
                    right: -1
                },
                data: {
                    names: objLabels,
                    columns: columnas,
                    colors: objColores,
                    type: 'area' // default type of chart
                },
                legend: {
                    show: false
                },
                transition: {
                    duration: 0
                },
                point: {
                    show: false
                },
                tooltip: {
                    format: {
                        title: function (d) { return 'Data ' + d; },
                        value: function (value, ratio, id) {
                            var format = id === 'data1' ? d3.format(',') : d3.format('$');
                            return format(value);
                        }
                    }
                },
                axis: {
                    y: {
                        padding: {
                            bottom: 0,
                        },
                        show: false,
                        tick: {
                            outer: false
                        }
                    },
                    x: {
                        padding: {
                            left: 0,
                            right: 0
                        },
                        show: false
                    }
                },
                color: {
                    pattern: [dataEJM.color]
                }
            });
        });
    }
}

function chartBgUsers2(dataEJM) {
    if (dataEJM !== undefined && dataEJM !== null) {
        // Armamos mapa de las gráficas
        var mapaGrafica = this.crearMapaGraficaDeLista(dataEJM);
        var keysGrafica = [...mapaGrafica.keys()];
        var columnas = [];
        var strColores = "{";
        var strLabels = "{";
        keysGrafica.forEach(key => {
            // Colores
            strColores = strColores + '"' + key + '": "' + mapaGrafica.get(key)[0].color + '", ';

            // Labels
            strLabels = strLabels + '"' + key + '": "' + mapaGrafica.get(key)[0].label + '", ';

            // Columnas
            var columnInterno = [key];
            mapaGrafica.get(key).forEach(punto => {
                columnInterno.push(punto.value);
            });

            columnas.push(columnInterno);
        });
        strColores = strColores.substring(0, strColores.length - 2) + "}";
        strLabels = strLabels.substring(0, strLabels.length - 2) + "}";
        var objColores = JSON.parse(strColores);
        var objLabels = JSON.parse(strLabels);
        $(document).ready(function () {
            var chart = c3.generate({
                bindto: '#chart-bg-users-2',
                padding: {
                    bottom: -10,
                    left: -1,
                    right: -1
                },
                data: {
                    names: objLabels,
                    columns: columnas,
                    colors: objColores,
                    type: 'area' // default type of chart
                },
                legend: {
                    show: false
                },
                transition: {
                    duration: 0
                },
                point: {
                    show: false
                },
                tooltip: {
                    format: {
                        title: function (d) { return 'Data ' + d; },
                        value: function (value, ratio, id) {
                            var format = id === 'data1' ? d3.format(',') : d3.format('$');
                            return format(value);
                        }
                    }
                },
                axis: {
                    y: {
                        padding: {
                            bottom: 0,
                        },
                        show: false,
                        tick: {
                            outer: false
                        }
                    },
                    x: {
                        padding: {
                            left: 0,
                            right: 0
                        },
                        show: false
                    }
                },
                color: {
                    pattern: [dataEJM.color]
                }
            });
        });
    }
}

function chartBgUsers3(dataEJM) {
    if (dataEJM !== undefined && dataEJM !== null) {
        // Armamos mapa de las gráficas
        var mapaGrafica = this.crearMapaGraficaDeLista(dataEJM);
        var keysGrafica = [...mapaGrafica.keys()];
        var columnas = [];
        var strColores = "{";
        var strLabels = "{";
        keysGrafica.forEach(key => {
            // Colores
            strColores = strColores + '"' + key + '": "' + mapaGrafica.get(key)[0].color + '", ';

            // Labels
            strLabels = strLabels + '"' + key + '": "' + mapaGrafica.get(key)[0].label + '", ';

            // Columnas
            var columnInterno = [key];
            mapaGrafica.get(key).forEach(punto => {
                columnInterno.push(punto.value);
            });

            columnas.push(columnInterno);
        });
        strColores = strColores.substring(0, strColores.length - 2) + "}";
        strLabels = strLabels.substring(0, strLabels.length - 2) + "}";
        var objColores = JSON.parse(strColores);
        var objLabels = JSON.parse(strLabels);
        $(document).ready(function () {
            var chart = c3.generate({
                bindto: '#chart-bg-users-3',
                padding: {
                    bottom: -10,
                    left: -1,
                    right: -1
                },
                data: {
                    names: objLabels,
                    columns: columnas,
                    colors: objColores,
                    type: 'area' // default type of chart
                },
                legend: {
                    show: false
                },
                transition: {
                    duration: 0
                },
                point: {
                    show: false
                },
                tooltip: {
                    format: {
                        title: function (d) { return 'Data ' + d; },
                        value: function (value, ratio, id) {
                            var format = id === 'data1' ? d3.format(',') : d3.format('$');
                            return format(value);
                        }
                    }
                },
                axis: {
                    y: {
                        padding: {
                            bottom: 0,
                        },
                        show: false,
                        tick: {
                            outer: false
                        }
                    },
                    x: {
                        padding: {
                            left: 0,
                            right: 0
                        },
                        show: false
                    }
                },
                color: {
                    pattern: [dataEJM.color]
                }
            });
        });
    }
}

function chartBgUsers4(dataEJM) {
    if (dataEJM !== undefined && dataEJM !== null) {
        // Armamos mapa de las gráficas
        var mapaGrafica = this.crearMapaGraficaDeLista(dataEJM);
        var keysGrafica = [...mapaGrafica.keys()];
        var columnas = [];
        var strColores = "{";
        var strLabels = "{";
        keysGrafica.forEach(key => {
            // Colores
            strColores = strColores + '"' + key + '": "' + mapaGrafica.get(key)[0].color + '", ';

            // Labels
            strLabels = strLabels + '"' + key + '": "' + mapaGrafica.get(key)[0].label + '", ';

            // Columnas
            var columnInterno = [key];
            mapaGrafica.get(key).forEach(punto => {
                columnInterno.push(punto.value);
            });

            columnas.push(columnInterno);
        });
        strColores = strColores.substring(0, strColores.length - 2) + "}";
        strLabels = strLabels.substring(0, strLabels.length - 2) + "}";
        var objColores = JSON.parse(strColores);
        var objLabels = JSON.parse(strLabels);
        $(document).ready(function () {
            var chart = c3.generate({
                bindto: '#chart-bg-users-4',
                padding: {
                    bottom: -10,
                    left: -1,
                    right: -1
                },
                data: {
                    names: objLabels,
                    columns: columnas,
                    colors: objColores,
                    type: 'area' // default type of chart
                },
                legend: {
                    show: false
                },
                transition: {
                    duration: 0
                },
                point: {
                    show: false
                },
                tooltip: {
                    format: {
                        title: function (d) { return 'Data ' + d; },
                        value: function (value, ratio, id) {
                            var format = id === 'data1' ? d3.format(',') : d3.format('$');
                            return format(value);
                        }
                    }
                },
                axis: {
                    y: {
                        padding: {
                            bottom: 0,
                        },
                        show: false,
                        tick: {
                            outer: false
                        }
                    },
                    x: {
                        padding: {
                            left: 0,
                            right: 0
                        },
                        show: false
                    }
                },
                color: {
                    pattern: [dataEJM.color]
                }
            });
        });
    }
}

function chartsCircles() {
    $(document).ready(function () {
        if ($('.chart-circle').length) {
            $('.chart-circle').each(function () {
                let $this = $(this);

                $this.circleProgress({
                    fill: {
                        color: tabler.colors[$this.attr('data-color')] || tabler.colors.blue
                    },
                    size: $this.height(),
                    startAngle: -Math.PI / 4 * 2,
                    emptyFill: '#F4F4F4',
                    lineCap: 'round'
                });
            });
        }
    });
}