import bus from './event-bus'

const push = ({ type, title, text, component }) =>
  bus.emit('notification:push', { type, title, text, component })

const info = (props) => push({ ...props, type: 'info' })
const warn = (props) => push({ ...props, type: 'warn' })
const danger = (props) => push({ ...props, type: 'danger' })
const success = (props) => push({ ...props, type: 'success' })

export default {
  info,
  warn,
  danger,
  success,
}
