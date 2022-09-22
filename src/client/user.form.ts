import { getById, getValueById, hide, setErrorsList, show } from './dom.js'
import * as fetcher from './fetcher.js'
import * as model from './model.js'
import { validateUserForm, SaveUser } from './entity.js'

function bindFormToUser(name: string, emailAddress: string, streetAddress: string) {
  model.setUserFields(name, emailAddress, streetAddress)
}

export default () => {
  console.log('*** user form init ...')

  getById('user-form-id').addEventListener('submit', (event) => {
    event.preventDefault()

    hide('user-errors-form-id')

    const name = getValueById('user-name-id')
    const emailAddress = getValueById('user-email-address-id')
    const streetAddress = getValueById('user-street-address-id')

    const errors = validateUserForm(name, emailAddress, streetAddress)
    if (errors.length === 0) {
      bindFormToUser(name, emailAddress, streetAddress)
      const saveUser = new SaveUser(model.getUser())
      fetcher.saveUser(saveUser).then(userSaved => {
        if (!userSaved.success) {
          errors.push(userSaved.error)
          setErrorsList(errors, 'user-errors-list-id', 'user-errors-form-id')
        } else {  
          hide('user-form-id')        
          show('workorders-list-id')
        }
      })
    } else {
      setErrorsList(errors, 'user-errors-list-id', 'user-errors-form-id')
    }      
  }, false)
}