import './styles.scss'

export const ripple = {
  bind: (el, binding) => {
    const computedStyles = window.getComputedStyle(el)
    const bgColor = binding?.value
    const dark = binding.modifiers?.dark
    const duration = 500

    const rippleStart = (e) => {
      let rippleFinished = false
      let rippleFinishTimeout = 0

      clearTimeout(rippleFinishTimeout)

      const ripple = document.createElement('div')
      const rippleContainer = document.createElement('div')
      const rect = el.getBoundingClientRect()
      const left = rect.left
      const top = rect.top
      const width = el.offsetWidth
      const height = el.offsetHeight
      const dx = e.clientX - left
      const dy = e.clientY - top
      const maxX = Math.max(dx, width - dx)
      const maxY = Math.max(dy, height - dy)
      const radius = Math.sqrt((maxX * maxX) + (maxY * maxY))
      const rippleReset = () => {
        setTimeout(() => ripple.style.opacity = 0, !rippleFinished ? duration : 0)
        setTimeout(() => rippleContainer.remove(), duration * 2)
      }

      el.addEventListener('mouseover', rippleReset)
      el.addEventListener('mouseup', rippleReset)

      rippleContainer.className = 'v-ripple'
      rippleContainer.style.height = `${height}px`
      rippleContainer.style.width = `${width}px`
      rippleContainer.style.borderRadius = computedStyles.borderRadius

      if (bgColor) ripple.style.background = bgColor
      if (dark) ripple.classList.add('v-ripple__ripple--theme-dark')

      ripple.classList.add('v-ripple__ripple')
      ripple.style.transition = `
        width ${duration}ms var(--base-transition),
        height ${duration}ms var(--base-transition),
        opacity ${duration / 2}ms ease
      `

      rippleContainer.appendChild(ripple)
      el.appendChild(rippleContainer)

      requestAnimationFrame(() => {
        const position = computedStyles.position

        if (position !== 'relative') el.style.position = 'relative'

        ripple.style.opacity = 0
        requestAnimationFrame(() => ripple.style.opacity = null)
        ripple.style.width = `${radius * 2}px`
        ripple.style.height = `${radius * 2}px`
        ripple.style.left = `${dx}px`
        ripple.style.top = `${dy}px`

        rippleFinishTimeout = setTimeout(() => rippleFinished = true, duration - 250)
      })
    }

    el.addEventListener('mousedown', rippleStart)
  }
}

export const install = Vue => {
  Vue.directive('ripple', ripple)
}

export default { ripple, install }
