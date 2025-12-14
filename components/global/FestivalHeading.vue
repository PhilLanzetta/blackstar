<template>
  <span class="flex items-start relative z-10">
    <span v-if="$store.state.theme==='festival'" class="block font-festival_sans text-xl xl:text-2xl max-w-xs md:max-w-sm border-5 font-normal" :class="[backgroundClass, borderClass, widthClass, (butted ? 'border-b-0' : ''), (reduced ? 'px-5 pr-7 py-4' : 'px-5 py-4 xl:px-10 xl:py-7 ')]">
      <slot />
    </span>
    <span v-if="$store.state.theme==='bsf11'" class="block font-bsf11_cursive uppercase text-6xl lg:text-7xl 2xl:text-8xl font-medium leading-none" :class="{'mb-4 lg:-mb-6 2xl:-mb-10': butted, 'xl:text-8xl 2xl:text-8xl': lg}">
      <slot />
    </span>
  </span>
</template>

<script>
export default {
  name: 'FestivalHeading',
  props: {
    backgroundClass: {
      type: String,
      required: false,
      default: 'bg-white'
    },
    borderClass: {
      type: String,
      required: false,
      default: 'border-navy'
    },
    textClass: {
      type: String,
      required: false,
      default: 'text-navy'
    },
    butted: {
      type: Boolean,
      required: false,
      default: false
    },
    reduced: {
      type: Boolean,
      required: false,
      default: false
    },
    widthClass: {
      type: String,
      required: false,
      default: 'w-full'
    },
    lg: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
