import { getCurrentInstance } from 'vue'

const useActivatorSlot = (bindings = {}) => {
  const vm = getCurrentInstance('useActivatorSlot')
  const slots = vm.slots
  const activator = vm.slots?.activator({ bindings })

  console.log(vm?.proxy?.$el)

  if (!activator) return null
}

export default useActivatorSlot
