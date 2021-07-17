function chartDevelopmentActivity() {
    $(document).ready(function () {
        var chart = c3.generate({
            bindto: '#chart-development-activity', // id of chart wrapper
            data: {
                columns: [
                    // each columns data
                    ['data1', '0', '115', '1', '2', '7', '5', '6', '8', '24', '7', '12', '5', '6', '3', '2', '2', '6', '30', '10', '10', '15', '14', '47', '65', '5'],
                    ['data2', 10, 15, 1, 2, 7, 5, 61, 81, 24, 7, 12, 5, 6, 3, 2, 2, 6, 30, 10, 10, 15, 14, 47, 65, 55],
                    ['data3', 0, 5, 11, 21, 71, 51, 6, 8, 24, 7, 12, 5, 6, 3, 2, 2, 6, 30, 10, 10, 15, 14, 47, 65, 55],
                ],
                type: 'area', // default type of chart
                groups: [
                    ['data1', 'data2', 'data3']
                ],
                colors: {
                    'data1': tabler.colors["blue"],
                    'data2': tabler.colors["green"],
                    'data3': tabler.colors["red"]
                },
                names: {
                    // name of each serie
                    'data1': 'Carlos',
                    'data2': 'Felipe',
                    'data3': 'Julio'
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
                    title: function (x) {
                        return '';
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

function chartTable1(charTable1) {
    $(document).ready(function () {
        // Extraer info del parámetro
        var chart = c3.generate({
            bindto: '#chart-development-activity', // id of chart wrapper
            data: {
                columns: [
                    // each columns data
                    ['data1', '0', '115', '1', '2', '7', '5', '6', '8', '24', '7', '12', '5', '6', '3', '2', '2', '6', '30', '10', '10', '15', '14', '47', '65', '5'],
                    ['data2', 10, 15, 1, 2, 7, 5, 61, 81, 24, 7, 12, 5, 6, 3, 2, 2, 6, 30, 10, 10, 15, 14, 47, 65, 55],
                    ['data3', 0, 5, 11, 21, 71, 51, 6, 8, 24, 7, 12, 5, 6, 3, 2, 2, 6, 30, 10, 10, 15, 14, 47, 65, 55],
                ],
                type: 'area', // default type of chart
                groups: [
                    ['data1', 'data2', 'data3']
                ],
                colors: {
                    'data1': tabler.colors["blue"],
                    'data2': tabler.colors["green"],
                    'data3': tabler.colors["red"]
                },
                names: {
                    // name of each serie
                    'data1': 'Carlos',
                    'data2': 'Felipe',
                    'data3': 'Julio'
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
                    title: function (x) {
                        return '';
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

function chartDonut() {
    $(document).ready(function () {
        var chart = c3.generate({
            bindto: '#chart-donut', // id of chart wrapper
            data: {
                columns: [
                    // each columns data
                    ['data1', 63],
                    ['data2', 37]
                ],
                type: 'donut', // default type of chart
                colors: {
                    'data1': tabler.colors["green"],
                    'data2': tabler.colors["green-light"]
                },
                names: {
                    // name of each serie
                    'data1': 'Maximum',
                    'data2': 'Minimum'
                }
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

function chartPie() {
    $(document).ready(function () {
        var chart = c3.generate({
            bindto: '#chart-pie', // id of chart wrapper
            data: {
                columns: [
                    // each columns data
                    ['data1', 63],
                    ['data2', 44],
                    ['data3', 12],
                    ['data4', 14]
                ],
                type: 'pie', // default type of chart
                colors: {
                    'data1': tabler.colors["blue-darker"],
                    'data2': tabler.colors["blue"],
                    'data3': tabler.colors["blue-light"],
                    'data4': tabler.colors["blue-lighter"]
                },
                names: {
                    // name of each serie
                    'data1': 'A',
                    'data2': 'B',
                    'data3': 'C',
                    'data4': 'D'
                }
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

function chartBgUsers1() {
    $(document).ready(function () {
        var chart = c3.generate({
            bindto: '#chart-bg-users-1',
            padding: {
                bottom: -10,
                left: -1,
                right: -1
            },
            data: {
                names: {
                    data1: 'Users online'
                },
                columns: [
                    ['data1', 30, 40, 10, 40, 12, 22, 40]
                ],
                type: 'area'
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
                    title: function (x) {
                        return '';
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
                pattern: ['#467fcf']
            }
        });
    });
}

function chartBgUsers2() {
    $(document).ready(function () {
        var chart = c3.generate({
            bindto: '#chart-bg-users-2',
            padding: {
                bottom: -10,
                left: -1,
                right: -1
            },
            data: {
                names: {
                    data1: 'Users online'
                },
                columns: [
                    ['data1', 30, 40, 10, 40, 12, 22, 40]
                ],
                type: 'area'
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
                    title: function (x) {
                        return '';
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
                pattern: ['#e74c3c']
            }
        });
    });
}

function chartBgUsers3() {
    $(document).ready(function () {
        var chart = c3.generate({
            bindto: '#chart-bg-users-3',
            padding: {
                bottom: -10,
                left: -1,
                right: -1
            },
            data: {
                names: {
                    data1: 'Users online'
                },
                columns: [
                    ['data1', 30, 40, 10, 40, 12, 22, 40]
                ],
                type: 'area'
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
                    title: function (x) {
                        return '';
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
                pattern: ['#5eba00']
            }
        });
    });
}

function chartBgUsers4() {
    $(document).ready(function () {
        var chart = c3.generate({
            bindto: '#chart-bg-users-4',
            padding: {
                bottom: -10,
                left: -1,
                right: -1
            },
            data: {
                names: {
                    data1: 'Users online'
                },
                columns: [
                    ['data1', 30, 40, 10, 40, 12, 22, 40]
                ],
                type: 'area'
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
                    title: function (x) {
                        return '';
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
                pattern: ['#f1c40f']
            }
        });
    });
}