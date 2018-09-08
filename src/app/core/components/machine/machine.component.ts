import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../services/machine.service';
import { Machine } from '../../models/machine.model';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnInit {
  // private variable declarations
  private _userId: number;

  // public variable declarations
  public machineList: Machine[];

  constructor(
    private _machineService: MachineService
  ) { }

  ngOnInit() {
    this.getMachines();
  }

  /**
   * Retrieves the machines for a particular user
   */
  getMachines() {
    this.machineList = this._machineService.getMockedMachines(this._userId);
  }
}
