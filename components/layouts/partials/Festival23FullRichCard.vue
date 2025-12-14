<template>
  <Festival23Box :bg="`bg-${sectionColour}`">
    <div :itemscope="isEvent" :itemtype="(isEvent ? 'https://schema.org/ScreeningEvent' : false)" class="xl:flex xl:flex-wrap w-full min-h-full 2xl:min-h-[400px] items-stretch">
      <div class="block -mx-0.5 relative z-10 -mt-6 pb-4 xl:hidden">
        <Festival23BoxMask>
          <div class="aspect-w-10 aspect-h-10 md:aspect-w-10 md:aspect-h-8">
            <Festival23RichCardMedia :card="card" size="rich-card" />
          </div>
        </Festival23BoxMask>
        <RawLink v-if="cardMainLink" class-names="absolute top-0 left-0 w-full h-full z-20" :to="cardMainLink|replaceSiteUrl">
          <span class="sr-only">Read more</span>
        </RawLink>
      </div>
      <div class="hidden xl:block absolute right-0 top-0 bottom-0 w-5/12 z-20">
        <Festival23BoxMask>
          <Festival23RichCardMedia :card="card" size="rich-card-lg" />
        </Festival23BoxMask>
        <RawLink v-if="cardMainLink" class-names="absolute top-0 left-0 w-full h-full z-20" :to="cardMainLink|replaceSiteUrl">
          <span class="sr-only">Read more</span>
        </RawLink>
      </div>
      <div class="px-3 pt-2 pb-0 relative z-10 -mb-2 xl:mb-0 xl:px-6 xl:py-2 2xl:px-6 2xl:py-5 w-full xl:w-7/12 xl:pr-8 2xl:flex 2xl:flex-row-reverse">
        <div class="2xl:border-l-2 border-black 2xl:px-6 ml-0 mr-0 2xl:w-32 flex-shrink-0 flex-grow-0 float-right 2xl:float-none">
          <Festival23RichCardHighlights :card="card" :section-colour="sectionColour" />
          <Festival23RichCardIcons :card="card" :vertical="true" class="mt-4" />
        </div>
        <div class="pr-6 2xl:min-h-full w-full 2xl:flex flex-shrink flex-wrap items-stretch">
          <Festival23RichCardContent :card="card" size="md" class="w-full" />
          <div class="mt-auto mb-0">
            <Festival23RichCardButtons :card="card" class="mt-4" />
          </div>
        </div>
      </div>
    </div>
  </Festival23Box>
</template>

<script>
import festival23SectionColors from '~/mixins/festival23SectionColors'
import hasRichCardLinks from '~/mixins/hasRichCardLinks'

export default {
  name: 'Festival23FullRichCard',
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
