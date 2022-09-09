import menu from './menu.js'
import model from './model.js'
import binder from './binder.js'
import role from './role.js'
import fetcher from './fetcher.js'
import registerForm from './register.form.js'
import loginForm from './login.form.js'
import workOrdersForm from './work.orders.form.js'
import userForm from './user.form.js'

export default () => {
  menu()
  model()
  binder()
  role()
  fetcher()
  registerForm()
  loginForm()
  workOrdersForm()
  userForm()
  console.log('*** client running ...')
  console.log('*** server url: ' + 'http://' + window.location.host)
}