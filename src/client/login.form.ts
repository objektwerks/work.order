import { getById, getValueById, hide, setErrorsList, show } from './common.js'
import * as fetcher from './fetcher.js'
import * as model from './model.js'
import { serviceProvider, validateCredentials, Credentials } from './entity.js'

export default () => {
  console.log('*** login form init ...')

  getById('login-form-id').addEventListener('submit', (event) => {
    event.preventDefault()

    hide('login-errors-form-id')

    const emailAddress = getValueById('login-email-address-id')
    const pin = getValueById('login-pin-id')

    const errors = validateCredentials(emailAddress, pin)
    if (errors.length === 0) {
      const credentials = new Credentials(emailAddress, pin)
      fetcher.login(credentials).then(usersWorkOrders => {
        if (!usersWorkOrders.success) {
          errors.push(usersWorkOrders.error)
          setErrorsList(errors, 'login-errors-list-id', 'login-errors-form-id')
        } else {
          model.bindUserToForm(usersWorkOrders.user)
          model.bindServiceProvidersToSelect(usersWorkOrders.serviceProviders)
          model.bindWorkOrdersToList(usersWorkOrders.workOrders)
  
          hide('login-form-id')
          hide('register-form-id"')
  
          hide('login-menu-id')
          hide('register-menu-id')
  
          show(`workorders-menu-id`)
          show(`user-menu-id`)
  
          if (model.getUserRole() === serviceProvider) {
            hide('workorder-new-command-id')
          }
          show('workorders-form-id')
        }
      })
    } else {
      setErrorsList(errors, 'login-errors-list-id', 'login-errors-form-id')
    }
  }, false)
}