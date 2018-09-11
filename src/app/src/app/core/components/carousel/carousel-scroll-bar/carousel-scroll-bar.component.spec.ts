import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselScrollBarComponent } from './carousel-scroll-bar.component';

describe('CarouselScrollBarComponent', () => {
  let component: CarouselScrollBarComponent;
  let fixture: ComponentFixture<CarouselScrollBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselScrollBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselScrollBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
