<template>
  <section class="relative" :class="{'text-navy': $store.state.theme==='festival'}">
    <div class="relative z-10">
      <Container>
        <FestivalHeading v-if="layout.title" border-class="border-navy border-b-0" :butted="$store.state.theme==='bsf11'" background-class="bg-yellow">
          <span v-html="layout.title" />
        </FestivalHeading>
        <div :class="{'border-5 border-t-0 border-navy': $store.state.theme==='festival', 'pb-20': $store.state.theme==='bsf11'}">
          <FestivalExpandableContent v-for="faq in items" :id="faq.id" :key="`faq${faq.id}`" :title="faq.acf.question">
            <div class="faq" v-html="faq.content.rendered" />
          </FestivalExpandableContent>
        </div>
        <div v-if="items&&page<totalPages" class="text-center">
          <Space v-if="$store.state.theme==='festival'" :md="true" />
          <FestivalButton to="#" :click-handler="loadMore" :alt="$store.state.theme==='festival'">
            Load More
          </FestivalButton>
        </div>
      </Container>
    </div>
    <LazyRellaxShape v-if="$store.state.theme==='bsf11'" key="shapeFlower" class="hidden lg:block -top-64 left-1/3 z-0 w-full max-w-md">
      <ShapeFlower />
    </LazyRellaxShape>
  </section>
</template>

<script>
import layout from '~/mixins/layout'
import livedata from '~/mixins/livedata'
import ShapeFlower from '~/assets/festival/11/shape-flower.svg?inline'
import faqAccordion from '~/mixins/faqAccordion'

export default {
  name: 'FestivalFaqAccordion',
  components: { ShapeFlower },
  mixins: [layout, livedata, faqAccordion]
}
</script>

<style>
.faq p {
  @apply mb-1 xl:mb-2;
}
</style>
