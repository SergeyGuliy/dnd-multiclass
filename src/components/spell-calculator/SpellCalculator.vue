<script setup>
import TableWarclockCells from "@/components/spell-calculator/components/TableWarclockCells.vue";
import TableMagicCells from "@/components/spell-calculator/components/TableMagicCells.vue";
import TableHeroStatistic from "@/components/spell-calculator/components/TableHeroStatistic.vue";
import HeroData from "@/components/spell-calculator/components/HeroData.vue";
import TableClasses from "@/components/spell-calculator/components/TableClasses.vue";
import HeroStats from "@/components/spell-calculator/components/HeroStats.vue";

import {useLocalUser} from "@/components/spell-calculator/composable/useLocalUser";

const { totalLvl } = useLocalUser()
</script>

<template>
  <HeroData class="mb-2" />

  <TableClasses />

  <HeroStats />

  <template v-if="totalLvl >=1">
    <TableHeroStatistic class="mb-2" />

    <TableMagicCells class="mb-2" />

    <TableWarclockCells />
  </template>
</template>
