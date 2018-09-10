import { NgModule } from '@angular/core';
import { CarouselComponent } from './carousel.component';
import { UserService } from '../../services/user.service';
import { RewardService } from '../../services/reward.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

@NgModule({
    declarations: [
        CarouselComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        ScrollDispatchModule
    ],
    exports: [
        CarouselComponent
    ],
    providers: [
        UserService,
        RewardService,
    ]
})
export class CarouselModule { }
