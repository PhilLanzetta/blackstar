<template>
  <Festival24Box :background="background" :gradient-style="gradientStyle">
    <div
      :itemscope="isEvent"
      :itemtype="(isEvent ? 'https://schema.org/ScreeningEvent' : false)"
      class="lg:flex lg:flex-wrap w-full min-h-full lg:min-h-[300px] 2xl:min-h-[400px] items-stretch"
    >
      <div class="block relative z-10 pb-4 lg:hidden">
        <div class="aspect-w-10 aspect-h-10 md:aspect-w-10 md:aspect-h-8">
          <Festival24RichCardMedia :card="card" size="rich-card" />
        </div>
        <RawLink
          v-if="cardMainLink"
          class-names="absolute top-0 left-0 w-full h-full z-20"
          :to="cardMainLink|replaceSiteUrl"
        >
          <span class="sr-only">Read more</span>
        </RawLink>
      </div>
      <div class="hidden lg:block absolute right-0 top-0 bottom-0 w-[48%] z-20 p-6">
        <Festival24RichCardMedia :card="card" size="rich-card-lg" class="relative" />
        <RawLink
          v-if="cardMainLink"
          class-names="absolute top-0 left-0 w-full h-full z-20"
          :to="cardMainLink|replaceSiteUrl"
        >
          <span class="sr-only">Read more</span>
        </RawLink>
      </div>
      <div class="pt-2 relative z-10 lg:mb-0 w-full lg:pt-0 lg:w-[50%] lg:flex lg:flex-row-reverse">
        <div class=" lg:px-4 ml-0 mr-0 lg:w-32 flex-shrink-0 flex-grow-0" :class="{'lg:border-l border-black': $store.state.theme==='bsf13', 'lg:border-l-3 border-dotted border-black': $store.state.theme==='bsf14'}">
          <Festival24RichCardType :card="card" />
          <Festival24RichCardHighlights class="hidden lg:block" :card="card" />
          <Festival24RichCardIcons :card="card" :vertical="true" class="hidden lg:block mt-4" />
        </div>
        <div class="lg:pr-4 2xl:min-h-full 2xl:flex w-full flex-shrink flex-wrap items-stretch">
          <Festival24RichCardContent :card="card" size="md" class="w-full" />
          <ClientOnly>
            <div class="w-full mt-auto mb-0">
              <MqLayout mq="xl+">
                <Festival24RichCardButtons :card="card" class="mt-4" :show-save-button="true" />
              </MqLayout>
              <MqLayout :mq="['sm', 'md', 'lg']">
                <Festival24RichCardButtons :card="card" class="mt-4 w-full" :show-save-button="false" />
              </MqLayout>
            </div>
          </ClientOnly>
        </div>
        <div class="flex mt-4 lg:hidden justify-between sm:justify-start">
          <Festival24RichCardIcons :card="card" :vertical="false" class="block lg:hidden w-auto pr-4" />
          <Festival24SaveButton v-if="card.type==='festival-event'" :event="card.event" :large="false" />
        </div>
      </div>
    </div>
  </Festival24Box>
</template>

<script>
import hasRichCardLinks from '~/mixins/hasRichCardLinks'

export default {
  name: 'Festival24FullRichCard',
  mixins: [hasRichCardLinks],
  props: {
    card: {
      type: Object,
      required: true
    },
    background: {
      type: String,
      required: false,
      default: null
    },
    gradientStyle: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<style scoped>
</style>
