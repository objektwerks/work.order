// @ts-check
import { getById } from './document.js';

export default class WorkOrdersView {
  constructor(fetcher, model) {
    this.fetcher = fetcher;
    this.model = model;

    getById('workorder-new-command-id').addEventListener('click', () => {

    }, false);

    getById('workorder-save-command-id').addEventListener('click', () => {

    }, false);

    getById('workorders-list-id').addEventListener('click', (event) => {
      if(event.target && event.target['nodeName'] === "li") {
        console.log(`click li id: ${event.target['id']}`);
      }
    }, false);
  }
}