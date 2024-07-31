<template>
  <section :class="`bg-[#F9F9F9]`">
    <LoadingSpinner v-if="isLoading" />
    <section v-else class="flex flex-col gap-[10px] mx-auto items-center px-4 pt-[35px] pb-12">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </section>
  </section>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { usePokemonStore } from '../stores/pokemonStore'

const store = usePokemonStore()
const { isLoading } = storeToRefs(store)
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
