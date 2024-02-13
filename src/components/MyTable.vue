<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'

defineProps(['title', 'headers', 'items'])
</script>

<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <VDataTable
            :headers="headers"
            :items="items"
            density="compact"
            class="elevation-1"
            hide-default-footer
    ><template v-slot:bottom /></VDataTable>
  </v-card>
</template>
