import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const usePokemonStore = defineStore('pokemon', () => {
  const isLoading = ref(false)
  const hasError = ref(false)
  const pokemonDetail = ref({})
  const allPokemon = ref([])
  const allPokemonUnfiltered = ref([])
  const totalCountPokemon = ref(null)
  const nextPage = ref(null)
  const prevPage = ref(null)
  const currentOffset = ref(0)
  const itemsPerPage = 25

  const fetchPokemonDetails = async (urls) => {
    const responses = await Promise.all(urls.map((url) => axios.get(url)))
    return responses.map((response) => response.data)
  }

  const fetchPokemonData = async (url) => {
    const { data } = await axios.get(url)
    nextPage.value = data.next
    prevPage.value = data.previous
    totalCountPokemon.value = data.count
    currentOffset.value = new URL(url).searchParams.get('offset') || 0

    const pokemonDetails = await fetchPokemonDetails(data.results.map((result) => result.url))
    allPokemon.value = pokemonDetails
    allPokemonUnfiltered.value = [...pokemonDetails]
    return allPokemon.value
  }

  const getPokemon = async (page) => {
    try {
      isLoading.value = true
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulated delay
      const url = page || `https://pokeapi.co/api/v2/pokemon/?limit=${itemsPerPage}&offset=0`
      return await fetchPokemonData(url)
    } catch (error) {
      console.error('Failed to fetch pokemons:', error)
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  }

  const filterPokemon = async (searchValue) => {
    console.log(searchValue)
    const trimValue = searchValue.trim().toLowerCase()
    if (trimValue === '') return allPokemon.value

    try {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${trimValue}`)
      allPokemon.value = [data]
      nextPage.value = null
      prevPage.value = null
    } catch (error) {
      console.error('Filter Pokemon Error:', error)
      hasError.value = true
    }
    return allPokemon.value
  }

  const clearFilters = () => {
    allPokemon.value = [...allPokemonUnfiltered.value]
    nextPage.value = `https://pokeapi.co/api/v2/pokemon/?limit=${itemsPerPage}&offset=${currentOffset.value}`
    prevPage.value =
      currentOffset.value > 0
        ? `https://pokeapi.co/api/v2/pokemon/?limit=${itemsPerPage}&offset=${Math.max(0, currentOffset.value - itemsPerPage)}`
        : null
    hasError.value = false
  }

  const getPokemonDetails = async (pokemonId) => {
    const { id } = pokemonId
    try {
      const [pokemonData, speciesData] = await Promise.all([
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      ])

      const spanishDescription = speciesData.data.flavor_text_entries.find(
        (entry) => entry.language.name === 'es'
      )

      pokemonDetail.value = {
        ...pokemonData.data,
        spanishDescription
      }

      return pokemonDetail.value
    } catch (error) {
      console.error('Error fetching Pokemon details:', error)
      hasError.value = true
    }
  }

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
    getPokemonDetails,
    clearFilters
  }
})
