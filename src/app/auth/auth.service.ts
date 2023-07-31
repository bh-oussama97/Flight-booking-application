import { Injectable } from '@angular/core';
import { PassengerDto } from '../api/models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  currentUser?:PassengerDto;

  private userConnectedSubject = new BehaviorSubject<boolean>(false);
  userConnected$: Observable<boolean> = this.userConnectedSubject.asObservable();


  loginUser(user:PassengerDto){
    this.currentUser = user;  
  }

  setUserConnected(isConnected: boolean) {
    this.userConnectedSubject.next(isConnected);
  }

  isUserConnected(): boolean {
    if (this.currentUser)
    return true; // Return true if the user is connected; false otherwise
    else return false
  }
}

