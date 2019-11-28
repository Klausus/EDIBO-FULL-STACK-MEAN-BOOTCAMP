import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo';
import { TodolistService } from 'src/app/services/todolist.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  selectedTodo:  Todo   = undefined;
  selectedIndex: number = undefined;
  todoList: Array<Todo> = [
    { id: '1111' , title: "titulo 1" , desc: "desc 1" , isComplete: false },
    { id: '2222' , title: "titulo 2" , desc: "desc 2" , isComplete: false },
    { id: '3333' , title: "titulo 3" , desc: "desc 3" , isComplete: false },
    { id: '4444' , title: "titulo 4" , desc: "desc 4" , isComplete: true  },
  ]

  constructor(private _todoListService: TodolistService) {
    this.selectedIndex  = undefined;
    this.selectedTodo   = undefined;
  }

  ngOnInit() {
    this._todoListService.get().subscribe((respuesta: any) => {
      console.log("resp: " + respuesta);
      this.todoList = respuesta;
    }, error=>{
      console.log("error: " + error);
    })
  }

  setSelectedTodo(todo:Todo, index:number){
    this.selectedTodo  = todo;
    this.selectedIndex = index;
  }

  insertOrUpdateTodo(todoJSON){
    let todo = JSON.parse(todoJSON);
    if( todo!=null){
      if( todo.indice ){
        this.updateTodo(todo);
      }
      else{
        this.addTodo(todo);
      }
    }
  }

  addTodo(todo){
    this.todoList.push(todo);
    this.selectedIndex =  this.todoList.length - 1;
    this.selectedTodo = this.todoList[ this.selectedIndex ];
  }

  updateTodo(todo){
    let myIndex = todo.indice;
    delete(todo.indice)
    this.todoList[myIndex]=todo;
    this.selectedTodo = this.todoList[ myIndex ];
  }

}
