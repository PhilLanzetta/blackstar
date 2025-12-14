<template>
  <span v-cursor-interact :class="`arrow arrow--${$store.state.theme} arrow--${direction}`"><slot /></span>
</template>

<script>
export default {
  name: 'FestivalArrow',
  props: {
    direction: {
      type: String,
      default: 'left',
      required: false
    }
  }
}
</script>

<style scoped>
.arrow {
  @apply block;
}

.arrow--festival {
  @apply w-5 md:w-6 lg:w-7 xl:w-8 2xl:w-10;
}

.arrow--bsf11 {
  @apply w-10 md:w-16 lg:w-20 xl:w-24 2xl:w-32 transition-transform duration-100;
}

.arrow--bsf11.arrow--left,
.arrow--bsf11.arrow--right {
  @apply transform -rotate-12;
}

.arrow--bsf11.arrow--left:hover,
.arrow--bsf11.arrow--right:hover{
  @apply rotate-0;
}

.arrow svg {
  @apply block w-full h-full;
}
</style>
