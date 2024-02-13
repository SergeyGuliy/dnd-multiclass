import {onMounted, ref, watch} from "vue";
import lodashDefault from "lodash-es";

import en from "@/locales/en";
import ru from "@/locales/ru";

const activeLocale = ref('ru')

watch(() => activeLocale.value, (v) => {
  localStorage.setItem('locale', v)
})

export const locales = [
  {
    key: 'en',
    title: 'English',
  },
  {
    key: 'ru',
    title: 'Руский',
  },
]

export const changeLocale = (locale) => activeLocale.value = locale

const localesMap = {
  en,
  ru,
}

export function useMyLocale() {
  return (key) => {
    try {
      return lodashDefault.get(localesMap[activeLocale.value], key) || key
    } catch {
      return  key
    }
  }
}
