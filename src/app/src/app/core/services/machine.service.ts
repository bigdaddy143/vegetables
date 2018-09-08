import { Injectable } from '@angular/core';
import { Machine } from '../models/machine.model';

@Injectable()

export class MachineService {

  constructor() { }

  /**
  * Returns a list of mocked rewards for the carousel
  * @param userId the id of the user requesting a mocked list of rewards
  */
  getMockedMachines(userId: number): Machine[] {
    const mockArray = [];
    let i = 0;
    while (i < 3) {
      const mockMachine = new Machine();
      mockMachine.Id = i;
      mockMachine.Name = 'Machine ' + i.toString();
      mockArray.push(mockMachine);
      i++;
    }

    return mockArray;
  }
}
