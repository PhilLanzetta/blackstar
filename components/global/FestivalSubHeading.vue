<template>
  <span class="flex items-start">
    <h2 class="festival-sub-heading" :class="(long ? ' xl:max-w-3xl ' : '') + background + ` festival-sub-heading--${$store.state.theme}` ">
      <slot />
    </h2>
  </span>
</template>

<script>
export default {
  name: 'FestivalSubHeading',
  props: {
    long: {
      type: Boolean,
      required: false,
      default: false
    },
    background: {
      type: String,
      required: false,
      default: 'bg-yellow'
    }
  }
}
</script>

<style scoped>
.festival-sub-heading {
  @apply block text-sm lg:text-base xl:text-lg px-5 py-2 xl:px-10 xl:py-5 w-full lg:w-auto md:max-w-sm lg:max-w-md xl:max-w-2xl;
}

.festival-sub-heading--festival {
  @apply border-navy border-5;
}

.festival-sub-heading--bsf11 {
  @apply bg-white border-4 lg:border-md 2xl:border-lg rounded-br-4xl max-w-sm px-10 -ml-0.5 -mt-0.5 lg:-ml-1 lg:-mt-1 2xl:-ml-2 2xl:-mt-2 font-bsf11_sans text-4xl uppercase leading-none;
}
</style>
