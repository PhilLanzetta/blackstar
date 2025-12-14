<template>
  <div class="relative spotlight-text">
    <Container>
      <div class="lg:flex relative z-10 -mx-4 sm:-mx-8 md:mx-0">
        <div
          v-for="(column, index) in layout.columns"
          :key="`spotlightColumn${index}`"
          class="w-full p-10 lg:px-20 lg:pt-10 lg:pb-40 relative"
          :class="styleClasses(column)"
        >
          <div class="max-w-3xl mx-auto">
          <SpotlightSpinner
            v-if="column.show_spotlight_badge"
            class="mb-10"
            :text="(column.custom_spotlight_text ? column.custom_spotlight_text : 'Spotlight')"
            :sm="true"
          />
          <div class="spotlight-text__copy" v-html="column.content" />

          <p v-if="column.link" class="block lg:hidden mt-10">
            <CircleButton :to="column.link.url|replaceSiteUrl" :color-scheme="(column.style === 'b' ? 'teal' : 'black')">
              <span v-html="column.link.title" />
            </CircleButton>
          </p>
            <RawLink v-if="column.link&&column.link_style==='cursor'" class-names="block lg:hidden absolute top-0 left-0 block w-full h-full pointer-events-auto" v-cursor-hint="column.link.title" :to="column.link.url|replaceSiteUrl">
              <span class="sr-only" v-html="column.link.title" />
            </RawLink>
          </div>
        </div>
      </div>
    </Container>
    <div class="hidden lg:flex z-20 absolute top-0 left-0 w-full h-full pointer-events-none">
      <div
        v-for="(column, index) in layout.columns"
        :key="`spotlightCursorLinkColumn${index}`"

        :to="column.link.url"
        class="w-full relative"
      >
        <RawLink v-if="column.link&&column.link_style==='cursor'" class-names="block w-full h-full pointer-events-auto" v-cursor-hint="column.link.title" :to="column.link.url|replaceSiteUrl">
          <span class="sr-only" v-html="column.link.title" />
        </RawLink>
      </div>
    </div>
    <div class="hidden lg:flex z-0 absolute top-0 left-0 w-full h-full">
      <div
        v-for="(column, index) in layout.columns"
        :key="`spotlighBgColumn${index}`"
        class="w-full"
        :class="styleClasses(column)"
      />
    </div>
  </div>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'SpotlightText',
  mixins: [layout],
  methods: {
    styleClasses (column) {
      if (column.style === 'b') {
        return ['bg-offWhite', 'text-teal']
      }

      if (column.style === 'c') {
        return ['bg-lumenBlue', 'text-black']
      }

      if (column.style === 'd') {
        return ['bg-lumenPink', 'text-black']
      }

      if (column.style === 'e') {
        return ['bg-lumenOrange', 'text-black']
      }

      return ['bg-rose', 'text-black']
    }
  }
}
</script>

<style>
.spotlight-text__copy {
  @apply text-2xl lg:text-3xl xl:text-4xl font-medium leading-tight text-left;

  font-variant-ligatures: none;
}

.spotlight-text__copy i,
.spotlight-text__copy em {
  @apply font-serif_italic_alt font-normal;
}
</style>
