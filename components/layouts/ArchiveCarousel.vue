<template>
  <div class="overflow-hidden">
    <Container>
      <Space :md="true" />
      <div class="flex justify-between items-center">
        <template v-if="layout.show_years">
          <div class="flex space-x-10">
            <CircleButton
              v-for="year in years"
              :key="`yearFilter${year.term_id}`"
              to="#"
              :class="(activeYear !== year.term_id ? `opacity-30` : '')"
              :color-scheme="layout.colour"
              :click-handler="() => {setActiveYear(year.term_id)}"
            >
              <span
                v-html="year.name"
              />
            </CircleButton>
          </div>
        </template>
        <span v-if="!layout.show_years"></span>
        <div class="disabled-gray" :class="`text-${layout.colour}`">
          <button :id="`previous-${uniqueId}`" ref="prevArrow">
            <PrevArrow />
          </button>
          <button :id="`next-${uniqueId}`" ref="nextArrow">
            <NextArrow />
          </button>
        </div>
      </div>
      <Space :sm="true" />
      <ClientOnly v-if="items&&items.length">
        <PostsCarousel :arrow-next="`#next-${uniqueId}`" :arrow-previous="`#previous-${uniqueId}`">
          <swiper-slide v-for="item in items" :key="`item${(item.id ? item.id : item.ID)}`">
            <ListingArchiveItem :post="item" :color-scheme="layout.colour" />
          </swiper-slide>
        </PostsCarousel>
      </ClientOnly>
      <Space :lg="true" />
    </Container>
  </div>
</template>

<script>
import layout from '~/mixins/layout'
import livedata from '~/mixins/livedata'

export default {
  name: 'ArchiveCarousel',
  mixins: [layout, livedata],
  data () {
    return {
      years: [],
      activeYear: null
    }
  },
  async fetch () {
    let filter = ''

    if (this.layout.collection) {
      filter += `&archive-collection=${this.layout.collection.term_id}`
    }
    if (this.layout.show_years && !this.years.length) {
      this.years = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/blackstar/v1/archive/years` + (this.layout.collection ? `?collection=${this.layout.collection.term_id}` : ''))
      if (this.years && this.years.length) {
        this.activeYear = this.years[0].term_id
      }
    }
    if (this.activeYear) {
      filter += `&archive-year=${this.activeYear}`
    }
    this.items = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/archive-item?per_page=99&parent=0${filter}`)
  },
  computed: {
    uniqueId () {
      return this._uid
    }
  },
  methods: {
    setActiveYear (year) {
      if (this.$fetchState.pending) {
        return
      }

      this.activeYear = year
      this.$fetch()
    }
  }
}
</script>

<style scoped>

</style>
