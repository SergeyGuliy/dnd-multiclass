<script setup>
import {useTheme} from "@/composable/useTheme";
import {useSavedCharacters } from "@/composable/useSavedCharacters";
import {useDrawer} from "@/composable/useDrawer";
import {changeLocale, locales, useMyLocale} from "@/composable/useMyLocale";

const {savedCharacters, loadCharacter} = useSavedCharacters()
const {toggleTheme} = useTheme()
const {toggleDrawer, isOpen} = useDrawer()
const t = useMyLocale()
</script>

<template>
  <v-app-bar>
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="toggleDrawer"  />
    </template>

    <v-app-bar-title>
      <v-img src="@/assets/dungeons-and-dragons.png" height="15px" width="15px" inline=""/>
      {{ t('title') }}
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-translate" v-bind="props" />
      </template>

      <v-list>
        <v-list-item
                style="cursor: pointer"
                v-for="(item, i) in locales"
                :key="i"
        >
          <v-list-item-title @click="changeLocale(item.key)">{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn icon @click="toggleTheme">
      <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>
  </v-app-bar>

  <v-navigation-drawer fixed app permanent v-if="isOpen">
    <h2 class="pa-2">{{ t('heroesList') }}</h2>

    <v-list color="transparent" v-if="Object.entries(savedCharacters)?.length">
      <v-list-item
              v-for="(character, index) in savedCharacters"
              :value="index"
              variant="plain"
              color="blue"
              @click="loadCharacter(character)"
              :key="index">
        <template v-slot:prepend>
          <v-icon icon="mdi-account-star" />
        </template>

        <v-list-item-title>{{index}}</v-list-item-title>
      </v-list-item>
    </v-list>
    <p v-else class="">{{ t('emptyCharList') }}</p>
  </v-navigation-drawer>
</template>
