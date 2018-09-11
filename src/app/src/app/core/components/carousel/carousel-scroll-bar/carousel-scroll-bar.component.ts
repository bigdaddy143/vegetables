import { Component, OnInit, OnChanges } from '@angular/core';
import { ViewChild } from "@angular/core";
import { TemplateRef } from "@angular/core";
import { Input } from "@angular/core";
import { SimpleChanges } from "@angular/core";

@Component({
  selector: 'app-carousel-scroll-bar',
  templateUrl: './carousel-scroll-bar.component.html',
  styleUrls: ['./carousel-scroll-bar.component.scss']
})
export class CarouselScrollBarComponent implements OnInit {

  private _currentAmount: number;
  private _percentagePlacement: number;  

  @ViewChild("ScrollPlacement") scrollPlacement;
  @ViewChild("ScrollLine") scrollLine;

  @Input() currentAmount: number

  @Input() percentagePlacement: any

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.percentagePlacement) {
      const height = this.scrollLine.nativeElement.clientHeight;
      // top == 0 means its at the top
      // top = height of scroll means its at the bottom
      // % placement * height of scroll 
      // .25 * 400 = 
      const newTopMargin = changes.percentagePlacement.currentValue * height;
      // this.scrollPlacement.nativeElement.style.bottom = newTopMargin + 'px';
      this.scrollPlacement.nativeElement.style.bottom = newTopMargin + 'px';
      
    }
    if(changes.currentAmount) {
      const pp = 5;
    }
  }

}
