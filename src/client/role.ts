import { disable, enable, getValueById, removeReadonlyById, addReadonlyById, hide, show } from './dom.js'
import { homeowner, serviceProvider } from './entity.js'

export const readonlyRole = 'readonly'

export default () => {
  console.log('*** role init ...')
}

export function apply(role: string) {
  if (role === homeowner) {
    addReadonlyById('workorder-number-id')
    if ( parseInt( getValueById('workorder-number-id') ) === 0 ) { // new work order
      removeReadonlyById('workorder-service-provider-id')
      removeReadonlyById('workorder-title-id')
      removeReadonlyById('workorder-issue-id')
      hide('workorder-image-url-label-id')
      hide('workorder-image-url-anchor-id')
      hide('workorder-image-url-id')
      show('workorder-image-file-container-id')
    } else { // immutable work order
      addReadonlyById('workorder-service-provider-id')
      addReadonlyById('workorder-title-id')
      addReadonlyById('workorder-issue-id')
      show('workorder-image-url-label-id')
      show('workorder-image-url-anchor-id')
      show('workorder-image-url-id')
      hide('workorder-image-file-container-id')
    }
    addReadonlyById('workorder-street-address-id')
    addReadonlyById('workorder-resolution-id')
    addReadonlyById('workorder-opened-id')
    disable('workorder-closed-check-id')
    addReadonlyById('workorder-closed-id')
    show('workorders-new-command-id')
    show('workorders-refresh-command-id')
    show('workorder-save-command-id')
  } else if (role === serviceProvider) {
    addReadonlyById('workorder-number-id')
    addReadonlyById('workorder-service-provider-id')
    addReadonlyById('workorder-title-id')
    addReadonlyById('workorder-issue-id')
    addReadonlyById('workorder-street-address-id')
    hide('workorder-image-file-container-id')
    removeReadonlyById('workorder-resolution-id')
    addReadonlyById('workorder-opened-id')
    enable('workorder-closed-check-id')
    addReadonlyById('workorder-closed-id')
    hide('workorders-new-command-id')
    show('workorders-refresh-command-id')
    show('workorder-save-command-id')
  } else if (role === readonlyRole) {
    addReadonlyById('workorder-number-id')
    addReadonlyById('workorder-service-provider-id')
    addReadonlyById('workorder-title-id')
    addReadonlyById('workorder-issue-id')
    addReadonlyById('workorder-street-address-id')
    show('workorder-image-url-label-id')
    show('workorder-image-url-anchor-id')
    show('workorder-image-url-id')
    hide('workorder-image-file-container-id')
    addReadonlyById('workorder-resolution-id')
    addReadonlyById('workorder-opened-id')
    disable('workorder-closed-check-id')
    addReadonlyById('workorder-closed-id')
    hide('workorder-save-command-id')
  }
}