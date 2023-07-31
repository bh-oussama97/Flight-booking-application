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

import { BookDto } from '../models/book-dto';
import { FlightDto } from '../models/flight-dto';
import { FlightDtoCommandResult } from '../models/flight-dto-command-result';

@Injectable({
  providedIn: 'root',
})
export class FlightService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation bookFlight
   */
  static readonly BookFlightPath = '/Flight/Book';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `bookFlight$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  bookFlight$Plain$Response(params?: {
    body?: BookDto
  }): Observable<StrictHttpResponse<FlightDtoCommandResult>> {

    const rb = new RequestBuilder(this.rootUrl, FlightService.BookFlightPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FlightDtoCommandResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `bookFlight$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  bookFlight$Plain(params?: {
    body?: BookDto
  }): Observable<FlightDtoCommandResult> {

    return this.bookFlight$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<FlightDtoCommandResult>) => r.body as FlightDtoCommandResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `bookFlight()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  bookFlight$Response(params?: {
    body?: BookDto
  }): Observable<StrictHttpResponse<FlightDtoCommandResult>> {

    const rb = new RequestBuilder(this.rootUrl, FlightService.BookFlightPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FlightDtoCommandResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `bookFlight$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  bookFlight(params?: {
    body?: BookDto
  }): Observable<FlightDtoCommandResult> {

    return this.bookFlight$Response(params).pipe(
      map((r: StrictHttpResponse<FlightDtoCommandResult>) => r.body as FlightDtoCommandResult)
    );
  }

  /**
   * Path part for operation searchFlight
   */
  static readonly SearchFlightPath = '/Flight';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchFlight$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchFlight$Plain$Response(params?: {
    fromDate?: string;
    toDate?: string;
    from?: string;
    destination?: string;
    numberOfPassengers?: number;
  }): Observable<StrictHttpResponse<Array<FlightDto>>> {

    const rb = new RequestBuilder(this.rootUrl, FlightService.SearchFlightPath, 'get');
    if (params) {
      rb.query('fromDate', params.fromDate, {});
      rb.query('toDate', params.toDate, {});
      rb.query('from', params.from, {});
      rb.query('destination', params.destination, {});
      rb.query('numberOfPassengers', params.numberOfPassengers, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<FlightDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `searchFlight$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchFlight$Plain(params?: {
    fromDate?: string;
    toDate?: string;
    from?: string;
    destination?: string;
    numberOfPassengers?: number;
  }): Observable<Array<FlightDto>> {

    return this.searchFlight$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<FlightDto>>) => r.body as Array<FlightDto>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchFlight()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchFlight$Response(params?: {
    fromDate?: string;
    toDate?: string;
    from?: string;
    destination?: string;
    numberOfPassengers?: number;
  }): Observable<StrictHttpResponse<Array<FlightDto>>> {

    const rb = new RequestBuilder(this.rootUrl, FlightService.SearchFlightPath, 'get');
    if (params) {
      rb.query('fromDate', params.fromDate, {});
      rb.query('toDate', params.toDate, {});
      rb.query('from', params.from, {});
      rb.query('destination', params.destination, {});
      rb.query('numberOfPassengers', params.numberOfPassengers, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<FlightDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `searchFlight$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchFlight(params?: {
    fromDate?: string;
    toDate?: string;
    from?: string;
    destination?: string;
    numberOfPassengers?: number;
  }): Observable<FlightDto[]> {

    return this.searchFlight$Response(params).pipe(
      map((r: StrictHttpResponse<FlightDto[]>) => r.body as Array<FlightDto>)
    );
  }

  /**
   * Path part for operation findFlight
   */
  static readonly FindFlightPath = '/Flight/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findFlight$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  findFlight$Plain$Response(params: {
    flightId: string;
  }): Observable<StrictHttpResponse<FlightDto>> {

    const rb = new RequestBuilder(this.rootUrl, FlightService.FindFlightPath, 'get');
    if (params) {
      rb.path('flightId', params.flightId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FlightDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findFlight$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findFlight$Plain(params: {
    flightId: string;
  }): Observable<FlightDto> {

    return this.findFlight$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<FlightDto>) => r.body as FlightDto)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findFlight()` instead.
   *
   * This method doesn't expect any request body.
   */
  findFlight$Response(params: {
    flightId: string;
  }): Observable<StrictHttpResponse<FlightDto>> {

    const rb = new RequestBuilder(this.rootUrl, FlightService.FindFlightPath+params.flightId, 'get');
    if (params) {
      rb.path('flightId', params.flightId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FlightDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findFlight$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findFlight(params: {
    flightId: string;
  }): Observable<FlightDto> {

    return this.findFlight$Response(params).pipe(
      map((r: StrictHttpResponse<FlightDto>) => r.body as FlightDto)
    );
  }

}
