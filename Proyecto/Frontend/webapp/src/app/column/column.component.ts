import {Component, Input, Output, OnInit, EventEmitter, ElementRef} from '@angular/core';
import {Column} from './column';
import {Card} from '../card/card';
import {ColumnService} from './column.service';
import {CardService} from '../card/card.service';
import {CardWhere, CardOrder} from '../card/card.pipes'; // Se usan en el template HTML
// import {WebSocketService} from '../ws.service';

// jQuery
declare var jQuery: any;

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {

  // Variables de Entrada (vienen desde otro componente "Padre")
  @Input()  public column: Column;
  @Input()  public cards: Card[];

  // Variables de Salida (son accesibles desde otro componente "Padre")
  @Output() public outAddCard: EventEmitter<Card>;
  @Output() public outCardUpdate: EventEmitter<Card>;
  @Output() public outColumnUpdate: EventEmitter<Column>;

  // Variables usadas en el template HTML
  protected editingColumn: boolean;
  protected addingCard: boolean;
  protected addCardText: string;

  // Variables privadas
  private currentTitle: string;

  // Constructor
  constructor(
    private el: ElementRef,
    private columnService: ColumnService,
    private cardService: CardService,
    // private _ws: WebSocketService,
  ) {
    this.outAddCard = new EventEmitter();
    this.outCardUpdate = new EventEmitter();
    this.outColumnUpdate = new EventEmitter();
    this.editingColumn = false;
    this.addingCard = false;
  }

  // OnInit Angular
  ngOnInit() {
    this.setupView();

    /* TODO: WebSocket
    this._ws.onColumnUpdate.subscribe((column: Column) => {
      if (this.column._id === column._id) {
        this.column.title = column.title;
        this.column.order = column.order;
      }
    });
    */
  }

  // Configura parametros de la visualizacion
  setupView() {
    const component = this;
    let startColumn;

    // Script jQuery para permitir reordenar columnas (con animaicon)
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
    }).disableSelection();
  }

  // Si el evento    es la pulsacion de la tecla X devuelve true.
  // Si el evento NO es la pulsacion de la tecla X devuelve false.
  // Se utiliza el parametro "key", "code" y el obsoleto "keyCode" para dar soporte (Chrome,Firefox,IE).
  iskeyCode(event: any, key: string, keyCode?: number) {
    if (event.key === key || event.code === key || (keyCode && event.keyCode === keyCode) ) {
      return true;
    }
    return false;
  }

  // Activa la edicion del campo "Columna".
  // Guardas en currentTitle el valor del la columna antes de la edicion.
  // Pone el foco en el campo de edicion.
  enableEditColumn() {
    this.currentTitle  = this.column.title;
    this.editingColumn = true;
    const input = this.el.nativeElement.getElementsByClassName('column-header')[0].getElementsByTagName('input')[0];
    setTimeout( () => { input.focus(); }, 0);
  }

  // Desactiva la edicion del campo "Columna".
  disableEditColumn() {
    this.editingColumn = false;
  }

  // Si el evento es la pulsacion de la tecla 'Enter'  => activa el evento blur.
  // Si el evento es la pulsacion de la tecla 'Escape' => desactiva la edicion.
  editingColumnOnEnter(event) {
    // If Key is Enter (13) => Activa el evento blur que fuerza el "focusOut" del input.
    if ( this.iskeyCode(event, 'Enter', 13) ) {
      event.target.blur();
    }
    // If Key is Escape (27) => Deshabilita la edicion y evita el cambio del titulo (de la columna).
    if ( this.iskeyCode(event, 'Escape', 27) ) {
      this.column.title  = this.currentTitle;
      this.disableEditColumn();
    }
  }

  // Evento "Blur" (FocusOut) que se activa con la perdida del focus.
  // Desactiva la edicion del titulo (de la columna).
  // Actualiza la Columna.
  editingColumnOnBlur() {
    this.updateColumn();
    this.disableEditColumn();
  }

  // Actualiza la Columna en la BD mediante peticion REST.
  // Si el titulo se borra al editarlo recuperas el titulo anterior.
  updateColumn() {
    if (this.column.title && this.column.title.trim() !== '') {
      this.columnService.put(this.column);
      this.outColumnUpdate.emit(this.column);
    } else {
      this.column.title = this.currentTitle;
    }
    this.disableEditColumn();
  }

  // Activa la edicion del campo "AddCard".
  // Pone el foco en el campo de edicion.
  enableAddCard() {
    this.addingCard = true;
    const input = this.el.nativeElement.getElementsByClassName('add-card')[0].getElementsByTagName('input')[0];
    setTimeout( () => { input.focus(); }, 0);
  }

  // Desactiva la edicion del campo "AddCard".
  // Resetea el campo a vacio
  disableAddCard() {
    this.addingCard = false;
    this.addCardText = '';
  }

  // Añade la tarjeta/card si pulsamos enter.
  // Desactiva la edicion si pulsamos Enter o Escape.
  addCardOnEnter(event: KeyboardEvent) {
    // If Key is Enter (13) => Añade Tarjeta/Card.
    if ( this.iskeyCode(event, 'Enter', 13) ) {
      if (this.addCardText && this.addCardText.trim() !== '') {
        this.addCard();
      }
      this.disableAddCard();
    }
    // If Key is Escape (27) => Deshabilita la edicion.
    if ( this.iskeyCode(event, 'Escape', 27) ) {
      this.disableAddCard();
    }
  }

  // Evento "Blur" (FocusOut) que se activa con la perdida del focus.
  // Añade la tarjeta/card si el nombre de la card es distinto de vacio.
  // Desactiva la edicion del campo "AddCard"
  addCardOnBlur() {
    if (this.addingCard) {
      if (this.addCardText && this.addCardText.trim() !== '') {
        this.addCard();
      }
    }
    this.disableAddCard();
  }

  // Añade una tarjeta/card en la DB mediante una peticion REST.
  // Actualiza el ancho del tablero.
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
      }
    );
  }

  // Actualiza el orden de las tarjetas/cards.
  updateCardsOrder(event) {
    let elBefore: number; elBefore = -1; // FIX TSLINT WARNING (Type Infered by Assignation)
    let elAfter: number;  elAfter  = -1; // FIX TSLINT WARNING (Type Infered by Assignation)
    let newOrder: number; newOrder =  0; // FIX TSLINT WARNING (Type Infered by Assignation)

    const cardArr = jQuery('[column-id=' + event.columnId + '] .card');
    for (let i = 0; i <= cardArr.length - 1; i++) {
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
    this.cardService.put(card);
  }

  cardUpdate(card: Card) {
    this.outCardUpdate.emit(card);
  }

}
