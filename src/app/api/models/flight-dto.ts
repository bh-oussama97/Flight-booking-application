/* tslint:disable */
/* eslint-disable */
import { TimePlaceDto } from './time-place-dto';
export interface FlightDto {
  airline?: null | string;
  arrival?: TimePlaceDto;
  departure?: TimePlaceDto;
  id?: string;
  price?: null | string;
  remainingNumberOfSeats?: number;
}
