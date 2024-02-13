import {classes} from "@/components/spell-calculator/constants/classes";
import {bonusHpMap, mediumHpMap} from "@/components/spell-calculator/constants/hp";

const mapOfRound = {
  up: (spellLvl) => +Math.ceil(spellLvl),
  down: (spellLvl) => +Math.floor(spellLvl),
}


function getSpellPower({divide, round}, lvl) {
  const spellLvl = lvl/divide
  const roundedSpellLvl = mapOfRound[round](spellLvl)
  return roundedSpellLvl
}

export function getClassMetaData(className) {
  return classes.find(({name}) => className === name)
}

export function getSpellSlots ({name, lvl}) {
  const classMetadata = getClassMetaData(name)

  return classMetadata.divide? getSpellPower(classMetadata, lvl) : 0
}

export function getHitDices({lvl}, className) {
  const {hitDice} = getClassMetaData(className)

  return { [hitDice]: lvl }
}
export function getMediumHp({lvl}, className, isMainClass) {
  const {hitDice} = getClassMetaData(className)

  const mainBonus = isMainClass? bonusHpMap[hitDice] : 0

  return mediumHpMap[hitDice] * lvl + mainBonus
}

export const stringifyHitDice = (hitDice) => {
  const [diceName, count] = Object.entries(hitDice)[0]

  return `${count}*${diceName}`
}

export const getTotalStringifyHitDice = (hitDices) =>
    Object.entries(hitDices).map(i => stringifyHitDice(Object.fromEntries([i]))).join(', ')
