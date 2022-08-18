// @ts-check
import * as fetcher from './fetcher.js';
import * as model from './model.js';

// @ts-ignore
import { validateWorkOrder } from './validator.js';

// @ts-ignore
import { homeowner, serviceProvider, WorkOrder } from './entity.js';

import { getByClass, removeReadonlyById, addReadonlyById, getById, getFileById, getSelectedIndexId, getValueById, displayImage, hide, setListValues, show, setTextById, setValueById } from './common.js';

export default () => {
  console.log('*** workorders view init ...');

  const readonlyRole = 'readonly'

  getById('workorder-new-command-id').addEventListener('click', () => {
    model.bindEmptyWorkOrderToView();
  }, false);

  getById('workorder-save-command-id').addEventListener('click', () => {
    hide('workorder-errors-view-id');

    const number = getValueById('workorder-number-id');
    const homeownerId = model.getUserId();
    const serviceProviderId = getSelectedIndexId('workorder-service-provider-id');
    const title = getValueById('workorder-title-id');
    const issue = getValueById('workorder-issue-id');
    const imageUrl = getValueById('workorder-image-url-id');
    const resolution = getValueById('workorder-resolution-id');
    const opened = getValueById('workorder-opened-id');
    const closed = getValueById('workorder-closed-id');

    const errors = validateWorkOrder(number, homeownerId, serviceProviderId, title, issue, imageUrl, resolution, opened, closed);
    if (errors.length === 0) {
      const workOrder = bindViewToWorkOrder(number, homeownerId, serviceProviderId, title, issue, imageUrl, resolution, opened, closed);
      if (workOrder.number > 0) { // save
        const status = fetcher.saveWorkOrder(workOrder);
        if (!status.success) {
          errors.push(status.error);
          listErrors(errors);
        } else {          
          show('workorder-dialog-id');
        }
      } else { // add
        const status = fetcher.addWorkOrder(workOrder);
        if (!status.success) {
          errors.push(status.error);
          listErrors(errors);
        } else {
          model.addWorkOrder(status.workorder);
        }
      }
    } else {
      listErrors(errors);
    }  
  }, false);

  getById('workorder-refresh-command-id').addEventListener('click', () => {
    const number = getValueById('workorder-number-id');
    const workOrder = fetcher.getWorkOrderByNumber(number);
    if (!workOrder.success) {
      listError(workOrder.error);
    } else {
      model.bindWorkOrderToView(workOrder);
    }
  }, false);

  getById('workorders-refresh-command-id').addEventListener('click', () => {
    const id = model.getUserId()
    const workOrders = fetcher.listWorkOrdersByUserId(id);
    if (!workOrders.success) {
      listError(workOrders.error);
    } else {
      model.bindWorkOrdersToListView(workOrders);
    }  
  }, false);

  getById('workorder-image-file-id').addEventListener('change', (event) => {
    const number = getValueById('workorder-number-id');
    const file = getFileById('workorder-image-file-id');
    const filename = `${number}-image`;
    const imageUrl = fetcher.saveImage(number, file, filename);
    if (!imageUrl.success) {
      listError(imageUrl.error);
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
    selectTab('workorders-list-opened-view-id')
    show('workorder-new-command-id');
    show('workorder-save-command-id');
  }, false);
  
  getById('workorders-list-closed-tab-id').addEventListener('click', () => {
    selectTab('workorders-list-closed-view-id')
    hide('workorder-new-command-id');
    hide('workorder-save-command-id');
  }, false);

  getById('workorders-list-opened-view-id').addEventListener('click', (event) => {
    if(event.target && event.target['nodeName'] === "li") {
      const number = event.target['id'];
      const workOrder = model.getWorkOrderByNumber(number);
      if (workOrder !== undefined) {
        model.bindWorkOrderToView(workOrder);
        applyRole(model.getUser().role);
        console.log(`*** work order selected and bound to view for number: ${number}`);
      } else {
        console.log(`*** work order undefined for number: ${number}`);
      }
    }
  }, false);

  getById('workorders-list-closed-view-id').addEventListener('click', (event) => {
    if(event.target && event.target['nodeName'] === "li") {
      const number = event.target['id'];
      const workorder = model.getWorkOrderByNumber(number);
      if (workorder !== undefined) {
        model.bindWorkOrderToView(workorder);
        applyRole(readonlyRole);
        console.log(`*** work order selected and bound to view for number: ${number}`);
      } else {
        console.log(`*** work order undefined for number: ${number}`);
      }
    }
  }, false);

  function selectTab(tabviewId) {
    const tabviews = getByClass('tabview');
    for (const tabview of tabviews) {
      tabview['style'].display = 'none';
    }
    show(tabviewId);
  }

  function applyRole(role) {
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
    } else if (role === readonlyRole) {
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

  function bindViewToWorkOrder(number, homeownerId, serviceProviderId, title, issue, imageUrl, resolution, opened, closed) {
    if (number > 0) { // save
      const workOrder = model.getWorkOrderByNumber(number);
      workOrder.serviceProviderId = serviceProviderId;
      workOrder.title = title;
      workOrder.issue = issue;
      workOrder.imageUrl = imageUrl;
      workOrder.resolution = resolution;
      workOrder.closed = closed;
      return workOrder;
    } else { // add
      return WorkOrder.create(number, homeownerId, serviceProviderId, title, issue, imageUrl, resolution, opened, closed);
    }
  }

  function listError(error) {
    const errors = [];
    errors.push(error);
    listErrors(errors);
  }

  function listErrors(errors) {
    setListValues('workorder-errors-list-id', errors);
    show('workorder-errors-view-id');
  }
}