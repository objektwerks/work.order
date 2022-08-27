import { getById, getValueById, hide, setErrorsList, show } from './common.js'
import * as fetcher from './fetcher.js'
import { Registration } from "../shared/entity.js"
import { validateRegistration } from '../shared/validator.js'

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
      const registration = new Registration(role, name, emailAddress, streetAddress)
      fetcher.register(registration).then(status => {
        if (!status.success) {
          errors.push(status.error)
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