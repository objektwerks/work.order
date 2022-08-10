// @ts-check
import { getById } from './document.js';

export default class WorkOrdersPane {
  constructor(fetcher) {
    this.fetcher = fetcher;

    getById('workorder-new-command-id').addEventListener('click', () => {

    }, false);

    getById('workorder-save-command-id').addEventListener('click', () => {

    }, false);

    getById('workorders-list-command-id').addEventListener('click', () => {

    }, false);
  }
}