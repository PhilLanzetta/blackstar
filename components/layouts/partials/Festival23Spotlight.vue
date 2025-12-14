<template>
  <Festival23BoxMask class="cover-wrap">
    <div class="aspect-w-10 aspect-h-7 overflow-hidden">
      <div class="cover-image" v-html="spotlight.image" />
    </div>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Festival23BoxMask :small="true">
        <span class="relative z-20 px-10 py-6 block" :class="colour">
          <span class="text-2xl font-normal block leading-none text-black" v-html="spotlight.link.title"></span>
        </span>
      </Festival23BoxMask>
    </div>
    <SiteLink :to="spotlight.link.url|replaceSiteUrl" class-names="block absolute top-0 left-0 w-full h-full">
      <span class="sr-only" v-html="spotlight.link.title" />
    </SiteLink>
  </Festival23BoxMask>
</template>

<script>
export default {
  name: 'Festival23Spotlight',
  props: {
    spotlight: {
      type: Object,
      required: true
    },
    colour: {
      type: String,
      required: false,
      default: 'bg-bsf12green'
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
