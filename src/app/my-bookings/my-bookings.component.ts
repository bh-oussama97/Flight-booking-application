import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookingDto,  CommandResult } from '../api/models';
import { BookingService } from '../api/services';
import { AuthService } from '../auth/auth.service';
import { AlertsService } from '../alert/alerts.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent implements OnInit {

  @ViewChild('MybookingAlert',{read:ElementRef}) private myBookingsAlertContent: ElementRef | undefined  ;


bookings!:BookingDto[];

  constructor(
    private bookingService:BookingService,private authService:AuthService,  private alertsService:AlertsService){
    

  }
  ngOnInit(): void {

   this.bookingService.myBookingsBooking({email:this.authService.currentUser?.email ?? ''}).subscribe(
    r=> {
      this.bookings = r;      
    }
   )
  }


  cancel(booking:BookingDto)
  {

    const dto : BookingDto = {
      flightId : booking.flightId,
      numberOfSeats : booking.numberOfSeats,
      passengerEmail : booking.passengerEmail
    };
        this.bookingService.cancelBookingBooking({body:dto}).subscribe((response:CommandResult)=>{


          if (response.success=== true)
          {
            this.bookings = this.bookings.filter(b=> b != booking);
              this.alertsService.displayAlertMessage(response.message,"success",this.myBookingsAlertContent);
          }
          else{
            this.alertsService.displayAlertMessage(response.message,"danger",this.myBookingsAlertContent);

          }
        })
        
  }
}
