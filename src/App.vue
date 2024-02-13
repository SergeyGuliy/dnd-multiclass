<script setup>
import {useTheme} from "@/composable/useTheme";
import {useSavedCharacters} from "@/composable/useSavedCharacters";
import {onMounted} from "vue";
import {changeLocale} from "@/composable/useMyLocale";

const {theme} = useTheme()
const {loadCharactersFromLocalStorage} = useSavedCharacters()

loadCharactersFromLocalStorage()

onMounted(() => {
  changeLocale(localStorage.getItem('locale') || 'ru')
})
</script>

<template>
  <v-theme-provider :theme="theme" with-background class="pa-10">
    <v-container class="fill-height">
      <v-responsive class="align-center text-center fill-height">
        <router-view />
      </v-responsive>
    </v-container>
  </v-theme-provider>
</template>
