import { html, LitElement, css  } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './star.ts';

// TODO: limit ratings to only these?
// const ratingOptions = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

// different than variant?
// const clickableState: boolean = false;

let lastFullStar: Number = 0;
let halfStar: Number = 0;

@customElement(`case-rating`)
export class CaseRating extends LitElement {
  static styles = css`
    h2 {
      color: var(--focus);
      font-size: 2rem;
    }
    caption {
      color: var(--rating-popup);
      font-size: 1rem;
    }
    .star-rating {
      position: relative;
      margin: 0.5rem;
      background-color: lightgreen;
      width: fit-content;
    }
    svg {
      padding-inline: 0.5rem;
    }
  `;

  @property()
  rating: Number = 3; // default value

  @property()
  size: String = 'med'; // default value

  @property()
  variant: String = 'display'; // default value

  @property()
  title: string = 'Case Rating component';

  headerTemplate() {
    return html`<h2>${this.title}</h2>`;
  }

  ratingTemplate() {
    return html`
      <div class="star-rating">
        <rating-star class="star1" offset="100" opacity="1"></rating-star>
        <rating-star class="star2" offset="100" opacity="1"></rating-star>
        <rating-star class="star3" offset="50" opacity="1"></rating-star>
        <rating-star class="star4" offset="0" opacity="0"></rating-star>
        <rating-star class="star5"></rating-star>
      </div>
      <hr>
      <p><u>Info</u></p>
      <p>size: ${this.size}</p>
      <p>variant: ${this.variant}</p>
      <caption>rating: ${this.rating}</caption>
    `
  }

  ratingToStars() {
    let starRating = this.rating;
    let divisor: Number = Math.trunc(starRating);
    let remainder: Number = starRating % 1;
    
// console.log('remainder = ' + remainder);

    if (starRating % 1 != 0) {
      lastFullStar = divisor - 1;
// console.log('last full star = ' + lastFullStar);

      halfStar = divisor;
// console.log('half star = ' + halfStar);

      return html`
        Number of solid stars = ${divisor} <br>
        Rating remainder = ${remainder}
      `;
    } else {
      halfStar = divisor;
// console.log('lastFull = ' + lastFullStar);
// console.log('halfstar = ' + halfStar);
      return html`it's a whole num = ${starRating}`;
    } // if statement
    
  } // rating to stars

  setStarStatus() {
    let i: number = 0;
    let fillStatus = [];

    while (i < lastFullStar) {
      fillStatus[i] = 'full';
      i++;
console.log(fillStatus[i]);
    }

    fillStatus[halfStar] = 'half';

    console.log('half star = ' + fillStatus[halfStar]);
    } // set star status

  render() {
    this.ratingToStars();
    this.setStarStatus();

    return html`
      ${this.headerTemplate()}
      ${this.ratingTemplate()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'case-rating': CaseRating;
  }
}
