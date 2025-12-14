<template>
  <span><span class="active-arrow" :class="{'-rotate-180 transform': !rotate}"><ArrowLong /></span>
    <span class="inactive-arrow" :class="{'-rotate-180 transform': rotate}"><ArrowShort /></span></span>
</template>

<script>
import ArrowShort from '~/assets/arrow.svg?inline'
import ArrowLong from '~/assets/arrow-long.svg?inline'

export default {
  name: 'Arrow',
  components: { ArrowShort, ArrowLong },
  props: {
    rotate: {
      type: Boolean,
      required: false,
      default: false
    }
  }

}
</script>

<style scoped>
.active-arrow {
  @apply block;
}

.inactive-arrow {
  @apply hidden;
}

.active-arrow svg,
.inactive-arrow svg {
  @apply block w-auto h-4 lg:h-6 xl:h-8 2xl:h-9;
}

.swiper-button-disabled .active-arrow,
.short-arrow .active-arrow {
  @apply hidden;
}

.swiper-button-disabled .inactive-arrow,
.short-arrow .inactive-arrow{
  @apply block;
}
</style>
