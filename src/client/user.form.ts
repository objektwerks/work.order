import { getById, getValueById, hide, setErrorsList, show } from './common'
import * as fetcher from './fetcher'
import * as model from './model'

// @ts-ignore
import { validateUserInfo } from './validator.js'

function bindFormToUser(name: string, emailAddress: string, streetAddress: string) {
  model.setUser(name, emailAddress, streetAddress)
}

export default () => {
  console.log('*** user form init ...')

  getById('user-form-id').addEventListener('submit', (event) => {
    event.preventDefault()

    hide('user-errors-form-id')

    const name = getValueById('user-name-id')
    const emailAddress = getValueById('user-email-address-id')
    const streetAddress = getValueById('user-street-address-id')

    const errors = validateUserInfo(name, emailAddress, streetAddress)
    if (errors.length === 0) {
      bindFormToUser(name, emailAddress, streetAddress)
      const userStatus = fetcher.saveUser(model.getUser())
      if (!userStatus.success) {
        errors.push(userStatus.error)
        setErrorsList(errors, 'user-errors-list-id', 'user-errors-form-id')
      } else {          
        show('user-dialog-id')
      }
    } else {
      setErrorsList(errors, 'user-errors-list-id', 'user-errors-form-id')
    }      
  }, false)
}