let crypto;
try {
  crypto = await import('node:crypto');
} catch (error) {
  console.log('*** nodejs crypto support is disabled!');
  console.log('*** nodejs crypto error: ', error);
}

const specialChars = "~!@#$%^&*-+=<>?/:;";
const letters = "abcdefghijklmnopqrstuvwxyz";

const shuffle = str => [...str].sort( () => Math.random() - .5 ).join('');

export function password() {
  const array = new Uint16Array(7);
  const numbers = crypto.getRandomValues(array)[0].toString().slice(0, 3);
  const first = shuffle(specialChars).charAt(0);
  const left = shuffle(letters).charAt(0);
  const right = shuffle(letters).charAt(0);
  const last = shuffle(specialChars).charAt(specialChars.length - 1);
  const password = first + left + numbers + right + last;
  return password;
}