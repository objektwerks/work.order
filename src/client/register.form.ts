import { getById, getValueById, hide, setErrorsList, show } from './common.js'
import * as fetcher from './fetcher.js'
import { validateRegistration, Register } from "./entity.js"

export default () => {
  console.log('*** register form init ...')

  getById('register-form-id').addEventListener('submit', (event) => {
    event.preventDefault()
    
    hide('register-errors-form-id')

    const role = getValueById('register-role-id')
    const name = getValueById('register-name-id')
    const emailAddress = getValueById('register-email-address-id')
    const streetAddress = getValueById('register-street-address-id')

    const errors = validateRegistration(role, name, emailAddress, streetAddress)
    if (errors.length === 0) {
      const register = new Register(role, name, emailAddress, streetAddress)
      fetcher.register(register).then(registered => {
        if (!registered.success) {
          errors.push(registered.error)
          setErrorsList(errors, 'register-errors-list-id', 'register-errors-form-id')
        } else {
          hide('register-form-id"')
          hide('register-menu-id')
          
          show('register-dialog-id')
        }
      })
    } else {
      setErrorsList(errors, 'register-errors-list-id', 'register-errors-form-id')
    }
  }, false)
}