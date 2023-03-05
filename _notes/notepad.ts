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