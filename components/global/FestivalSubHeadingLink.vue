<template>
  <div class="flex items-start">
    <SiteLink :to="to" class="w-full lg:w-auto" :class-names="`festival-action-link block text-sm lg:text-base xl:text-lg border-5 px-5 py-2 xl:px-10 xl:py-5 border-navy text-navy bg-yellow w-full md:max-w-sm lg:max-w-md xl:max-w-2xl ${(long ? 'xl:max-w-3xl' : '')}`">
      <span class="flex items-center justify-start space-x-4"><span><slot /></span> <SmallArrowRight class="festival-action-link__arrow block flex-shrink-0" /></span>
    </SiteLink>
  </div>
</template>

<script>
import SmallArrowRight from '~/assets/festival/small-arrow-right.svg?inline'

export default {
  name: 'FestivalSubHeadingLink',
  components: { SmallArrowRight },
  props: {
    to: {
      type: String,
      required: true
    },
    long: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style>
.festival-action-link__arrow {
  @apply motion-safe:transition-transform duration-100;
}
.festival-action-link:hover .festival-action-link__arrow {
  @apply transform translate-x-1/4;
}
</style>
