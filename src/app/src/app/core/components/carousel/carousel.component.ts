import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { UserService } from '../../services/user.service';
import { RewardService } from '../../services/reward.service';
import { Reward } from '../../models/rewards.model';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CourseDialogComponent } from './modals/course-dialog/course-dialog.component';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  // private variable declarations
  private _userId: number;

  // public variable declarations
  public carouselItems: Reward[];
  public originalCarouselItems: Reward[];

  constructor(
    private _userService: UserService,
    private _rewardService: RewardService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this._userId = this._userService.getUserId();
    this.getRewards();
  }

  /**
   * Retrieves rewards from the backend. Currently does not use auth/user identity
   */
  getRewards() {
    this._rewardService.getCarouselRewards(this._userId)
    .subscribe(rewards => {
      const s = _.orderBy(this._rewardService.mapPercentageHeight(rewards), ['price'], ['desc']);
      this.carouselItems = _.orderBy(this._rewardService.mapPercentageHeight(rewards), ['price'], ['desc']);
      this.originalCarouselItems = this.carouselItems;
    });
    return this.carouselItems;
  }

  /**
   * Updates the selected reward for the current user.
   * @param reward The reward that the user has selected from the carousel
   */
  updateSelectedReward(reward: Reward) {
    // currently stubbed out, will need to switch this to subscribe to an observable and throw an error if unsuccesful
    // the service will go unselect the other reward item on the backend
    this._rewardService.setSelectedReward(this._userId, reward.rewardId);

    // just doing this short hand for now, looping back through the other items and unselecting
    this.carouselItems.forEach(rewardItem => {
      if (rewardItem !== reward) {
        rewardItem.selected = false;
      } else {
        // updating the value on the reward passed in
        rewardItem.selected = true;
      }
    });

    // set new percentage height of rewards
    this.carouselItems = this._rewardService.mapPercentageHeight(this.carouselItems);
  }

  /**
   * As the user enters values into the reward search, filter the list
   * @param searchValue
   */
  onRewardsSearch(event: any) {
    const searchValue = event.srcElement.value;
    if (searchValue === '' || typeof (searchValue) === 'undefined' || searchValue === null) {
      this.carouselItems = this.originalCarouselItems;
    } else {
      this.carouselItems = this.carouselItems.filter(reward => {
        return reward.name.includes(searchValue);
      });
    }
  }


  openDialog(reward: Reward) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      right: '50%'
    };
    dialogConfig.data = {
      reward: reward
    };

    // this.dialog.open(CourseDialogComponent, dialogConfig);

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log('Dialog output:', data);
        if (data && data.reward) {
          this.updateSelectedReward(data.reward);
        }
    }
    );
  }
}
