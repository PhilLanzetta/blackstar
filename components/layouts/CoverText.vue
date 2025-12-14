<template>
  <div
    class="w-full h-full flex justify-center items-center"
    :class="`bg-${layout.background_colour} text-${layout.foreground_colour}`"
  >
    <div class="max-w-10xl mx-auto motion-safe:animate-fade-in opacity-0 p-4 sm:p-8">
      <h1 v-if="layout.logo" class="block text-9xl mb-16">
        <Logo v-if="layout.logo==='blackstar'" />
        <SeenLogo v-if="layout.logo==='seen'" class="max-w-full" />
        <span v-if="layout.logo==='custom'" v-html="layout.custom_logo" />
      </h1>
      <h2
        class="text-3xl md:text-4xl xl:text-5xl 2xl:text-7xl 3xl:text-8xl font-medium xl:w-10/12 xl:leading-snug"
        v-html="layout.text"
      />
      <p v-if="layout.link" class="mt-12 flex items-start justify-start">
        <CircleButton :to="layout.link.url|replaceSiteUrl" :color-scheme="layout.foreground_colour">
          <span v-html="layout.link.title" />
        </CircleButton>
      </p>
    </div>
  </div>
</template>

<script>
import layout from '~/mixins/layout'
import SeenLogo from '~/assets/seen-logo.svg?inline'

export default {
  name: 'CoverText',
  components: { SeenLogo },
  mixins: [layout]
}
</script>

<style scoped>

</style>
