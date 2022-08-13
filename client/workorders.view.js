// @ts-check
import { validateWorkOrder } from '../shared/validator.js';
import { getById, getValueById, hide, listValues, show } from './common.js';

export default class WorkOrdersView {
  constructor(fetcher, model) {
    this.fetcher = fetcher;
    this.model = model;

    getById('workorder-new-command-id').addEventListener('click', () => {
      model.bindEmptyWorkOrderToView();
    }, false);

    getById('workorder-save-command-id').addEventListener('click', () => {
      hide('workorder-errors-view-id');

      const number = getValueById('workorder-number-id');
      const homeownerId = getValueById('workorder-homeowner-id');
      const serviceProviderId = getValueById('workorder-service-provider-id');
      const title = getValueById('workorder-title-id');
      const issue = getValueById('workorder-issue-id');
      const imageUrl = getValueById('workorder-image-url-id');
      const resolution = getValueById('workorder-resolution-id');
      const opened = getValueById('workorder-opened-id');
      const closed = getValueById('workorder-closed-id');

      const errors = validateWorkOrder(number, homeownerId, serviceProviderId, title, issue, imageUrl, resolution, opened, closed);
      if (errors.length === 0) {
        model.bindViewToWorkOrder(number, homeownerId, serviceProviderId, title, issue, imageUrl, resolution, opened, closed);
        const status = this.fetcher.saveWorkOrder(model.workorder);
        if (!status.success) {
          errors.push(status.error);
          this.listErrors(errors);
        } else {          
          show('workorder-dialog-id');
        }
      } else {
        this.listErrors(errors);
      }  
    }, false);

    getById('workorders-list-id').addEventListener('click', (event) => {
      if(event.target && event.target['nodeName'] === "li") {
        console.log(`click li id: ${event.target['id']}`);
        // TODO bind row to workorders-list-id!
      }
    }, false);
  }

  listErrors(errors) {
    listValues('workorder-errors-list-id', errors);
    show('workorder-errors-view-id');
  }
}