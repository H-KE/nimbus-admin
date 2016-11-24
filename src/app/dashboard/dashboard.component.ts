import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';

@Component({
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    constructor( ) { }

    public brandPrimary:string =  '#20a8d8';
    public brandSuccess:string =  '#4dbd74';
    public brandInfo:string =     '#63c2de';
    public brandWarning:string =  '#f8cb00';
    public brandDanger:string =   '#f86c6b';

    // dropdown buttons
    public status: { isopen: boolean } = { isopen: false };
    public toggleDropdown($event:MouseEvent):void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    //convert Hex to RGBA
    public convertHex(hex:string,opacity:number){
        hex = hex.replace('#','');
        let r = parseInt(hex.substring(0,2), 16);
        let g = parseInt(hex.substring(2,4), 16);
        let b = parseInt(hex.substring(4,6), 16);

        let rgba = 'rgba('+r+','+g+','+b+','+opacity/100+')';
        return rgba;
    }

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

    // lineChart1
    public lineChart1Data:Array<any> = [
        {
            data: [65, 74, 100, 105, 133, 155, 240],
            label: 'Series A'
        }
    ];
    public lineChart1Labels:Array<any> = ['May', 'June', 'July', 'August', 'September', 'October', 'November'];
    public lineChart1Options:any = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent'
                },
                ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                }

            }],
            yAxes: [{
                display: false,
                ticks: {
                    display: false,
                    min: 65 - 5,
                    max: 240 + 5,
                }
            }],
        },
        elements: {
            line: {
                borderWidth: 1
            },
            point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
            },
        },
        legend: {
            display: false
        }
    };
    public lineChart1Colours:Array<any> = [
        { // grey
            backgroundColor: this.brandPrimary,
            borderColor: 'rgba(255,255,255,.55)'
        }
    ];
    public lineChart1Legend:boolean = false;
    public lineChart1Type:string = 'line';

    // lineChart2
    public lineChart2Data:Array<any> = [
        {
            data: [1, 18, 9, 17, 34, 51, 66],
            label: 'Series A'
        }
    ];
    public lineChart2Labels:Array<any> = ['May', 'June', 'July', 'August', 'September', 'October', 'November'];
    public lineChart2Options:any = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent'
                },
                ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                }

            }],
            yAxes: [{
                display: false,
                ticks: {
                    display: false,
                    min: 1 - 5,
                    max: 66 + 5,
                }
            }],
        },
        elements: {
            line: {
                tension: 0.00001,
                borderWidth: 1
            },
            point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
            },
        },
        legend: {
            display: false
        }
    };
    public lineChart2Colours:Array<any> = [
        { // grey
            backgroundColor: this.brandInfo,
            borderColor: 'rgba(255,255,255,.55)'
        }
    ];
    public lineChart2Legend:boolean = false;
    public lineChart2Type:string = 'line';


    // lineChart3
    public lineChart3Data:Array<any> = [
        {
            data: [26, 27, 26, 30, 32, 34],
            label: 'Series A'
        }
    ];
    public lineChart3Labels:Array<any> = ['May', 'June', 'July', 'August', 'September', 'October', 'November'];
    public lineChart3Options:any = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false,
                ticks: {
                    display: false,
                    min: 26 - 5,
                    max: 34 + 5,
                }
              }]
        },
        elements: {
            line: {
                borderWidth: 2
            },
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
            },
        },
        legend: {
            display: false
        }
    };
    public lineChart3Colours:Array<any> = [
        {
            backgroundColor: 'rgba(255,255,255,.2)',
            borderColor: 'rgba(255,255,255,.55)',
        }
    ];
    public lineChart3Legend:boolean = false;
    public lineChart3Type:string = 'line';


    // barChart1
    public barChart1Data:Array<any> = [
        {
            data: [18, 20, 21, 20, 23, 24],
            label: 'Series A'
        }
    ];
    public barChart1Labels:Array<any> = ['May', 'June', 'July', 'August', 'September', 'October', 'November'];
    public barChart1Options:any = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                display: false,
                barPercentage: 0.6,
            }],
            yAxes: [{
                display: false
            }]
        },
        legend: {
            display: false
        }
    };
    public barChart1Colours:Array<any> = [
        {
            backgroundColor: 'rgba(255,255,255,.3)',
            borderWidth: 0
        }
    ];
    public barChart1Legend:boolean = false;
    public barChart1Type:string = 'bar';

    public lineChart4Labels:Array<any> = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    public lineChart4Options:any = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false,
                ticks: {
                    display: false,
                    min: 145 - 5,
                    max: 4 + 5,
                }
              }]
        },
        elements: {
            line: {
                borderWidth: 2
            },
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
            },
        },
        legend: {
            display: false
        }
    };

    public lineChart4Data:Array<any> = [
        {
            data: [4, 18, 9, 17, 34, 22, 12, 40, 78, 81, 100, 145],
            label: 'Series A'
        }
    ];
    public lineChart4Colours:Array<any> = [
        {
            backgroundColor: 'transparent',
            borderColor: 'rgba(255,255,255,.55)',
            borderWidth: 2
        }
    ];
    public lineChart4Legend:boolean = false;
    public lineChart4Type:string = 'line';


    // barChart2
    public barChart2Data:Array<any> = [
        {
            data: [4, 18, 9, 17, 34, 22, 12, 40, 78, 81, 100, 145],
            label: 'Series A'
        }
    ];
    public barChart2Labels:Array<any> = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    public barChart2Options:any = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                display:false,
                barPercentage: 0.6,
            }],
            yAxes: [{
                display:false,
                ticks: {
                    beginAtZero: true,
                }
            }]
        },
        legend: {
            display: false
        }
    };
    public barChart2Colours:Array<any> = [
        {
            backgroundColor: 'rgba(0,0,0,.2)',
            borderWidth: 0
        }
    ];
    public barChart2Legend:boolean = false;
    public barChart2Type:string = 'bar';


    // mainChart

    public random(min:number, max:number) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    public mainChartElements:number = 27;
    public mainChartData1:Array<number> = [];
    public mainChartData2:Array<number> = [];
    public mainChartData3:Array<number> = [];

    public mainChartData:Array<any> = [
        {
            data: this.mainChartData1,
            label: 'Current'
        },
        {
            data: this.mainChartData2,
            label: 'Previous'
        },
        {
            data: this.mainChartData3,
            label: 'BEP'
        }
    ];
    public mainChartLabels:Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    public mainChartOptions:any = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                gridLines: {
                    drawOnChartArea: false,
                },
                ticks: {
                    callback: function(value:any) {
                        return value.charAt(0);
                    }
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 400
                }
            }]
        },
        elements: {
            line: {
                borderWidth: 2
            },
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3,
            }
        },
        legend: {
            display: false
        }
    };
    public mainChartColours:Array<any> = [
        { //brandInfo
            backgroundColor: this.convertHex(this.brandInfo,10),
            borderColor: this.brandInfo,
            pointHoverBackgroundColor: '#fff'
        },
        { //brandSuccess
            backgroundColor: 'transparent',
            borderColor: this.brandSuccess,
            pointHoverBackgroundColor: '#fff'
        },
        { //brandDanger
            backgroundColor: 'transparent',
            borderColor: this.brandDanger,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 1,
            borderDash: [8, 5]
        }
    ];
    public mainChartLegend:boolean = false;
    public mainChartType:string = 'line';


    ngOnInit(): void {
        //generate random values for mainChart
        for (var i = 0; i <= this.mainChartElements; i++) {
            this.mainChartData1.push(this.random(50,200));
            this.mainChartData2.push(this.random(80,100) + 200);
            this.mainChartData3.push(65);
        }
    }
}
