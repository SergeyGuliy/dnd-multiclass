import {ref} from "vue";

const isOpen = ref(false)

export function useDrawer() {
  const toggleDrawer = () => isOpen.value = !isOpen.value

  return {isOpen, toggleDrawer}
}
