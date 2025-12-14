<template>
  <div>
    <Container>
      <div class="flex gap-4 justify-between items-center">
        <div class="flex space-x-4 items-start">
          <Festival24Heading :layout="{'heading': title}" />
          <Festival23HelpTextButton v-if="post.acf.help_text" :help-text="post.acf.help_text" />
        </div>
        <Festival24Tooltip tooltip="Filter" bg="bsf13orange">
          <button aria-controls="festival-24-filters" :aria-expanded="filtersOpen" @click="filtersOpen=!filtersOpen">
            <Festival24Icon icon="filter" :large="true" />
          </button>
        </Festival24Tooltip>
      </div>
      <Space />
      <Space />
      <Space />
    </Container>
    <div class="border-t border-black w-full absolute left-0 z-0" />
    <ClientOnly>
      <Festival24Filters :handle-close="closeFilters" :open="filtersOpen" :clear-filters="clearFilters" :film-guide="true" />
    </ClientOnly>
    <Container>
      <Space />
      <Space />
      <Space />
      <template v-if="items&&items.length">
        <div class="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
          <div
            v-for="item in items"
            :key="`festivalFilm${item.id}`"
          >
            <Festival24RichCard
              class="w-full"
              :card="{type: 'festival-film', 'film': item}"
              size="sm"
            />
          </div>
        </div>
        <Space :md="true" />
        <div v-if="totalPages>page" class="flex justify-center">
          <Festival24Button to="#" :click-handler="loadMore">
            Load More
          </Festival24Button>
          <RawLink class="sr-only" :to="`${post.link}?page=${page+1}`|replaceSiteUrl">
            Next Page
          </RawLink>
        </div>
        <Space :md="true" />
      </template>
      <template v-else>
        <div v-if="!$fetchState.pending">
          <Festival24SecondaryHeading :layout="{'heading': 'No films found'}" size="md" />
          <Festival24Prose class="my-4">
            <p>
              Sorry but no films have been found for the selected tags and filters.
            </p>
          </Festival24Prose>

          <div class="flex my-10 space-x-4">
            <Festival24Button :click-handler="clearFilters" to="#">
              Clear Filters
            </Festival24Button>
          </div>
        </div>
      </template>
      <Transition name="fade">
        <Festival24Loader v-if="$fetchState.pending" />
      </Transition>
    </Container>
  </div>
</template>

<script>
import updateRouteQuery from '~/mixins/updateRouteQuery'
import forceBsf13Layout from '~/mixins/forceBsf13Layout'

export default {
  name: 'Festival24FilmGuide',
  mixins: [updateRouteQuery, forceBsf13Layout],
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      items: [],
      totalPages: 0,
      page: 1,
      filtersOpen: false
    }
  },
  async fetch () {
    const config = this.$axiosConfig.config

    if (this.$store.state.liveData && this.$store.state.liveDataNonce) {
      config.withCredentials = true
      config.headers = { 'X-WP-Nonce': this.$route.query.nonce }
    }

    try {
      let queryString = ''
      const allowedFilters = ['eventive-tag', 'accessibility', 'festival-awards', 'premiere-status']

      if (this.$route.query) {
        if (this.$route.query.page) {
          this.page = parseInt(this.$route.query.page)
        }

        allowedFilters.forEach((allowedFilter) => {
          if (this.$route.query[allowedFilter]) {
            const allowedFilterTerms = this.$route.query[allowedFilter].split(',').map((term) => {
              return parseInt(term)
            })
            queryString += `&${allowedFilter}=${allowedFilterTerms.join(',')}`
          }
        })

        if (this.$route.query._search) {
          queryString += `&_search=${this.$route.query._search}`
        }
      }

      const response = await this.$axios.get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/festival-film?per_page=18&page=${this.page}&_year=${this.post.acf.festival_year}&rich=1&not_hidden=1${queryString}`, config)
      if (response.status === 200) {
        this.items = this.items.concat(response.data)
        this.totalPages = parseInt(response.headers['x-wp-totalpages'])
      }
      this.rebuildEventive()
    } catch (e) {
      // console.log(e)
    }
  },
  computed: {
    title () {
      if (this.post.acf.custom_title) {
        return this.post.acf.custom_title
      }

      return this.post.title.rendered
    }
  },
  watch: {
    '$route.query' (to, from) {
      this.$nextTick(() => {
        this.page = 1
        this.items = []
        this.$fetch()
      })
    }
  },
  mounted () {
    if (typeof window !== 'undefined') {
      this.$nextTick(() => {
        this.items = []
        this.page = 1
        this.totalPages = 1
        this.$fetch()
      })
    }
  },
  methods: {
    clearFilters () {
      const newQuery = []
      if (this.$route.query && this.$route.query.day) {
        newQuery.day = this.$route.query.day
      }

      this.page = 1

      this.$router.push({
        path: this.$route.path,
        query: newQuery
      })
    },
    loadMore () {
      this.page++
      this.$fetch()
    },
    closeFilters () {
      this.filtersOpen = false
    }
  }
}
</script>

<style scoped>

</style>
