import { Component, OnInit }            from '@angular/core';
import { Router } from '@angular/router'
import { AuthenticationService } from '../authentication/authentication.service'

@Component({
    selector: 'app-dashboard',
    templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {

    user: any;
    retailer: any;

    constructor(public  auth: AuthenticationService,
                private router: Router) {
      this.user = {
        role: 'NONE'
      }
    }

    ngOnInit() {
      this.auth.validateToken()
          .map(response => response.json())
          .subscribe(
            user => {
              this.user = user;
              this.loadRetailer();
              console.log(this.user);
            },
            error => {
              this.router.navigate(['/pages/login']);
            }
          );
    }

    public disabled:boolean = false;
    public status:{isopen:boolean} = {isopen: false};

    public toggled(open:boolean):void {
        console.log('Dropdown is now: ', open);
    }

    public toggleDropdown($event:MouseEvent):void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    public loadRetailer() {
        this.auth.get('retailer/' + this.user.retailer_id)
            .map(response => response.json())
            .subscribe(
              retailer => {
                this.retailer = retailer;
              },
              error => {
                console.log(error);
              }
            )
    }
}
