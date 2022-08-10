// @ts-check
import { getById } from './document.js';

export default class WorkOrdersPane {
  constructor(fetcher) {
    this.fetcher = fetcher;

    getById('workorder-new-command-id').addEventListener('click', () => {

    }, false);

    getById('workorder-save-command-id').addEventListener('click', () => {

    }, false);

    getById('workorders-list-id').addEventListener('click', (event) => {
      // See: https://davidwalsh.name/event-delegate
      if(event.target && event.target['nodeName'] === "li") {
        console.log(`li clicked id: ${event.target['id']}`);
      }
    }, false);
  }
}