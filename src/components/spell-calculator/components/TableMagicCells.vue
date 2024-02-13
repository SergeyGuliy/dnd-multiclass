<script setup>
import {computed} from "vue";

import MyTable from "@/components/MyTable.vue";
import {lvls} from "@/components/spell-calculator/constants/spells";
import {useLocalUser} from "@/components/spell-calculator/composable/useLocalUser";
import {useMyLocale} from "@/composable/useMyLocale";

const { spellCells, spellLvl } = useLocalUser()
const t = useMyLocale()

const title = computed(() => t('gameData.magicSpellCells'))

const headers = computed(() => {
  let lvlsCountNames = spellCells.value?.length? lvls.slice(0, spellCells.value?.length): []
  const dynamicCells = lvlsCountNames.map((lvlName, index) => ({title: lvlName, key: `name_${index}`, align: 'center', sortable: false}))
  return [
    {title: t('gameData.spellLvl'), key: 'spellLvl', align: 'center', sortable: false},
    ...dynamicCells
  ]
})

const items = computed(() => {
  const dynamicCells = Object.fromEntries(spellCells.value.map((cellLvl, index) => ([`name_${index}`, cellLvl])))
  return [ {spellLvl: t('gameData.spellCount'), ...dynamicCells} ]
})
</script>

<template>
  <MyTable
          v-if="spellLvl > 0"
          :title="title"
          :headers="headers"
          :items="items"
  />
</template>
