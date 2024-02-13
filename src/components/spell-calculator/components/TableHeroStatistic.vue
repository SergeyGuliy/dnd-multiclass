<script setup>
import {computed} from "vue";

import MyTable from "@/components/MyTable.vue";

import {useLocalUser} from "@/components/spell-calculator/composable/useLocalUser";
import { getTotalStringifyHitDice} from "@/components/spell-calculator/assets/helpers";
import {useMyLocale} from "@/composable/useMyLocale";

const { totalHp, totalLvl, totalPrestidigitations, totalHitDices, spellLvl } = useLocalUser()
const t = useMyLocale()

const title = computed(() => t('gameData.heroStatistic'))

const headers = computed(() => ([
  { title: t("UI.property"), key: 'property', sortable: false, align: 'center'},
  { title: t("UI.value"), key: 'value', sortable: false, align: 'center'},
]))


const items = computed(() => ([
  {
    property: t("gameData.totalLvl"),
    value: totalLvl.value,
  },
  {
    property: t("gameData.totalHP"),
    value: totalHp.value,
  },
  {
    property: t("gameData.totalHitDices"),
    value: getTotalStringifyHitDice(totalHitDices.value),
  },
  {
    property: t("gameData.spellCellsLvl"),
    value: spellLvl.value,
  },
  {
    property: t("gameData.prestidigitations"),
    value: totalPrestidigitations.value,
  },
]))
</script>

<template>
  <MyTable
          :title="title"
          :headers="headers"
          :items="items"
  />
</template>
