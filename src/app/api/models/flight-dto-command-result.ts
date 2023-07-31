/* tslint:disable */
/* eslint-disable */
import { FlightDto } from './flight-dto';
export interface FlightDtoCommandResult {
  isSuccess?: boolean;
  message?: null | string;
  responseData?: FlightDto;
}
