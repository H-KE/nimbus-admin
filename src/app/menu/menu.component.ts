import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service'

@Component({
  selector: 'app-Menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  Menu: any[];

  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.get('menu')
      .map(response => response.json())
      .subscribe(
        res => {
          this.Menu = res;
        },
        error => {
          console.log(error);
        }
      )
  }

}
