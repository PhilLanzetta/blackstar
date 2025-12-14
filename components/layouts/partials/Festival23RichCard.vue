<template>
  <Festival23Box :itemscope="isEvent" :itemtype="(isEvent ? 'https://schema.org/ScreeningEvent' : false)" :bg="`bg-${sectionColour}`" :outline="true">
    <div class="w-full">
      <div class="relative -mt-7 -mx-0.5 pb-4">
        <div class="aspect-w-16 aspect-h-9 2xl:aspect-w-16 2xl:aspect-h-10" />
        <div class="absolute top-0 left-0 w-full z-20">
          <Festival23BoxMask :top-only="true">
            <div class="aspect-w-16 aspect-h-9 2xl:aspect-w-16 2xl:aspect-h-10">
              <Festival23RichCardMedia :card="card" />
            </div>
          </Festival23BoxMask>
          <RawLink v-if="cardMainLink" class-names="absolute top-0 left-0 w-full h-full z-20" :to="cardMainLink|replaceSiteUrl">
            <span class="sr-only">Read more</span>
          </RawLink>
        </div>
      </div>
      <div class="px-4 pb-2 flex justify-between">
        <Festival23RichCardContent :card="card" :filter-by-tag-callback="filterByTagCallback" :override-time="overrideTime" :show-time="showTime" size="sm">
          <Festival23RichCardHighlights v-if="!short" :card="card" :section-colour="sectionColour" />
        </Festival23RichCardContent>
        <Festival23RichCardIcons :card="card" :vertical="true" />
      </div>
    </div>

    <div class="px-4 pt-2 pb-0 mt-auto -mb-1">
      <Festival23RichCardButtons :card="card" :show-save-button="!short" />
    </div>
  </Festival23Box>
</template>

<script>
import festival23SectionColors from '~/mixins/festival23SectionColors'
import festival23EventProps from '~/mixins/festival23EventProps'
import hasRichCardLinks from '~/mixins/hasRichCardLinks'

export default {
  name: 'Festival23RichCard',
  mixins: [festival23SectionColors, festival23EventProps, hasRichCardLinks],
  props: {
    card: {
      type: Object,
      required: true
    },
    short: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
