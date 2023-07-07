import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private USER_KEY: string = 'auth-user';

  constructor() { }

  public getUser(): any{
    const user = window.sessionStorage.getItem(this.USER_KEY);
    if (!user) {
      return {};
    }
    return JSON.parse(user);
  }

}
