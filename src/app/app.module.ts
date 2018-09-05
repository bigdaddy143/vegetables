import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CarouselModule } from './core/components/carousel/carousel.module';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CarouselModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
