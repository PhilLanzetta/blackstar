<template>
  <div class="relative text-white flex flex-wrap items-end">
    <div class="relative z-30 w-full">
      <Container>
        <div class="flex flex-wrap spotlight-height py-16 lg:py-32 justify-start" :class="{'items-center': layout.style==='a', 'items-end': layout.style!=='a'}">
          <SpotlightSpinner v-if="layout.show_spotlight_badge" :class="{'mb-20': layout.style==='a', 'mt-0 mb-4 md:mb-auto': layout.style!=='a'}" :text="(layout.custom_spotlight_text ? layout.custom_spotlight_text : 'Spotlight')" />
          <template v-if="layout.style==='a'">
            <div class="text-3xl lg:text-5xl w-full">
              <h1>
                <div v-if="layout.logo" class="block w-2/3 lg:w-1/3 max-w-full">
                  <SeenLogo v-if="layout.logo==='seen'" class="max-w-full" />
                  <Logo v-if="layout.logo==='blackstar'" />
                  <span v-if="layout.logo==='image'" v-html="layout.logo_image" />
                </div>
                <span :class="{'sr-only': layout.logo}" class="feature-heading-alt" v-html="layout.heading_1" />
              </h1>
              <h2 v-if="layout.heading_2" class="font-serif_iranic mt-4" v-html="layout.heading_2" />
              <h3 class="font-medium text-xl lg:text-2xl xl:text-4xl" v-html="layout.heading_3" />
            </div>
          </template>
          <template v-if="layout.style==='b'">
            <div class="w-full feature-heading">
              <p v-html="layout.copy" />

              <p v-if="layout.link" class="mt-10">
                <CircleButton :to="layout.link.url|replaceSiteUrl" color-scheme="white">
                  <span v-html="layout.link.title" />
                </CircleButton>
              </p>
            </div>
          </template>
          <template v-if="layout.style==='c'">
            <div class="w-full feature-heading lg:flex justify-start items-baseline lg:space-x-4 lg:pb-20">
              <SymbolArrowsDownRight class="block w-14 md:w-20 lg:w-28 xl:w-32 h-auto lg:mr-6 mb-6 lg:mb-0" /><h1 v-html="layout.heading_1" />
            </div>
          </template>
          <template v-if="layout.style==='d'">
            <div class="w-full feature-heading lg:flex flex-wrap justify-start items-baseline lg:pb-20">
             <h1 v-html="layout.heading_1" />
              <div v-if="layout.links&&layout.links.length" class="lg:flex lg:space-x-8 mt-8 w-full">
                <CircleButton v-for="(link, linkKey) in layout.links" :key="`spotlightHeroLink${linkKey}`" :to="link.link.url|replaceSiteUrl" color-scheme="white">
                  <span v-html="link.link.title" />
                </CircleButton>
              </div>
            </div>
          </template>
          <div v-if="layout.style!=='b'&&layout.link" class="block mt-8 lg:hidden">
            <CircleButton :to="layout.link.url|replaceSiteUrl" color-scheme="white">
              <span v-html="layout.link.title" />
            </CircleButton>
          </div>
        </div>
      </Container>
    </div>
    <RawLink v-if="layout.style!=='b'&&layout.link" v-cursor-hint="layout.link.title" :to="layout.link.url|replaceSiteUrl" class-names="hidden lg:block absolute top-0 left-0 w-full h-full z-40">
      <span class="sr-only" v-html="layout.link.title" />
    </RawLink>
    <div v-if="layout.style==='b'" class="absolute top-0 left-0 w-full h-full z-20 bg-black opacity-20" />
    <div v-if="layout.video" class="absolute top-0 left-0 w-full h-full z-10 bg-black">
      <video playsinline muted autoplay loop class="w-full h-full block object-cover">
        <source
          v-for="(videoSource, key) in layout.video"
          :key="`spotlightVideoMedia${key}`"
          :type="videoSource.type"
          :src="videoSource.file"
        >
      </video>
    </div>

    <div class="absolute top-0 left-0 w-full h-full z-0 bg-black" :class="{'hidden lg:block': layout.mobile_image, 'cover-image': !layout.contained, 'contained-image': layout.contained}" :style="(layout.contained ? `background-color: ${layout.background_colour};` : '')"><span v-if="layout.image" v-html="layout.image" /></div>
    <div v-if="layout.mobile_image" class="lg:hidden absolute top-0 left-0 w-full h-full z-0 bg-black" :class="{'cover-image': !layout.contained, 'contained-image': layout.contained}"  :style="(layout.contained ? `background-color: ${layout.background_colour};` : '')" v-html="layout.mobile_image" />

  </div>
</template>

<script>
import SeenLogo from '~/assets/seen-logo.svg?inline'
import SymbolArrowsDownRight from '~/assets/symbol-arrows-down-right.svg?inline'

export default {
  name: 'Spotlight',
  components: { SeenLogo, SymbolArrowsDownRight },
  props: {
    layout: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.spotlight-height {
  min-height: 50vh;

  @apply lg:min-h-screen;
}
</style>
