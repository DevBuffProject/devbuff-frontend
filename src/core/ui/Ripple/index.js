import './styles.css'

export const Ripple = {
  beforeMount: (el, { value }) => {
    let prevPosition = ''
    let ripples = 0
    const computedStyles = window.getComputedStyle(el)
    const duration = 800

    const rippleStart = (e) => {
      if (el.hasAttribute('disabled')) return

      ripples++

      const width = el.offsetWidth
      const height = el.offsetHeight
      const rippleContainer = document.createElement('div')
      rippleContainer.className = 'v-ripple'
      rippleContainer.style.height = `${height}px`
      rippleContainer.style.width = `${width}px`
      rippleContainer.style.borderRadius =
        parseInt(computedStyles.borderRadius) > 0
          ? computedStyles.borderRadius
          : '4px'

      const ripple = document.createElement('div')
      const rect = el.getBoundingClientRect()
      const left = rect.left
      const top = rect.top

      const dx = e.clientX - left
      const dy = e.clientY - top
      const maxX = Math.max(dx, width - dx)
      const maxY = Math.max(dy, height - dy)
      const radius = Math.sqrt(maxX * maxX + maxY * maxY)
      const rippleReset = () => {
        setTimeout(() => (ripple.style.opacity = 0), duration / 4)
        setTimeout(() => {
          rippleContainer.remove()
          if (ripples === 1 && prevPosition) {
            el.style.position = prevPosition
            prevPosition = ''
          }
          ripples--
        }, duration)
      }

      el.addEventListener('mouseover', rippleReset)
      el.addEventListener('mouseup', rippleReset)
      el.addEventListener('mouseout', rippleReset)
      el.addEventListener('touchend', rippleReset)

      if (value) ripple.style.background = value
      ripple.className = 'v-ripple__ripple'
      ripple.style.transition = `
        width ${duration}ms,
        height ${duration}ms,
        opacity ${duration}ms ease
      `

      rippleContainer.appendChild(ripple)
      el.appendChild(rippleContainer)

      setTimeout(() => {
        if (computedStyles && computedStyles.position === 'static') {
          el.style.position = 'relative'
          prevPosition = 'static'
        }
        ripple.style.opacity = '1'
        ripple.style.width = `${radius * 2}px`
        ripple.style.height = `${radius * 2}px`
        ripple.style.left = `${dx}px`
        ripple.style.top = `${dy}px`
      }, 0)
    }

    el.addEventListener('mousedown', rippleStart)
  },
}

export const install = (app) => {
  app.directive('ripple', Ripple)
}

export default {
  install(app) {
    app.directive('ripple', Ripple)
  },
}
