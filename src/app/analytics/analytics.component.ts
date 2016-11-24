import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service'

@Component({
  selector: 'app-Analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent {

  constructor() { }

  // events
  public chartClicked(e:any):void {
      console.log(e);
  }

  public chartHovered(e:any):void {
      console.log(e);
  }

  // lineChart
  public lineChartData:Array<any> = [
      {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
      {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
      {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
      animation: false,
      responsive: true
  };
  public lineChartColours:Array<any> = [
      { // grey
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      { // dark grey
          backgroundColor: 'rgba(77,83,96,0.2)',
          borderColor: 'rgba(77,83,96,1)',
          pointBackgroundColor: 'rgba(77,83,96,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(77,83,96,1)'
      },
      { // grey
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  // barChart
  public barChartOptions:any = {
      scaleShowVerticalLines: false,
      responsive: true
  };
  public barChartLabels:string[] = ['May', 'June', 'July', 'August', 'September', 'October', 'November'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
      {data: [63, 69, 80, 81, 79, 90, 96], label:'Views'},
      {data: [28, 48, 40, 19, 30, 27, 40], label:'Conversions'}
  ];

  // Doughnut
  public doughnutChartLabels:string[] = ['Delivery Sales', 'Pickup Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';

  // Radar
  public radarChartLabels:string[] = ['Tears', 'Extracts', 'Capsules', 'Gear', 'Edibles', 'Other', 'Flowers'];

  public radarChartData:any = [
      {data: [65, 59, 90, 81, 56, 55, 40], label: 'Views'},
      {data: [28, 48, 40, 19, 96, 27, 100], label: 'Conversions'}
  ];
  public radarChartType:string = 'radar';

  // Pie
  public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';

  // PolarArea
  public polarAreaChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  public polarAreaChartData:number[] = [300, 500, 100, 40, 120];
  public polarAreaLegend:boolean = true;

  public polarAreaChartType:string = 'polarArea';

}
