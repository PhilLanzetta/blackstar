<template>
  <div class="overflow-hidden">
    <Container>
      <div class="flex justify-between">
        <Festival23H3 size="md" v-if="layout.heading" v-html="layout.heading" />
        <Festival23Buttons class="hidden lg:block" v-if="layout.buttons&&layout.buttons.length" :buttons="layout.buttons" />
      </div>
      <Space :md="true" />
      <LazyLogoCarousel>
        <swiper-slide v-for="sponsor in items" :key="`sponsor${sponsor.id}`">
          <a
            v-cursor-interact
            :href="sponsor.acf.website"
            class="block w-28 lg:w-36 xl:w-48 pr-6 xl:pr-10"
            target="_blank"
            rel="noreferrer"
            v-html="(sectionColour === 'black' ? sponsor.acf.logo : sponsor.acf.logo_black)"
          />
        </swiper-slide>
      </LazyLogoCarousel>
      <Space class="lg:hidden" :md="true" />
      <Festival23Buttons class="lg:hidden" v-if="layout.buttons&&layout.buttons.length" :buttons="layout.buttons" />

    </Container>
  </div>
</template>

<script>
import layout from '~/mixins/layout'
import livedata from '~/mixins/livedata'
import festival23SponsorsAbstract from '~/mixins/festival23SponsorsAbstract'
import festival23SectionColors from '~/mixins/festival23SectionColors'

export default {
  name: 'Festival23SponsorsCarousel',
  mixins: [layout, livedata, festival23SponsorsAbstract, festival23SectionColors]
}
</script>

<style scoped>
.swiper-container {
  @apply flex items-center;
}

.swiper-slide {
  @apply w-auto h-auto flex items-center;
}
</style>
