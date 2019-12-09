import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HTTP } from '../httpclient';
import { Column } from '../column/column';
import { Card } from '../card/card';

@Injectable()
export class ColumnService {
  apiUrl = '/column';

  constructor(private httpClient: HTTP) {
  }

  // getAllColumns
  getAll() {
    return this.httpClient.get(this.apiUrl) as
    Observable<{info: string, data: Column[]}>;
  }

  // getColumnByColumnId
  get(id: string) {
    return this.httpClient.get(this.apiUrl + '/' + id) as
    Observable<{info: string, data: Column}>;
  }

  // getCardsByColumnId
  getCards(id: string) {
    return this.httpClient.get(this.apiUrl + '/' + id + '/cards') as
    Observable<{info: string, data: Card[]}>;
  }

  // postColumn
  post(column: Column) {
    return this.httpClient.post(this.apiUrl, JSON.stringify(column)) as
    Observable<{info: string, data: Column}>;
  }

  // putColumnByColumnId
  put(column: Column) {
    return this.httpClient.put(this.apiUrl + '/' + column._id, JSON.stringify(column)).toPromise();
  }

  // deleteColumnByColumnId
  delete(column: Column) {
    return this.httpClient.delete(this.apiUrl + '/' + column._id).toPromise();
  }

}
