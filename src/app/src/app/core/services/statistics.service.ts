import { Injectable } from '@angular/core';
import { Statistic } from '../models/statistic.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor() { }

  getStatistics(): Statistic {
    const stats = new Statistic();
    stats.gpuTemperature = '100F/24C';
    stats.leaderboard = '3875/42069';
    stats.referrals = 22;
    stats.lifetimeBalance = 127;

    return stats;

  }
}
