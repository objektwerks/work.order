// @ts-check
import { getById } from './document.js';

export default class UserPane {
  constructor(fetcher) {
    this.fetcher = fetcher;

    getById('user-save-command-id').addEventListener('click', () => {

    }, false);
  }
}