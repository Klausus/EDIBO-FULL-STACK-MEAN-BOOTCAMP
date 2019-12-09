import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { ROOT_URL } from './constants';
const ROOT_URL = 'http://localhost:3000/';

@Injectable()
export class HTTP {
  private headers: HttpHeaders;
  private rootUrl: string = ROOT_URL;

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
  }

  public get(url: string, headers?: HttpHeaders) {
    const options = { headers:  this.headers };
    url = this.handleUrl(url);
    return this.httpClient.get(url, options);
  }

  public post(url: string, body: string, headers?: HttpHeaders) {
    const options = { headers: headers || this.headers };
    url = this.handleUrl(url);
    return this.httpClient.post(url, body, options);
  }

  public put(url: string, body: string, headers?: HttpHeaders) {
    const options = { headers: headers || this.headers };
    url = this.handleUrl(url);
    return this.httpClient.put(url, body, options);
  }

  public delete(url: string, headers?: HttpHeaders) {
    const options = { headers: headers || this.headers };
    url = this.handleUrl(url);
    return this.httpClient.delete(url, options);
  }

  private handleUrl(url: string): string {
    if (!this.checkUrlExternal(url)) {
      if (url.charAt(0) === '/') {
        url = url.substring(1);
      }
      url = this.rootUrl + url;
    }
    return url;
  }

  private checkUrlExternal(url: string): boolean {
    return /^(?:[a-z]+:)?\/\//i.test(url);
  }

}
