import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Board } from '../board/board';
import { Column } from '../column/column';
import { Card } from '../card/card';
import { BoardService } from './board.service';
import { ColumnService } from '../column/column.service';
// import { Order } from '../board/board.pipes';
// import { WebSocketService } from '../ws.service';

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
  protected editingColumn: boolean;
  protected editingTitle: boolean;
  protected addColumnText: string;

  // Variables privadas
  private currentTitle: string;
  private boardWidth: number;
  private countColumns: number;

  // Constructor
  constructor(
    public el: ElementRef,
    private boardService: BoardService,
    private columnService: ColumnService,
    private route: ActivatedRoute,
    // private ws: WebSocketService,
  ) {
    this.countColumns = 0;
    this.editingColumn = false;
    this.editingTitle = false;
  }

  // OnInit Angular
  ngOnInit() {
    const boardId = this.route.snapshot.params.id;
    this.wsConnect(boardId);
    this.boardService.getBoardWithColumnsAndCards(boardId).subscribe(
      (res) => {
        this.board = res[0].data;
        this.board.columns = res[1].data;
        this.board.cards = res[2].data;
        document.title = this.board.title + ' | Trello';
        this.countColumns = this.board.columns.length;
        this.wsJoin(boardId);
        this.setupView();
      }
    );
  }

  // OnDestoy Angular
  ngOnDestroy() {
    this.wsLeave(this.board._id);
  }

  // Configura parametros de la visualizacion
  setupView() {
    const component = this;

    setTimeout( () => {
      // Script jQuery para permitir reordenar columnas (con animaicon)
      jQuery('#main').sortable({
        items: '.sortable-column',
        handler: '.header',
        connectWith: '#main',
        placeholder: 'column-placeholder',
        dropOnEmpty: true,
        tolerance: 'pointer',
        start: (event, ui) => {
          ui.placeholder.height(ui.item.find('.column').outerHeight());
        },
        stop: (event, ui) => {
          const columnID = ui.item.find('.column').attr('column-id');
          component.updateColumnOrder({
            columnId: columnID
          });
        }
      }).disableSelection();

      // Cuando redimensiones la ventana llama al metodo updateBoardWidth() y actualiza el ancho
      window.addEventListener('resize', (e) => {
        component.updateBoardWidth();
      });

      // Actualiza el ancho
      component.updateBoardWidth();

      // Elimina el fondo anterior, lo deja en CSS Stock.
      document.getElementById('content-wrapper').style.backgroundColor = '';
    }, 100);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // TODO: WebSocket Connect
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

  // TODO: WebSocket Join
  wsJoin(id) {
    console.log(`WS Join Board ${id}`);
    // this.ws.join(boardId);
  }

  // TODO: WebSocket Leave
  wsLeave(id) {
    console.log(`WS Leaving Board ${id}`);
    // this.ws.leave(id);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Si el evento    es la pulsacion de la tecla X devuelve true.
  // Si el evento NO es la pulsacion de la tecla X devuelve false.
  // Se utiliza el parametro "key", "code" y el obsoleto "keyCode" para dar soporte (Chrome,Firefox,IE).
  iskeyCode(event: any, key: string, keyCode?: number) {
    if (event.key === key || event.code === key || (keyCode && event.keyCode === keyCode) ) {
      return true;
    }
    return false;
  }

  // Activa la edicion del campo titulo.
  // Guardas en currentTitle el valor del titulo antes de la edicion.
  // Pone el foco en el campo de edicion.
  enableEditTitle() {
    this.editingTitle = true;
    this.currentTitle = this.board.title;
    const input = this.el.nativeElement.getElementsByClassName('board-title')[0].getElementsByTagName('input')[0];
    setTimeout( () => { input.focus(); }, 0);
  }

  // Desactiva la edicion del campo "Titulo".
  disableEditTitle() {
    this.editingTitle = false;
  }

  // Si el evento es la pulsacion de la tecla 'Enter'  => activa el evento blur.
  // Si el evento es la pulsacion de la tecla 'Escape' => desactiva la edicion.
  editingTitleOnEnter(event) {
    // If Key is Enter (13) => Activa el evento blur que fuerza el "focusOut" del input.
    if ( this.iskeyCode(event, 'Enter', 13) ) {
      event.target.blur();
    }
    // If Key is Escape (27) => Deshabilita la edicion y evita el cambio del titulo.
    if ( this.iskeyCode(event, 'Escape', 27) ) {
      this.board.title = this.currentTitle;
      event.target.blur();
    }
  }

  // Evento "Blur" (FocusOut) que se activa con la perdida del focus.
  // Desactiva la edicion del titulo
  // Actualiza el tablero
  editingTitleOnBlur() {
    this.disableEditTitle();
    this.updateBoard();
  }

  // Actualiza el tablero en la BD mediante peticion REST.
  // Si el titulo se borra al editarlo recuperas el titulo anterior.
  // Cambia el titulo en la barra del navegador.
  updateBoard() {
    if (this.board.title && this.board.title.trim() !== '') {
      // Actualiza el tablero en la BD mendiante una peticion REST
      this.boardService.put(this.board);
    } else {
      // Si borras el titulo al editarlo => Recuperas el titulo anterior.
      this.board.title = this.currentTitle;
    }
    // Cambia el titulo a la web en la barra del navegador
    document.title = this.board.title + ' | Generic Task Manager';
  }

  // Activa la edicion del campo "AddColumn".
  // Pone el foco en el campo de edicion.
  enableAddColumn() {
    this.editingColumn = true;
    const input = jQuery('.add-column')[0].getElementsByTagName('input')[0];
    setTimeout( () => { input.focus(); }, 0);
  }

  // Desactiva la edicion del campo "AddColumn".
  // Resetea el campo a vacio
  disableAddColumn() {
    this.editingColumn = false;
    this.addColumnText = '';
  }

  // Añade la columna si pulsamos enter.
  // Desactiva la edicion si pulsamos Enter o Escape.
  addColumnOnEnter(event: KeyboardEvent) {
    // If Key is Enter (13) => Añade Columna.
    if ( this.iskeyCode(event, 'Enter', 13) ) {
      if (this.addColumnText && this.addColumnText.trim() !== '') {
        this.addColumn();
      }
      this.disableAddColumn();
    }
    // If Key is Escape (27) => Deshabilita la edicion.
    if ( this.iskeyCode(event, 'Escape', 27) ) {
      this.disableAddColumn();
    }
  }

  // Evento "Blur" (FocusOut) que se activa con la perdida del focus.
  // Añade la columna si el nombre de la columna es distinto de vacio.
  // Desactiva la edicion del campo "AddColumn"
  addColumnOnBlur() {
    if (this.addColumnText && this.addColumnText.trim() !== '') {
      this.addColumn();
    }
    this.disableAddColumn();
  }

  // Añade una columna en la DB mediante una peticion REST.
  // Actualiza el ancho del tablero.
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
        this.countColumns++;
      }
    );
  }

  // Actualiza el orden de las columnas.
  updateColumnOrder(event) {
    let elBefore: number; elBefore = -1;
    let elAfter: number;  elAfter  = -1;
    let newOrder: number; newOrder =  0;
    const columnArr = jQuery('#main').find('.column');

    for (let i = 0; i <= columnArr.length - 1; i++) {
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
    this.columnService.put(column);
  }

  // Actualiza el ancho: En caso de muchas columnas o de ventana pequeña añade scroll.
  updateBoardWidth() {
    // El ancho es: 10px (margin) + ( la cantidad de columnas + 1 (AddColumn) * 280px de ancho )
    this.boardWidth = ((this.board.columns.length + 1) * 280) + 10;

    // Si ancho es mayor al tamaño horizontal de la ventana => Crea Scroll
    if (this.boardWidth > document.body.scrollWidth) {
      document.getElementById('main').style.width = this.boardWidth + 'px';
    } else {
      document.getElementById('main').style.width = '100%';
    }

    // Habilita el scroll solo si hay almenos alguna columna.
    if (this.countColumns > 0) {
      const doc = document.getElementById('content-wrapper');
      doc.scrollLeft = doc.scrollWidth;
    }
  }

  // Añade la tarjeta al componente "Board.Cards".
  // No realiza peticion POST que guarde el cambio en DB.
  // Este metodo se utiliza para actualizar el visual desde otro componente (ColumnComponent).
  // En el otro componente (ColumnComponent) se hace la peticion POST y luego un emit para recibir aqui el aviso.
  // Recepcion del "emit" cuando una card se Crea en el componente Card. (Card -> Column -> Board).
  addCard(card: Card) {
    this.board.cards.push(card);
  }

  // Recepcion del "emit" cuando una card se Actualiza en el componente Card. (Card -> Column -> Board).
  cardUpdate(card: Card) {
    console.log('Emit CardUpdate: ' + card._id)
  }

  // Recepcion del "emit" cuando una columna se Actualiza en el componente Column. (Column -> Board)
  columnUpdate(column: Column) {
    console.log('Emit ColumnUpdate: ' + column._id);
  }

}
