import { Component, OnInit } from '@angular/core';
import { Statistic } from '../../models/statistic.model';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  // public variable declarations
  public statistics: Statistic;
  constructor(
    private _statsticsService: StatisticsService
  ) { }

  ngOnInit() {
    this.getStatistics();
  }

  getStatistics() {
    this.statistics = this._statsticsService.getStatistics();
  }
}
