<template>
  <div class="festival-prose" :class="{'festival-prose--alt': alt, 'festival-prose--bsf11': $store.state.theme==='bsf11'}">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FestivalProse',
  props: {
    alt: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style>
.festival-prose {
  @apply text-xl md:text-2xl lg:text-3xl xl:text-4xl font-festival_sans_light_italic;
}

.festival-prose p, .festival-prose ul {
  @apply leading-snug;
}

.festival-prose strong {
  @apply font-festival_sans;
}

.festival-prose--alt {
  @apply font-festival_sans;
}

.festival-prose--bsf11,
.festival-prose--alt.festival-prose--bsf11 {
  @apply font-sans font-medium;
}

.festival-prose--bsf11 {
  @apply text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-4xl;
}

.festival-prose--bsf11 strong {
  @apply font-sans font-bold;
}

.festival-prose em,
.festival-prose i {
  @apply font-festival_sans_light_italic;
}

.festival-prose--bsf11 em,
.festival-prose--bsf11 i{
  @apply font-sans;
}
</style>
