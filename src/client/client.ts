import menu from './menu'
import model from './model'
import fetcher from './fetcher'
import registerview from './register.form'
import loginview from './login.form'
import workordersview from './work.orders.form'
import userview from './user.form'

export default () => {
  menu()
  model()
  fetcher()
  registerview()
  loginview()
  workordersview()
  userview()
  console.log('*** client running ...')
  console.log('*** server url: ' + 'http://' + window.location.host)
}