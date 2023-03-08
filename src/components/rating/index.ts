import { html, LitElement, css  } from 'lit';
import { customElement, property, eventOptions } from 'lit/decorators.js';
import './star.ts';
import './rating-tooltip.ts';

// TODO: limit ratings to only these?
// const ratingOptions = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

let lastFullStar: Number = 0;
let halfStar: Number = 0;

@customElement(`case-rating`)
export class CaseRating extends LitElement {
  clicked = false;

  static styles = css`
    :host {
      display: block;
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
      display: block;
      margin-block: 0.5rem;
      padding: 0.25rem;
      width: 200px;
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
// public properties
  @property()
  rating: Number = 3; // default value

  @property()
  size: String = 's'; // default value
  starSize = this.size;

  @property()
  sizeNum: Number = 16; // default is 16 or small size

  @property()
  variant: String = 'display'; // default value

  @property()
  _opacity: Number = 1; 
  
  @property()
  _offset: Number = 100; 

  @property()
  condition = false;

// a method that takes the rating value and assigns which stars are fullly yellow vs half full vs no yellow 
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
// Conditionally setting props for the star fill, for each instance.
    for (let i = 1; i <= 5; i++) {
      if (i <= lastFullStar) {
        fillStatus[i] = 'full';
        // this._opacity = 1;
        // this._offset = 100;
      } else if (i === halfStar) {
          fillStatus[i] = 'half';
          this._opacity = 1;
          this._offset = 50;
        } else {
          fillStatus[i] = 'empty';
          this._opacity = 0;
          this._offset = 0;
        }
  // checking what the offset & opacity values are as they being set in the For loop.
        console.log('for loop value: ' + this._offset);
        console.log('for loop value: ' + this._opacity);
        
    } // for loop
  }

  ratingTemplate() {
    // let star = Array.from(document.querySelector('case-rating').shadowRoot.querySelectorAll('div.star-rating'));
    let ariaHidden: Boolean = false;
// Checking if the rating is supposed to be for a product Display (not clickable). Then it makes the appropriate adjustments to clickablility and aria labeling.
    if (this.variant == 'Display') {
      this.condition = true;
      this.ariaHidden = true;
      this.removeEventListener('click', this._onClick, {capture: true});
      // this.removeClick();
      
    }
  
    return html`
  <!-- this generates the whole star rating component. The offset & opacity props are a way to pass individual characteristics to the star component. -->
      <div class="star-rating" aria-describedby="This section displays a star rating" aria-hidden="false">
        <rating-star @click=${this._onClick} class="star star1" offset="100%" opacity="1" aria-hidden="${this.ariaHidden || false}"></rating-star>
        <rating-tooltip>${this.rating} / 5</rating-tooltip>
        <rating-star @click=${this._onClick} class="star star2" offset=${this._offset} opacity=${this._opacity} aria-hidden="${this.ariaHidden || false}"></rating-star>
        <rating-tooltip>${this.rating} / 5</rating-tooltip>
        <rating-star @click=${this._onClick} class="star star3" offset=${this._offset} opacity=${this._opacity} aria-hidden="${this.ariaHidden || false}"></rating-star>
        <rating-tooltip>${this.rating} / 5</rating-tooltip>
        <rating-star @click=${this._onClick} class="star star4" offset=${this._offset} opacity=${this._opacity} aria-hidden="${this.ariaHidden || false}"></rating-star>
        <rating-tooltip>${this.rating} / 5</rating-tooltip>
        <rating-star @click=${this._onClick} class="star star5" offset=${this._offset} opacity=${this._opacity} aria-hidden="${this.ariaHidden || false}"></rating-star>
        <rating-tooltip>${this.rating} / 5</rating-tooltip>
        ${this.condition
          ? html`
            <p id="staticRating" aria-describedby="This product's rating is ${this.rating} out of 5"><strong>${this.rating}</strong> (5.0)</p>
          `
          : html ``}
      </div>
    `;
  }

  render() {
    // console.log('parent star size = ' + this.starSize);
    // console.log('parent size # = ' + this.sizeNum);

    this.ratingToStars();
    this.setStarStatus();
// checking what the offset & opacity values are right before the template is rendered.
console.log('from render function ' + this._offset);
console.log('from render function ' + this._opacity);

    return html`
      ${this.ratingTemplate()}
    `;
  }

  @eventOptions({capture: true})
    _onClick(e) {
    return html `
      <rating-tooltip class="ratingBox">
        ${this.rating} / 5
      </rating-tooltip>
    `;
  }

// This method removes the click listener. May not be needed.
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
