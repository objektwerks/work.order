import * as fetcher from './fetcher.js'
import * as model from './model.js'
import * as binder from './binder.js'
import * as role from './role.js'
import { getById, getFileById, getImageUrlById, getSelectedIndexId, getValueById, hide, show, setErrorsList, setValueById } from './dom.js'
import { getFileExtByMimeType, ListWorkOrders, validateWorkOrder, WorkOrder } from './entity.js'

export default () => {
  console.log('*** workorders form init ...')

  function workOrderSelected(workOrder: WorkOrder, isClosed = false) {
    hide('workorders-list-id')
    hide('workorder-errors-form-id')
    if (isClosed) {
      hide('workorder-image-file-container-id')
    } else {
      workOrder.imageUrl.length > 0 ? hide('workorder-image-file-container-id') : show('workorder-image-file-container-id')
    }
    show('workorder-form-id')
  }

  function postAddSaveWorkOrder() {
    hide('workorder-form-id')
    show('workorders-list-id')
  }

  getById('workorders-list-opened-id').addEventListener('click', (event) => {
    const li = ( event.target as Node ).nodeName.toLowerCase()
    if(li === 'li') {
      const number = ( event.target as HTMLInputElement ).id
      const workOrder = model.getWorkOrderByNumber( parseInt(number) )
      if (number !== '0' && workOrder !== undefined) {
        binder.bindWorkOrderToForm(workOrder)
        role.apply(model.getUserRole())
        workOrderSelected(workOrder)
        console.log(`*** opened work order selected and bound to form for number: ${number}`)
      } else {
        console.log(`*** opened work order undefined for number: ${number}`)
      }
    }
  }, false)

  getById('workorders-list-closed-id').addEventListener('click', (event) => {
    const li = ( event.target as Node ).nodeName.toLowerCase()
    if(li === 'li') {
      const number = ( event.target as HTMLInputElement ).id
      const workOrder = model.getWorkOrderByNumber( parseInt(number) )
      if (number !== '0' && workOrder !== undefined) {
        binder.bindWorkOrderToForm(workOrder)
        role.apply(role.readonlyRole)
        workOrderSelected(workOrder, true)
        console.log(`*** closed work order selected and bound to form for number: ${number}`)
      } else {
        console.log(`*** closed work order undefined for number: ${number}`)
      }
    }
  }, false)

  getById('workorders-new-command-id').addEventListener('click', () => {
    binder.bindEmptyWorkOrderToForm()
    role.apply(model.getUserRole())
    model.resetImageFile()
    hide('workorders-list-id')
    show('workorder-form-id')
  }, false)

  getById('workorders-refresh-command-id').addEventListener('click', () => {
    const userId = model.getUserId()
    fetcher.listWorkOrders( new ListWorkOrders(userId, model.getLicense()) ).then(workOrdersListed => {
      if (workOrdersListed.success && workOrdersListed.workOrders.length > 0) {
        binder.bindWorkOrdersToList(workOrdersListed.workOrders)
      } 
    }) 
  }, false)

  getById('workorder-form-id').addEventListener('submit', (event) => {
    event.preventDefault()

    hide('workorder-errors-form-id')

    const number = parseInt( getValueById('workorder-number-id') )
    const homeownerId = model.getUserId()
    console.log('*** user id: %i role: %s', model.getUserId(), model.getUserRole())
    const serviceProviderId = parseInt( getSelectedIndexId('workorder-service-provider-id') )
    const title = getValueById('workorder-title-id')
    const issue = getValueById('workorder-issue-id')
    const streetAddress = getValueById('workorder-street-address-id')
    const imageUrl = getImageUrlById('workorder-image-url-id')
    console.log('*** workorder form image url: ', imageUrl)
    const resolution = getValueById('workorder-resolution-id')
    const opened = getValueById('workorder-opened-id')
    const closed = getValueById('workorder-closed-id')

    const errors = validateWorkOrder(number, homeownerId, serviceProviderId, title, issue, streetAddress, imageUrl, resolution, opened, closed)
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
            binder.ifClosedSplitWorkOrders(workOrder)
            postAddSaveWorkOrder()
            console.log('*** workorder saved: @o', workOrder)
          }
        })
      } else { // add
        const workOrder = new WorkOrder(number, homeownerId, serviceProviderId, title, issue, streetAddress, imageUrl, resolution, opened, closed)
        fetcher.addWorkOrder(workOrder,  model.getImageFile()).then(workOrderSaved => {
          if (!workOrderSaved.success) {
            errors.push(workOrderSaved.error)
            setErrorsList(errors, 'workorder-errors-list-id', 'workorder-errors-form-id')
          } else {
            workOrder.number = workOrderSaved.number
            model.addWorkOrder(workOrder)
            postAddSaveWorkOrder()
            console.log('*** workorder added: ', workOrder)
          }
        })
      }
    } else {
      console.log('*** workorder form submit errors: ', errors)
      setErrorsList(errors, 'workorder-errors-list-id', 'workorder-errors-form-id')
    }  
  }, false)

  getById('workorder-image-file-id').addEventListener('change', () => {
    const file = getFileById('workorder-image-file-id')
    if (file !== null && file !== undefined) {
      const number = parseInt( getValueById('workorder-number-id') )
      const datetime = new Date().toISOString()
      const ext = getFileExtByMimeType(file.type)
      const filename = `${datetime}.${ext}`
      const url = `/${filename}`
      model.setImageFile( new model.ImageFile(number, file, filename, url) )
      console.log('*** image file set for number: %i url: %s ', number, url)
    }}, false)

  getById('workorder-closed-check-id').addEventListener('change', (event) => {
    const isChecked = ( event.target as HTMLInputElement ).checked
    if (isChecked) {
      setValueById('workorder-closed-id', new Date().toISOString())
      console.log('*** workorder closed checked.')
    } else {
      setValueById('workorder-closed-id', '')
      console.log('*** workorder closed unchecked.')
    }
  }, false)
}