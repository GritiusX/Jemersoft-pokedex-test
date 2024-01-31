import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const usePokemonStore = defineStore('pokemon', () => {
  const isLoading = ref(false)
  const hasError = ref(false)
  const pokemonDetail = ref({})
  const allPokemon = ref([])
  const totalCountPokemon = ref(null)
  const nextPage = ref(null)
  const prevPage = ref(null)

  // Helper function to fetch Pokemon details
  const fetchPokemonDetails = async (urls) => {
    try {
      const promises = urls.map((url) => axios.get(url))
      const responses = await Promise.all(promises)
      return responses.map((response) => response.data)
    } catch (error) {
      console.error('Error fetching Pokemon details:', error)
      throw error
    }
  }

  // Helper function to fetch Pokemon data and details
  const fetchPokemonData = async (url) => {
    const { data } = await axios.get(url)
    nextPage.value = data.next
    prevPage.value = data.previous
    totalCountPokemon.value = data.count
    allPokemon.value = data.results

    const pokemonUrls = data.results.map((result) => result.url)
    const pokemonDetails = await fetchPokemonDetails(pokemonUrls)

    allPokemon.value = pokemonDetails.map((pkmn) => ({ ...pkmn }))
    return allPokemon.value
  }

  // Public method to get Pokemon based on the page or default URL
  const getPokemon = async (page) => {
    try {
      isLoading.value = true
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Fake timeout to show the pokeball Spinner for this demo

      if (!page) {
        return await fetchPokemonData('https://pokeapi.co/api/v2/pokemon/?limit=25&offset=0')
      }

      return await fetchPokemonData(page)
    } catch (error) {
      console.error('Failed to fetch all pokemons:', error)
    } finally {
      isLoading.value = false
    }
  }

  // Public method to filter Pokemon based on search value
  const filterPokemon = (searchValue) => {
    const trimValue = searchValue.value.trim().toLowerCase()

    try {
      if (trimValue === '') {
        return allPokemon.value
      }

      const isNumber = !isNaN(trimValue)

      if (isNumber) {
        hasError.value = true
        return allPokemon.value
      } else {
        const filteredPokemon = allPokemon.value.filter((pkmn) => pkmn.name.includes(trimValue))

        if (filteredPokemon.length > 0) {
          return filteredPokemon
        } else {
          hasError.value = true
          return allPokemon.value
        }
      }
    } catch (error) {
      console.error('filterPokemonError', error)
    }
  }

  // Public method to get Pokemon details
  const getPokemonDetails = async (pkmn) => {
    try {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pkmn.id}`)
      const { data: data2 } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${pkmn.id}`
      )
      let spanishDescription = data2.flavor_text_entries.find(
        (entry) => entry.language.name === 'es'
      )
      let fullPokemonDetails = {
        ...data,
        spanishDescription
      }
      pokemonDetail.value = fullPokemonDetails
      if (pokemonDetail.value) {
        console.log(pokemonDetail.value)
        return pokemonDetail.value
      } else {
        console.error('Matching Pokemon not found')
      }
    } catch (error) {
      console.error('Error fetching Pokemon details', error)
    }
  }

  // Return public API of the store
  return {
    isLoading,
    hasError,
    allPokemon,
    pokemonDetail,
    totalCountPokemon,
    nextPage,
    prevPage,
    getPokemon,
    filterPokemon,
    getPokemonDetails
  }
})
