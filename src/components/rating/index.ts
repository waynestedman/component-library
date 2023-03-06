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
  offset: Number = 0;
  opacity: Number = 0;

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

  ratingToStars() {
    let starRating = this.rating;
    let divisor: Number = Math.trunc(starRating);
    let remainder: Number = starRating % 1;
    
    if (starRating % 1 != 0) {
      lastFullStar = divisor - 1;
      halfStar = divisor;

    //   return html`
    //   Number of solid stars = ${lastFullStar} <br>
    //   Number of half stars = ${divisor} <br>
    //   Rating remainder = ${remainder}
    // `;
  
    } else {
      lastFullStar = divisor;
      halfStar = 0;

    //   return html`
    //   Number of solid stars = ${lastFullStar} <br>
    //   Number of half stars = ${divisor} <br>
    //   Rating remainder = ${remainder}
    // `;
  
    } // if statement
    

  } // rating to stars

  setStarStatus() {
    const stars = document.getElementsByClassName('star')
    let fillStatus: string[] = [];
    // let starStatus: Number[] = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= lastFullStar) {
        fillStatus[i] = 'full';
      } else if (i === halfStar) {
          fillStatus[i] = 'half';
        } else {
          fillStatus[i] = 'empty';
        }

      if (fillStatus[i] == 'full') {
        stars[i].setAttribute('offset', '100');
        stars[i].setAttribute('opacity', '1');
      } else if (fillStatus[i] == 'half') {
          stars[i].setAttribute('offset', '50');
          stars[i].setAttribute('opacity', '1');
        }

    console.log('fill status of ' + i + ' = ' + fillStatus[i]);

    } // for loop
  }

  ratingTemplate() {
    return html`
      <div class="star-rating">
        <rating-star class="star star1" starStatus1 offset=${this.offset} opacity=${this.opacity}></rating-star>
        <rating-star class="star star2" starStatus2 offset=${this.offset} opacity=${this.opacity}></rating-star>
        <rating-star class="star star3" starStatus3 offset=${this.offset} opacity=${this.opacity}></rating-star>
        <rating-star class="star star4" starStatus4 offset=${this.offset} opacity=${this.opacity}></rating-star>
        <rating-star class="star star5" starStatus5 offset=${this.offset} opacity=${this.opacity}></rating-star>
      </div>
      <hr>
      <p><u>Info</u></p>
      <p>size: ${this.size}</p>
      <p>variant: ${this.variant}</p>
      <caption>rating: ${this.rating}</caption>
    `
  }

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
