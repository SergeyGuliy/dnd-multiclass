<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'

import {useLocalUser} from "@/components/spell-calculator/composable/useLocalUser";
import {stringifyHitDice} from "../assets/helpers";
import {useMyLocale} from "@/composable/useMyLocale";
import {computed} from "vue";


const { classesData, totalLvl, classesDynamicData } = useLocalUser()
const t = useMyLocale()

const headers = computed(() => ([
  { title: t('gameData.className'), key: 'name', sortable: false, align: 'center'},
  { title: t('gameData.mainClass'), key: 'isMainClass' , sortable: false, align: 'center' },
  { title: t('gameData.classLvl'), key: 'lvl' , sortable: false, align: 'center' },
  { title: t('gameData.prestidigitations'), key: 'prestidigitations' , sortable: false, align: 'center' },
  { title: t('gameData.classSpellLvl'), key: 'spellLvl' , sortable: false, align: 'center' },
  { title: t('gameData.hitDices'), key: 'hitDice', sortable: false , align: 'center' },
  { title: t('gameData.mediumHP'), key: 'mediumHp', sortable: false ,  align: 'center' },
  { title: t('UI.delete'), key: 'delete', sortable: false ,  align: 'center' },
]))

const updateName = (name, e) => {
  if (+e <= 0) {
    classesData.value[name]['lvl'] = 1
  } else if (e >= 20) {
    classesData.value[name]['lvl'] = 20
  } else {
    classesData.value[name]['lvl'] = +e
  }
}
const updateMainClass = (name, e) => {
  Object.values(classesData.value).forEach(i => {
    i.isMainClass = false
  })
  classesData.value[name]['isMainClass'] = e
}

const deleteMultiClass = (className) => {
  delete classesData.value[className]
}
</script>

<template>
  <VDataTable
          v-if="totalLvl >= 1"
          :headers="headers"
          :items="Object.values(classesData)"
          class="elevation-1"
          density="compact"
          hide-default-footer>

    <template v-slot:item="{ item }">
      <tr>
        <td>{{ t(`classes.${item.columns.name}`) }}</td>
        <td>
          <v-checkbox
                  class="ma-auto"
                  style="display: inline-block"
                  density="compact"
                  color="blue"
                  hide-details
                  :model-value="classesData[item.columns.name]['isMainClass']"
                  @update:model-value="(e) => updateMainClass(item.columns.name, e)" />
        </td>
        <td>
          <v-text-field
                  style="width: 100px;padding: 3px 0; margin: 0 auto"
                  density="compact"
                  hide-details="auto"
                  variant="outlined"
                  type="number"
                  min="1"
                  max="20"
                  :model-value="classesData[item.columns.name]['lvl']"
                  @update:model-value="(e) => updateName(item.columns.name, e)" />
        </td>
        <td>{{ classesDynamicData[item.columns.name]['prestidigitations'] }}</td>
        <td>{{ classesDynamicData[item.columns.name]['spellLvl'] }}</td>
        <td>{{ stringifyHitDice(classesDynamicData[item.columns.name]['hitDice']) }}</td>
        <td>{{ classesDynamicData[item.columns.name]['mediumHp'] }}</td>
        <td>
          <v-btn icon @click="deleteMultiClass(item.columns.name)">
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
        </td>
      </tr>
    </template>
    <template v-slot:bottom />
  </VDataTable>
</template>
