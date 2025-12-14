<template>
  <Container>
    <div v-if="canShowFilters&&filters&&filters.length" class="flex flex-wrap pt-10 mb-10 lg:mb-0">
      <CircleButton
        v-if="layout.type!=='press'"
        :class="(activeFilter !== null ? `opacity-30 mr-10 mb-10` : 'mr-10 mb-10')"
        :to="parentLink"
        :click-handler="() => { filterPosts(null) }"
        :color-scheme="layout.colour"
        :force-scheme="true"
      >
        <span v-html="`All ${allLabel}`" />
      </CircleButton>
      <CircleButton
        v-for="filter in filters"
        :key="`filter${filter.id}`"
        :class="(activeFilter !== filter.id ? `opacity-30 mr-10 mb-10` : 'mr-10 mb-10')"
        :to="`/${allSlug}${(layout.type==='press') ? '/year' : ''}/${filter.slug}`"
        :click-handler="() => { filterPosts(filter.id) }"
        :color-scheme="layout.colour"
        :force-scheme="true"
      >
        <span v-html="filter.name" />
      </CircleButton>
    </div>
    <template v-if="layout.type !== 'custom' && layout.type !== 'manual'">
      <div v-if="items&&items.length" class="post-grid">
        <div v-for="item in items" :key="`item${item.id}`" class="post-grid__item">
          <ListingPost v-if="item.type!=='program-event'&&item.type!=='lumen-episode'" :large="true" :post="item" :color-scheme="layout.colour" />
          <ListingLumenEpisode v-if="item.type==='lumen-episode'" :large="true" :post="item" :color-scheme="layout.colour" />
          <ListingArticleEvent v-if="item.type==='program-event'" :large="true" :post="item" :color-scheme="layout.colour" />
        </div>
      </div>
    </template>
    <template v-if="layout.type==='manual'">
      <div v-if="layout.posts&&layout.posts.length" class="post-grid">
        <div v-for="item in layout.posts" :key="`manualItem${item.id}`" class="post-grid__item">
          <ListingPost v-if="item.type!=='program-event'&&item.type!=='lumen-episode'" :large="true" :post="item" :color-scheme="layout.colour" />
          <ListingLumenEpisode v-if="item.type==='lumen-episode'" :large="true" :post="item" :color-scheme="layout.colour" />
          <ListingArticleEvent v-if="item.type==='program-event'" :large="true" :post="item" :color-scheme="layout.colour" />
        </div>
      </div>
    </template>
    <template v-if="layout.type==='custom'">
      <div v-if="layout.custom_posts&&layout.custom_posts.length" class="post-grid">
        <div v-for="(item, customItemKey) in layout.custom_posts" :key="`customItem${customItemKey}`" class="post-grid__item">
          <ListingCustom :custom-item="item" :colour-scheme="layout.colour" />
        </div>
      </div>
    </template>
    <div class="flex justify-center py-20" :class="`text-${layout.colour}`">
      <button v-if="totalPages>page" v-cursor-interact @click.prevent="loadMore">
        <Spinner text="Load More" />
      </button>
      <span v-if="totalPages>page" class="sr-only">
        <a v-if="page>1" :href="`/${allSlug}${(activeFilterSlug ? `/${activeFilterSlug}` : '')}/page/${page-1}`">Previous Page</a>
        <a v-if="page<totalPages" :href="`/${allSlug}${(activeFilterSlug ? `/${activeFilterSlug}` : '')}/page/${page+1}`">Next Page</a>
      </span>
    </div>
  </Container>
</template>

<script>
import layout from '~/mixins/layout'
import livedata from '~/mixins/livedata'

export default {
  name: 'PostsGrid',
  mixins: [layout, livedata],
  props: {
    parentLink: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      items: [],
      filters: [],
      activeFilter: null,
      page: 1,
      totalPages: 1
    }
  },
  async fetch () {
    if (this.layout.type === 'manual' || this.layout.type === 'custom') {
      return
    }

    let filter = ''
    let filterType = 'categories'
    let endpoint = this.layout.type
    if (this.layout.type === 'program-event') {
      if (this.layout.program_event_type) {
        this.activeFilter = this.layout.program_event_type
      }
      if (this.activeFilter) {
        filter = `&program-type=${this.activeFilter}`
      }
      filterType = 'program-type'
    }
    if (this.layout.type === 'posts') {
      if (this.layout.category) {
        this.activeFilter = this.layout.category
      }
      if (this.activeFilter) {
        filter = `&categories=${this.activeFilter}`
      }
    }

    if (this.layout.type === 'press') {
      filterType = 'post-year'
      endpoint = 'posts'
      if (this.layout.post_year) {
        this.activeFilter = this.layout.post_year
      }
      if (this.activeFilter) {
        filter = `&post-year=${this.activeFilter}&categories=${this.layout.press_category}`
      } else {
        filter = `&categories=${this.layout.press_category}`
      }
    }

    this.filters = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/${filterType}?routes=1&hide_empty=true`)
    if (!this.activeFilter && this.layout.type === 'press') {
      this.activeFilter = this.filters[0].id
      filter = `&post-year=${this.activeFilter}&categories=${this.layout.press_category}`
    }

    const response = await this.$axios.get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/${endpoint}?per_page=6&page=${this.page}&parent=0${filter}`)
    this.items = this.items.concat(response.data)
    this.totalPages = parseInt(response.headers['x-wp-totalpages'])
  },
  computed: {
    allLabel () {
      if (this.layout.type === 'program-event') {
        return 'Events'
      }

      if (this.layout.type === 'press') {
        return 'Press Releases'
      }

      return 'News'
    },
    allSlug () {
      if (this.layout.type === 'program-event') {
        return 'events'
      }

      return 'news'
    },
    canShowFilters () {
      if (this.layout.type === 'program-event' && this.layout.program_event_type) {
        return false
      }

      if (this.layout.type === 'posts' && this.layout.category) {
        return false
      }

      if (this.layout.type === 'press' && this.layout.post_year) {
        return false
      }

      return this.layout.show_filters
    },
    activeFilterSlug () {
      if (this.activeFilter) {
        const matches = this.filters.filter((filter) => {
          return filter.id === this.activeFilter
        })

        if (matches.length) {
          if (matches[0].taxonomy === 'post-year') {
            return `year/${matches[0].slug}`
          }
          return matches[0].slug
        }
      }

      return null
    }
  },
  methods: {
    loadMore () {
      if (this.$fetchState.pending) {
        return
      }

      this.page++
      this.$fetch()
    },
    filterPosts (filter) {
      if (this.$fetchState.pending) {
        return
      }

      this.activeFilter = filter
      this.page = 1
      this.items = []
      this.$fetch()
    }
  }
}
</script>

<style scoped>
.post-grid {
  @apply flex flex-wrap md:-mx-10;
}

.post-grid__item {
  @apply w-full md:w-1/2 lg:w-1/3 md:p-10 mb-10 md:mb-0;
}
</style>
