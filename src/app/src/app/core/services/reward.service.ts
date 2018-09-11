import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpRequest } from 'selenium-webdriver/http';
import { Reward, RewardDto } from '../models/rewards.model';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import * as _ from "lodash";

@Injectable()
export class RewardService {

  private _version = environment.apiVersion;
  private _path = 'get_rewards';
  private _url = environment.endpoint + this._version + this._path;

  constructor(private _http: HttpClient) {}

  // commenting this out due to compile error
  // /**
  //  * Calls the api for a list of rewards associated to a user.
  //  * @param {number} userID the id of the user requesting a list of rewards
  // */
  getCarouselRewards(userId: number): Observable<Reward[]> {
    return this._http.get(this._url).pipe(
    map((json: RewardDto) => {
      return _.orderBy(this.mapPercentageHeight(json.rewards), ['price'], ['desc'])
    }));
  }

  /**
   * Returns a list of mocked rewards for the carousel
   * @param userId the id of the user requesting a mocked list of rewards
   */
  getMockedCarouselRewards(userId: number): Reward[] {
    const mockArray = [];
    let i = 0;
    while (i < 10) {
      const mockReward = new Reward ();
      mockReward.rewardId = _.random(0, 10000);
      mockReward.price = (i + 1) * 3;
      mockReward.name = 'Reward ' + i.toString();
      mockReward.details = (i).toString() + ' is the power of love.';
      mockReward.imageLink = '../../assets/images/favicon';
      mockReward.selected = i === 5 ? true : false;
      mockArray.push(mockReward);
      i++;
    }

    const mockReward = new Reward ();
    mockReward.rewardId = _.random(0, 10000);
    mockReward.price = 100;
    mockReward.name = 'Reward ' + 10
    mockReward.details = (10).toString() + ' is the power of love.';
    mockReward.imageLink = '../../assets/images/favicon';
    mockReward.selected = false
    mockArray.push(mockReward);

    return _.orderBy(this.mapPercentageHeight(mockArray), ['price'], ['desc']);
  }

  mapPercentageHeight(rewards: Reward[]): Reward[] {
    const maxRewardPrice = _.maxBy(rewards, 'price').price;
    const selectedReward = this.getSelectedReward(rewards);

    return selectedReward ? rewards.map(reward => ({
      ...reward, 
      percentageHeight: this.calculatePlacementPercentage(reward.price, selectedReward.price, maxRewardPrice)
    })) : rewards;
  }

  getSelectedReward(rewards: Reward[]): Reward {
    return rewards.find(r => r.selected);
  }

  /**
   * This function returns a percentage height for the rewward item. 
   * 0 means it's all the way at the bottom, 1 means it is at the top, .5 means it
   * is in the middle, etc
   * @param rewardItemPrice reward item to calculate the percentage for
   * @param selectedRewardAmount the price of the selected reward
   * @param maxRewardAmount the price of the reward with the highest price
   */
  calculatePlacementPercentage(rewardItemPrice: number, selectedRewardAmount: number, maxRewardAmount: number): number {
    if(rewardItemPrice < selectedRewardAmount) {
      const poo= _.round((rewardItemPrice / selectedRewardAmount) * .5, 4);
      return poo;
    }
    else if(rewardItemPrice > selectedRewardAmount) {
      const upperDiff = maxRewardAmount - selectedRewardAmount; // pull out
      const itemDiff = rewardItemPrice - selectedRewardAmount;
      const percentRatio = itemDiff / upperDiff;
      return (percentRatio * .5) + .5;
    }
    //else the item is the selected item
    return .5;
  }

  /**
   * Returns the selected reward otherwise returns the reward
   * with the middle price
   * @param rewards list of rewards
   * @param selectedReward selected reward
   */
  getMiddlePricedReward(rewards: Reward[], selectedReward?: Reward): Reward {
    return selectedReward ? selectedReward : rewards[_.ceil(rewards.length / 2)];
  }

  /**
   * Sets the 'Selected Reward' for a current user.
   * @param userId userId currently logged in as
   * @param rewardId the id of the reward that is now becoming the 'Selected Reward' for this user
   */
  setSelectedReward(userId: number, rewardId: number) {
    
  }
}
