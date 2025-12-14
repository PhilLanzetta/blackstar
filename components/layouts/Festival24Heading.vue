<template>
  <div class="flex justify-between items-baseline">
    <h2 class="text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-serif_bold leading-none uppercase tracking-tight" v-html="layout.heading" />
    <div v-if="layout.links&&layout.links.length" class="hidden md:flex space-x-4 text-lg 2xl:text-xl">
      <RawLink v-for="(link, key) in layout.links" :key="`link${key}`" :to="link.link.url" class="underline">
        <span v-html="link.link.title" />
      </RawLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Festival24Heading',
  props: {
    layout: {
      type: Object,
      required: true
    }
  }
}
</script>
