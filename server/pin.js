let crypto;
try {
  crypto = await import('node:crypto');
} catch (error) {
  console.log('*** nodejs crypto support is disabled!');
  console.log('*** nodejs crypto error: ', error);
  throw `*** nodejs crypto support is disabled: ${error}`;
}

const specialChars = "~!@#$%^&*-+=<>?/:;";
const letters = "abcdefghijklmnopqrstuvwxyz";

const shuffle = str => [...str].sort( () => Math.random() - .5 ).join('');

export function newPin() {
  const first = shuffle(specialChars).charAt(0);
  const left = shuffle(letters).charAt(0);
  const middle = crypto.getRandomValues(new Uint16Array(7))[0].toString().slice(0, 3);
  const right = shuffle(letters).charAt(letters.length - 1);
  const last = shuffle(specialChars).charAt(specialChars.length - 1);
  return first + left + middle + right + last;
}