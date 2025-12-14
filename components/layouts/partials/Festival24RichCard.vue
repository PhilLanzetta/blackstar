<template>
  <Festival24Box
    class="h-full flex  flex-wrap items-start"
                 :itemscope="isEvent"
                 :itemtype="(isEvent ? 'https://schema.org/ScreeningEvent' : false)"
                 :size="size"
                 :background="background"
                 :gradient-style="gradientStyle">
    <div class="w-full">
      <div class="relative">
        <Festival24RichCardMedia :card="card" size="card" class="  !h-auto" :class="{'aspect-w-10 aspect-h-10 sm:aspect-w-10 sm:aspect-h-7': size!=='sm', 'aspect-w-16 aspect-h-9': size==='sm'}" />
        <RawLink v-if="cardMainLink" class-names="absolute top-0 left-0 w-full h-full z-20" :to="cardMainLink|replaceSiteUrl">
          <span class="sr-only">Read more</span>
        </RawLink>
      </div>
      <Space />
      <Festival24RichCardContent :card="card" :filter-by-tag-callback="filterByTagCallback" :override-time="overrideTime" :show-time="showTime" size="md">
        <Festival24RichCardHighlights v-if="!short" :card="card" />
      </Festival24RichCardContent>
      <Space />
    </div>
    <div class="mt-auto mb-0 w-full">
      <ClientOnly>
        <div class="w-full mt-auto mb-0">
          <MqLayout mq="lg+">
            <Festival24RichCardButtons class="mt-auto mb-0" :card="card" :show-save-button="!short" />
          </MqLayout>
          <MqLayout :mq="['sm', 'md']">
            <Festival24RichCardButtons :card="card" class="w-full" :show-save-button="false" />
          </MqLayout>
        </div>
      </ClientOnly>
      <div class="flex w-full items-ends justify-between mt-4 relative z-10">
        <Festival24RichCardIcons v-if="!short" :card="card" />
      </div>
    </div>
  </Festival24Box>
</template>

<script>
import festival23EventProps from '~/mixins/festival23EventProps'
import hasRichCardLinks from '~/mixins/hasRichCardLinks'

export default {
  name: 'Festival24RichCard',
  mixins: [festival23EventProps, hasRichCardLinks],
  props: {
    card: {
      type: Object,
      required: true
    },
    short: {
      type: Boolean,
      required: false,
      default: false
    },
    size: {
      type: String,
      required: false,
      default: 'md'
    },
    background: {
      type: String,
      required: false,
      default: null
    },
    gradientStyle: {
      type: String,
      required: false,
      defualt: null
    }
  }
}
</script>

<style scoped>

</style>
