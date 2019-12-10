import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Board } from '../board/board';
import { Column } from '../column/column';
import { Card } from '../card/card';
import { BoardService } from './board.service';
import { ColumnService } from '../column/column.service';
// import { WebSocketService } from '../ws.service';
// import { OrderBy } from '../pipes/orderby.pipe';
// import { Where } from '../pipes/where.pipe';

// jQuery
declare var jQuery: any;

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

  // Variables usadas en el template HTML
  protected board: Board;
  protected addingColumn = false;
  protected addColumnText: string;
  protected editingTilte = false;

  // Variables privadas
  private currentTitle: string;
  private boardWidth: number;
  private columnsAdded: number;
  private curYPos: number;
  private curXPos: number;
  private curDown: boolean;

  // constructor() { }
  constructor(
    public el: ElementRef,
    private boardService: BoardService,
    private columnService: ColumnService,
    private route: ActivatedRoute,
    // private ws: WebSocketService,
  ) {
    this.columnsAdded = 0;
    this.curYPos = 0;
    this.curXPos = 0;
    this.curDown = false;
  }

  ngOnInit() {
    // let boardId = this.routeParams.get('id');
    const boardId = this.route.snapshot.params.id;
    this.wsConnect(boardId);
    this.boardService.getBoardWithColumnsAndCards(boardId).subscribe(
      (res) => {
        this.board = res[0].data;
        this.board.columns = res[1].data;
        this.board.cards = res[2].data;
        document.title = this.board.title + ' | Trello';
        this.wsJoin(boardId);
        this.setupView();
      }
    );
  }

  ngOnDestroy() {
    this.wsLeave(this.board._id);
  }

  wsConnect(id) {
    console.log(`WS Connect Board ${id}`);
    // this.ws.connect();
    // this.ws.onColumnAdd.subscribe(column => {
    //   console.log('adding column from server');
    //   this.board.columns.push(column);
    //   this.updateBoardWidth();
    // });
    // this.ws.onCardAdd.subscribe(card => {
    //   console.log('adding card from server');
    //   this.board.cards.push(card);
    // });
  }

  wsJoin(id) {
    console.log(`WS Join Board ${id}`);
    // this.ws.join(boardId);
  }

  wsLeave(id) {
    console.log(`WS Leaving Board ${id}`);
    // this.ws.leave(id);
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
      if (this.curDown === true) {
        doc.scrollLeft += (this.curXPos - event.pageX) * .25;
        doc.scrollTop  += (this.curYPos - event.pageY) * .25;
      }
    });

    doc.addEventListener('mousedown', (event) => {
      if (event.type === 'main' || event.type === 'content-wrapper') {
        this.curDown = true;
      }
      this.curYPos = event.pageY;
      this.curXPos = event.pageX;
    });

    doc.addEventListener('mouseup', (event) => {
      this.curDown = false;
    });
  }

  updateBoardWidth() {
    this.boardWidth = ((this.board.columns.length + 1) * 280) + 10;

    if (this.boardWidth > document.body.scrollWidth) {
      document.getElementById('main').style.width = this.boardWidth + 'px';
    } else {
      document.getElementById('main').style.width = '100%';
    }

    if (this.columnsAdded > 0) {
      const wrapper = document.getElementById('content-wrapper');
      wrapper.scrollLeft = wrapper.scrollWidth;
    }

    this.columnsAdded++;
  }

  updateBoard() {
    if (this.board.title && this.board.title.trim() !== '') {
      this.boardService.put(this.board);
    } else {
      this.board.title = this.currentTitle;
    }
    this.editingTilte = false;
    document.title = this.board.title + ' | Generic Task Manager';
  }

  editTitle() {
    this.currentTitle = this.board.title;
    this.editingTilte = true;
    const input = this.el.nativeElement.getElementsByClassName('board-title')[0].getElementsByTagName('input')[0];
    setTimeout( () => { input.focus(); }, 0);
  }

  updateColumnElements(column: Column) {
    const columnArr = jQuery('#main .column');
    const columnEl  = jQuery('#main .column[columnid=' + column._id + ']');
    for (let i = 0; i < columnArr.length - 1; i++) {
      if ( column.order < Number(columnArr[i].getAttibute('column-order')) ) {
        columnEl.remove().insertBefore(columnArr[i]);
        break;
      }
    }
  }

  updateColumnOrder(event) {
    let elBefore: number; elBefore = -1;
    let elAfter: number;  elAfter  = -1;
    let newOrder: number; newOrder =  0;
    const columnEl = jQuery('#main');
    const columnArr = columnEl.find('.column');

    for (let i = 0; i < columnArr.length - 1; i++) {
      if (columnArr[i].getAttribute('column-id') === event.columnId) {
        if (i > 0 && i < columnArr.length - 1) {
          elBefore = Number(columnArr[i - 1].getAttribute('column-order'));
          elAfter  = Number(columnArr[i + 1].getAttribute('column-order'));
          newOrder = elBefore + ((elAfter - elBefore) / 2);
        } else if (i === columnArr.length - 1) {
          elBefore = Number(columnArr[i - 1].getAttribute('column-order'));
          newOrder = elBefore + 1000;
        } else if (i === 0) {
          elAfter = Number(columnArr[i + 1].getAttribute('column-order'));
          newOrder = elAfter / 2;
        }
        break;
      }
    }

    const column = this.board.columns.filter( (x) => x._id === event.columnId )[0];
    column.order = newOrder;
    this.columnService.put(column).then( (res) => {
      // this.ws.updateColumn(this.board._id, column);
    });
  }

  blurOnEnter(event) {
    if ( this.iskeyCode(event, 'Enter', 13) ) {
      event.target.blur();
    }
  }

  enableAddColumn() {
    this.addingColumn = true;
    const input = jQuery('.add-column')[0].getElementsByTagName('input')[0];
    setTimeout( () => { input.focus(); }, 0);
  }

  addColumn() {
    const newColumn: Column = {
      title: this.addColumnText,
      order: (this.board.columns.length + 1) * 1000,
      boardId: this.board._id
    } as Column;

    this.columnService.post(newColumn).subscribe(
      (res) => {
        const column = res.data;
        this.board.columns.push(column);
        console.log('Column added');
        this.updateBoardWidth();
        this.addColumnText = '';
        // this.ws.addColumn(this.board._id, column);
      }
    );
  }

  addColumnOnEnter(event: KeyboardEvent) {
    // If Key is Enter (13)
    if ( this.iskeyCode(event, 'Enter', 13) ) {
      if (this.addColumnText && this.addColumnText.trim() !== '') {
        this.addColumn();
      } else {
        this.clearAddColumn();
      }
    }

    // If Key is Escape (27)
    if ( this.iskeyCode(event, 'Escape', 27) ) {
      this.clearAddColumn();
    }
  }

  addColumnOnBlur() {
    if (this.addColumnText && this.addColumnText.trim() !== '') {
      this.addColumn();
    }
    this.clearAddColumn();
  }

  clearAddColumn() {
    this.addingColumn = false;
    this.addColumnText = '';
  }


  addCard(card: Card) {
    this.board.cards.push(card);
  }

  foreceUpdateCards() {
    const cards = JSON.stringify(this.board.cards);
    this.board.cards = JSON.parse(cards);
  }

  onCardUpdate(card: Card) {
    this.foreceUpdateCards();
  }

  iskeyCode(event: any, key: string, keyCode?: number) {
    if (event.key === key || event.code === key || (keyCode && event.keyCode === keyCode) ) {
      return true;
    }
    return false;
  }

}
