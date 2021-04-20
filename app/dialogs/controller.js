import bus from './event-bus'
import Confirm from './components/DialogConfirm'

const pushDialogAsync = (component, props) =>
  new Promise((resolve) => {
    bus.emit('dialog:push', { component, props })
    bus.on('dialog:close', resolve)
  })

const close = () => bus.emit('dialog:close')
const kill = () => bus.emit('dialog:kill')
const scrollTop = () => bus.emit('dialog:scrollTop')
const confirm = (props) => pushDialogAsync(Confirm, props)

export default {
  push: pushDialogAsync,
  close,
  kill,
  confirm,
  scrollTop,
}
