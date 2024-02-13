<script setup>
import {computed} from "vue";

import MyTable from "@/components/MyTable.vue";
import {warlockLvlToSpellSlots} from "@/components/spell-calculator/constants/spells";
import {useLocalUser} from "@/components/spell-calculator/composable/useLocalUser";
import {useMyLocale} from "@/composable/useMyLocale";

const { warlockLvl } = useLocalUser()
const t = useMyLocale()

const title = computed(() => t('gameData.warlockSpellCells'))

const headers = computed(() => ([
  { title: t('gameData.spellCount'), key: 'spellCount', sortable: false, align: 'center'},
  { title: t('gameData.spellLvl'), key: 'spellLvl', sortable: false, align: 'center'},
]))

const items = computed(() => ([{
    spellCount: warlockLvlToSpellSlots[warlockLvl.value].spellCount,
    spellLvl: warlockLvlToSpellSlots[warlockLvl.value].spellLvl,
}]))
</script>

<template>
  <MyTable
          v-if="warlockLvl > 0"
          :title="title"
          :headers="headers"
          :items="items"
  />
</template>
