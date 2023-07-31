import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PassengerService } from '../api/services/passenger.service';
import { PassengerDtoCommandResult, RegisterPassengerDto } from '../api/models';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from '../alert/alerts.service';

@Component({
  selector: 'app-register-passenger',
  templateUrl: './register-passenger.component.html',
  styleUrls: ['./register-passenger.component.scss']
})
export class RegisterPassengerComponent implements OnInit{
  

  @ViewChild('alertContent',{read:ElementRef}) private alertContent: ElementRef | undefined ;


  requestedUrl?: string = undefined

  constructor(private passengerService:PassengerService,private fb :FormBuilder,
   private router:Router,private activatedRoute:ActivatedRoute,
   private alertService:AlertsService
    ){

  }

  form = this.fb.group({
    email : ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(100)])],
    firstName:  ['',Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(35)])],
    lastName : ['',Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(35)])],
    username : ['',Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(35)])],
    password : ['',Validators.compose([Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z]).{4,35}$')])],
    gender : [false,Validators.required]
  })
  
  ngOnInit(): void {
    
  this.activatedRoute.params.subscribe(p=> this.requestedUrl = p['requestedUrl']);
  }


  register(){

    if (this.form.invalid)
    return; 
  
   const passengerToResgister : RegisterPassengerDto = this.form.value;


    this.passengerService.registerPassenger({body:passengerToResgister}).subscribe(
      (response:PassengerDtoCommandResult)=>{        
        if (response)

      if (response.isSuccess === true)
      {
        this.router.navigate(['/login-passenger']);
      }
      else{

        this.alertService.displayAlertMessage(response.message,"danger",this.alertContent);

      }
    });


    
  }


  get field(){
    return this.form.controls;
  }


}
