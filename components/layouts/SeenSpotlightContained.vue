<template>
  <Container>
    <div class="lg:flex justify-between items-stretch py-8 border-t border-b border-black relative">
      <div class="lg:w-6/12" v-html="layout.image" />
      <div class="lg:w-6/12 text-center flex flex-col justify-between items-center py-6">
        <div class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-seen_serif_light max-w-xs">
          <p v-html="layout.title_1" />
        </div>
        <div class="text-lg  mt-4 lg:mt-0 md:text-xl lg:text-2xl xl:text-3xl font-sans max-w-xs">
          <p v-if="layout.title_2" v-html="layout.title_2" />
        </div>
        <div class="text-2xl mt-4 lg:mt-0 md:text-3xl lg:text-4xl xl:text-5xl font-seen_serif_light_italic max-w-xs">
          <p v-if="layout.title_3" v-html="layout.title_3" />
        </div>
        <p v-if="layout.link" class="block lg:hidden mt-10">
          <CircleButton
            :to="layout.link.url|replaceSiteUrl"
            color-scheme="black"
          >
            <span v-html="layout.link.title" />
          </CircleButton>
        </p>
      </div>
      <RawLink v-cursor-hint="layout.link.title" :to="layout.link.url|replaceSiteUrl" class-names="hidden lg:block absolute top-0 left-0 w-full h-full z-10" />
    </div>
  </Container>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'SeenSpotlightContained',
  mixins: [layout]
}
</script>

<style scoped>

</style>
