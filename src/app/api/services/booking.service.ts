/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { BookingDto } from '../models/booking-dto';
import { BookingToDeleteDto } from '../models/booking-to-delete-dto';
import { CommandResult } from '../models/command-result';

@Injectable({
  providedIn: 'root',
})
export class BookingService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation myBookingsBooking
   */
  static readonly MyBookingsBookingPath = '/Booking/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `myBookingsBooking$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  myBookingsBooking$Plain$Response(params: {
    email: string;
  }): Observable<StrictHttpResponse<Array<BookingDto>>> {

    const rb = new RequestBuilder(this.rootUrl, BookingService.MyBookingsBookingPath, 'get');
    if (params) {
      rb.path('email', params.email, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<BookingDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `myBookingsBooking$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  myBookingsBooking$Plain(params: {
    email: string;
  }): Observable<Array<BookingDto>> {

    return this.myBookingsBooking$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<BookingDto>>) => r.body as Array<BookingDto>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `myBookingsBooking()` instead.
   *
   * This method doesn't expect any request body.
   */
  myBookingsBooking$Response(params: {
    email: string;
  }): Observable<StrictHttpResponse<Array<BookingDto>>> {

    const rb = new RequestBuilder(this.rootUrl, BookingService.MyBookingsBookingPath, 'get');
    if (params) {
      rb.path('email', params.email, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<BookingDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `myBookingsBooking$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  myBookingsBooking(params: {
    email: string;
  }): Observable<Array<BookingDto>> {

    return this.myBookingsBooking$Response(params).pipe(
      map((r: StrictHttpResponse<Array<BookingDto>>) => r.body as Array<BookingDto>)
    );
  }

  /**
   * Path part for operation cancelBookingBooking
   */
  static readonly CancelBookingBookingPath = '/Booking';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `cancelBookingBooking$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  cancelBookingBooking$Plain$Response(params?: {
    body?: BookingToDeleteDto
  }): Observable<StrictHttpResponse<CommandResult>> {

    const rb = new RequestBuilder(this.rootUrl, BookingService.CancelBookingBookingPath, 'delete');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CommandResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `cancelBookingBooking$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  cancelBookingBooking$Plain(params?: {
    body?: BookingToDeleteDto
  }): Observable<CommandResult> {

    return this.cancelBookingBooking$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<CommandResult>) => r.body as CommandResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `cancelBookingBooking()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  cancelBookingBooking$Response(params?: {
    body?: BookingToDeleteDto
  }): Observable<StrictHttpResponse<CommandResult>> {

    const rb = new RequestBuilder(this.rootUrl, BookingService.CancelBookingBookingPath, 'delete');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CommandResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `cancelBookingBooking$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  cancelBookingBooking(params?: {
    body?: BookingToDeleteDto
  }): Observable<CommandResult> {

    return this.cancelBookingBooking$Response(params).pipe(
      map((r: StrictHttpResponse<CommandResult>) => r.body as CommandResult)
    );
  }

}
