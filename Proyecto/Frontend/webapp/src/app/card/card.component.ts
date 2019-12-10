import {Component, OnInit, Input, Output, EventEmitter, ElementRef, ChangeDetectorRef, NgZone, OnDestroy} from '@angular/core';
import {Card} from './card';
import {CardService} from './card.service';
// import {WebSocketService} from '../ws.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {
  @Input()  card: Card;
  @Output() cardUpdate: EventEmitter<Card>;

  private   currentTitle: string;
  protected editingCard: boolean;
  protected zone: NgZone;

  constructor(
    private el: ElementRef,
    private ref: ChangeDetectorRef,
    private cardService: CardService,
    // private ws: WebSocketService,
  ) {
    this.editingCard = false;
    this.zone = new NgZone({ enableLongStackTrace: false });
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
    // TODO: check lifecycle
    // this.ws.onCardUpdate.unsubscribe();
  }

  blurOnEnter(event) {
    if ( this.iskeyCode(event, 'Enter', 13) ) {
      event.target.blur();
    }
    if ( this.iskeyCode(event, 'Escape', 27) ) {
      this.card.title = this.currentTitle;
      this.editingCard = false;
    }
  }

  editCard() {
    this.editingCard  = true;
    this.currentTitle = this.card.title;
    const textArea = this.el.nativeElement.getElementsByTagName('textarea')[0];
    setTimeout( () => { textArea.focus(); }, 0);
  }

  updateCard() {
    if (!this.card.title || this.card.title.trim() === '') {
      this.card.title = this.currentTitle;
    }

    this.cardService.put(this.card).then(
      (res) => {
        // this.ws.updateCard(this.card.boardId, this.card);
    });

    this.editingCard = false;
  }

  iskeyCode(event: any, key: string, keyCode?: number) {
    if (event.key === key || event.code === key || (keyCode && event.keyCode === keyCode) ) {
      return true;
    }
    return false;
  }

}
