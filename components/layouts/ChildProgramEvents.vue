<template>
  <Container v-if="items&&items.length">
    <Space/>
    <div class="flex justify-between items-center text-teal">
      <h2 class="sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl font-medium" v-html="layout.title"/>

      <div class="disabled-gray">
        <button :id="`previous-${uniqueId}`" ref="prevArrow">
          <PrevArrow/>
        </button>
        <button :id="`next-${uniqueId}`" ref="nextArrow">
          <NextArrow/>
        </button>
      </div>
    </div>
    <Space/>
    <ClientOnly>
      <PostsCarousel :arrow-next="`#next-${uniqueId}`" :arrow-previous="`#previous-${uniqueId}`">
        <swiper-slide v-for="programEvent in items" :key="`programEvent${programEvent.id}`">
          <ListingArticleEvent :post="programEvent" color-scheme="teal"/>
        </swiper-slide>
      </PostsCarousel>
    </ClientOnly>
    <Space :lg="true"/>
  </Container>
</template>

<script>
import layout from '~/mixins/layout'
import livedata from '~/mixins/livedata'

export default {
  name: 'ChildProgramEvents',
  mixins: [layout, livedata],
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    uniqueId () {
      return this._uid
    }
  },
  async fetch () {
    this.items = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/program-event?per_page=8&parent=${(this.post.parent ? this.post.parent : this.post.id)}`)
    if (this.items) {
      this.items = this.items.filter((item) => {
        return item.id !== this.post.id
      })
    }
  }
}
</script>

<style scoped>

</style>
