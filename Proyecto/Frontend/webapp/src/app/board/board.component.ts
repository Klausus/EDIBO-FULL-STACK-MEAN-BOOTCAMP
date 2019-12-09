import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Board } from '../board/board';
import { Column } from '../column/column';
import { Card } from '../card/card';
import { BoardService } from './board.service';
import { ColumnService } from '../column/column.service';
import { ColumnComponent } from '../column/column.component';
// import { Input, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
// import { WebSocketService } from '../ws.service';
// import { OrderBy } from '../pipes/orderby.pipe';
// import { Where } from '../pipes/where.pipe';

declare var jQuery: any;
let curYPos = 0;
let curXPos = 0;
let curDown = false;

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

  board: Board;
  addingColumn = false;
  addColumnText: string;
  editingTilte = false;
  currentTitle: string;
  boardWidth: number;
  columnsAdded: number;

  // constructor() { }
  constructor(
    // public el: ElementRef,
    // private _ws: WebSocketService,
    private _boardService: BoardService,
    private _columnService: ColumnService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.columnsAdded = 0;
  }

  ngOnInit() {
    // let boardId = this._routeParams.get('id');
    const boardId = this._route.snapshot.params.id;
    this.wsConnect(boardId);
    this._boardService.getBoardWithColumnsAndCards(boardId).subscribe(
      (res) => {
        this.board = res[0].data;
        this.board.columns = res[1].data;
        this.board.cards = res[2].data;
        document.title = this.board.title + ' | Generic Task Manager';
        this.wsJoin(boardId);
        // this.setupView();
      }
    );
  }

  ngOnDestroy() {
    this.wsLeave(this.board._id);
  }

  wsConnect(id) {
    console.log(`WS Connect Board ${id}`);
    // this._ws.connect();
    // this._ws.onColumnAdd.subscribe(column => {
    //   console.log('adding column from server');
    //   this.board.columns.push(column);
    //   this.updateBoardWidth();
    // });
    // this._ws.onCardAdd.subscribe(card => {
    //   console.log('adding card from server');
    //   this.board.cards.push(card);
    // });
  }

  wsJoin(id) {
    console.log(`WS Join Board ${id}`);
    // this._ws.join(boardId);
  }

  wsLeave(id) {
    console.log(`WS Leaving Board ${id}`);
    // this._ws.leave(id);
  }

  setupView() {
    const component = this;

    setTimeout( () => {
      let startColumn;

      jQuery('#main').sortable({
        items: '.sortable-column',
        handler: '.header',
        connectWith: '#main',
        placeholder: 'column-placeholder',
        dropOnEmpty: true,
        tolerance: 'pointer',
        start: (event, ui) => {
          ui.placeholder.height(ui.item.find('.column').outerHeight());
          startColumn = ui.item.parent();
        },
        stop: (event, ui) => {
          const columnID = ui.item.find('.column').attr('column-id');
          component.updateColumnOrder({
            columnId: columnID
          });
        }
      }).disableSelection();

      // component.bindPane(); // NO DESCOMENTAR

      window.addEventListener('resize', (e) => {
        component.updateBoardWidth();
      });

      component.updateBoardWidth();
      document.getElementById('content-wrapper').style.backgroundColor = '';
    }, 100);
  }

  bindPane() {
    const doc = document.getElementById('content-wrapper');

    doc.addEventListener('mousemove', (event) => {
      event.preventDefault();
      if (curDown === true) {
        doc.scrollLeft += (curXPos - event.pageX) * .25; // x > 0 ? x : 0;
        doc.scrollTop  += (curYPos - event.pageY) * .25; // y > 0 ? y : 0;
      }
    });

    doc.addEventListener('mousedown', (event) => {
      if (event.type === 'main' || event.type === 'content-wrapper') {
        curDown = true;
      }
      curYPos = event.pageY;
      curXPos = event.pageX;
    });

    doc.addEventListener('mouseup', (event) => {
      curDown = false;
    });
  }

  updateColumnOrder(event) {} // TODO
  updateBoardWidth() {} // TODO

}
