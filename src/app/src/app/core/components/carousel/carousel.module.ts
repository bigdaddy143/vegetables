import { NgModule } from '@angular/core';
import { CarouselComponent } from './carousel.component';
import { UserService } from '../../services/user.service';
import { RewardService } from '../../services/reward.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CourseDialogComponent } from './modals/course-dialog/course-dialog.component';


@NgModule({
    declarations: [
        CarouselComponent,
        CourseDialogComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        MatDialogModule,
        BrowserAnimationsModule
    ],
    exports: [
        CarouselComponent
    ],
    providers: [
        UserService,
        RewardService,
    ],
    entryComponents: [
        CourseDialogComponent
    ]
})
export class CarouselModule { }
