import * as fetcher from './fetcher.js'
import * as model from './model.js'
import { getByClass, removeReadonlyById, addReadonlyById, getById, getFileById, getSelectedIndexId, getValueById,
         hide, show, setErrorsList, setImageUrlById, setSelectOptionById, setValueById } from './dom.js'
import { homeowner, serviceProvider, validateWorkOrder, WorkOrder } from './entity.js'

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
  setValueById('workorder-number-id', workOrder.number.toString())
  setValueById('workorder-homeowner-id', workOrder.homeownerId.toString())
  setSelectOptionById('workorder-service-provider-id', workOrder.serviceProviderId.toString())
  setValueById('workorder-title-id', workOrder.title)
  setValueById('workorder-issue-id', workOrder.issue)
  setImageUrlById('workorder-image-url-id', workOrder.imageUrl)
  setValueById('workorder-resolution-id', workOrder.resolution)
  setValueById('workorder-opened-id', workOrder.opened)
  setValueById('workorder-closed-id', workOrder.closed)
}

function postAddSaveWorkOrder() {
  show('workorder-dialog-id')
  show('workorders-list-id')
  hide('workorder-form-id')
}

export default () => {
  console.log('*** workorders form init ...')

  getById('workorders-new-command-id').addEventListener('click', () => {
    bindEmptyWorkOrderToForm()
    hide('workorders-list-id')
    show('workorder-form-id')
  }, false)

  getById('workorders-refresh-command-id').addEventListener('click', () => {
    const id = model.getUserId()
    fetcher.listWorkOrdersByUserId(id).then(workOrdersListed => {
      if (workOrdersListed.success && workOrdersListed.workOrders.length > 0) {
        model.bindWorkOrdersToList(workOrdersListed.workOrders)
      } 
    }) 
  }, false)

  getById('workorder-form-id').addEventListener('submit', (event) => {
    event.preventDefault()

    hide('workorder-errors-form-id')

    const number = parseInt( getValueById('workorder-number-id') )
    const homeownerId = parseInt( getValueById('workorder-homeowner-id') )
    const serviceProviderId = parseInt( getSelectedIndexId('workorder-service-provider-id') )
    const title = getValueById('workorder-title-id')
    const issue = getValueById('workorder-issue-id')
    const imageUrl = getValueById('workorder-image-url-id')
    const resolution = getValueById('workorder-resolution-id')
    const opened = getValueById('workorder-opened-id')
    const closed = getValueById('workorder-closed-id')

    const errors = validateWorkOrder(number, homeownerId, serviceProviderId, title, issue, imageUrl, resolution, opened, closed)
    if (errors.length === 0) {
      const workOrder = model.getWorkOrderByNumber(number)
      if (workOrder !== undefined && number > 0) { // save
        workOrder.serviceProviderId = serviceProviderId
        workOrder.title = title
        workOrder.issue = issue
        workOrder.imageUrl = imageUrl
        workOrder.resolution = resolution
        workOrder.closed = closed
        fetcher.saveWorkOrder(workOrder, model.getImageFile()).then(workOrderSaved => {
          if (!workOrderSaved.success) {
            errors.push(workOrderSaved.error)
            setErrorsList(errors, 'workorder-errors-list-id', 'workorder-errors-form-id')
          } else {          
            postAddSaveWorkOrder()
          }
        })
      } else { // add
        const workOrder = new WorkOrder(number, homeownerId, serviceProviderId, title, issue, imageUrl, resolution, opened, closed)
        fetcher.addWorkOrder(workOrder,  model.getImageFile()).then(workOrderSaved => {
          if (!workOrderSaved.success) {
            errors.push(workOrderSaved.error)
            setErrorsList(errors, 'workorder-errors-list-id', 'workorder-errors-form-id')
          } else {
            workOrder.number = workOrderSaved.number
            model.addWorkOrder(workOrder)
            postAddSaveWorkOrder()
          }
        })
      }
    } else {
      setErrorsList(errors, 'workorder-errors-list-id', 'workorder-errors-form-id')
    }  
  }, false)

  getById('workorder-title-id').addEventListener('input', (event) => {
    const title = ( event.target as HTMLInputElement ).value
    if (title.length >= 4) { // is title valid?
      const number = parseInt( getValueById('workorder-number-id'))
      if (number !== undefined && number > 0) { // is number valid?
        getById(number.toString()).children[0].innerHTML = `${number} - ${title}` // set new title to corresponding work orders list item
      }
    }
  }, false)

  getById('workorder-image-file-id').addEventListener('change', () => {
    const file = getFileById('workorder-image-file-id')
    if (file !== undefined  && file !== null) {
      const number = parseInt( getValueById('workorder-number-id') )
      const datetime = new Date().toISOString()
      const ext = file.type === 'image/jpeg' ? 'jpeg' : 'png'
      const filename = `${datetime}.${ext}`
      const url = `/images/${filename}`
      model.setImageFile( new model.ImageFile(number, file, filename, url) )
    }}, false)

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
      if ( workOrder !== undefined ) {
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