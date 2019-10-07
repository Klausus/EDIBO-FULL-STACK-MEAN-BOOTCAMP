import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  todoList = [
    { titulo: "titulo 0" , descripcion: "desc 0" , isCompleted: false },
    { titulo: "titulo 1" , descripcion: "desc 1" , isCompleted: false },
    { titulo: "titulo 2" , descripcion: "desc 2" , isCompleted: false },
    { titulo: "titulo 3" , descripcion: "desc 3" , isCompleted: true },
  ]

  selectedTodo = undefined;
  selectedIndex= undefined;

  setSelectedTodo(todo, index){
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
