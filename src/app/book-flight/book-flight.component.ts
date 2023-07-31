import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FlightService } from '../api/services';
import { BookDto, FlightDto } from '../api/models';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertsService } from '../alert/alerts.service';
import { FlightDtoCommandResult } from '../api/models/flight-dto-command-result';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.scss']
})
export class BookFlightComponent implements OnInit{

  constructor( private router: Router,private flightService:FlightService,
    private authService : AuthService,private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private alertsService:AlertsService
    ) { }

    @ViewChild('bookingAlert',{read:ElementRef}) private bookingAlertContent: ElementRef | undefined  ;

  flightId: string | null = 'not loaded'
  flight: FlightDto = {}  

  form = this.formBuilder.group({
    number:[1,Validators.compose([Validators.required,Validators.min(1),Validators.max(254)])]
  })
  ngOnInit(): void {
  console.log("flightId",this.activatedRoute.snapshot.params['flightId']);
  
  this.findflight(this.activatedRoute.snapshot.params['flightId']);
  }
  private handleError(err: any) {

    if (err.status == 404)
    {
      alert("Flight not found!");
    }

    console.log("Response Error. Status",err.status);
    console.log("Response Error. Status Text",err.statusText);
    console.log(err);
  }



findflight(flightId:string)
{
  this.flightService.findFlight({flightId:flightId}).subscribe((flight:any)=>{
    console.log("flight found ",flight);
    
      this.flight = flight;
  });
}


  book(){

    if (this.form.invalid)
    {
      return;
    }

    const booking : BookDto = {};
    booking.flightId = this.flight.id;
    booking.passengerEmail = this.authService.currentUser?.email;
    booking.numberOfSeats = this.form.get('number')?.value;
  

    this.flightService.bookFlight({body:booking}).subscribe((response:FlightDtoCommandResult)=>{

      if (response.isSuccess === true)
      {
        this.router.navigate(['/my-booking']);
        this.alertsService.displayAlertMessage(response.message,"success",this.bookingAlertContent);
        console.log("response",response.responseData);
        
      }
      else{
        this.alertsService.displayAlertMessage(response.message,"danger",this.bookingAlertContent);
      }
    })
  }

  get number(){
    return this.form.controls.number;
  }


}
 