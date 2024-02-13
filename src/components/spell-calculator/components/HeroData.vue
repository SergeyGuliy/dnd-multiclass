<script setup>
import {computed, ref} from "vue";
import {useLocale} from "vuetify";

import {useSavedCharacters} from "@/composable/useSavedCharacters";
import {useLocalUser} from '../composable/useLocalUser'
import {classes} from "@/components/spell-calculator/constants/classes";
import {useMyLocale} from "@/composable/useMyLocale";



const { heroName, classesData, isTough, constitution, totalLvl, selectedClasses } = useLocalUser()
const {saveCharacter, deleteCharacter } = useSavedCharacters()
const t = useMyLocale()

const RefForm = ref(null)

const localClasses = computed(() => classes.map(i => ({
  ...i,
  translate: t(`classes.${i.name}`)
})))

const localSave = async () => {
  const { valid } = await RefForm.value.validate()
  if (!valid) return
  saveCharacter({
    heroName: heroName.value,
    classesData: classesData.value,
    isTough: isTough.value,
    constitution: constitution.value,
  })
}

const localDelete = async () => {
  deleteCharacter(heroName.value)
  heroName.value = ''
  classesData.value = {}
}

</script>

<template>
  <v-form ref="RefForm">
    <v-row align="center" class="mb-2">
      <v-col cols="6">
        <v-text-field
                :label="t('gameData.heroName')"
                density="compact"
                hide-details="true"
                :rules="[v => !!v || 'Name is required']"
                variant="outlined"
                v-model.number="heroName"/>
      </v-col>
      <v-col cols="3">
        <v-btn color="green" block="" @click="localSave">{{t('UI.save')}}</v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn color="red" block="" @click="localDelete">{{t('UI.delete')}}</v-btn>
      </v-col>
    </v-row>

    <v-select
            v-model="selectedClasses"
            :items="localClasses"
            :rules="[() => totalLvl >= 1 || 'Name is required']"
            hide-details="true"
            item-title="translate"
            item-value="name"
            density="compact"
            variant="outlined"
            :label="t('gameData.selectedClasses')"
            chips=""
            multiple/>
  </v-form>
</template>
