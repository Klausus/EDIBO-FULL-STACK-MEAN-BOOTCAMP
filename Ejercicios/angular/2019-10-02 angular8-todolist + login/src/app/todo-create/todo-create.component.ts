import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss']
})
export class TodoCreateComponent implements OnInit {

  @Input() inputIndex;
  @Input() input;
  @Output() output = new EventEmitter<string>();
  
  private todoForm;

  constructor(private _fb:FormBuilder) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.input){
      this.createTodoForm(this.input.titulo, this.input.descripcion, this.input.isCompleted);
    }
    else{
      this.createTodoForm();
    }
  }

  private createTodoForm(titulo?, descripcion?, isCompleted?){
    this.todoForm = this._fb.group({
      titulo:[titulo||''],
      descripcion:[descripcion||''],
      isCompleted:[isCompleted||false],
    })
  }
  
  onSubmit() {
    let aux = this.todoForm.value;
    aux.indice = this.inputIndex || null;
    this.output.emit( JSON.stringify(this.todoForm.value) );
  }

}
