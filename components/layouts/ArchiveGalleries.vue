<template>
  <div class="overflow-hidden">
    <Container>
      <template v-if="years&&years.length">
        <Space :md="true" />
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
      <Space :sm="true" />
      <div v-for="item in items" :key="`item${(item.id ? item.id : item.ID)}`">
        <GallerySlider :gallery="item.acf.gallery" :link="item.link" />
      </div>

      <Space :lg="true" />
    </Container>
  </div>
</template>

<script>
import layout from '~/mixins/layout'
import livedata from '~/mixins/livedata'

export default {
  name: 'ArchiveGalleries',
  mixins: [layout, livedata],
  data () {
    return {
      years: [],
      activeYear: null
    }
  },
  async fetch () {
    if (!this.years.length) {
      this.years = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/blackstar/v1/archive/years?collection=${this.layout.collection}`)
      if (this.years && this.years.length) {
        this.activeYear = this.years[0].term_id
      }
    }

    let filter = ''
    if (this.activeYear) {
      filter += `&archive-year=${this.activeYear}`
    }

    this.items = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/archive-item?per_page=99&parent=0&archive-collection=${this.layout.collection}${filter}`)
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
