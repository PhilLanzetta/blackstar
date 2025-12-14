<template>
  <div>
    <div v-if="author" class="border-b border-black">
      <Container>
        <div class="max-w-md">
          <p class="font-seen_serif_light_italic font-light xl:text-xl mb-4">
            Bio
          </p>
          <h1 class="text-xl lg:text-2xl xl:text-3xl font-seen_serif_light_italic mb-4">
            {{ author.name }}
          </h1>
          <p v-html="author.description" />
        </div>
        <Space :md="true" />
      </Container>
    </div>
    <Space v-if="author" :md="true" />
    <Container>
      <div class="lg:flex justify-between items-start">
        <div class="lg:w-3/12 lg:sticky lg:top-0 lg:-mt-32">
          <div class="lg:pt-32">
            <template v-if="!layout.author">
              <h2 v-if="title" class="hidden lg:block font-seen_serif_light xl:text-2xl mb-4 xl:mb-8" v-html="title" />
              <nav
                v-if="layout.show_issue_filter&&issues.length"
                class="seen-article-listing-issue-nav"
                :class="{'seen-article-listing-issue-nav--open': showIssueFilterNav}"
              >
                <button v-cursor-interact @click.prevent="toggleIssueFilterNav">
                  <span v-if="activeIssue">{{ activeIssueName }}</span><span v-if="!activeIssue">Filter by</span>
                  <span><img src="~/assets/dropdown-arrow.svg" alt=""></span>
                </button>
                <ul v-if="showIssueFilterNav">
                  <li :class="{'active': activeIssue===null}">
                    <a v-cursor-interact href="/seen/read" @click.prevent="filterByIssue(null)">
                      <span>All</span>
                    </a>
                  </li>
                  <li
                    v-for="issue in issues"
                    :key="`issueFilter${issue.id}`"
                    :class="{'active': activeIssue === issue.id}"
                  >
                    <a v-cursor-interact :href="`/seen/read/${issue.slug}`" @click.prevent="filterByIssue(issue)">
                      <span v-html="issue.name" />
                    </a>
                  </li>
                </ul>
              </nav>
              <form
                v-if="layout.show_issue_filter"
                class="mb-4 xl:mb-8 flex lg:w-60 border-b border-black items-center bg-transparent"
                @submit.prevent="handleSearch"
              >
                <input
                  v-model="search"
                  type="text"
                  name="search"
                  placeholder="Search"
                  autocomplete="seensearch"
                  :disabled="$fetchState.pending"
                  class="flex-shrink py-2 px-4 w-full font-seen_serif_light focus:outline-none placeholder:text-black"
                  @keyup="maybeHandleSearch"
                >
                <button class="flex-shrink-0 w-6 h-6 mr-3 ml-auto" type="submit">
                  <img src="~/assets/seen/search.svg" class="block w-full h-full" alt="">
                  <span class="sr-only">Search</span>
                </button>
              </form>
              <nav
                v-if="layout.type!=='curated'&&layout.show_categories"
                class="hidden lg:block seen-article-listing-category-nav"
              >
                <ul>
                  <li v-if="activeCategoryFilters.length!==0" class="pb-4">
                    <a
                      v-cursor-interact
                      class="flex space-x-2 items-center clear-filters"
                      href="/seen/read"
                      @click.prevent="reset"
                    >
                      <SeenCloseIcon class="h-5 w-5 block transform rotate-45" />
                      <span>Clear Filters</span>
                    </a>
                  </li>
                  <li
                    v-for="category in categories"
                    :key="`categoryFilter${category.id}`"
                    :class="{'active': activeCategoryFilters.includes(category.id)}"
                  >
                    <a
                      v-cursor-interact
                      :href="`/seen/category/${category.slug}`"
                      @click.prevent="toggleCategoryFilter(category)"
                    >
                      <span v-html="category.name" />
                    </a>
                  </li>
                </ul>
              </nav>
            </template>
            <template v-else>
              <div>
                <SiteLink to="/seen/read" class-names="font-seen_serif_light xl:text-2xl mb-4 xl:mb-8 hover:underline underline-offset-8 decoration-1">
                  Back to Read
                </SiteLink>
              </div>
            </template>
          </div>
        </div>

        <div class="lg:w-9/12">
          <h2
            v-if="layout.type!=='curated'&&layout.show_categories"
            class="text-4xl font-seen_serif_light_italic mb-8"
            v-html="activeCategoriesTitle"
          />

          <template v-if="author">
            <div v-if="ready" class="flex flex-wrap items-baseline lg:-mt-8">
              <h2
                class="md:text-lg xl:text-xl font-seen_serif_light mr-4"
              >
                <span class="font-seen_serif_light_italic">{{ total }}</span> articles from <span
                  class="font-seen_serif_light_italic"
                  v-html="author.name"
                /><span v-if="search"> for search "<span class="font-seen_serif_light_italic">{{
                  search
                }}</span>"</span><span v-if="activeIssue"> in {{ activeIssueName }}</span>
              </h2>
              <SiteLink
                v-if="activeIssue||activeCategoryFilters.length||search"
                to="/seen/read"
                :click-handler="fullReset"
                class="underline underline-offset-1"
              >
                Clear
              </SiteLink>
            </div>
            <h2 v-else class="md:text-lg xl:text-xl font-seen_serif_light_italic mr-4 lg:-mt-8">
              One Moment...
            </h2>
            <Space :md="true" />
          </template>

          <template v-if="search&&!author">
            <div v-if="ready" class="flex flex-wrap items-baseline lg:-mt-8">
              <h2
                class="md:text-lg xl:text-xl font-seen_serif_light mr-4"
              >
                <span class="font-seen_serif_light_italic">{{ total }}</span> search results for <span
                  class="font-seen_serif_light_italic"
                >"{{ search }}"</span><span v-if="activeIssue"> in {{ activeIssueName }}</span>
              </h2>
              <SiteLink to="/seen/read" :click-handler="resetSearch" class="underline underline-offset-1">
                Clear
              </SiteLink>
            </div>
            <h2 v-else class="md:text-lg xl:text-xl font-seen_serif_light_italic mr-4 lg:-mt-8">
              Searching...
            </h2>
            <Space :md="true" />
          </template>
          <div v-if="articles&&articles.length" class="lg:flex flex-wrap lg:-mx-8">
            <div v-for="article in articles" :key="`article${article.id}`" class="lg:px-8 lg:w-1/2 mb-8 lg:mb-16">
              <ListingSeenArticle :full="true" :article="article" />
            </div>
          </div>
          <div v-if="(!articles||(articles&&!articles.length))&&!$fetchState.pending">
            <p class="font-seen_serif_light_italic mb-8 text-lg">
              Sorry, no articles have been found for the selected filters.
            </p>

            <PillButton :outline="true" colour-scheme="black" force-scheme="true" to="#" :click-handler="fullReset">
              Reset Filters
            </PillButton>
          </div>

          <SeenLoadMore v-if="totalPages>page&&layout.type!=='curated'" :click-handler="loadMore" />
          <div v-if="totalPages>1" class="sr-only">
            <a v-if="page>2" :href="`${paginationRoot}/page/${page-1}`">Previous Page</a>
            <a v-if="totalPages>page" :href="`${paginationRoot}/page/${page+1}`">Next Page</a>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>

<script>
import layout from '~/mixins/layout'
import ListingSeenArticle from '~/components/layouts/partials/ListingSeenArticle'
import livedata from '~/mixins/livedata'
import SeenLoadMore from '~/components/global/SeenLoadMore'
import SeenCloseIcon from '~/assets/seen/close-icon.svg?inline'

export default {
  name: 'SeenArticleListing',
  components: {
    SeenLoadMore,
    ListingSeenArticle,
    SeenCloseIcon
  },
  mixins: [layout, livedata],
  props: {
    initialPage: {
      type: Number,
      required: false,
      default: 1
    }
  },
  data () {
    return {
      page: this.initialPage,
      total: 0,
      totalPages: 1,
      activeIssue: null,
      activeCategoryFilters: [],
      author: null,
      issues: [],
      categories: [],
      showIssueFilterNav: false,
      hasFiltered: false,
      search: null,
      searchTimeout: null,
      ready: false
    }
  },
  async fetch () {
    if (this.layout.type === 'issue' && !this.hasFiltered) {
      this.activeIssue = this.layout.issue
    }

    if (this.layout.category && !this.hasFiltered) {
      this.activeCategoryFilters.push(this.layout.category)
    }

    if (this.layout.author) {
      this.author = this.layout.author
    }

    if (this.$route && this.$route.query && this.$route.query.search && !this.hasFiltered) {
      this.search = this.$route.query.search
    }

    if (this.layout.type !== 'curated') {
      const response = await this.$axios.get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/seen-article?per_page=6&page=${this.page}` + (this.activeIssue ? '&seen-issue=' + this.activeIssue : '') + (this.activeCategoryFilters && this.activeCategoryFilters.length ? '&seen-category=' + this.activeCategoryFilters.join(',') : '') + (this.author ? `&seen-author=${this.author.id}` : '') + (this.search ? `&_search=${this.search}` : ''))
      this.items = this.items.concat(response.data)
      this.totalPages = parseInt(response.headers['x-wp-totalpages'])
      this.total = parseInt(response.headers['x-wp-total'])

      if (this.search || this.author) {
        this.ready = true
      }

      this.categories = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/seen-category?routes=1&hide_empty=1`)
      this.issues = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/seen-issue?routes=1&hide_empty=1`)
    }
  },
  computed: {
    title () {
      if (this.activeIssueName) {
        return this.activeIssueName
      }

      return 'Read'
    },
    activeIssueName () {
      if (this.issues.length && this.activeIssue) {
        const matches = this.issues.filter((issue) => {
          return parseInt(issue.id) === parseInt(this.activeIssue)
        })

        if (matches.length) {
          return matches[0].name
        }
      }

      return false
    },
    articles () {
      if (this.layout.articles) {
        return this.layout.articles
      }
      return this.items
    },
    activeCategoriesTitle () {
      if (this.activeCategoryFilters.length === 0) {
        return ''
      }

      const activeCategories = this.categories.filter((category) => {
        return (this.activeCategoryFilters.includes(category.id))
      })

      return activeCategories.map((category) => {
        return category.name
      }).join((activeCategories.length > 1 ? ' / ' : ''))
    },
    activeIssueSlug () {
      if (this.activeIssue) {
        if (this.issues && this.issues.length) {
          const matches = this.issues.filter((issue) => {
            return issue.id === parseInt(this.activeIssue)
          })

          if (matches && matches.length) {
            return matches[0].slug
          }
        }
      }

      return ''
    },
    activeCategorySlug () {
      if (this.activeCategoryFilters && this.activeCategoryFilters.length) {
        if (this.categories && this.categories.length) {
          const matches = this.categories.filter((category) => {
            return category.id === parseInt(this.activeCategoryFilters[0])
          })

          if (matches && matches.length) {
            return matches[0].slug
          }
        }
      }

      return ''
    },
    paginationRoot () {
      if (this.layout.type === 'issue') {
        return `/seen/read/${this.activeIssueSlug}`
      }

      if (this.layout.type === 'all' && this.layout.category) {
        return `/seen/category/${this.activeCategorySlug}`
      }

      return '/seen/read'
    }
  },
  watch: {
    '$route' () {
      this.$nextTick(() => {
        this.fullReset()
      })
    }
  },
  mounted () {
    if (this.layout.type === 'issue') {
      this.activeIssue = this.layout.issue
    }

    if (this.$route && this.$route.query && this.$route.query.search) {
      this.$nextTick(() => {
        this.fullReset()
      })
    }
  },
  beforeDestroy () {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout)
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
    toggleCategoryFilter (category) {
      if (this.$fetchState.pending) {
        return
      }
      /* if (this.layout.author) {
        this.$router.push(`/seen/category/${category.slug}`)
        return
      } */
      if (this.activeCategoryFilters.includes(category.id)) {
        this.activeCategoryFilters = this.activeCategoryFilters.filter((activeCategory) => {
          return activeCategory !== category.id
        })
      } else {
        this.activeCategoryFilters.push(category.id)
      }

      this.filter()
    },
    filter () {
      this.items = []
      this.page = 1
      this.totalPages = 1
      this.hasFiltered = true
      window.scrollTo(0, 0)
      this.$fetch()
    },
    reset () {
      if (this.$fetchState.pending) {
        return
      }
      this.hasFiltered = true
      if (this.$route && this.$route.query && this.$route.query.search) {
        this.search = this.$route.query.search
      } else {
        this.search = null
      }
      this.activeCategoryFilters = []
      this.filter()
    },
    fullReset () {
      if (this.$fetchState.pending) {
        return
      }
      this.activeIssue = (this.layout.issue ? this.layout.issue : null)
      this.reset()
    },
    toggleIssueFilterNav () {
      this.showIssueFilterNav = !this.showIssueFilterNav
    },
    filterByIssue (issue) {
      if (this.$fetchState.pending) {
        return
      }
      /*   if (this.layout.author) {
        if (!issue) {
          this.$router.push('/seen/read')
          return
        }

        this.$router.push(`/seen/read/${issue.slug}`)
        return
      } */

      this.activeIssue = (issue ? issue.id : null)
      this.filter()
      this.showIssueFilterNav = false
    },
    handleSearch () {
      if (this.$fetchState.pending) {
        return
      }

      this.filter()
    },
    maybeHandleSearch () {
      this.ready = false
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }

      this.searchTimeout = setTimeout(this.handleSearch, 1000)
    },
    resetSearch () {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }

      if (this.$route && this.$route.query && this.$route.query.search) {
        this.$router.replace({ query: { } })
      }
      this.search = null
      this.filter()
    }
  }
}
</script>

<style>
.seen-article-listing-category-nav {
  @apply font-seen_serif_light;
}

.seen-article-listing-category-nav li {
  @apply mb-2;
}

.seen-article-listing-category-nav li a:not(.clear-filters) {
  @apply inline-block pb-0.5 border-b border-transparent;
}

.seen-article-listing-category-nav li.active a:not(.clear-filters) {
  @apply border-black;
}

.seen-article-listing-issue-nav {
  @apply mb-8;
}

.seen-article-listing-issue-nav {
  @apply relative text-lg lg:text-base lg:w-60 font-seen_serif_light z-10;
}

.seen-article-listing-issue-nav button {
  @apply flex items-center justify-between border border-black px-4 py-2 leading-none text-left w-full;
}

.seen-article-listing-issue-nav button img {
  @apply block w-4 h-4 transition-transform duration-200;
}

.seen-article-listing-issue-nav--open button {
  @apply text-gray;
}

.seen-article-listing-issue-nav--open button img {
  @apply transform rotate-180;
}

.seen-article-listing-issue-nav ul {
  @apply absolute left-0 w-full max-h-96 overflow-y-scroll;
}

.seen-article-listing-issue-nav ul li a {
  @apply block border border-black px-4 py-2 leading-none bg-white z-10 border-t-0;
}

.seen-article-listing-issue-nav ul li a:hover {
  @apply font-seen_serif_light_italic;
}

</style>
