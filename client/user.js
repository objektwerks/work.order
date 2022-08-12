// @ts-check
import { getById } from './document.js';

// @ts-ignore
import { User } from './entity.js';

export default class UserView {
  constructor(fetcher, model) {
    this.fetcher = fetcher;
    this.model = model;

    getById('user-save-command-id').addEventListener('click', () => {

    }, false);
  }
}