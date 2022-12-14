import { getById, getValueById, hide, setErrorsList, show } from './dom.js'
import * as model from './model.js'
import * as binder from './binder.js'
import * as role from './role.js'
import * as fetcher from './fetcher.js'
import { validateLoginForm, Login } from './entity.js'

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
          model.setUser(loggedIn.user)
          model.setServiceProviders(loggedIn.serviceProviders)
          model.setWorkOrders(loggedIn.workOrders)

          binder.bindUserToForm(model.getUser())
          binder.bindServiceProvidersToSelect(model.getServiceProviders())
          binder.bindWorkOrdersToList(model.getWorkOrders())
  
          role.apply(model.getUserRole())

          hide('register-form-id')
          hide('register-menu-id')
          
          hide('login-form-id')
          hide('login-menu-id')  

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