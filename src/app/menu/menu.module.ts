import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common'

import { MenuComponent }          from './menu.component';
import { MenuRoutingModule }      from './menu-routing.module';

@NgModule({
    imports: [
        MenuRoutingModule,
        CommonModule
    ],
    declarations: [ MenuComponent ]
})
export class MenuModule { }
