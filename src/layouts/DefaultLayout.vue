<template>
  <section :class="`bg-[#F9F9F9]`">
    <LoadingSpinner v-if="isLoading" />
    <section v-else class="flex flex-col gap-[10px] mx-auto items-center px-4 pt-[35px] pb-12">
      <RouterView />
    </section>
  </section>
</template>

<script lang="js" setup>
import { storeToRefs } from 'pinia'
import LoadingSpinner from '../components/LoadingSpinner.vue'

import { usePokemonStore } from '../stores/pokemonStore'

const store = usePokemonStore()
const { isLoading } = storeToRefs(store)
</script>
