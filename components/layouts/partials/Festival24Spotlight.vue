<template>
  <Festival24Box class="cover-wrap" :background="spotlight.color">
    <div class="aspect-w-10 aspect-h-7 overflow-hidden rounded-xl">
      <div class="cover-image" v-html="spotlight.image" />
    </div>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <span class="relative z-20 p-4 lg:px-10 lg:py-6 block rounded-full" :class="`bg-${spotlight.color}`">
        <span class="text-xl text-center lg:text-2xl font-normal block leading-none text-black" v-html="spotlight.link.title" />
      </span>
    </div>
    <SiteLink :to="spotlight.link.url|replaceSiteUrl" class-names="block absolute top-0 left-0 w-full h-full">
      <span class="sr-only" v-html="spotlight.link.title" />
    </SiteLink>
  </Festival24Box>
</template>

<script>
export default {
  name: 'Festival24Spotlight',
  props: {
    spotlight: {
      type: Object,
      required: true
    },
    colour: {
      type: String,
      required: false,
      default: 'offWhite'
    }
  }
}
</script>

<style scoped>
.cover-image {
  @apply transform scale-100 transition-transform duration-300;
}

.cover-wrap:hover .cover-image {
  @apply scale-125;
}
</style>
