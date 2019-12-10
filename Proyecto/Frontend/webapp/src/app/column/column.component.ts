import {Component, Input, Output, OnInit, EventEmitter, ElementRef} from '@angular/core';
import {Column} from './column';
import {Card} from '../card/card';
import {ColumnService} from './column.service';
import {CardService} from '../card/card.service';
// import {WebSocketService} from '../ws.service';

declare var jQuery: any;

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  @Input()  public column: Column;
  @Input()  public cards: Card[];
  @Output() public outAddCard: EventEmitter<Card>;
  @Output() public outCardUpdate: EventEmitter<Card>;

  protected editingColumn: boolean;
  protected addingCard: boolean;
  protected addCardText: string;
  protected currentTitle: string;

  constructor(
    private el: ElementRef,
    private columnService: ColumnService,
    private cardService: CardService,
    // private _ws: WebSocketService,
  ) {
    this.outAddCard = new EventEmitter();
    this.outCardUpdate = new EventEmitter();
    this.editingColumn = false;
    this.addingCard = false;
  }

  ngOnInit() {
    this.setupView();
    // this._ws.onColumnUpdate.subscribe((column: Column) => {
    //   if (this.column._id === column._id) {
    //     this.column.title = column.title;
    //     this.column.order = column.order;
    //   }
    // });
  }

  setupView() {
    const component = this;
    let startColumn;
    jQuery('.card-list').sortable({
      connectWith: '.card-list',
      placeholder: 'card-placeholder',
      dropOnEmpty: true,
      tolerance: 'pointer',
      start: (event, ui) => {
        ui.placeholder.height(ui.item.outerHeight());
        startColumn = ui.item.parent();
      },
      stop: (event, ui) => {
        const senderColumnId = startColumn.attr('column-id');
        const targetColumnId = ui.item.closest('.card-list').attr('column-id');
        const cardID = ui.item.find('.card').attr('card-id');
        component.updateCardsOrder({
          columnId: targetColumnId || senderColumnId,
          cardId: cardID
        });
      }
    });
    jQuery('.card-list').disableSelection();
  }

  updateCardsOrder(event) {
    let elBefore: number; elBefore = -1;
    let elAfter: number;  elAfter  = -1;
    let newOrder: number; newOrder =  0;
    const cardArr = jQuery('[column-id=' + event.columnId + '] .card');

    for (let i = 0; i < cardArr.length - 1; i++) {
      if (cardArr[i].getAttribute('card-id') === event.cardId) {
        if (cardArr.length > 1) {
          if (i > 0 && i < cardArr.length - 1) {
            elBefore = Number(cardArr[i - 1].getAttribute('card-order'));
            elAfter  = Number(cardArr[i + 1].getAttribute('card-order'));
            newOrder = elBefore + ((elAfter - elBefore) / 2);
          } else if (i === cardArr.length - 1) {
            elBefore = Number(cardArr[i - 1].getAttribute('card-order'));
            newOrder = elBefore + 1000;
          } else if (i === 0) {
            elAfter = Number(cardArr[i + 1].getAttribute('card-order'));
            newOrder = elAfter / 2;
          }
        } else {
          newOrder = 1000;
        }
        break;
      }
    }

    const card = this.cards.filter( (x) => x._id === event.cardId)[0];
    card.columnId = event.columnId;
    card.order = newOrder;
    this.cardService.put(card).then( (res) => {
      // this._ws.updateCard(this.column.boardId, card);
    });
  }

  blurOnEnter(event) {
    if ( this.iskeyCode(event, 'Enter', 13) ) {
      event.target.blur();
    }
  }

  addColumnOnEnter(event: KeyboardEvent) {
    if ( this.iskeyCode(event, 'Enter', 13) ) {
      this.updateColumn();
    }
    if ( this.iskeyCode(event, 'Escape', 27) ) {
      this.cleadAddColumn();
    }
  }

  addCard() {
    this.cards = this.cards || [];

    const newCard: Card = {
      title: this.addCardText,
      order: (this.cards.length + 1) * 1000,
      columnId: this.column._id,
      boardId: this.column.boardId
    } as Card;

    this.cardService.post(newCard).subscribe(
      (res) => {
        const card = res.data;
        this.outAddCard.emit(card);
        // this._ws.addCard(card.boardId, card);
      }
    );
  }

  addCardOnEnter(event: KeyboardEvent) {
    if ( this.iskeyCode(event, 'Enter', 13) ) {
      if (this.addCardText && this.addCardText.trim() !== '') {
        this.addCard();
        this.addCardText = '';
      } else {
        this.clearAddCard();
      }
    }

    if ( this.iskeyCode(event, 'Escape', 27) ) {
      this.clearAddCard();
    }
  }

  updateColumn() {
    if (this.column.title && this.column.title.trim() !== '') {
      this.columnService.put(this.column).then(
        ( res ) => {
        // this._ws.updateColumn(this.column.boardId, this.column);
      });
      this.editingColumn = false;
    } else {
      this.cleadAddColumn();
    }
  }

  cleadAddColumn() {
    this.column.title  = this.currentTitle;
    this.editingColumn = false;
  }

  editColumn() {
    this.currentTitle  = this.column.title;
    this.editingColumn = true;
    const input = this.el.nativeElement.getElementsByClassName('column-header')[0].getElementsByTagName('input')[0];
    setTimeout( () => { input.focus(); }, 0);
  }

  enableAddCard() {
    this.addingCard = true;
    const input = this.el.nativeElement.getElementsByClassName('add-card')[0].getElementsByTagName('input')[0];
    setTimeout( () => { input.focus(); }, 0);
  }

  updateColumnOnBlur() {
    if (this.editingColumn) {
      this.updateColumn();
      this.clearAddCard();
    }
  }

  addCardOnBlur() {
    if (this.addingCard) {
      if (this.addCardText && this.addCardText.trim() !== '') {
        this.addCard();
      }
    }
    this.clearAddCard();
  }

  clearAddCard() {
    this.addingCard = false;
    this.addCardText = '';
  }

  onCardUpdate(card: Card) {
    this.outCardUpdate.emit(card);
  }

  iskeyCode(event: any, key: string, keyCode?: number) {
    if (event.key === key || event.code === key || (keyCode && event.keyCode === keyCode) ) {
      return true;
    }
    return false;
  }
}
