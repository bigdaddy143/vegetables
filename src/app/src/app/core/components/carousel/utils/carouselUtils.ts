import { Injectable } from "@angular/core";
import * as _ from "lodash";

@Injectable()
export class CarouselUtils {

  /**
   * This function returns a percentage height for the reward item. 
   * 0 means it's all the way at the bottom, 1 means it is at the top, .5 means it
   * is in the middle, etc
   * @param rewardItemPrice reward item to calculate the percentage for
   * @param selectedRewardAmount the price of the selected reward
   * @param maxRewardAmount the price of the reward with the highest price
   */
  static calculateYAxisOffset(priceToCalculate: number, selectedRewardAmount: number, maxRewardAmount: number): number {
    if(priceToCalculate < selectedRewardAmount) {
      return  _.round((priceToCalculate / selectedRewardAmount) * .5, 2);
    }
    else if(priceToCalculate > selectedRewardAmount) {
      const upperDiff = maxRewardAmount - selectedRewardAmount; // pull out
      const itemDiff = priceToCalculate - selectedRewardAmount;
      const percentRatio = itemDiff / upperDiff;
      return _.round((percentRatio * .5) + .5, 2);
    }
    //else the item is the selected item
    return .5;
  }

}