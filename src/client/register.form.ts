import { getById, getValueById, getSelectedValueById, hide, setErrorsList, show } from './dom.js'
import * as fetcher from './fetcher.js'
import { validateRegisterForm, Register } from './entity.js'

export default () => {
  console.log('*** register form init ...')

  getById('register-form-id').addEventListener('submit', (event) => {
    event.preventDefault()
    
    hide('register-errors-form-id')

    const role = getSelectedValueById('register-role-id')
    const name = getValueById('register-name-id')
    const emailAddress = getValueById('register-email-address-id')
    const streetAddress = getValueById('register-street-address-id')

    console.log('*** register form: role: ', role)
    console.log('*** register form: name: ', name)
    console.log('*** register form: email address: ', emailAddress)
    console.log('*** register form: street address: ', streetAddress)

    const errors = validateRegisterForm(role, name, emailAddress, streetAddress)
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