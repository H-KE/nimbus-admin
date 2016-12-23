import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu: any[];

  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.get('retailers/' + this.auth._currentUserData.retailer_id + '/products')
      .map(response => response.json())
      .subscribe(
        res => {
          this.menu = res;
          console.log(res)
        },
        error => {
          console.log(error);
        }
      )
  }

}
