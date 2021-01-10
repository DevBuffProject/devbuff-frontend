import './styles.scss'

export const ripple = {
  bind: (el, binding) => {
    const bgColor = binding?.value || 'rgba(0, 0, 0, .3)'

    const rippleStart = (e) => {
      const duration = 800
      const rect = el.getBoundingClientRect()
      const left = rect.left
      const top = rect.top
      const width = el.offsetWidth
      const height = el.offsetHeight
      const computedStyles = window.getComputedStyle(el)
      console.log(computedStyles)
      // window.addEventListener('mousedown', rippleReset)
      // e.stopPropagation()

      const ripple = document.createElement('div')
      const rippleContainer = document.createElement('div')

      let rippleFinished = false
      let rippleFinishTimeout = 0

      clearTimeout(rippleFinishTimeout)

      const dx = e.clientX - left
      const dy = e.clientY - top
      const maxX = Math.max(dx, width - dx)
      const maxY = Math.max(dy, height - dy)
      const radius = Math.sqrt((maxX * maxX) + (maxY * maxY))
      const rippleReset = () => {
        setTimeout(() => ripple.style.opacity = 0, !rippleFinished ? duration / 2 : 0)
        setTimeout(() => rippleContainer.remove(), duration)
      }

      el.addEventListener('mouseup', rippleReset)

      rippleContainer.className = 'v-ripple'
      rippleContainer.style.height = `${height}px`
      rippleContainer.style.width = `${width}px`
      rippleContainer.style.borderRadius = computedStyles.borderRadius

      ripple.className = 'v-ripple__ripple'
      ripple.style.background = bgColor
      ripple.style.transition = `
        width ${duration}ms cubic-bezier(0.4, 0, 0.2, 1),
        height ${duration}ms cubic-bezier(0.4, 0, 0.2, 1),
        opacity ${duration / 2}ms ease
      `

      rippleContainer.appendChild(ripple)
      el.appendChild(rippleContainer)

      setTimeout(() => {
        const position = computedStyles.position

        if (position !== 'relative') el.style.position = 'relative'

        ripple.style.opacity = 0.5
        ripple.style.width = `${radius * 2}px`
        ripple.style.height = `${radius * 2}px`
        ripple.style.left = `${dx}px`
        ripple.style.top = `${dy}px`

        rippleFinishTimeout = setTimeout(() => rippleFinished = true, duration - 250)
      }, 0)
    }

    el.addEventListener('mousedown', rippleStart)
  }
}

export const install = Vue => {
  Vue.directive('ripple', ripple)
}

export default { ripple, install }
