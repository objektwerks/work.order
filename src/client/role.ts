import { removeReadonlyById, addReadonlyById, hide, show } from './dom.js'
import { homeowner, serviceProvider } from './entity.js'

export const readonlyRole = 'readonly'

export default () => {
  console.log('*** role init ...')
}

export function apply(role: string) {
  if (role === homeowner) {
    // always readonly removeReadonlyById('workorder-number-id')
    // always readonly removeReadonlyById('workorder-homeowner-id')
    removeReadonlyById('workorder-service-provider-id')
    removeReadonlyById('workorder-title-id')
    removeReadonlyById('workorder-issue-id')
    show('workorder-image-file-id')
    addReadonlyById('workorder-resolution-id')
    // always readonly addReadonlyById('workorder-opened-id')
    addReadonlyById('workorder-closed-id')
    show('workorders-new-command-id')
    show('workorders-refresh-command-id')
    show('workorder-save-command-id')
  } else if (role === serviceProvider) {
    // always readonly addReadonlyById('workorder-number-id')
    // always readonly addReadonlyById('workorder-homeowner-id')
    addReadonlyById('workorder-service-provider-id')
    addReadonlyById('workorder-title-id')
    addReadonlyById('workorder-issue-id')
    hide('workorder-image-file-id')
    removeReadonlyById('workorder-resolution-id')
    // always readonly addReadonlyById('workorder-opened-id')
    removeReadonlyById('workorder-closed-id')
    hide('workorders-new-command-id')
    show('workorders-refresh-command-id')
    show('workorder-save-command-id')
  } else if (role === readonlyRole) {
    // always readonly addReadonlyById('workorder-number-id')
    // always readonly addReadonlyById('workorder-homeowner-id')
    addReadonlyById('workorder-service-provider-id')
    addReadonlyById('workorder-title-id')
    addReadonlyById('workorder-issue-id')
    hide('workorder-image-file-id')
    addReadonlyById('workorder-resolution-id')
    // always readonly addReadonlyById('workorder-opened-id')
    addReadonlyById('workorder-closed-id')
    hide('workorders-new-command-id')
    hide('workorders-refresh-command-id')
    hide('workorder-save-command-id')
  }
}