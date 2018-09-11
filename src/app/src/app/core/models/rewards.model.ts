export class Reward {
  constructor (id?: number) {
    this.rewardId = id;
  }

  rewardId: number;
  name: string;
  price: number;
  details: string;
  imageLink: string;
  selected: boolean; // need to determine if the backend is storing selected state
  percentageHeight: number;
  remainingTime: number;
}


export class RewardDto {
  success: boolean;
  rewards: Reward[];
}