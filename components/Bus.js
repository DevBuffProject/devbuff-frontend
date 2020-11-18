const listeners = {}

const on = (event, callback) => {
  if (!listeners.hasOwnProperty(event))
    listeners[event] = []

  listeners[event].push(callback)
}

const emit = (event, ...args) => {
  if (!listeners.hasOwnProperty(event))
    return false

  listeners[event].forEach(callback => callback(...args));
}

export default {
  on,
  emit
}
