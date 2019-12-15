import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, ElementRef} from '@angular/core';
import {Card} from './card';
import {CardService} from './card.service';
// import {WebSocketService} from '../ws.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {

  // Variables de Entrada y Salida desde/hacia el Padre.
  @Input()  card: Card;
  @Output() cardUpdate: EventEmitter<Card>;

  // Variables usadas en el template HTML
  protected editingCard: boolean;

  // Variables privadas
  private   currentTitle: string;

  // Constructor
  constructor(
    private el: ElementRef,
    private cardService: CardService,
    // private ws: WebSocketService,
  ) {
    this.editingCard = false;
    this.cardUpdate = new EventEmitter();
  }

  ngOnInit() {
    // this.ws.onCardUpdate.subscribe((card: Card) => {
    //   if (this.card._id === card._id) {
    //     this.card.title = card.title;
    //     this.card.order = card.order;
    //     this.card.columnId = card.columnId;
    //   }
    // });
  }

  ngOnDestroy() {
    // this.ws.onCardUpdate.unsubscribe();
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

  // Activa la edicion del campo "Card".
  // Guardas en currentTitle el valor del titulo antes de la edicion.
  // Pone el foco en el campo de edicion.
  enableEditCard() {
    this.editingCard  = true;
    this.currentTitle = this.card.title;
    const textArea = this.el.nativeElement.getElementsByTagName('textarea')[0];
    setTimeout( () => { textArea.focus(); }, 0);
  }

  disableEditCard() {
    this.editingCard  = false;
  }

  // Si el evento es la pulsacion de la tecla 'Enter'  => activa el evento blur.
  // Si el evento es la pulsacion de la tecla 'Escape' => desactiva la edicion.
  editingCardOnEnter(event) {
    // If Key is Enter (13) => Activa el evento blur que fuerza el "focusOut" del input.
    if ( this.iskeyCode(event, 'Enter', 13) ) {
      event.target.blur();
    }
    // If Key is Escape (27) => Deshabilita la edicion y evita el cambio del titulo.
    if ( this.iskeyCode(event, 'Escape', 27) ) {
      this.card.title = this.currentTitle;
      this.editingCard = false;
    }
  }

  // Evento "Blur" (FocusOut) que se activa con la perdida del focus.
  // Desactiva la edicion del titulo (de la tarjeta/card).
  // Actualiza la tarjeta/card.
  editingCardOnBlur() {
    this.disableEditCard();
    this.updateCard();
  }

  // Actualiza la tarjeta/card en la BD mediante peticion REST.
  // Si el titulo se borra al editarlo recuperas el titulo anterior.
  updateCard() {
    if (this.card.title && this.card.title.trim() !== '') {
      // Actualiza la tarjeta/card en la BD mendiante una peticion REST
      this.cardService.put(this.card);
      this.cardUpdate.emit(this.card);
    } else {
      // Si borras el titulo al editarlo => Recuperas el titulo anterior.
      this.card.title = this.currentTitle;
    }
  }

}
