import bus from './Bus'

export default {
  info: text => bus.emit('notify', { type: 'info', text }),
  warning: text => bus.emit('notify', { type: 'warning', text }),
  danger: text => bus.emit('notify', { type: 'danger', text }),
  success: text => bus.emit('notify', { type: 'success', text }),
}
