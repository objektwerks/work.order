// @ts-check
import { getById, getByClass, show } from './common.js'

function selectMenuItem(formId: string) {
  const forms = getByClass('form') as HTMLCollectionOf<Element>
  for (let i = 0; i < forms.length; i++) {
    const form = forms.item(i) as HTMLFormElement
    form.style.display = 'none'
  }
  show(formId)
}

export default () => {
  getById('login-menu-id').addEventListener('click', () => {
    selectMenuItem('login-form-id')
  }, false)
  
  getById('register-menu-id').addEventListener('click', () => {
    selectMenuItem('register-form-id')
  }, false)
  
  getById('workorders-menu-id').addEventListener('click', () => {
    selectMenuItem('workorders-form-id')
  }, false)
  
  getById('user-menu-id').addEventListener('click', () => {
    selectMenuItem('user-form-id')
  }, false)

  console.log('*** menu init ...')
}