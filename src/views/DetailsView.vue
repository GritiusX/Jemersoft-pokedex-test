<template>
  <div class="min-h-[calc(100vh-85px)]">
    <div class="flex flex-col items-center">
      <div>
        <img
          class="w-[300px] my-[20px]"
          :src="getPokemonImage(pokemonDetail)"
          :alt="`${pokemonDetail.name} image`"
        />
      </div>
      <div class="flex flex-col items-center gap-2">
        <div class="flex flex-col text-center">
          <p class="capitalize font-bold text-3xl">{{ pokemonDetail.name }}</p>
          <p class="text-center">{{ pokemonDetail.spanishDescription?.flavor_text }}</p>
        </div>
        <div class="flex w-full justify-evenly my-3">
          <div
            class="flex flex-col gap-2 bg-blue-400 p-3 rounded-xl cursor-default hover:bg-blue-800 hover:text-white transition-all duration-300"
          >
            <p class="capitalize text-lg">
              <span class="font-semibold">Altura:</span> {{ pokemonDetail.height }} pies
            </p>
            <p class="capitalize text-lg">
              <span class="font-semibold">Peso:</span> {{ pokemonDetail.weight }} kg
            </p>
          </div>
          <div
            class="bg-red-500 p-3 rounded-xl cursor-default hover:bg-[#C00E20] hover:text-white transition-all duration-300"
          >
            <span class="font-bold text-xl">Habilidades del Pokemon:</span>
            <div class="grid grid-cols-2 gap-1 text-center">
              <p class="capitalize" v-for="abilities in pokemonDetail.abilities" :key="abilities">
                {{ abilities.ability.name }} &nbsp;
              </p>
            </div>
          </div>
        </div>
        <span class="font-bold text-xl">Lista de movimientos:</span>
        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-10 gap-1">
          <p
            class="capitalize text-sm bg-slate-600 text-white p-1 rounded-xl text-center hover:bg-pink-600 cursor-default transition-all duration-300"
            v-for="moves in pokemonDetail.moves"
            :key="moves"
          >
            {{ moves.move.name }} &nbsp;
          </p>
        </div>
      </div>
      <PokeButton
        class="mt-4"
        activeBackground="bg-[#F22539] focus:bg-[#C00E20] active:bg-[#C00E20] hover:bg-[#C00E20] transition-all duration-300"
        @click="goBack()"
        >Back</PokeButton
      >
    </div>
  </div>
</template>

<script setup>
import PokeButton from '../components/PokeButton.vue'
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePokemonStore } from '../stores/pokemonStore'
import { storeToRefs } from 'pinia'
const store = usePokemonStore()
const { getPokemonDetails } = store
const { pokemonDetail } = storeToRefs(store)
const router = useRouter()
const route = useRoute()

onMounted(() => {
  getPokemonDetails(route.params)
})

const getPokemonImage = (pkmn) => {
  return pkmn.sprites?.other?.['official-artwork'].front_default
    ? pkmn.sprites?.other?.['official-artwork'].front_default
    : pkmn.sprites?.front_default
      ? pkmn.sprites?.front_default
      : 'src/assets/noPhoto.svg'
}

const goBack = () => {
  router.push('/')
}
</script>
