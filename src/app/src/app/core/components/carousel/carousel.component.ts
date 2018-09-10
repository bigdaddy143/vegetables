import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkScrollable, ScrollDispatcher, ScrollDispatchModule } from '@angular/cdk/scrolling';
import * as _ from 'lodash';
import { UserService } from '../../services/user.service';
import { RewardService } from '../../services/reward.service';
import { Reward } from '../../models/rewards.model';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CourseDialogComponent } from './modals/course-dialog/course-dialog.component';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterViewInit {
  // private variable declarations
  private _userId: number;

  // public variable declarations
  public carouselItems: Reward[];
  public selectedReward: Reward;
  public scrolledToReward: Reward;
  public originalCarouselItems: Reward[];
  private currentScrollTop: number;

  constructor(
    private _userService: UserService,
    private _rewardService: RewardService,
    private dialog: MatDialog
  ) { }
  @ViewChild(CdkScrollable) scrollable: CdkScrollable;
  // @ViewChild('scrollingElement') scrollingElement: ElementRef<HTMLElement>;

  ngOnInit() {
    this._userId = this._userService.getUserId();
    this.initRewards();
  }

  ngAfterViewInit() {
    // i am trying to find the newly scrolled to item and add a new class to it
    this.scrollable.elementScrolled().subscribe(elem => {
      // const test = this.scrollable.getElementRef().nativeElement.children;
      this.scrollable.getElementRef().nativeElement.children[this.scrolledToReward.rewardId]
        .classList.remove('item-scrolled-to');;

      const currentlyScrolledTo = this.scrolledToReward;
      const currentScrolledIndex = this.carouselItems.findIndex(r => r.rewardId === currentlyScrolledTo.rewardId);
      // if scrollTop of target is higher than previous it is a scroll down
      if (elem.target.scrollTop > this.currentScrollTop) {
        const newReward = this.carouselItems[currentScrolledIndex + 1];
        this.scrolledToReward = newReward ? newReward : this.scrolledToReward;
      } else {
        // else scroll up
        const newReward = this.carouselItems[currentScrolledIndex - 1];
        this.scrolledToReward = newReward ? newReward : this.scrolledToReward;
      }

      this.scrollable.getElementRef().nativeElement.children[this.scrolledToReward.rewardId]
        .classList.add('item-scrolled-to');

      this.currentScrollTop = elem.target.scrollTop;
    });
  }


  initRewards() {
    this.carouselItems = this._rewardService.getMockedCarouselRewards(this._userId);
    // this._rewardService.getCarouselRewards(this._userId)
    // .subscribe(rewards => {
    //   this.carouselItems = rewards;
    // });

    this.selectedReward = this._rewardService.getSelectedReward(this.carouselItems);
    this.scrolledToReward = this._rewardService.getMiddlePricedReward(this.carouselItems, this.selectedReward);
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
