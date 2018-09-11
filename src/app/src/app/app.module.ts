import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CarouselModule } from './core/components/carousel/carousel.module';
import { CommonModule } from '@angular/common';
import { IncomeComponent } from './core/components/income/income.component';
import { AnimationComponent } from './core/components/animation/animation.component';
import { MachineComponent } from './core/components/machine/machine.component';
import { MachineService } from './core/services/machine.service';
import { StatisticsComponent } from './core/components/statistics/statistics.component';
import { StatisticsService } from './core/services/statistics.service';


@NgModule({
  declarations: [
    AppComponent,
    IncomeComponent,
    AnimationComponent,
    MachineComponent,
    StatisticsComponent,
  ],
  imports: [
    BrowserModule,
    CarouselModule,
    CommonModule,
  ],
  providers: [
    MachineService,
    StatisticsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
