import bus from '../event-bus'

const pushDialogAsync = (component, props) =>
  new Promise((resolve) => {
    bus.emit('dialog:push', { component, props })
    bus.on('dialog:close', resolve)
  })

const controller = {
  push: pushDialogAsync,
  close: () => bus.emit('dialog:close'),
  kill: () => bus.emit('dialog:kill'),
}

export default controller
