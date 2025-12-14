<template>
  <Container>
    <div class="border-t-2 border-dotted border-black lg:flex items-start justify-between py-8">
      <h2 class="font-serif_italic lg:w-2/12" v-html="layout.heading" />

      <div class="lg:w-9/12">
        <ul class="lg:flex flex-wrap items-start  lg:-mx-8">
          <li v-for="item in items" :key="`item${item.id}`" class="lg:w-1/3 lg:px-4 mb-8">
            <SiteLink :to="item.acf.link|replaceSiteUrl" class-names="underline">
              <strong v-html="item.title.rendered" />
            </SiteLink>
            <span v-if="item.acf.newspaper_source" v-html="item.acf.newspaper_source" />
          </li>
        </ul>

        <div class="flex justify-center py-10 text-purple">
          <button v-if="totalPages>page" v-cursor-interact @click.prevent="loadMore">
            <Spinner text="Load More" />
          </button>
        </div>
      </div>
    </div>
  </Container>
</template>

<script>
import layout from '~/mixins/layout'
import livedata from '~/mixins/livedata'

export default {
  name: 'PressClippings',
  mixins: [layout, livedata],
  data () {
    return {
      page: 1,
      totalPages: 1
    }
  },
  async fetch () {
    const response = await this.$axios.get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/press-clipping?per_page=9&page=${this.page}`)
    this.items = this.items.concat(response.data)
    this.totalPages = parseInt(response.headers['x-wp-totalpages'])
  },
  methods: {
    loadMore () {
      this.page++
      this.$fetch()
    }
  }
}
</script>

<style scoped>
ul li strong {
  @apply block font-sans text-lg;
}

ul li span {
  @apply font-serif text-sm block mt-4;
}
</style>
