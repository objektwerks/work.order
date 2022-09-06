import { getById, getValueById, hide, setErrorsList, show } from './dom.js'
import * as fetcher from './fetcher.js'
import * as model from './model.js'
import { serviceProvider, validateLoginForm, Login } from './entity.js'

export default () => {
  console.log('*** login form init ...')

  getById('login-form-id').addEventListener('submit', (event) => {
    event.preventDefault()

    hide('login-errors-form-id')

    const emailAddress = getValueById('login-email-address-id')
    const pin = getValueById('login-pin-id')

    const errors = validateLoginForm(emailAddress, pin)
    if (errors.length === 0) {
      const login = new Login(emailAddress, pin)
      fetcher.login(login).then(loggedIn => {
        if (!loggedIn.success) {
          errors.push(loggedIn.error)
          setErrorsList(errors, 'login-errors-list-id', 'login-errors-form-id')
        } else {
          model.bindUserToForm(loggedIn.user)
          model.bindServiceProvidersToSelect(loggedIn.serviceProviders)
          model.bindWorkOrdersToList(loggedIn.workOrders)
  
          hide('login-form-id')
          hide('login-menu-id')  
          if (model.getUserRole() === serviceProvider) {
            hide('workorders-new-command-id')
          }

          show(`workorders-menu-id`)
          show(`user-menu-id`)
          show('workorders-list-id')
        }
      })
    } else {
      setErrorsList(errors, 'login-errors-list-id', 'login-errors-form-id')
    }
  }, false)
}