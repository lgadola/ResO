import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders, HttpResponseBase, HttpResponse } from '@angular/common/http';
import { tokenNotExpired } from '../../node_modules/angular2-jwt';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class AuthService {
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(
    private http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.baseUrl = baseUrl ? baseUrl : "http://reservation.squash-arena.ch:4430";
  }

 /**
 * get an Oauth token
 * @return OK
 */
  token_Post(credentials): Observable<number> {
    let url_ = this.baseUrl + "/Token";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = "grant_type=password&username=" + credentials.email + "&password=" + credentials.password;
    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      })
    };

    return this.http.request("post", url_, options_).flatMap((response_: any) => {
      return this.processToken_Post(response_);
    }).catch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processToken_Post(<any>response_);
        } catch (e) {
          return <Observable<number>><any>Observable.throw(e);
        }
      } else
        return <Observable<number>><any>Observable.throw(response_);
    });
  }

  protected processToken_Post(response: HttpResponseBase): Observable<number> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
    if (status === 200) {
      return blobToText(responseBlob).flatMap(_responseText => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 !== undefined ? resultData200 : <any>null;
        localStorage.setItem("access_token", resultData200.access_token);
 
        return Observable.of(result200);
      });
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).flatMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      });
    }
    return Observable.of<number>(<any>null);
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public logout() {
    return Observable.create(observer => {
      localStorage.clear();
      observer.next(true);
      observer.complete();
    });
  }
  public getToken(): string {
    return localStorage.getItem('access_token');
  }
  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting 
    // whether or not the token is expired
    return tokenNotExpired(null, token);
  }
}
function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
  if (result !== null && result !== undefined)
    return Observable.throw(result);
  else
    return Observable.throw(message);
}

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
    if (!blob) {
      observer.next("");
      observer.complete();
    } else {
      let reader = new FileReader();
      reader.onload = function () {
        observer.next(this.result);
        observer.complete();
      }
      reader.readAsText(blob);
    }
  });

}