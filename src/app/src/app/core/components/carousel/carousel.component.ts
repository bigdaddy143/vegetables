import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RewardService } from '../../services/reward.service';
import { Reward } from '../../models/rewards.model';

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
    private _rewardService: RewardService
  ) { }

  ngOnInit() {
    this._userId = this._userService.getUserId();
    this.getRewards();
  }

  getRewards() {
    this.originalCarouselItems = this._rewardService.getMockedCarouselRewards(this._userId);
    // .subscribe(result => {
    //   this.carouselItems = result
    // }) : [];
    this.carouselItems = this.originalCarouselItems;
    return this.carouselItems;
  }

  /**
   * Updates the selected reward for the current user.
   * @param reward The reward that the user has selected from the carousel
   */
  updateSelectedReward(reward: Reward) {
    // Confirm that this isn't already the selected reward for the user
    if (!reward.selected) {
      // currently stubbed out, will need to switch this to subscribe to an observable and throw an error if unsuccesful
      // the service will go unselect the other reward item on the backend
      // on the front end we probably dont want to wait for this to take place and can just do it shorthand in the meantime
      this._rewardService.setSelectedReward(this._userId, reward.rewardId);
    }

    // just doing this short hand for now, looping back through the other items and unselecting
    this.carouselItems.forEach(rewardItem => {
      if (rewardItem !== reward) {
        rewardItem.selected = false;
      }
    });

    // updating the value on the reward passed in
    reward.selected = true;
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
}
