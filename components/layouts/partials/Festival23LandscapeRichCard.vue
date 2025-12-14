<template>
  <Festival23Box :itemscope="isEvent" :itemtype="(isEvent ? 'https://schema.org/ScreeningEvent' : false)"  :bg="`bg-${sectionColour}`">
    <div class="flex flex-wrap w-full min-h-full lg:min-h-[400px] items-start">
      <div class="block w-full -mt-6 pb-4 w-full lg:hidden">
        <Festival23BoxMask>
          <div class="aspect-w-10 aspect-h-10 md:aspect-w-10 md:aspect-h-8">
            <Festival23RichCardMedia :card="card" size="rich-card-lg" />
          </div>
          <RawLink v-if="cardMainLink" class-names="absolute top-0 left-0 w-full h-full z-20" :to="cardMainLink|replaceSiteUrl">
            <span class="sr-only">Read more</span>
          </RawLink>
        </Festival23BoxMask>
      </div>
      <div class="hidden lg:block absolute right-0 top-0 bottom-0 w-1/2 z-20">
        <Festival23BoxMask>
          <Festival23RichCardMedia :card="card" size="rich-card-xl" />
          <RawLink v-if="cardMainLink" class-names="absolute top-0 left-0 w-full h-full z-20" :to="cardMainLink|replaceSiteUrl">
            <span class="sr-only">Read more</span>
          </RawLink>
        </Festival23BoxMask>
      </div>
      <div class="px-6 py-2 2xl:px-10 2xl:py-5 w-full lg:w-1/2 pr-10 2xl:pr-16 lg:min-h-full lg:flex lg:flex-col">
        <Festival23RichCardContent :card="card" size="lg" />
        <div class="mt-6 lg:mt-auto mb-0">
          <Festival23RichCardButtons :card="card" />
        </div>
      </div>
    </div>
  </Festival23Box>
</template>

<script>
import festival23SectionColors from '~/mixins/festival23SectionColors'
import hasRichCardLinks from '~/mixins/hasRichCardLinks'

export default {
  name: 'Festival23LandscapeRichCard',
  mixins: [festival23SectionColors, hasRichCardLinks],
  props: {
    card: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
