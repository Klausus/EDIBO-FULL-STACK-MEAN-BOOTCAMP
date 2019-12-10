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

  boards: Board[];

  constructor(
    private boardService: BoardService,
    private router: Router
  ) { }

  ngOnInit() {
    this.boards = [];
    this.boardService.getAll().subscribe((res) => {
      this.boards = res.data;
    });

    setTimeout( () => {
      document.getElementById('content-wrapper').style.backgroundColor = ' #FFFFFF';
      document.title = 'Trello';
    }, 100);
  }

  public addBoard() {
    console.log('Adding new board');
    const newBoard: Board = { title: 'New board' } as Board;
    this.boardService.post(newBoard).subscribe(
      (res) => {
        console.log('redirecting to /b/' + res.data._id);
        this.router.navigate(['/b', res.data._id]);
        console.log('new board added');
      }
    );
  }

}
