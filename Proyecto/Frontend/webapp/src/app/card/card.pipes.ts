import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cardWhere', pure: false })
export class CardWhere implements PipeTransform {
  transform(cards: any, filters: any): any {
    const cardsFiltered = [];
    if ( cards ) {
      cardsFiltered.push(...cards.filter(
        (card) => {
          if (card && filters) {
            for (const filter in filters) {
              if (card[filter] !== filters[filter]) {
                return false;
              }
            }
            return true;
          }
          return false;
        }
      ));
    }
    return cardsFiltered;
  }
}

@Pipe({ name: 'cardOrder', pure: false })
export class CardOrder implements PipeTransform {

  static _orderByComparator(a: any, b: any): number {
    if ( (!a && !b) || (a === b) ) { return 0; }

    if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
      // Isn't a number so lowercase the string to properly compare
      if (a.toLowerCase() < b.toLowerCase()) { return -1; }
      if (a.toLowerCase() > b.toLowerCase()) { return  1; }
    } else {
      // Parse strings as numbers to compare properly
      if (parseFloat(a) < parseFloat(b)) { return -1; }
      if (parseFloat(a) > parseFloat(b)) { return  1; }
    }

    return 0;
  }

  transform(cards: any, order: string = 'ASC'): any {

    const property = 'order';

    if (!Array.isArray(cards)) {
      cards = [cards];
    }

    if (Array.isArray(order)) {
      order = order[0];
    }

    if ( order.toUpperCase() !== 'ASC' && order.toUpperCase() !== 'DESC' ) {
      order = 'ASC';
    }

    return cards.sort(
      (a: any, b: any) => {
        return ( order.toUpperCase() === 'ASC' )
        ? +CardOrder._orderByComparator(a[property], b[property])
        : -CardOrder._orderByComparator(a[property], b[property]);
      }
    );
  }

}
