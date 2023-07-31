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

import { LoginPassengerDto } from '../models/login-passenger-dto';
import { PassengerDtoCommandResult } from '../models/passenger-dto-command-result';
import { RegisterPassengerDto } from '../models/register-passenger-dto';

@Injectable({
  providedIn: 'root',
})
export class PassengerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation registerPassenger
   */
  static readonly RegisterPassengerPath = '/Passenger/Register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerPassenger$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registerPassenger$Plain$Response(params?: {
    body?: RegisterPassengerDto
  }): Observable<StrictHttpResponse<PassengerDtoCommandResult>> {

    const rb = new RequestBuilder(this.rootUrl, PassengerService.RegisterPassengerPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PassengerDtoCommandResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registerPassenger$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registerPassenger$Plain(params?: {
    body?: RegisterPassengerDto
  }): Observable<PassengerDtoCommandResult> {

    return this.registerPassenger$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<PassengerDtoCommandResult>) => r.body as PassengerDtoCommandResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerPassenger()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registerPassenger$Response(params?: {
    body?: RegisterPassengerDto
  }): Observable<StrictHttpResponse<PassengerDtoCommandResult>> {

    const rb = new RequestBuilder(this.rootUrl, PassengerService.RegisterPassengerPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PassengerDtoCommandResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registerPassenger$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registerPassenger(params?: {
    body?: RegisterPassengerDto
  }): Observable<PassengerDtoCommandResult> {

    return this.registerPassenger$Response(params).pipe(
      map((r: StrictHttpResponse<PassengerDtoCommandResult>) => r.body as PassengerDtoCommandResult)
    );
  }

  /**
   * Path part for operation loginPassenger
   */
  static readonly LoginPassengerPath = '/Passenger/Login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginPassenger$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  loginPassenger$Plain$Response(params?: {
    body?: LoginPassengerDto
  }): Observable<StrictHttpResponse<PassengerDtoCommandResult>> {

    const rb = new RequestBuilder(this.rootUrl, PassengerService.LoginPassengerPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PassengerDtoCommandResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `loginPassenger$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  loginPassenger$Plain(params?: {
    body?: LoginPassengerDto
  }): Observable<PassengerDtoCommandResult> {

    return this.loginPassenger$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<PassengerDtoCommandResult>) => r.body as PassengerDtoCommandResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginPassenger()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  loginPassenger$Response(params?: {
    body?: LoginPassengerDto
  }): Observable<StrictHttpResponse<PassengerDtoCommandResult>> {

    const rb = new RequestBuilder(this.rootUrl, PassengerService.LoginPassengerPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PassengerDtoCommandResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `loginPassenger$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  loginPassenger(params?: {
    body?: LoginPassengerDto
  }): Observable<PassengerDtoCommandResult> {

    return this.loginPassenger$Response(params).pipe(
      map((r: StrictHttpResponse<PassengerDtoCommandResult>) => r.body as PassengerDtoCommandResult)
    );
  }

}
