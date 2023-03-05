import { html, LitElement, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Star } from './star';
// import starBold from './star-bold.svg';

// TODO: limit ratings to only these
// const ratingOptions = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

// different than variant?
// const clickableState: boolean = false;

// let halfStar: number = 0;
// let fullStars: number = 0;



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
  size: String = 'med';

  @property()
  variant: String = 'display';

  @property()
  title: string = 'Case Rating component';

  private starFill = {
    empty: 0,
    half: 50,
    full: 100,
    solid: 1,
    none: 0,
  }

  headerTemplate() {
    return html`<h2>${this.title}</h2>`;
  }

  ratingTemplate() {
    return html`
      <div class="star-rating">
          
        <star-template></star-template>
      </div>
      ${this.size}
      ${this.variant}
      <caption>${this.rating}</caption>
    `
  }

  ratingMessage() {
    // let message;
    
    let starRating = this.rating;
    let z: Number = starRating % 1;
    console.log(z);

    if (!starRating / 1) {
      return html`Rating = ${z}`;
    } else {
      return html`${starRating}`;
    }
  }

  render() {
    return html`
      ${this.ratingMessage()}
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
