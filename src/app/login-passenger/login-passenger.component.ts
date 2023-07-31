import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PassengerService } from '../api/services/passenger.service';
import { LoginPassengerDto, PassengerDto, PassengerDtoCommandResult } from '../api/models';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AlertsService } from '../alert/alerts.service';

@Component({
  selector: 'app-login-passenger',
  templateUrl: './login-passenger.component.html',
  styleUrls: ['./login-passenger.component.scss']
})
export class LoginPassengerComponent implements OnInit{


  @ViewChild('loginAlertContent',{read:ElementRef}) private loginAlertContent: ElementRef | undefined ;

  requestedUrl?: string = undefined

constructor(private formBuilder:FormBuilder,
  private router:Router,
  private passengerService:PassengerService,
  private authService  : AuthService,
  private alertsService:AlertsService
  ){

}

loginForm = this.formBuilder.group({
  email : [''],
  password : [''],
})

  ngOnInit() {
  }

  login(){
    const passengerToLogin : LoginPassengerDto = this.loginForm.value;

    this.passengerService.loginPassenger({body:passengerToLogin}).subscribe((response:PassengerDtoCommandResult)=>{
      
      if (response.isSuccess === true)
      {
        this.authService.setUserConnected(true);
        this.authService.currentUser = response.responseData;
          this.router.navigate(['/search-flights']);
      }
      else{
        this.alertsService.displayAlertMessage(response.message,"danger",this.loginAlertContent);
      }
    })
 
  }


   loginAction(passenger:PassengerDto)  {
    this.authService.loginUser(passenger);
    this.router.navigate([this.requestedUrl ?? '/search-flights'])
  }

}
