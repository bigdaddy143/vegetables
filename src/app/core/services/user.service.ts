import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  private _userId = 1;
  constructor() { }

  /**
   * Uses auth to get the user id, this should be called on appload and 
   */
  getUserId(): number {
    return this._userId;
  }

}
