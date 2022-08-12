// @ts-check
import { getById } from './document.js';

// @ts-ignore
import { User } from './entity.js';

export default class UserView {
  constructor(fetcher) {
    this.fetcher = fetcher;

    getById('user-save-command-id').addEventListener('click', () => {

    }, false);
  }
}