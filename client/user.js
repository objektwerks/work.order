// @ts-check
import { User } from './model.js';
import { getById } from './document.js';

export default class UserView {
  constructor(fetcher) {
    this.fetcher = fetcher;

    getById('user-save-command-id').addEventListener('click', () => {

    }, false);
  }
}