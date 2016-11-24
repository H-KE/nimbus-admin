import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common'
import { ChartsModule }             from 'ng2-charts/ng2-charts';

import { AnalyticsComponent }          from './analytics.component';
import { AnalyticsRoutingModule }      from './analytics-routing.module';

@NgModule({
    imports: [
        AnalyticsRoutingModule,
        CommonModule,
        ChartsModule
    ],
    declarations: [ AnalyticsComponent ]
})
export class AnalyticsModule { }
