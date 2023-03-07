import { html, LitElement, css  } from 'lit';
import { customElement, property, eventOptions } from 'lit/decorators.js';
import './star.ts';

// TODO: limit ratings to only these?
// const ratingOptions = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

// different than variant?
// const clickableState: boolean = false;

let lastFullStar: Number = 0;
let halfStar: Number = 0;

@customElement(`case-rating`)
export class CaseRating extends LitElement {
  clicked = false;

  static styles = css`
    :host {
      display: inline-block;
      margin-inline: 1rem;
      width: 40%;
    }
    h2 {
      font-size: 1.6rem;
      margin-block: 0.5rem;
      padding: 0;
    }
    p {
      margin-block: 0;
      padding: 0;
    }
    .star-rating {
      position: relative;
      margin-block: 0.5rem;
      padding: 0.25rem;
      background-color: lightgreen;
      /* width: auto; */
    }
    .star-rating:focus {
      border: 2px solid var(--focus);
      border-radius: var(--focus-border);
      padding: 0.25rem;
    }
    svg {
      padding-inline: 0.5rem;
    }
    #staticRating {
      display: inline-block;
      margin-left: 0.25rem;
    }
  `;

  @property()
  rating: Number = 3; // default value

  @property()
  size: String = 'l'; // default value

  @property()
  sizeNum: Number = 16; // default is 16 or small size

  @property()
  variant: String = 'display'; // default value

  @property()
  title: string = 'Case Rating component';

  @property()
  condition = false;

  // @query('.star-rating')
  // _starRating!: NodeListOf<HTMLElementTagNameMap>;
  setStarSize() {
    let starSize = this.size;
  
    console.log(starSize);

    if (starSize == 'l') {
      this.sizeNum = 24;
    } else if (starSize == 'm') {
      this.sizeNum = 20;
    } else {
        this.sizeNum = 16;
      }

      console.log('parent star size = ' + starSize);
      console.log('parent size # = ' + this.sizeNum);

  }

  ratingToStars() {
    let starRating = this.rating;
    let divisor: Number = Math.trunc(starRating);
    let remainder: Number = starRating % 1;
    
    if (starRating % 1 != 0) {
      lastFullStar = divisor - 1;
      halfStar = divisor;
    } else {
      lastFullStar = divisor;
      halfStar = 0;
    } // if statement
    

  } // rating to stars

  setStarStatus() {
    let fillStatus: string[] = [];
    // let starStatus = fillStatus;


    for (let i = 1; i <= 5; i++) {
      if (i <= lastFullStar) {
        fillStatus[i] = 'full';
      } else if (i === halfStar) {
          fillStatus[i] = 'half';
        } else {
          fillStatus[i] = 'empty';
        }
      
      // if (fillStatus[i] == 'empty') {
      //   console.log(fillStatus[i]);
      //   this.offset = 100;
      //   this.opacity = 1;
      // } else if (fillStatus[i] == 'half') {
      //     this.offset = 50;
      //     this.opacity = 1;
      //   } else {
      //     this.offset = 10;
      //     this.opacity = 0;
      //   }
      // console.log('fill status of ' + i + ' = ' + fillStatus[i]);
      // console.log('star status of ' + i + ' = ' + starStatus[i]);
      
    } // for loop

    // starStatus.forEach(() => {
    // });
 

  }

  headerTemplate() {
    return html`
      <h2>${this.variant} component example</h2>
      <p><u>Info from component props:</u></p>
      <p>size: ${this.size}</p>
      <p>variant: ${this.variant}</p>
      <p>rating: ${this.rating}</p>
    `;
  }

  ratingTemplate() {
    // let star = Array.from(document.querySelector('case-rating').shadowRoot.querySelectorAll('div.star-rating'));
    let ariaHidden: Boolean = false;

    if (this.variant == 'Display') {
      this.condition = true;
      this.ariaHidden = true;
      this.removeEventListener('click', this._onClick, {capture: true});
      // this.removeClick();
    }
  
    this.setStarSize();

    return html`
      <div class="star-rating" aria-describedby="This section displays a star rating" aria-hidden="false">
        <rating-star @click=${this._onClick} class="star star1" offset=100 opacity=1 aria-hidden="${this.ariaHidden || false}"></rating-star>
        <rating-star @click=${this._onClick} class="star star2" offset=${this.offset} opacity=${this.opacity} aria-hidden="${this.ariaHidden || false}"></rating-star>
        <rating-star @click=${this._onClick} class="star star3" offset=${this.offset} opacity=${this.opacity} aria-hidden="${this.ariaHidden || false}"></rating-star>
        <rating-star @click=${this._onClick} class="star star4" offset=${this.offset} opacity=${this.opacity} aria-hidden="${this.ariaHidden || false}"></rating-star>
        <rating-star @click=${this._onClick} class="star star5" offset=${this.offset} opacity=${this.opacity} aria-hidden="${this.ariaHidden || false}"></rating-star>
        ${this.condition
          ? html`
            <p id="staticRating" aria-describedby="This product's rating is ${this.rating} out of 5"><strong>${this.rating}</strong> (5.0)</p>
          `
          : html ``}
      </div>
    `;
  }

  render() {
    this.ratingToStars();
    this.setStarStatus();

    return html`
      ${this.headerTemplate()}
      ${this.ratingTemplate()}
    `;
  }

  @eventOptions({capture: true})
    _onClick(e) {
    this.clicked = true;
    console.log(this.clicked);
  }

  removeClick() {
    this.removeEventListener('click', this._onClick, {capture: true})
    this.clicked = false;
    console.log(this.clicked);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'case-rating': CaseRating;
  }
}
