import {computed, ref} from "vue";

const isDark = ref(true)

export function useTheme() {
  const toggleTheme = () => isDark.value = !isDark.value
  const theme = computed(() => isDark.value? 'dark': 'light')
  return { toggleTheme, theme }
}
