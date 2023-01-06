import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';
import {Response} from './Response';

@Injectable()
export class ConfigService {
  private readonly APPLICATION_JSON = 'application/json';
  constructor(private readonly http: HttpClient) {}

  httpGet(url: string): Observable<any> {
    const option = {
      headers: this.httpHeaders,
      params: null
    };
    return this.http.get(url, option).pipe(
      map(
        (res: Response<any>) => res.status === 204 ? null : res.data
      )
    );
  }
  private get httpHeaders(): HttpHeaders {
    return new HttpHeaders( {
      'Content-Type': this.APPLICATION_JSON,
      'Accept': this.APPLICATION_JSON,
      'Access-Control-Allow-Origin' :  'origin-list'
    });
  }
}
