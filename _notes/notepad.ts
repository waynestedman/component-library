for (i to lastFullStar) {
  star[i] fillStatus = full;
}

star[halfStar] fillStatus = half;

/*-------------------- */
let i: number = 0;
let fillStatus: string[] = [];

for (i < lastFullStar) {
  fillStatus[i]  = 'full';
}

fillStatus[halfStar] = 'half';

/*-------------------- */
for (let i = 0; i < 5; i++) {
  if (i < lastFullStar) {
    fillStatus[i] = 'full';
  } else if (i = half) {
      fillStatus[i] = 'half';
    } else {
      fillStatus[i] = 'empty';
    }
}

/*-------------------- */
const stars = document.getElementsByClassName('star')

if (stars.starStatus[i] && fillStatus[i] == 'full') {
  this.setAttribute('offset', 100);
  this.setAttribute('opacity', 1);
} else if (stars.starStatus[i] && fillStatus[i] == 'half') {
  this.setAttribute('offset', 50);
  this.setAttribute('opacity', 1);
}

/*-------------------- */
getStars() {
  const stars = Array.from(document.querySelector('case-rating').shadowRoot.querySelectorAll('.star'));
  console.log('stars' + stars);

}