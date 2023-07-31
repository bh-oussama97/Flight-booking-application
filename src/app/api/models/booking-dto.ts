/* tslint:disable */
/* eslint-disable */
import { TimePlaceDto } from './time-place-dto';
export interface BookingDto {
  airline?: null | string;
  arrival?: TimePlaceDto;
  departure?: TimePlaceDto;
  flightId?: string;
  numberOfSeats?: number;
  passengerEmail?: null | string;
  price?: null | string;
}
