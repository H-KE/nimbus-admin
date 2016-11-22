import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service'

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: any[];

  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.get('orders')
      .map(response => response.json())
      .subscribe(
        res => {
          this.orders = res;
        },
        error => {
          console.log(error);
        }
      )
  }

}
