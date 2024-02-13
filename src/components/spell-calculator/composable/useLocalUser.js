import {computed, ref, watch} from "vue";

import { lvlToSpellSlots} from "@/components/spell-calculator/constants/spells";

import { getHitDices, getMediumHp, getSpellSlots} from "@/components/spell-calculator/assets/helpers";
import {useSavedCharacters} from "@/composable/useSavedCharacters";
import {prestidigitationsMap} from "@/components/spell-calculator/constants/prestidigitations";

const { loadedCharacter} = useSavedCharacters()

const heroName = ref('')
const classesData = ref({})
const isTough = ref(false)
const constitution = ref(10)
const isDraconicSorcerer = ref(false)


watch(() => loadedCharacter.value, (charData) => {
  heroName.value = charData.heroName
  classesData.value = charData.classesData
  isTough.value = charData.isTough
  constitution.value = charData.constitution
})

const selectedClasses = computed({
  get: () => Object.keys(classesData.value),
  set: (activeClassList) => {
    classesData.value = Object.fromEntries(activeClassList.map((className) => {
      const classExist = !!classesData.value[className]

      const classObj = classExist? classesData.value[className]: {
        lvl: 1,
        isMainClass: false,
        name: className
      }

      return [className, classObj]
    }))
  }
})

const classesDynamicData = computed(() => Object.fromEntries(selectedClasses.value.map((className) => {
  const classObj = {
    spellLvl: getSpellSlots(classesData.value[className]),
    hitDice: getHitDices(classesData.value[className], className),
    mediumHp: getMediumHp(classesData.value[className], className, classesData.value[className].isMainClass),
    name: className,
    prestidigitations: prestidigitationsMap[className][classesData.value[className].lvl]
  }

  return [className, classObj]
})))

const totalLvl = computed(() => Object.values(classesData.value).reduce((partialSum, {lvl}) => partialSum + lvl, 0))
const totalPrestidigitations = computed(() =>
    Object.values(classesDynamicData.value).reduce((partialSum, {prestidigitations}) => partialSum + prestidigitations, 0))

const totalHitDices = computed(() => {
  const dices = {}

  Object.values(classesDynamicData.value).forEach(({hitDice}) => {
    const [dice, lvl] = Object.entries(hitDice)[0]
    dices[dice] = dices[dice] ? dices[dice]+ lvl : lvl
  })
  return dices
})

const totalHp = computed(() => {
  const hpFromClasses = Object.values(classesDynamicData.value).reduce((partialSum, {mediumHp}) => partialSum + mediumHp, 0)
  const hpFromTough = isTough.value? totalLvl.value * 2 : 0
  const hpFromConstitution = +Math.floor((constitution.value - 10) / 2) * totalLvl.value

  const isSorcerer = selectedClasses.value.some(i => i === 'Sorcerer')
  const hpFromDraconicSorcerer = !!isSorcerer && isDraconicSorcerer.value? classesData.value['Sorcerer'].lvl * 1 : 0

  return hpFromClasses + hpFromTough + hpFromConstitution + hpFromDraconicSorcerer
})

const spellLvl = computed(() => Object.values(classesDynamicData.value).reduce((partialSum, {spellLvl}) => partialSum + spellLvl, 0))

const spellCells = computed(() => lvlToSpellSlots[spellLvl.value] || [])

const warlockLvl  =computed(() => classesData.value?.Warlock?.lvl || 0)


export function useLocalUser() {
  return {
    heroName,
    classesData,
    isTough,
    constitution,
    totalLvl,
    totalPrestidigitations,
    totalHp,
    totalHitDices,
    selectedClasses,
    spellLvl,
    spellCells,
    warlockLvl,
    classesDynamicData,
    isDraconicSorcerer
  }
}
