import {Injectable} from '@angular/core';
import {Observable, forkJoin} from 'rxjs';

import {HTTP} from '../httpclient';
import {Board} from '../board/board';
import {Column} from '../column/column';
import {Card} from '../card/card';

@Injectable()
export class BoardService {

  apiUrl = '/board';

  constructor(private httpClient: HTTP) {
  }

  // getAllBoards
  getAll() {
    return this.httpClient.get(this.apiUrl) as
    Observable<{info: string , data: Board[]}>;
  }

  // getBoardByBoardId
  get(id: string) {
    return this.httpClient.get(this.apiUrl + '/' + id) as
    Observable<{info: string , data: Board}>;
  }

  // getColumnsByBoardId
  getColumns(id: string) {
    return this.httpClient.get(this.apiUrl + '/' + id + '/columns') as
    Observable<{info: string , data: Column[]}>;
  }

  // getCardsByBoardId
  getCards(id: string) {
    return this.httpClient.get(this.apiUrl + '/' + id + '/cards') as
    Observable<{info: string , data: Card[]}>;
  }

  // getBoardAndColumnsAndCardsByBoardId
  getBoardWithColumnsAndCards(id: string) {
    return forkJoin(this.get(id), this.getColumns(id), this.getCards(id));
  }

  // postBoard
  post(board: Board) {
    const body = JSON.stringify(board);
    return this.httpClient.post(this.apiUrl, body) as
    Observable<{info: string , data: Board}>;
  }

  // putBoardById (return void)
  put(board: Board) {
    const body = JSON.stringify(board);
    console.log(body);
    this.httpClient.put(this.apiUrl + '/' + board._id, body).toPromise().then(
      (res) => {
        console.log( JSON.stringify(res) );
      }
    );
  }

  // deleteBoardById (return void)
  delete(board: Board) {
    this.httpClient.delete(this.apiUrl + '/' + board._id).toPromise().then(
      (res) => {
        console.log( JSON.stringify(res) );
      }
    );
  }

}
