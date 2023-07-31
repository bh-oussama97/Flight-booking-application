import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit,OnDestroy{


  isUserConnected: boolean;
  private userConnectedSubscription: Subscription;

constructor(private authService:AuthService){
  this.userConnectedSubscription = this.authService.userConnected$.subscribe((connected) => {
    this.isUserConnected = connected;
  });
}
  ngOnDestroy(): void {
    this.userConnectedSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.isUserConnected = this.authService.isUserConnected();

  }


  logout(){
    this.isUserConnected = false;
  }
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
