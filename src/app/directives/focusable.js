let tabindex = 0
const classes = [
  '-my-1 -mx-1.5 py-1 px-1.5 transition-all rounded-md',
  'bg-gray-300 bg-opacity-0 focus:bg-opacity-40 hover:bg-opacity-40 active:bg-opacity-60',
  'dark:bg-dark-500 dark:bg-opacity-0 dark:focus:bg-opacity-30 dark:hover:bg-opacity-30 dark:active:bg-opacity-20',
]
const updateClasses = (el) => {
  const classNames = classes.join(' ').split(' ')
  el.classList.add(...classNames)
}
export default {
  name: 'focusable',
  mounted(el, binding) {
    el.setAttribute('tabindex', ++tabindex)
    if (!binding.modifiers.indexOnly) updateClasses(el)
  },
  updated(el, binding) {
    if (!binding.modifiers.indexOnly) updateClasses(el)
  },
}
