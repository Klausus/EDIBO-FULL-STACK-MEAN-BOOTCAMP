import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {

 // URL API
  URLAPI = "http://localhost:3000/todolist/";
  URLcreate =       this.URLAPI + "create/";
  URLgetAll =       this.URLAPI + "find/";
  URLgetById =      this.URLAPI + "findById/";
  URLupdateAll =    this.URLAPI + "update/";
  URLupdateById =   this.URLAPI + "updateById/";
  URLreplaceById =  this.URLAPI + "replaceById/";
  URLdeleteById =   this.URLAPI + "deleteById/";

  // HTTP Options
  httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  };

  constructor(private http: HttpClient) {}

  create(todo: Todo): Observable<any> {
    console.log(this.URLcreate);
    return this.http.post(this.URLcreate, todo, this.httpOptions);
  }

  get(): Observable<any> {
      console.log(this.URLgetAll);
      return this.http.get(this.URLgetAll, this.httpOptions);
  }

  getById(id:string): Observable<any> {
    console.log(this.URLgetById + id);
    return this.http.get(this.URLgetAll + id, this.httpOptions);
  }

  update(todoJSON): Observable<any> {
    let todo = JSON.parse(todoJSON);
    delete(todo['index']);
    delete(todo['id']);
    console.log(this.URLupdateAll);
    return this.http.patch(this.URLupdateAll, todo, this.httpOptions);
  }

  updateById(todoJSON, id?:string): Observable<any> {
    let todo = JSON.parse(todoJSON);
    delete(todo['index']);
    if(!id && todo.id) id = todo.id;
    console.log(this.URLupdateById + id);
    return this.http.patch(this.URLupdateById + id, todo, this.httpOptions);
  }

  replaceById(todo: Todo, id:string): Observable<any> {
    console.log(this.URLreplaceById + id);
    return this.http.put(this.URLreplaceById + id, todo, this.httpOptions);
  }

  deleteById(id:string): Observable<any> {
    console.log(this.URLdeleteById + id);
    return this.http.delete(this.URLdeleteById + id, this.httpOptions);
  }

}
