import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';
import {Response} from './Response';

/*
@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  getSuggestions(term: string): string[] {
    // retrieve suggestions from a data source, such as an API or a local data array
    const suggestions = [];
    const apiKey = '72W5BK5R5QKEZ9VS';
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${term}&apikey=${apiKey}`;
    // const fetch = this.http.get<any>(url).subscribe(
    //   (value) => console.log(value)
    // );

/!*    const fetch = this.http.get<any>(url).pipe(map(
        response =>  response.result[0]
      ))
    ;*!/
    return suggestions;
    //    return this.http.get<any>(url).map((response : Response => response.json().array()));

    /!*    this.http.get<string[]>(url).pipe(suggestions => {
      // process the suggestions here
      return suggestions;
    });*!/

    // return suggestions;
  }
}
*/
@Injectable()
export class DataService {
  private readonly APPLICATION_JSON = 'application/json';
  constructor(private readonly http: HttpClient) {}


  getSuggestions(term: string): Observable<string[]> {
    // retrieve suggestions from a data source, such as an API or a local data array
    const apiKey = '72W5BK5R5QKEZ9VS';
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${term}&apikey=${apiKey}`;
    const test = this.http.get<{bestMatches: {symbol: string}[]}>(url)
      .pipe(
        map(response => response.bestMatches.map(match => match.symbol))
      );
    console.log(test);
    return test;

  }
 /* httpGet(url: string): Observable<any> {
    const option = {
      headers: this.httpHeaders,
      params: null
    };
    return this.http.get(url, option).pipe(
      map(
        (res: Response<any>) => res.status === 204 ? null : res.data
      )
    );
  }*/
}

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
      Accept: this.APPLICATION_JSON,
      'Access-Control-Allow-Origin' :  'origin-list'
    });
  }
}
