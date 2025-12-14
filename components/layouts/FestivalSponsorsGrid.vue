<template>
  <section class="relative">
    <div class="overflow-hidden">
      <Container>
        <FestivalHeading
          v-if="layout.title"
          background-class="bg-pink text-navy"
          :butted="true"
          width-class="w-full max-w-full"
        >
          <span v-html="layout.title" />
        </FestivalHeading>
      </Container>
      <hr v-if="$store.state.theme==='bsf11'" class="block border-0 border-t-5 border-dotted border-bsf11Teal bg-transparent mb-10 mt-1">
      <div
        class="relative z-10"
        :class="{'-mx-4 sm:-mx-8 md:-mx-0 border-5 border-navy bg-navy lg:py-8 lg:px-6': $store.state.theme==='festival', 'py-8': $store.state.theme==='bsf11'}"
      >
        <Container>
          <FestivalSponsorGridCollection
            v-for="(collection, key) in layout.sponsor_collections"
            :key="`sponsorCollection${key}`"
            :title="collection.title"
            :title-style="collection.title_style"
            :collection="collection.collection"
          />
        </Container>
      </div>
    </div>
    <LazyRellaxShape
      v-if="$store.state.theme==='bsf11'&&layout.shape"
      key="shapeAsterix2"
      class="top-10 right-20 z-0 w-10 xl:w-32 z-0"
    >
      <ShapeAsterix2 />
    </LazyRellaxShape>
  </section>
</template>

<script>
import layout from '~/mixins/layout'
import ShapeAsterix2 from '~/assets/festival/11/shape-asterix-2.svg?inline'

export default {
  name: 'FestivalSponsorsGrid',
  components: { ShapeAsterix2 },
  mixins: [layout]
}
</script>

<style scoped>

</style>
