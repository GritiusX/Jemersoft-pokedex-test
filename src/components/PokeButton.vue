<template>
  <button
    :class="`flex justify-center items-center min-w-[150px] max-h-[44px] xs2:w-[275px] px-[20px] py-[11px] gap-[10px] rounded-[60px] font-bold text-white ${
      props.activeBackground
    } ${props.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`"
    @click="handleRouter"
    :disabled="props.disabled"
  >
    <slot />
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  activeBackground: {
    type: String,
    default: 'bg-blue-500'
  },
  route: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const handleRouter = () => {
  router.push(`/${props.route}`)
}
</script>

<style scoped></style>
