// @ts-check
import { homeowner, serviceProvider } from '../shared/entity.js';
import { validateWorkOrder } from '../shared/validator.js';
import { disableReadonlyById, enableReadonlyById, getById, getFileById, getSelectIndexValueById, getValueById, displayImage, hide, listValues, show, setTextById } from './common.js';

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
      const homeownerId = model.user.id;
      const serviceProviderId = getSelectIndexValueById('workorder-service-provider-id');
      const title = getValueById('workorder-title-id');
      const issue = getValueById('workorder-issue-id');
      const imageUrl = getValueById('workorder-image-url-id');
      const resolution = getValueById('workorder-resolution-id');
      const opened = getValueById('workorder-opened-id');
      const closed = getValueById('workorder-closed-id');

      const errors = validateWorkOrder(number, homeownerId, serviceProviderId, title, issue, imageUrl, resolution, opened, closed);
      if (errors.length === 0) {
        const workorder = model.bindViewToWorkOrder(number, homeownerId, serviceProviderId, title, issue, imageUrl, resolution, opened, closed);
        const status = (workorder.number === 0) ? this.fetcher.addWorkOrder(workorder) : this.fetcher.saveWorkOrder(workorder);
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

    getById('workorder-image-file-id').addEventListener('change', (event) => {
      const number = getValueById('workorder-number-id');
      const file = getFileById('workorder-image-file-id');
      const filename = `${number}-image`;
      const imageUrl = this.fetcher.saveImage(number, file, filename);
      if (!imageUrl.success) {
        const errors = []
        errors.push(imageUrl.error);
        this.listErrors(errors);
      } else {          
        setTextById('workorder-dialog-message', 'Photo saved successfully.');
        show('workorder-dialog-id');
      }
      displayImage(file, 'workorder-image-url-id');
    }, false);

    getById('workorder-closed-id').addEventListener('change', (event) => {
      if (event.target['checked']) {
        model.selectedWorkOrder.closed = new Date().toISOString();
      } else {
        model.selectedWorkOrder.closed = '';
      }
    }, false);

    getById('workorders-list-id').addEventListener('click', (event) => {
      if(event.target && event.target['nodeName'] === "li") {
        const number = event.target['id'];
        const workorder = model.workorders.get(number);
        if (workorder !== undefined) {
          model.bindWorkOrderToView(workorder);
          this.applyRole(workorder.role)
          console.log(`*** workorder selected and bound to view for id: ${id}`);
        } else {
          console.log(`*** workorder undefined for id: ${id}`);
        }
      }
    }, false);
  }

  applyRole(role) {
    if (role === homeowner) {
      disableReadonlyById('workorder-service-provider-id');
      disableReadonlyById('workorder-title-id');
      disableReadonlyById('workorder-issue-id');
      disableReadonlyById('workorder-image-file-id');
      enableReadonlyById('workorder-resolution-id');
      enableReadonlyById('workorder-closed-id');
    } else if (role === serviceProvider) {
      enableReadonlyById('workorder-service-provider-id');
      enableReadonlyById('workorder-title-id');
      enableReadonlyById('workorder-issue-id');
      enableReadonlyById('workorder-image-file-id');
      disableReadonlyById('workorder-resolution-id');
      disableReadonlyById('workorder-closed-id');
    } else {
      console.log(`*** applyRole unknown for role: ${role}`);
    }
  }

  listErrors(errors) {
    listValues('workorder-errors-list-id', errors);
    show('workorder-errors-view-id');
  }
}