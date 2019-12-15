import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HTTP } from '../httpclient';
import { Card } from '../card/card';

@Injectable()
export class CardService {
  apiUrl = '/card';

  constructor(private httpClient: HTTP) {
  }

  // getAllCards
  getAll() {
    return this.httpClient.get(this.apiUrl) as
    Observable<{info: string , data: Card[]}>;
  }

  // getCardById
  get(id: string) {
    return this.httpClient.get(this.apiUrl + '/' + id) as
    Observable<{info: string , data: Card}>;
  }

  // postCard
  post(card: Card) {
    return this.httpClient.post(this.apiUrl, JSON.stringify(card)) as
    Observable<{info: string , data: Card}>;
  }

  // putCardByCardId (return void)
  put(card: Card) {
    return this.httpClient.put(this.apiUrl + '/' + card._id, JSON.stringify(card)).toPromise();
  }

  // deleteCardByCardId (return void)
  delete(card: Card) {
    return this.httpClient.delete(this.apiUrl + '/' + card._id).toPromise();
  }

}
