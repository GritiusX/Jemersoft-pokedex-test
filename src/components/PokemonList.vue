<template>
  <div
    class="flex items-center px-[15px] mb-[30px] gap-[10px] w-full xs:max-w-[315px] xs2:max-w-[570px] h-[50px] bg-white rounded-[5px] border-2 focus-within:border focus-within:border-red-500 transition-all duration-300"
  >
    <input
      class="w-full bg-transparent text-medium focus-visible:outline-none placeholder:font-medium placeholder:leading-inputPlaceholder"
      type="text"
      v-model="searchInputValue"
      @keyup.enter="handleFilterPokemon"
      placeholder="Search"
    />
  </div>
  <ErrorMessage v-if="hasError" />
  <div class="flex flex-col w-full xs:max-w-[315px] xs2:max-w-[570px] gap-2" v-else>
    <div v-for="pkmn in pokemonsArray" :key="pkmn.id">
      <RouterLink
        :to="`/details/${pkmn.id}`"
        class="flex justify-between max-h-[60px] py-2 px-[10px] items-center rounded-[5px] cursor-pointer capitalize border-2 bg-white hover:bg-gray-500 hover:text-white hover:font-semibold transition-all duration-300"
      >
        <img class="h-[50px] my-[20px]" :src="getPokemonImage(pkmn)" :alt="`${pkmn.name} image`" />
        <div class="flex">
          <span class="font-bold">Tipos:&nbsp;</span>
          <p class="capitalize" v-for="types in pkmn.types" :key="types">
            {{ types.type.name }} &nbsp;
          </p>
        </div>
        <p>Peso: {{ pkmn.weight }} kg</p>
      </RouterLink>
    </div>
    <div class="flex justify-between my-4">
      <button
        class="bg-red-500 p-2 w-10 rounded-full text-white focus:bg-red-800 hover:bg-red-800 active:bg-red-800 transition-all duration-300"
        @click="loadPage(prevPage)"
        :disabled="prevPage === null"
      >
        &lt;
      </button>
      <button
        class="bg-red-500 p-2 w-10 rounded-full text-white focus:bg-red-800 hover:bg-red-800 active:bg-red-800 transition-all duration-300"
        @click="loadPage(nextPage)"
        :disabled="nextPage === null"
      >
        >
      </button>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import ErrorMessage from '../components/ErrorMessage.vue'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { usePokemonStore } from '../stores/pokemonStore'
const store = usePokemonStore()
const { hasError, nextPage, prevPage, allPokemon } = storeToRefs(store)
const { getPokemon, filterPokemon } = store

const pokemonsArray = ref([])

onMounted(async () => {
  if (allPokemon.value.length === 0) {
    await getPokemon()
  }
  pokemonsArray.value = allPokemon.value
})

const searchInputValue = ref('')
const handleFilterPokemon = () => {
  pokemonsArray.value = filterPokemon(searchInputValue)
  searchInputValue.value = ''
}

const loadPage = async (page) => {
  try {
    if (page) {
      await getPokemon(page)
    }
  } catch (error) {
    console.error('Error loading page:', error)
  }
}

const getPokemonImage = (pkmn) => {
  return pkmn.sprites?.other?.['official-artwork'].front_default
    ? pkmn.sprites?.other?.['official-artwork'].front_default
    : pkmn.sprites?.front_default
      ? pkmn.sprites?.front_default
      : 'src/assets/noPhoto.svg'
}
</script>
