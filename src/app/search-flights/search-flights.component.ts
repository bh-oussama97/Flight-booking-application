import { Component, OnInit } from '@angular/core';
import { FlightService } from '../api/services';
import { FlightDto } from '../api/models/flight-dto';
import { AuthService } from '../auth/auth.service';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.scss']
})
export class SearchFlightsComponent implements OnInit{

  searchResult: FlightDto[] = [];
   constructor(private flightservice:FlightService,private authservice:AuthService,
    private fb:FormBuilder
    )
   {

  }

  searchForm = this.fb.group({
  from:[''],
  destination : [''],
  fromDate : [''],
  toDate : [''],
  numberOfPassengers : [1]
  });


  ngOnInit(): void {
    this.search();    
  }

  search(){
    this.flightservice.searchFlight(this.searchForm.value).subscribe(
      response=> this.searchResult = response);
  }

}

 

