<template>
  <Container class="min-h-screen">
    <Festival23StickyLayout :section-colour="sectionColour" toggle-label="Filter by">
      <div class="flex space-x-4 items-center">
        <Festival23H2 size="xl">
          <span v-html="title" />
        </Festival23H2>
        <Festival23HelpTextButton v-if="post.acf.help_text" :help-text="post.acf.help_text" />
      </div>
      <Space />
      <Space />
      <div class="flex justify-between items-start space-x-4">
        <Festival23ScheduleTagFilters  :non-event-tags-only="true" :film-guide="true" />
      </div>
      <Space class="block xl:hidden" />
      <Space class="block xl:hidden" />
      <Space class="hidden xl:block" :md="true" />
      <div class="border-t-2 border-black w-full absolute left-0 z-0" />
      <Space class="block xl:hidden" />
      <Space class="block xl:hidden" />
      <Space class="hidden xl:block" :md="true" />
      <template v-if="items&&items.length">
        <div class="flex flex-wrap -mx-2 3xl:-mx-4">
          <div v-for="item in items" :key="`festivalFilm${item.id}`" class="w-full md:w-1/2 xl:w-1/3 p-2 3xl:p-4 flex items-stretch">
            <Festival23RichCard
              class="w-full"
              :section-colour="sectionColour"
              :card="{type: 'festival-film', 'film': item}"
            />
          </div>
        </div>
        <Space :md="true" />
        <div v-if="totalPages>page" class="flex justify-center">
          <Festival23Button to="#" :click-handler="loadMore">
            Load More
          </Festival23Button>
          <RawLink class="sr-only" :to="`${post.link}?page=${page+1}`|replaceSiteUrl">
            Next Page
          </RawLink>
        </div>
        <Space :md="true" />
      </template>
      <template v-else>
        <div v-if="!$fetchState.pending">
          <Festival23H2 size="md">
            No films found
          </Festival23H2>
          <Festival23Prose class="my-4">
            <p>
              Sorry but no films have been found for the selected tags and filters.
            </p>
          </Festival23Prose>

          <div class="flex my-10 space-x-4">
            <Festival23Button :click-handler="clearFilters" to="#">
              Clear Filters
            </Festival23Button>
          </div>
        </div>
      </template>
      <template #sidebar>
        <ClientOnly>
          <MqLayout mq="xl+">
            <Festival23Box :bg="`bg-${sectionColour}`">
              <Festival23FilmGuideFilters key="desktop-filters" class="py-2 px-4" :post="post" :section-colour="sectionColour" />
            </Festival23Box>
          </MqLayout>
          <MqLayout :mq="['sm', 'md', 'lg']">
            <div class="text-white border-white">
              <Festival23FilmGuideFilters key="mobile-filters" class="py-6 px-4 sm:px-8 border-t-2 border-bsf12Bg" :post="post" :alt="true" section-colour="bsf12Bg" />
            </div>
          </MqLayout>
        </ClientOnly>
      </template>
    </Festival23StickyLayout>
    <Transition name="fade">
      <Festival23Loader v-if="$fetchState.pending" />
    </Transition>
  </Container>
</template>

<script>
import festival23SectionColors from '~/mixins/festival23SectionColors'
import updateRouteQuery from '~/mixins/updateRouteQuery'
import forceBsf12Layout from '~/mixins/forceBsf12Layout'

export default {
  name: 'Festival23FilmGuide',
  mixins: [festival23SectionColors, updateRouteQuery, forceBsf12Layout],
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
      page: 1
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

      const response = await this.$axios.get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/festival-film?per_page=9&page=${this.page}&_year=2023&rich=1&not_hidden=1${queryString}`, config)
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
    }
  }
}
</script>

<style scoped>

</style>
