<template>
  <div>
    <div class="bg-black text-white py-10">
      <Container>
        <div class="w-full feature-heading lg:flex justify-start items-baseline lg:space-x-4 pb-10">
          <SymbolArrowsDownRight class="block w-14 md:w-20 lg:w-28 xl:w-32 h-auto lg:mr-6 mb-6 lg:mb-0" />
          <h1>{{ title }}</h1>
        </div>
        <form role="search" action="/search" method="get" @submit.prevent="handleSearch">
          <label class="sr-only" for="search-keyword">Enter search keyword</label>
          <input
            id="search-keyword"
            v-model="keyword"
            v-cursor-interact
            type="text"
            name="s"
            required
            placeholder="Search"
            :disabled="busy"
            class="rounded-4xl xl:text-xl px-8 py-2 xl:py-4 block w-full outline-none border-5 border-dotted focus:outline-none transition-colors duration-500 motion-reduce:transition-none text-white border-white placeholder-white bg-transparent"
          >
        </form>
        <div v-if="searchedKeyword&&filters&&filters.length" class="flex flex-wrap pt-10 mb-10 lg:mb-0">
          <CircleButtonSmall
            :class="(activeFilter !== null ? `opacity-30 mr-10 mb-5` : 'mr-10 mb-5')"
            to="#"
            :click-handler="() => { filterPosts(null) }"
            color-scheme="white"
            :force-scheme="true"
          >
            <span>All</span>
          </CircleButtonSmall>
          <CircleButtonSmall
            v-for="filter in filters"
            :key="`filter${filter.id}`"
            :class="(!activeFilter||activeFilter.id !== filter.id ? `opacity-30 mr-10 mb-5` : 'mr-10 mb-5')"
            to="#"
            :click-handler="() => { filterPosts(filter) }"
            color-scheme="white"
            :force-scheme="true"
          >
            <span v-html="filter.name" />
          </CircleButtonSmall>
        </div>
      </Container>
    </div>
    <div v-if="searchedKeyword" class="py-20">
      <div v-if="busy" class="flex justify-center">
        <Spinner text="Loading" />
      </div>
      <div v-if="!busy">
        <Container>
          <div v-if="results.length">
            <div class="post-grid">
              <div v-for="item in results" :key="`item${item.id}`" class="post-grid__item">
                <ListingLumenEpisode v-if="item.type==='lumen-episode'" :large="true" :post="item" color-scheme="black" />
                <ListingArticleEvent
                  v-else-if="item.type==='program-event'"
                  :large="true"
                  :post="item"
                  color-scheme="black"
                />
                <ListingPost v-else :large="true" :post="item" color-scheme="black" :show-type="item.type!=='post'" />
              </div>
            </div>
            <div class="flex justify-center py-20 text-black">
              <button v-if="totalPages>page" v-cursor-interact @click.prevent="loadMore">
                <Spinner text="Load More" />
              </button>
            </div>
          </div>
          <div v-if="!results.length">
            <h2 class="text-xl text-center">
              No results found for search "{{ searchedKeyword }}" <span v-if="activeFilter">under {{ activeFilter.name }}</span>, try another search.
            </h2>
          </div>
        </Container>
      </div>
    </div>
  </div>
</template>

<script>
import SymbolArrowsDownRight from '~/assets/symbol-arrows-down-right.svg?inline'

export default {
  components: { SymbolArrowsDownRight },
  layout: 'default',
  async asyncData ({
    $axiosConfig,
    $axios,
    store
  }) {
    const settings = await $axios.$get(`${$axiosConfig.cmsUrl}/wp-json/blackstar/v1/settings`)

    store.commit('setSettings', settings)

    return {}
  },
  data () {
    return {
      results: [],
      keyword: '',
      searchedKeyword: '',
      timeout: null,
      busy: false,
      page: 1,
      totalPages: 1,
      filters: [
        {
          name: 'Pages',
          id: 'page'
        },
        {
          name: 'News',
          id: 'post'
        },
        {
          name: 'Festival',
          id: 'festival-event'
        },
        {
          name: 'Events',
          id: 'program-event'
        },
        {
          name: 'Seen',
          id: 'seen-article'
        },
        {
          name: 'Many Lumens',
          id: 'lumen-episode'
        },
        {
          name: 'Opportunities',
          id: 'opportunity'
        },
        {
          name: 'Archive',
          id: 'archive-item'
        },
        {
          name: 'Gallery',
          id: 'gallery'
        }
      ],
      activeFilter: null
    }
  },
  computed: {
    title () {
      if (this.searchedKeyword) {
        return `Search results for "${this.searchedKeyword}"`
      }

      return 'Search'
    }
  },
  watch: {
    keyword () {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }

      this.$nextTick(() => {
        this.timeout = setTimeout(this.handleSearch, 1000)
      })
    }
  },
  mounted () {
    if (this.$route.query && this.$route.query.s) {
      this.keyword = this.$route.query.s
    }
  },
  methods: {
    handleSearch () {
      if (this.busy) {
        return
      }

      this.busy = true
      this.searchedKeyword = this.keyword
      this.page = 1
      this.totalPages = 1
      this.results = []
      this.performSearch()
    },
    performSearch () {
      this.$axios.get(`${this.$axiosConfig.cmsUrl}/wp-json/blackstar/v1/search?_search=${this.searchedKeyword}&_page=${this.page}${(this.activeFilter ? `&_filter=${this.activeFilter.id}` : '')}`).then((response) => {
        this.results = this.results.concat(response.data)
        this.totalPages = parseInt(response.headers['x-wp-totalpages'])
        this.busy = false
      }).catch((e) => {
        // console.log(e.message)
        this.busy = false
      })
    },
    filterPosts (filter) {
      this.activeFilter = filter
      this.handleSearch()
    },
    loadMore () {
      if (this.busy) {
        return
      }

      this.page++
      this.performSearch()
    },
    niceType (item) {
      if (item.post_type === 'post') {
        return 'News'
      }

      return item.post_type
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
