<template>
  <div class="flex flex-col items-center gap-[10px] mt-[20px] min-h-[calc(100vh-180px)]">
    <h3 class="font-bold text-3xl">Uh-oh!</h3>
    <p>You look lost on your journey!</p>
    <PokeButton
      class="mt-[15px] !w-[155px]"
      activeBackground="bg-[#F22539] focus:bg-[#C00E20] active:bg-[#C00E20]"
      @click="goBack"
      >Go back home</PokeButton
    >
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import PokeButton from '../components/PokeButton.vue'
import { usePokemonStore } from '../stores/pokemonStore'
const store = usePokemonStore()
const { hasError } = storeToRefs(store)

const goBack = () => {
  hasError.value = false
}
</script>
