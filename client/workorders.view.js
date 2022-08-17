// @ts-check

// @ts-ignore
import { validateWorkOrder } from './validator.js';

// @ts-ignore
import { homeowner, serviceProvider, WorkOrder } from './entity.js';

import { getByClass, removeReadonlyById, addReadonlyById, getById, getFileById, getSelectedIndexId, getValueById, displayImage, hide, setListValues, show, setTextById, setValueById } from './common.js';

export default class WorkOrdersView {
  constructor(fetcher, model) {
    this.fetcher = fetcher;
    this.model = model;
    this.readonlyRole = 'readonly'

    getById('workorder-new-command-id').addEventListener('click', () => {
      this.model.bindEmptyWorkOrderToView();
    }, false);

    getById('workorder-save-command-id').addEventListener('click', () => {
      hide('workorder-errors-view-id');

      const number = getValueById('workorder-number-id');
      const homeownerId = this.model.user.id;
      const serviceProviderId = getSelectedIndexId('workorder-service-provider-id');
      const title = getValueById('workorder-title-id');
      const issue = getValueById('workorder-issue-id');
      const imageUrl = getValueById('workorder-image-url-id');
      const resolution = getValueById('workorder-resolution-id');
      const opened = getValueById('workorder-opened-id');
      const closed = getValueById('workorder-closed-id');

      const errors = validateWorkOrder(number, homeownerId, serviceProviderId, title, issue, imageUrl, resolution, opened, closed);
      if (errors.length === 0) {
        const workorder = this.bindViewToWorkOrder(number, homeownerId, serviceProviderId, title, issue, imageUrl, resolution, opened, closed);
        if (workorder.number > 0) { // save
          const status = this.fetcher.saveWorkOrder(workorder);
          if (!status.success) {
            errors.push(status.error);
            this.listErrors(errors);
          } else {          
            show('workorder-dialog-id');
          }
        } else { // add
          const status = this.fetcher.addWorkOrder(workorder);
          if (!status.success) {
            errors.push(status.error);
            this.listErrors(errors);
          } else {
            this.model.addWorkOrder(status.workorder);
          }
        }
      } else {
        this.listErrors(errors);
      }  
    }, false);

    getById('workorder-refresh-command-id').addEventListener('click', () => {
      // TODO
    }, false);

    getById('workorders-refresh-command-id').addEventListener('click', () => {
      // TODO
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

    getById('workorder-closed-check-id').addEventListener('change', (event) => {
      if (event.target['checked']) {
        setValueById('workorder-closed-id', new Date().toISOString());
      } else {
        setValueById('workorder-closed-id', '');
      }
    }, false);

    getById('workorders-list-opened-tab-id').addEventListener('click', () => {
      this.selectTab('workorders-list-opened-view-id')
      show('workorder-new-command-id');
      show('workorder-save-command-id');
    }, false);
    
    getById('workorders-list-closed-tab-id').addEventListener('click', () => {
      this.selectTab('workorders-list-closed-view-id')
      hide('workorder-new-command-id');
      hide('workorder-save-command-id');
    }, false);

    getById('workorders-list-opened-view-id').addEventListener('click', (event) => {
      if(event.target && event.target['nodeName'] === "li") {
        const number = event.target['id'];
        const workorder = this.model.workorders.get(number);
        if (workorder !== undefined) {
          this.model.bindWorkOrderToView(workorder);
          this.applyRole(workorder.role);
          console.log(`*** workorder selected and bound to view for number: ${number}`);
        } else {
          console.log(`*** workorder undefined for number: ${number}`);
        }
      }
    }, false);

    getById('workorders-list-closed-view-id').addEventListener('click', (event) => {
      if(event.target && event.target['nodeName'] === "li") {
        const number = event.target['id'];
        const workorder = this.model.workorders.get(number);
        if (workorder !== undefined) {
          this.model.bindWorkOrderToView(workorder);
          this.applyRole(this.readonlyRole);
          console.log(`*** workorder selected and bound to view for number: ${number}`);
        } else {
          console.log(`*** workorder undefined for number: ${number}`);
        }
      }
    }, false);
  }

  selectTab(tabviewId) {
    const tabviews = getByClass('tabview');
    for (const tabview of tabviews) {
      tabview['style'].display = 'none';
    }
    show(tabviewId);
  }

  applyRole(role) {
    if (role === homeowner) {
      // always readonly removeReadonlyById('workorder-number-id');
      // always readonly removeReadonlyById('workorder-homeowner-id');
      removeReadonlyById('workorder-service-provider-id');
      removeReadonlyById('workorder-title-id');
      removeReadonlyById('workorder-issue-id');
      removeReadonlyById('workorder-image-file-id');
      addReadonlyById('workorder-resolution-id');
      // always readonly addReadonlyById('workorder-opened-id');
      addReadonlyById('workorder-closed-id');
    } else if (role === serviceProvider) {
      // always readonly addReadonlyById('workorder-number-id');
      // always readonly addReadonlyById('workorder-homeowner-id');
      addReadonlyById('workorder-service-provider-id');
      addReadonlyById('workorder-title-id');
      addReadonlyById('workorder-issue-id');
      addReadonlyById('workorder-image-file-id');
      removeReadonlyById('workorder-resolution-id');
      // always readonly addReadonlyById('workorder-opened-id');
      removeReadonlyById('workorder-closed-id');
    } else if (role === this.readonlyRole) {
      // always readonly addReadonlyById('workorder-number-id');
      // always readonly addReadonlyById('workorder-homeowner-id');
      addReadonlyById('workorder-service-provider-id');
      addReadonlyById('workorder-title-id');
      addReadonlyById('workorder-issue-id');
      addReadonlyById('workorder-image-file-id');
      addReadonlyById('workorder-resolution-id');
      // always readonly addReadonlyById('workorder-opened-id');
      addReadonlyById('workorder-closed-id');
    }
  }

  bindViewToWorkOrder(number, homeownerId, serviceProviderId, title, issue, imageUrl, resolution, opened, closed) {
    if (number > 0) { // save
      const workorder = this.model.workorders.get(number);
      workorder.serviceProviderId = serviceProviderId;
      workorder.title = title;
      workorder.issue = issue;
      workorder.imageUrl = imageUrl;
      workorder.resolution = resolution;
      workorder.closed = closed;
      return workorder;
    } else { // add
      return WorkOrder.create(number, homeownerId, serviceProviderId, title, issue, imageUrl, resolution, opened, closed);
    }
  }

  listErrors(errors) {
    setListValues('workorder-errors-list-id', errors);
    show('workorder-errors-view-id');
  }
}