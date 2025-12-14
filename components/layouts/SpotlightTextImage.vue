<template>
  <section
    class="relative flex flex-wrap items-end spotlight-text-image"
    :class="{'text-black bg-rose': layout.style==='a', 'text-white bg-teal': layout.style==='b', 'text-white bg-black': layout.style==='c', 'text-black bg-lumenBlue': layout.style==='d', 'text-black bg-lumenPink': layout.style==='e', 'text-black bg-lumenOrange': layout.style==='f'}"
  >
    <div class="relative z-20 w-full">
      <Space :lg="true" />
      <Container>
        <div
          class="md:flex justify-between items-center space-y-10 md:space-y-0"
          :class="{'flex-row-reverse': layout.flip, 'md:space-x-10 lg:space-x-20 xl:space-x-40': !layout.flip}"
        >
          <div class="md:w-7/12 lg:w-1/2 2xl:max-w-2xl 3xl:max-w-3xl">
            <SpotlightSpinner
              v-if="layout.show_spotlight_badge"
              :text="(layout.custom_spotlight_text ? layout.custom_spotlight_text : 'Spotlight')"
            />

            <div
              class="mt-8 lg:mt-16 spotlight-text-image__content"
              v-html="layout.content"
            />
            <p v-if="layout.link" class="block lg:hidden mt-10">
              <CircleButton
                :to="layout.link.url|replaceSiteUrl"
                :color-scheme="((layout.style === 'b' || layout.style === 'c') ? 'white' : 'black')"
              >
                <span v-html="layout.link.title" />
              </CircleButton>
            </p>
          </div>
          <div class="md:w-5/12 lg:w-1/2 2xl:max-w-2xl 3xl:max-w-3xl" :class="{'md:mr-10 lg:mr-40 xl:mr-40': layout.flip}">
            <RoundedImage class="max-w-lg xl:max-w-none" :dotted="true">
              <span v-html="layout.image" />
            </RoundedImage>
          </div>
        </div>
      </Container>
      <Space :lg="true" />
    </div>
    <RawLink
      v-if="layout.link&&layout.link_style==='cursor'"
      v-cursor-hint="layout.link.title"
      :to="layout.link.url|replaceSiteUrl"
      class-names="hidden lg:block absolute top-0 left-0 w-full h-full z-30"
    >
      <span class="sr-only" v-html="layout.link.title" />
    </RawLink>
  </section>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'SpotlightTextImage',
  mixins: [layout]
}
</script>

<style>
.spotlight-text-image__content {
  @apply text-2xl lg:text-3xl xl:text-4xl font-medium leading-tight;
  font-variant-ligatures: none;
}

.spotlight-text-image__content em {
  @apply font-serif_italic_alt font-normal;
}
</style>
