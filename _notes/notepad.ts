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