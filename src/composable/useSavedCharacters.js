import {ref} from "vue";

import {useDrawer} from "@/composable/useDrawer";

const savedCharacters = ref({})
const loadedCharacter = ref({})

export function useSavedCharacters() {
  const loadCharactersFromLocalStorage = () => {
    const savedCharactersInLS = localStorage.getItem('savedCharacters')
    try {
      savedCharacters.value = savedCharactersInLS? JSON.parse(savedCharactersInLS): {}
    } catch (e) {
      savedCharacters.value  ={}
    }
  }

  const saveCharacter = (characterData) => {
    const {heroName} = characterData
    savedCharacters.value[heroName] = characterData
    localStorage.setItem('savedCharacters', JSON.stringify(savedCharacters.value))
  }
  const deleteCharacter = (heroName) => {
    if (savedCharacters.value[heroName]) {
      delete savedCharacters.value[heroName]
      localStorage.setItem('savedCharacters', JSON.stringify(savedCharacters.value))
    }
  }

  const loadCharacter = (charData) => {
    loadedCharacter.value = charData
    useDrawer().toggleDrawer()
  }

  return {
    loadCharactersFromLocalStorage,
    savedCharacters,
    saveCharacter,
    deleteCharacter,
    loadCharacter,
    loadedCharacter
  }
}
