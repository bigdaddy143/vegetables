import { NgModule } from '@angular/core';
import { CarouselComponent } from './carousel.component';
import { UserService } from '../../services/user.service';
import { RewardService } from '../../services/reward.service';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
        CarouselComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CarouselComponent
    ],
    providers: [
        UserService,
        RewardService
    ]
})
export class CarouselModule { }
