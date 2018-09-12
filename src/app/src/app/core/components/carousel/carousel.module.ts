import { NgModule } from '@angular/core';
import { CarouselComponent } from './carousel.component';
import { UserService } from '../../services/user.service';
import { RewardService } from '../../services/reward.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CourseDialogComponent } from './modals/course-dialog/course-dialog.component';
import { CarouselScrollBarComponent } from "./carousel-scroll-bar/carousel-scroll-bar.component";
import { ChangeDetectorRef } from "@angular/core";
import { CarouselUtils } from "./utils/carouselUtils";

@NgModule({
    declarations: [
        CarouselComponent,
        CourseDialogComponent,
        CarouselScrollBarComponent,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        ScrollDispatchModule,
        MatDialogModule,
        BrowserAnimationsModule,
    ],
    exports: [
        CarouselComponent
    ],
    providers: [
        UserService,
        RewardService,
        CarouselUtils
    ],
    entryComponents: [
        CourseDialogComponent
    ]
})
export class CarouselModule { }
