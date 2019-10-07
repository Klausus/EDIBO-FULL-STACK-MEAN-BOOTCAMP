import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {

  @Input() todo;

  constructor() {
  }

  ngOnInit() {
  }

}
