import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpRequest } from 'selenium-webdriver/http';
import { Reward, RewardDto } from '../models/rewards.model';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import * as _ from "lodash";
import { CarouselUtils } from "../components/carousel/utils/carouselUtils";

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
    while (i < 100) {
      const mockReward = new Reward ();
      mockReward.rewardId = i
      mockReward.price = _.random(0, 10000);
      mockReward.name = 'Reward ' + i.toString();
      mockReward.details = (i).toString() + ' is the power of love.';
      mockReward.imageLink = '../../assets/images/favicon';
      mockReward.selected = i === 5 ? true : false;
      mockArray.push(mockReward);
      i++;
    }
    const dd = _.orderBy(this.mapPercentageHeight(mockArray), ['price'], ['desc']);;
    return _.orderBy(this.mapPercentageHeight(mockArray), ['price'], ['desc']);
  }

  mapPercentageHeight(rewards: Reward[]): Reward[] {
    const maxRewardPrice = this.getHighestRewardPrice(rewards);
    const selectedReward = this.getSelectedReward(rewards);

    return selectedReward ? rewards.map(reward => ({
      ...reward, 
      percentageHeight: CarouselUtils.calculateYAxisOffset(reward.price, selectedReward.price, maxRewardPrice)
    })) : rewards;
  }

  getSelectedReward(rewards: Reward[]): Reward {
    const selected = rewards.find(r => r.selected);
    return selected ? selected : rewards[_.ceil(rewards.length / 2)];
  }

  calculatePlacementPercentage(rewardItemPrice: number, selectedRewardAmount: number, maxRewardAmount: number): number {
    return CarouselUtils.calculateYAxisOffset(rewardItemPrice, selectedRewardAmount, maxRewardAmount);
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
 * Returns the highest reward price
 * @param rewards 
 */
  getHighestRewardPrice(rewards: Reward[]) {
    return _.maxBy(rewards, 'price').price;
  }

  /**
   * Sets the 'Selected Reward' for a current user.
   * @param userId userId currently logged in as
   * @param rewardId the id of the reward that is now becoming the 'Selected Reward' for this user
   */
  setSelectedReward(userId: number, rewardId: number) {
    
  }
}
