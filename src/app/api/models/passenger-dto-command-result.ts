/* tslint:disable */
/* eslint-disable */
import { PassengerDto } from './passenger-dto';
export interface PassengerDtoCommandResult {
  isSuccess?: boolean;
  message?: null | string;
  responseData?: PassengerDto;
}
