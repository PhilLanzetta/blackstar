<template>
  <span class="rounded-image cover-image" :class="` rounded-image--${shape} `">
    <span class="absolute top-0 left-0 w-full h-full rounded-2xl sm:rounded-3xl lg:rounded-4xl overflow-hidden bg-black">
      <slot />
    </span>
    <span v-if="dotted" class="rounded-image__dots fade-colours">
      <DottedRoundedSquare />
    </span>
  </span>
</template>

<script>
import DottedRoundedSquare from '~/assets/dotted-rounded-square.svg?inline'

export default {
  name: 'RoundedImage',
  components: { DottedRoundedSquare },
  props: {
    shape: {
      type: String,
      required: false,
      default: 'square'
    },
    dotted: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>
.rounded-image {
  @apply block relative;
}

.rounded-image::before {
  @apply block;
  padding-top: 100%;
  content: " ";
}

.rounded-image--rectangle::before {
  padding-top: 75%;
}

.rounded-image--rectangle-sm::before {
  padding-top: 60%;
}

.rounded-image__dots {
  @apply block z-10 -top-0.5 -left-0.5 -right-0.5 -bottom-0.5 xl:-top-1.5 xl:-left-1.5 xl:-bottom-1.5 xl:-right-1.5 absolute;
}

.rounded-image__dots svg {
  @apply block w-full h-full;
}
</style>
