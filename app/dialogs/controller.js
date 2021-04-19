import bus from './event-bus'

const pushDialogAsync = (component, props) => {
  console.log(component)
  return new Promise((resolve) => {
    bus.emit('dialog:push', { component, props })
    bus.on('dialog:close', resolve)
  })
}

const close = () => bus.emit('dialog:close')
const kill = () => bus.emit('dialog:kill')
const scrollTop = () => bus.emit('dialog:scrollTop')

export default {
  push: pushDialogAsync,
  close,
  kill,
  scrollTop,
}
