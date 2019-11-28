import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})
export class CalcComponent implements OnInit {

  total: number;
  numberString: string;
  history: string;
  previousSimbol: string;

  ngOnInit() {
    this.reset();
  }

  reset() {
    this.total = 0.00;
    this.numberString = '';
    this.history = '';
    this.previousSimbol = '=';
  }

  resetScreen() {
    this.numberString = '';
  }

  resetHistory() {
    this.history = '';
  }

  procesa(n: number) {
    this.numberString += n;
  }

  decimal() {
    if ( !this.numberString.includes('.') ) {
          this.numberString += '.';
    }
  }

  historyScreenUpdate() {
    if (this.history.trim().length > 0) {
      this.history += this.previousSimbol;
    }
    this.history += this.numberString;
  }

  igual() {
    this.calcLastOperation();
    const aux: number = this.total;
    this.reset();
    this.total = aux;
    this.numberString = aux.toString();
    this.previousSimbol = '=';
  }

  operacion(operacion: string) {
    this.historyScreenUpdate();
    this.calcLastOperation();
    this.resetScreen();
    this.previousSimbol = operacion;
  }

  calcLastOperation() {
    const number: number = parseFloat( this.numberString );
    switch ( this.previousSimbol ) {
      case '+': { this.total += number; break; }
      case '-': { this.total -= number; break; }
      case '*': { this.total *= number; break; }
      case '/': { this.total /= number; break; }
      case '%': { this.total %= number; break; }
      case '=': { this.total  = number; break; }
      default: { break; }
   }
  }
}
