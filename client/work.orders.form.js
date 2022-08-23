// @ts-check
import * as fetcher from './fetcher.js';
import * as model from './model.js';
import { getByClass, removeReadonlyById, addReadonlyById, getById, getFileById, getSelectedIndexId, getValueById, hide, show,
         setErrorList, setErrorsList, setImageUrlById, setSelectOptionById, setTextById, setValueById } from './common.js';

// @ts-ignore
import { validateWorkOrder } from './validator.js';

// @ts-ignore
import { homeowner, serviceProvider, WorkOrder } from './entity.js';

const readonlyRole = 'readonly';

function selectTab(tabviewId) {
  const tabviews = getByClass('tabview');
  for (const tabview of tabviews) {
    tabview['style'].display = 'none';
  }
  show(tabviewId);
}

function applyRoleToForm(role) {
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
    show('workorder-new-command-id');
    show('workorder-save-command-id');
    show('workorder-refresh-command-id');
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
    hide('workorder-new-command-id');
    show('workorder-save-command-id');
    show('workorder-refresh-command-id');
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
    hide('workorder-new-command-id');
    hide('workorder-save-command-id');
    hide('workorder-refresh-command-id');
  }
}

function bindEmptyWorkOrderToForm() {
  setValueById('workorder-number-id', 0);
  setValueById('workorder-homeowner-id', model.getUserId);
  setValueById('workorder-title-id', "");
  setValueById('workorder-issue-id', "");
  setValueById('workorder-image-url-id', "");
  setValueById('workorder-resolution-id', "");
  setValueById('workorder-opened-id', new Date().toISOString());
  setValueById('workorder-closed-id', "");
}

function bindWorkOrderToForm(workOrder) {
  setValueById('workorder-number-id', workOrder.number);
  setValueById('workorder-homeowner-id', workOrder.homeownerId);
  setSelectOptionById('workorder-service-provider-id', workOrder.serviceProviderId);
  setValueById('workorder-title-id', workOrder.title);
  setValueById('workorder-issue-id', workOrder.issue);
  setImageUrlById('workorder-image-url-id', workOrder.imageUrl);
  setValueById('workorder-resolution-id', workOrder.resolution);
  setValueById('workorder-opened-id', workOrder.opened);
  setValueById('workorder-closed-id', workOrder.closed);
}

export default () => {
  console.log('*** workorders form init ...');

  getById('workorder-new-command-id').addEventListener('click', () => {
    bindEmptyWorkOrderToForm();
  }, false);

  getById('workorder-form-id').addEventListener('submit', (event) => {
    event.preventDefault();

    hide('workorder-errors-form-id');

    const number = getValueById('workorder-number-id');
    const homeownerId = getValueById('workorder-homeowner-id');
    const serviceProviderId = getSelectedIndexId('workorder-service-provider-id');
    const title = getValueById('workorder-title-id');
    const issue = getValueById('workorder-issue-id');
    const imageUrl = getValueById('workorder-image-url-id');
    const resolution = getValueById('workorder-resolution-id');
    const opened = getValueById('workorder-opened-id');
    const closed = getValueById('workorder-closed-id');

    const errors = validateWorkOrder(number, homeownerId, serviceProviderId, title, issue, imageUrl, resolution, opened, closed);
    if (errors.length === 0) {
      let workOrder;
      if (number > 0) { // save
        workOrder = model.getWorkOrderByNumber(number);
        workOrder.homeownerId = homeownerId;
        workOrder.serviceProviderId = serviceProviderId;
        workOrder.title = title;
        workOrder.issue = issue;
        workOrder.imageUrl = imageUrl;
        workOrder.resolution = resolution;
        workOrder.closed = closed;
        const status = fetcher.saveWorkOrder(workOrder);
        if (!status.success) {
          errors.push(status.error);
          setErrorsList(errors, 'workorder-errors-list-id', 'workorder-errors-form-id');
        } else {          
          show('workorder-dialog-id');
        }
      } else { // add
        workOrder = WorkOrder.create(number, homeownerId, serviceProviderId, title, issue, imageUrl, resolution, opened, closed);
        const status = fetcher.addWorkOrder(workOrder);
        if (!status.success) {
          errors.push(status.error);
          setErrorsList(errors, 'workorder-errors-list-id', 'workorder-errors-form-id');
        } else {
          model.addWorkOrder(status.workorder);
          show('workorder-dialog-id');
        }
      }
    } else {
      setErrorsList(errors, 'workorder-errors-list-id', 'workorder-errors-form-id');
    }  
  }, false);

  getById('workorder-refresh-command-id').addEventListener('click', () => {
    const number = getValueById('workorder-number-id');
    const workOrder = fetcher.getWorkOrderByNumber(number);
    if (!workOrder.success) {
      setErrorList(workOrder.error, 'workorder-errors-list-id', 'workorder-errors-form-id');
    } else {
      bindWorkOrderToForm(workOrder);
    }
  }, false);

  getById('workorders-refresh-command-id').addEventListener('click', () => {
    const id = model.getUserId()
    const workOrders = fetcher.listWorkOrdersByUserId(id);
    if (!workOrders.success) {
      setErrorList(workOrders.error, 'workorder-errors-list-id', 'workorder-errors-form-id');
    } else {
      model.bindWorkOrdersToList(workOrders);
    }  
  }, false);

  getById('workorder-title-id').addEventListener('input', (event) => {
    const title = event.target['value'];
    if (title.length >= 4) { // is title valid?
      const number = getValueById('workorder-number-id');
      if (number > 0) { // is number valid?
        getById(number).children[0].innerHTML = title; // set new title to corresponding work orders list item
      }
    }
  }, false);

  getById('workorder-image-file-id').addEventListener('change', (event) => {
    const number = getValueById('workorder-number-id');
    const file = getFileById('workorder-image-file-id');
    const datetime = new Date().toISOString();
    const ext = file['type'] === 'image/jpeg' ? 'jpeg' : 'png';
    const filename = `${number}-${datetime}.${ext}`;
    const url = `/images/${number}/${filename}`;
    const imageUrl = fetcher.saveImage(number, url, file, filename);
    if (!imageUrl.success) {
      setErrorList(imageUrl.error, 'workorder-errors-list-id', 'workorder-errors-form-id');
    } else {
      setImageUrlById('workorder-image-url-id', imageUrl.url);
      setTextById('workorder-dialog-message', 'Photo saved successfully.');
      show('workorder-dialog-id');
    }
  }, false);

  getById('workorder-closed-check-id').addEventListener('change', (event) => {
    if (event.target['checked']) {
      setValueById('workorder-closed-id', new Date().toISOString());
    } else {
      setValueById('workorder-closed-id', '');
    }
  }, false);

  getById('workorders-list-opened-tab-id').addEventListener('click', () => {
    selectTab('workorders-list-opened-form-id');
    applyRoleToForm(model.getUserRole());
  }, false);
  
  getById('workorders-list-closed-tab-id').addEventListener('click', () => {
    selectTab('workorders-list-closed-form-id');
    applyRoleToForm(readonlyRole);
  }, false);

  getById('workorders-list-opened-form-id').addEventListener('click', (event) => {
    if(event.target && event.target['nodeName'] === "li") {
      const number = event.target['id'];
      const workOrder = model.getWorkOrderByNumber(number);
      if (workOrder !== undefined) {
        bindWorkOrderToForm(workOrder);
        applyRoleToForm(model.getUserRole());
        console.log(`*** work order selected and bound to form for number: ${number}`);
      } else {
        console.log(`*** work order undefined for number: ${number}`);
      }
    }
  }, false);

  getById('workorders-list-closed-form-id').addEventListener('click', (event) => {
    if(event.target && event.target['nodeName'] === "li") {
      const number = event.target['id'];
      const workorder = model.getWorkOrderByNumber(number);
      if (workorder !== undefined) {
        bindWorkOrderToForm(workorder);
        applyRoleToForm(readonlyRole);
        console.log(`*** work order selected and bound to form for number: ${number}`);
      } else {
        console.log(`*** work order undefined for number: ${number}`);
      }
    }
  }, false);
}