<script setup>

import {useLocalUser} from "@/components/spell-calculator/composable/useLocalUser";
import {useMyLocale} from "@/composable/useMyLocale";

const {isTough, isDraconicSorcerer, selectedClasses, constitution} = useLocalUser()
const t = useMyLocale()
</script>

<template>
      <v-row align="center" class="mt-2">
        <v-col cols="2">
          <v-checkbox
                  v-model="isTough"
                  :label="t('gameData.haveTrait')"
                  color="green"
                  hide-details/>
        </v-col>
        <v-col cols="2" v-if="selectedClasses.some(i => i === 'Sorcerer')">
          <v-checkbox
                  v-model="isDraconicSorcerer"
                  :label="t('gameData.haveDraconic')"
                  color="green"
                  hide-details/>
        </v-col>
        <v-col>
          <v-slider
                  :label="t('gameData.constitution')"
                  density="compact"
                  hide-details="auto"
                  variant="outlined"
                  type="number"
                  min="0"
                  max="20"
                  step="1"
                  v-model.number="constitution"/>
        </v-col>
        <v-col cols="2">
          <v-text-field
                  density="compact"
                  hide-details="auto"
                  variant="outlined"
                  type="number"
                  min="0"
                  max="20"
                  step="1"
                  v-model.number="constitution"/>
        </v-col>
      </v-row>
</template>
