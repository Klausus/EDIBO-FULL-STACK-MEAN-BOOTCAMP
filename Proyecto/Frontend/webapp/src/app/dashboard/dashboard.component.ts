import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BoardService} from '../board/board.service';
import {Board} from '../board/board';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  // Variables usadas en el template HTML
  protected boards: Board[];

  // Constructor
  constructor(
    private boardService: BoardService,
    private router: Router
  ) { }

  // OnInit Angular
  ngOnInit() {
    // Asigna un array vacio a boards.
    this.boards = [];
    // Realiza peticion POST y obtiene los Boards.
    this.boardService.getAll().subscribe((res) => {
      // Los Asigna a la variable boards que antes valia array vacio.
      this.boards = res.data;
    });

    setTimeout( () => {
      // Setea el fondo.
      document.getElementById('content-wrapper').style.backgroundColor = ' #FFFFFF';
      // Setea el titulo.
      document.title = 'Trello';
    }, 100);
  }

  // Añade un tableto/board a la DB mediante una peticion POST.
  // Automaticamente redirige la al tablero creado.
  public addBoard() {
    console.log('Adding new board');
    const newBoard: Board = { title: 'New board' } as Board;
    this.boardService.post(newBoard).subscribe(
      (res) => {
        const board = res.data;
        console.log('redirecting to /b/' + board._id);
        this.router.navigate(['/b', board._id]);
        console.log('new board added');
      }
    );
  }

}
