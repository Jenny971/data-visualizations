import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ChartService } from "./chart.service";
import { LineChartComponent } from './line-chart/line-chart.component';
import { DifferenceChartComponent } from './difference-chart/difference-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    DifferenceChartComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
	ChartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
