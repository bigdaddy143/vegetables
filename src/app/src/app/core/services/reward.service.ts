import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpRequest } from 'selenium-webdriver/http';
import { Reward } from '../models/rewards.model';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';


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
    return this._http.get<Reward[]>(this._url)
      // .map((res: Response) => {
      //   const poopoo = 5;
      //   return res.json();
      // })
      // .catch((error: any) => {
      //   const poopoo = 5;
      //   return Observable.throw(error.json().error || 'There was an error retrieving rewards.')})
      // };
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
      mockReward.rewardId = i;
      mockReward.price = (i + 1) * 3;
      mockReward.name = 'Reward ' + i.toString();
      mockReward.details = (i).toString() + ' is the power of love.';
      mockReward.imageLink = '../../assets/images/favicon';
      mockReward.selected = i === 5 ? true : false;
      mockArray.push(mockReward);
      i++;
    }

    return mockArray;
  }

  /**
   * Sets the 'Selected Reward' for a current user.
   * @param userId userId currently logged in as
   * @param rewardId the id of the reward that is now becoming the 'Selected Reward' for this user
   */
  setSelectedReward(userId: number, rewardId: number) {
    
  }
}
