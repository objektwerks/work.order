import * as fetcher from './fetcher.js'
import * as model from './model.js'
import { isDefined, getByClass, removeReadonlyById, addReadonlyById, getById, getFileById, getSelectedIndexId, getValueById, hide,
         show, setErrorList, setErrorsList, setImageUrlById, setSelectOptionById, setTextById, setValueById } from './common.js'

// @ts-ignore
import { validateWorkOrder } from './validator.js'

// @ts-ignore
import { homeowner, serviceProvider, WorkOrder, WorkOrderStatus } from './entity.js'

const readonlyRole = 'readonly'

function selectTab(tabviewId: string) {
  const tabviews = getByClass('tabview') as HTMLCollectionOf<Element>
  for (let i = 0; i < tabviews.length; i++) {
    const tabview = tabviews.item(i) as HTMLFormElement
    tabview.style.display = 'none'
  }
  show(tabviewId)
}

function applyRoleToForm(role: string) {
  if (role === homeowner) {
    // always readonly removeReadonlyById('workorder-number-id')
    // always readonly removeReadonlyById('workorder-homeowner-id')
    removeReadonlyById('workorder-service-provider-id')
    removeReadonlyById('workorder-title-id')
    removeReadonlyById('workorder-issue-id')
    removeReadonlyById('workorder-image-file-id')
    addReadonlyById('workorder-resolution-id')
    // always readonly addReadonlyById('workorder-opened-id')
    addReadonlyById('workorder-closed-id')
    show('workorder-new-command-id')
    show('workorder-save-command-id')
    show('workorder-refresh-command-id')
  } else if (role === serviceProvider) {
    // always readonly addReadonlyById('workorder-number-id')
    // always readonly addReadonlyById('workorder-homeowner-id')
    addReadonlyById('workorder-service-provider-id')
    addReadonlyById('workorder-title-id')
    addReadonlyById('workorder-issue-id')
    addReadonlyById('workorder-image-file-id')
    removeReadonlyById('workorder-resolution-id')
    // always readonly addReadonlyById('workorder-opened-id')
    removeReadonlyById('workorder-closed-id')
    hide('workorder-new-command-id')
    show('workorder-save-command-id')
    show('workorder-refresh-command-id')
  } else if (role === readonlyRole) {
    // always readonly addReadonlyById('workorder-number-id')
    // always readonly addReadonlyById('workorder-homeowner-id')
    addReadonlyById('workorder-service-provider-id')
    addReadonlyById('workorder-title-id')
    addReadonlyById('workorder-issue-id')
    addReadonlyById('workorder-image-file-id')
    addReadonlyById('workorder-resolution-id')
    // always readonly addReadonlyById('workorder-opened-id')
    addReadonlyById('workorder-closed-id')
    hide('workorder-new-command-id')
    hide('workorder-save-command-id')
    hide('workorder-refresh-command-id')
  }
}

function bindEmptyWorkOrderToForm() {
  setValueById('workorder-number-id', '0')
  setValueById('workorder-homeowner-id', model.getUserId.toString())
  setValueById('workorder-title-id', "")
  setValueById('workorder-issue-id', "")
  setValueById('workorder-image-url-id', "")
  setValueById('workorder-resolution-id', "")
  setValueById('workorder-opened-id', new Date().toISOString())
  setValueById('workorder-closed-id', "")
}

function bindWorkOrderToForm(workOrder: WorkOrder) {
  setValueById('workorder-number-id', workOrder.number)
  setValueById('workorder-homeowner-id', workOrder.homeownerId)
  setSelectOptionById('workorder-service-provider-id', workOrder.serviceProviderId)
  setValueById('workorder-title-id', workOrder.title)
  setValueById('workorder-issue-id', workOrder.issue)
  setImageUrlById('workorder-image-url-id', workOrder.imageUrl)
  setValueById('workorder-resolution-id', workOrder.resolution)
  setValueById('workorder-opened-id', workOrder.opened)
  setValueById('workorder-closed-id', workOrder.closed)
}

export default () => {
  console.log('*** workorders form init ...')

  getById('workorder-new-command-id').addEventListener('click', () => {
    bindEmptyWorkOrderToForm()
  }, false)

  getById('workorder-form-id').addEventListener('submit', (event) => {
    event.preventDefault()

    hide('workorder-errors-form-id')

    const number = parseInt( getValueById('workorder-number-id') )
    const homeownerId = getValueById('workorder-homeowner-id')
    const serviceProviderId = getSelectedIndexId('workorder-service-provider-id')
    const title = getValueById('workorder-title-id')
    const issue = getValueById('workorder-issue-id')
    const imageUrl = getValueById('workorder-image-url-id')
    const resolution = getValueById('workorder-resolution-id')
    const opened = getValueById('workorder-opened-id')
    const closed = getValueById('workorder-closed-id')

    const errors = validateWorkOrder(number, homeownerId, serviceProviderId, title, issue, imageUrl, resolution, opened, closed)
    if (errors.length === 0) {
      if (number > 0) { // save
        const workOrder: WorkOrder = model.getWorkOrderByNumber(number)
        workOrder.homeownerId = homeownerId
        workOrder.serviceProviderId = serviceProviderId
        workOrder.title = title
        workOrder.issue = issue
        workOrder.imageUrl = imageUrl
        workOrder.resolution = resolution
        workOrder.closed = closed
        const workOrderStatus: WorkOrderStatus = fetcher.saveWorkOrder(workOrder)
        if (!workOrderStatus.success) {
          errors.push(workOrderStatus.error)
          setErrorsList(errors, 'workorder-errors-list-id', 'workorder-errors-form-id')
        } else {          
          show('workorder-dialog-id')
        }
      } else { // add
        const workOrder: WorkOrder = new WorkOrder(number, homeownerId, serviceProviderId, title, issue, imageUrl, resolution, opened, closed)
        const workOrderStatus: WorkOrderStatus = fetcher.addWorkOrder(workOrder)
        if (!workOrderStatus.success) {
          errors.push(workOrderStatus.error)
          setErrorsList(errors, 'workorder-errors-list-id', 'workorder-errors-form-id')
        } else {
          workOrder.number = workOrderStatus.number
          model.addWorkOrder(workOrder)
          show('workorder-dialog-id')
        }
      }
    } else {
      setErrorsList(errors, 'workorder-errors-list-id', 'workorder-errors-form-id')
    }  
  }, false)

  getById('workorder-refresh-command-id').addEventListener('click', () => {
    const number = parseInt( getValueById('workorder-number-id') )
    const workOrder = fetcher.getWorkOrderByNumber(number)
    if (!workOrder.success) {
      setErrorList(workOrder.error, 'workorder-errors-list-id', 'workorder-errors-form-id')
    } else {
      bindWorkOrderToForm(workOrder)
    }
  }, false)

  getById('workorders-refresh-command-id').addEventListener('click', () => {
    const id = model.getUserId()
    const workOrders = fetcher.listWorkOrdersByUserId(id)
    if (!workOrders.success) {
      setErrorList(workOrders.error, 'workorder-errors-list-id', 'workorder-errors-form-id')
    } else {
      model.bindWorkOrdersToList(workOrders)
    }  
  }, false)

  getById('workorder-title-id').addEventListener('input', (event) => {
    const title = ( event.target as HTMLInputElement ).value
    if (title.length >= 4) { // is title valid?
      const number = parseInt( getValueById('workorder-number-id'))
      if (number > 0) { // is number valid?
        getById(number.toString()).children[0].innerHTML = title // set new title to corresponding work orders list item
      }
    }
  }, false)

  getById('workorder-image-file-id').addEventListener('change', () => {
    const number = getValueById('workorder-number-id')
    const file = getFileById('workorder-image-file-id')
    const datetime = new Date().toISOString()
    const ext = file?.type === 'image/jpeg' ? 'jpeg' : 'png'
    const filename = `${number}-${datetime}.${ext}`
    const url = `/images/${number}/${filename}`
    if ( isDefined(file) ) {
      // @ts-ignore
      const imageUrl = fetcher.saveImage(number, url, file, filename) // file may be undefined or null!
      if (!imageUrl.success) {
        setErrorList(imageUrl.error, 'workorder-errors-list-id', 'workorder-errors-form-id')
      } else {
        setImageUrlById('workorder-image-url-id', imageUrl.url)
        setTextById('workorder-dialog-message', 'Photo saved successfully.')
        show('workorder-dialog-id')
      }
    } else {
      setErrorList(`Failed to load file: ${filename}`, 'workorder-errors-list-id', 'workorder-errors-form-id')
    }
  }, false)

  getById('workorder-closed-check-id').addEventListener('change', (event) => {
    const isChecked = ( event.target as HTMLInputElement ).checked
    if (isChecked) {
      setValueById('workorder-closed-id', new Date().toISOString())
    } else {
      setValueById('workorder-closed-id', '')
    }
  }, false)

  getById('workorders-list-opened-tab-id').addEventListener('click', () => {
    selectTab('workorders-list-opened-form-id')
    applyRoleToForm(model.getUserRole())
  }, false)
  
  getById('workorders-list-closed-tab-id').addEventListener('click', () => {
    selectTab('workorders-list-closed-form-id')
    applyRoleToForm(readonlyRole)
  }, false)

  getById('workorders-list-opened-form-id').addEventListener('click', (event) => {
    const isLi = ( event.target as Node ).nodeName === 'li'
    if(isLi) {
      const number = ( event.target as HTMLInputElement ).id
      const workOrder = model.getWorkOrderByNumber( parseInt(number) )
      if ( isDefined(workOrder) ) {
        bindWorkOrderToForm(workOrder)
        applyRoleToForm(model.getUserRole())
        console.log(`*** work order selected and bound to form for number: ${number}`)
      } else {
        console.log(`*** work order undefined for number: ${number}`)
      }
    }
  }, false)

  getById('workorders-list-closed-form-id').addEventListener('click', (event) => {
    const isLi = ( event.target as Node ).nodeName === 'li'
    if(isLi) {
      const number = ( event.target as HTMLInputElement ).id
      const workorder = model.getWorkOrderByNumber( parseInt(number) )
      if (workorder !== undefined) {
        bindWorkOrderToForm(workorder)
        applyRoleToForm(readonlyRole)
        console.log(`*** work order selected and bound to form for number: ${number}`)
      } else {
        console.log(`*** work order undefined for number: ${number}`)
      }
    }
  }, false)
}