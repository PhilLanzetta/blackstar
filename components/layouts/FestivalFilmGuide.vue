<template>
  <section class="relative">
    <LazyRellaxShape v-if="$store.state.theme==='bsf11'" key="shapeFlower" class="block top-0 right-0 z-0 w-full max-w-xs">
      <ShapeFlower />
    </LazyRellaxShape>
    <LazyRellaxShape v-if="$store.state.theme==='bsf11'" key="shapeStarAlt" class="block -top-64 right-1/2 z-0 w-full max-w-sm">
      <ShapeStarAlt />
    </LazyRellaxShape>
    <Container>
      <div class="flex-wrap flex justify-between items-end" :class="{'text-navy': $store.state.theme==='festival'}">
        <div>
          <FestivalHeading v-if="layout.title&&$store.state.theme==='festival'" background-class="bg-pink">
            {{ layout.title }}
          </FestivalHeading>
          <h1 class="relative z-20 font-bsf11_sans text-7xl lg:text-8xl leading-none mb-8" v-if="layout.title&&$store.state.theme==='bsf11'" v-html="layout.title"></h1>
          <div
            v-if="tagsWithEvents.length&&layout.show_filters&&!layout.filter_events"
            class="hidden lg:flex flex-wrap ml-border"
          >
            <a
              v-for="tag in tagsWithEvents"
              :key="`tagFilter${tag.id}`"
              v-cursor-interact
              :href="`?tags=${tag.slug}`"
              class="filter-tag"
              :class="{'filter-tag--active': tagIsActive(tag), 'filter-tag--festival': $store.state.theme==='festival', 'filter-tag--bsf11': $store.state.theme==='bsf11'}"
              role="switch"
              :aria-checked="(tagIsActive(tag)).toString()"
              @click.prevent="toggleTag(tag)"
            ><span>{{ tag.name }}</span></a>
          </div>
        </div>
        <button
          v-if="$store.state.theme==='festival'"
          v-cursor-interact
          aria-controls="filters"
          :aria-expanded="showMobileFilters.toString()"
          class="block lg:hidden px-7 py-1 text-navy border-5 border-navy"
          :class="{'bg-white': !showMobileFilters, 'bg-pink': showMobileFilters}"
          @click.prevent="showMobileFilters=!showMobileFilters"
        >
          <template v-if="!showMobileFilters">
            Filter
          </template>
          <template v-if="showMobileFilters">
            Close
          </template>
        </button>
        <div v-if="$store.state.theme==='bsf11'" class="block lg:hidden">
          <FestivalButton
            :alt="true"
            to="#"
            :click-handler="() => {showMobileFilters=!showMobileFilters}"
          >
            <template v-if="!showMobileFilters">
              Filter
            </template>
            <template v-if="showMobileFilters">
              Close
            </template>
          </FestivalButton>
        </div>
        <div
          v-if="layout.show_filters&&!layout.filter_events"
          id="filters"
          class="lg:flex w-full justify-end lg:space-x-4 items-end mt-4 lg:mt-auto"
          :class="{'block': showMobileFilters, 'hidden': !showMobileFilters}"
        >
          <div
            v-if="tagsWithEvents.length"
            class="relative lg:hidden z-30"
            :class="{'mb-2 lg:mb-0': $store.state.theme==='bsf11'}"
          >
            <button
              v-cursor-interact
              aria-controls="tagsFilterNav"
              :aria-expanded="tagsNavOpen.toString()"
              class="filter-nav-button"
              :class="{'filter-nav-button--active': tagsNavOpen, 'filter-nav-button--festival bg-beige text-navy': $store.state.theme==='festival', 'filter-nav-button--bsf11 filter-nav-button--tag': $store.state.theme==='bsf11'}"
              @click="tagsNavOpen=!tagsNavOpen"
            >
              <span
                class="filter-nav-button__text"
              >Filter by Tag</span><span class="filter-nav-button__toggle"><img
                v-if="$store.state.theme==='festival'"
                src="~/assets/festival/toggle.svg"
                alt=""
                width="67"
                height="67"
              ></span>
            </button>
            <nav
              id="tagsFilterNav"
              class="filter-menu"
              :class="{'filter-menu--active': tagsNavOpen, 'filter-menu--bsf11': $store.state.theme==='bsf11', 'filter-menu--festival': $store.state.theme==='festival'}"
              tabindex="-1"
            >
              <ul>
                <li v-for="tag in tagsWithEvents" :key="`filterNavTag${tag.id}`">
                  <a
                    v-cursor-interact
                    :href="`?tags=${tag.slug}`"
                    class="filter-menu-item"
                    :class="{'filter-menu-item--active-alt2': tagIsActive(tag)}"
                    role="switch"
                    :aria-checked="(tagIsActive(tag)).toString()"
                    @click.prevent="toggleTag(tag)"
                  >
                    <span>{{ tag.name }}</span></a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <Space :md="true" />
      <div class="relative">
        <div class="overflow-hidden relative z-20">
          <transition name="fade-in-up">
            <div v-show="items&&items.length" class="listing-grid listing-grid--sm">
              <div
                v-for="item in items"
                :key="`film${item.id}`"
                class="listing-grid__item"
              >
                <ListingFestivalFilmGuide
                  :film="item"
                />
              </div>
            </div>
          </transition>
          <transition name="fade-in-down">
            <div v-show="$fetchState.pending" class="relative z-20">
              <div
                class="w-20 h-20 rounded-full flex text-center justify-center items-center motion-safe:animate-bounce mx-auto my-20"
                :class="{'font-festival_sans_italic bg-blue text-yellow': $store.state.theme==='festival', 'bg-bsf11Yellow text-black font-bsf11_sans text-4xl uppercase w-32 h-32': $store.state.theme==='bsf11'}"
              >
                <span>Loading</span>
              </div>
            </div>
          </transition>
          <transition name="fade-in-down">
            <div v-show="(!items||(items&&!items.length))&&!$fetchState.pending" class="text-center relative z-20">
              <h2 class="text-2xl" :class="{'font-festival_sans_light_italic text-red': $store.state.theme==='festival', 'font-medium': $store.state.theme==='bsf11'}">
                Sorry, no films have been found for the selected filters.
              </h2>

              <p class="mt-6">
                <FestivalButton to="#" :click-handler="clearFilters">
                  Clear Filters
                </FestivalButton>
              </p>
            </div>
          </transition>
          <Space />
        </div>
        <template v-if="$store.state.theme==='festival'">
          <LazyRellaxShape key="shape1" class="top-0 left-1/5 z-0">
            <ShapeOne />
          </LazyRellaxShape>
          <LazyRellaxShape v-show="items&&items.length > 6" key="shape2" class="top-1/3 right-1/4 z-0" :speed="-4">
            <ShapeTwo />
          </LazyRellaxShape>
          <LazyRellaxShape v-show="items&&items.length > 8" key="shape3" class="top-2/3 left-1/4 z-0 w-60" :speed="-4">
            <ShapeThree />
          </LazyRellaxShape>
        </template>
      </div>
    </Container>
    <template v-if="$store.state.theme==='bsf11'&&items&&items.length > 0">
      <LazyRellaxShape key="shapeSquiggle2" class="top-1/2 left-0 z-0">
        <ShapeSquiggle2 />
      </LazyRellaxShape>
      <LazyRellaxShape v-if="$store.state.theme==='bsf11'" key="shapeStarAlt2" class="top-1/3 -mt-64 -ml-64 right-1/4 z-0 w-full max-w-sm" :speed="-4">
        <ShapeStarAlt />
      </LazyRellaxShape>
    </template>
    <template v-if="$store.state.theme==='bsf11'&&items&&items.length > 9">
      <LazyRellaxShape key="shapeSquiggle3" class="bottom-0 mb-64 left-0 max-w-4xl z-0">
        <ShapeSquiggle3 />
      </LazyRellaxShape>
      <LazyRellaxShape key="shapeElipseChain2" class="bottom-1/4 mr-32 right-0 z-0 w-full max-w-xl">
        <ShapeElipseChain2 />
      </LazyRellaxShape>
    </template>
  </section>
</template>

<script>
import layout from '~/mixins/layout'
import livedata from '~/mixins/livedata'
import ShapeOne from '~/assets/festival/shape-1.svg?inline'
import ShapeTwo from '~/assets/festival/shape-2.svg?inline'
import ShapeThree from '~/assets/festival/shape-5.svg?inline'
import ShapeFlower from '~/assets/festival/11/shape-flower.svg?inline'
import ShapeStarAlt from '~/assets/festival/11/shape-star-alt.svg?inline'
import ShapeSquiggle2 from '~/assets/festival/11/shape-squiggle2.svg?inline'
import ShapeSquiggle3 from '~/assets/festival/11/shape-squiggle3.svg?inline'
import ShapeElipseChain2 from '~/assets/festival/11/shape-elipse-chain2.svg?inline'

export default {
  name: 'FestivalFilmGuide',
  components: {
    ShapeOne,
    ShapeTwo,
    ShapeThree,
    ShapeFlower,
    ShapeStarAlt,
    ShapeSquiggle2,
    ShapeSquiggle3,
    ShapeElipseChain2
  },
  mixins: [layout, livedata],
  data () {
    return {
      page: 1,
      totalPages: 1,
      tags: [],
      activeTags: [],
      tagsNavOpen: false,
      filtered: false,
      showMobileFilters: false
    }
  },
  async fetch () {
    const config = this.$axiosConfig.config

    if (this.$store.state.liveData && this.$store.state.liveDataNonce) {
      config.withCredentials = true
      config.headers = { 'X-WP-Nonce': this.$route.query.nonce }
    }

    try {
      this.tags = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/eventive-tag?per_page=99&_year=${this.layout.festival_year}`, this.$axiosConfig.config)
      if (this.tags) {
        this.tags = this.tags.filter((tag) => {
          return !tag.hide_from_film_guide
        })
      }
    } catch (e) {
      // console.log(e)
    }
    if (!this.layout.filter_events && !this.filtered && this.$route.query) {
      if (this.$route.query.tags) {
        this.activeTags = this.$route.query.tags.split(',').map((tag) => {
          return parseInt(tag)
        })
      }
    }

    const endpoint = '/wp-json/wp/v2/festival-film'

    try {
      const query = (this.activeTags.length ? `&eventive-tag=${this.activeTags.join(',')}` : '')
      const response = await this.$axios.get(`${this.$axiosConfig.cmsUrl}${endpoint}?routes=1&_year=${this.layout.festival_year}` + query, this.$axiosConfig.config)
      if (response.status === 200) {
        this.items = this.items.concat(response.data)
        this.totalPages = parseInt(response.headers['x-wp-totalpages'])
        this.rebuildEventive()
      }
    } catch (e) {
      //
    }
  },
  computed: {
    tagsWithEvents () {
      if (this.$store.state.liveData) {
        return this.tags
      }
      return this.tags.filter(tag => tag.count > 0)
    }
  },
  watch: {
    '$route.query' (to) {
      if (to && to.search) {
        this.$nextTick(() => {
          this.items = []
          this.filtered = false
          this.resetFilters()
        })
      }
    }
  },
  methods: {
    query (params) {
      const query = Object.assign({}, this.$route.query, params)
      this.$router.push({ query })
    },
    loadMore () {
      this.page++
      this.$fetch()
    },
    tagIsActive (tag) {
      return this.activeTags.includes(tag.id)
    },
    toggleTag (tag) {
      if (this.$fetchState.pending) {
        return
      }

      if (this.tagIsActive(tag)) {
        this.activeTags = this.activeTags.filter(activeTag => activeTag !== tag.id)
      } else {
        this.activeTags.push(tag.id)
      }

      this.filtered = true
      this.query({
        tags: this.activeTags.join(','),
        all_time: 1,
        search: null
      })

      this.$nextTick(() => {
        if (this.activeTags.length) {
          this.upcoming = false
        } else {
          this.upcoming = true
        }
        this.tagsNavOpen = false
        this.clearOffsetGetFresh()
      })
    },
    clearOffsetGetFresh () {
      this.page = 1
      this.totalPages = 1
      this.items = []
      this.$fetch()
    },
    resetFilters () {
      this.activeTags = []
      this.page = 1
      this.totalPages = 1
      this.upcoming = true
      this.query({
        tags: null
      })
      this.$fetch()
    },
    clearFilters () {
      this.activeTags = []
      this.page = 1
      this.totalPages = 1
      this.query({
        tags: null
      })
      this.$fetch()
    }
  }
}
</script>

<style scoped>
.filter-menu {
  @apply lg:top-full w-full lg:left-0 lg:absolute h-0 overflow-hidden lg:h-auto transform motion-safe:transition-all duration-300 opacity-0 pointer-events-none;
}

.filter-menu--festival {
  @apply bg-white border-5 -mt-border border-b-0 border-navy -translate-y-4;
}

.filter-menu--active {
  @apply translate-y-0 opacity-100 pointer-events-auto h-auto overflow-visible;
}

.filter-menu-item {
  @apply flex items-center justify-start px-6 py-3;
}

.filter-menu--festival .filter-menu-item {
  @apply text-sm md:text-base font-festival_sans_italic border-b-5 border-navy;
}

.filter-menu--bsf11 .filter-menu-item {
  @apply bg-white rounded-xl font-bsf11_sans -mt-border-3 lg:-mt-border-4 border-3 lg:border-4 border-black text-2xl px-4 py-0.5 relative z-20 flex;
}

.filter-menu-item svg {
  @apply block w-4 h-4 mr-2;
}

.filter-menu--festival .filter-menu-item:hover {
  @apply font-festival_sans_light_italic;
}

.filter-menu--festival .filter-menu-item--active {
  @apply text-yellow;
}

.filter-menu--festival .filter-menu-item--active-alt {
  @apply text-blue;
}

.filter-menu--festival .filter-menu-item--active-alt2 {
  @apply text-pink;
}

.filter-menu--bsf11 .filter-menu-item--active-alt2 {
  @apply bg-lightGray;
}

.filter-menu--bsf11.filter-menu--dates .filter-menu-item--active {
  @apply bg-bsf11Teal;
}

.filter-menu--bsf11.filter-menu--venues .filter-menu-item--active,
.filter-menu--bsf11.filter-menu--venues .filter-menu-item--active-alt {
  @apply bg-bsf11Yellow;
}

.filter-tag {
  @apply inline-block;
}

.filter-tag--festival {
  @apply px-5 py-2 text-sm  border-5 border-navy -ml-border -mt-border bg-white;
}

.filter-tag--festival:hover {
  @apply font-festival_sans_italic;
}

.filter-tag--festival.filter-tag--active {
  @apply bg-yellow;
}

.filter-tag--bsf11 {
  @apply relative mr-4 mb-4;
}

.filter-tag--bsf11 > span {
  @apply bg-white rounded-xl font-bsf11_sans border-3 lg:border-4 border-black text-2xl px-4 py-0.5 relative z-20 block;
}

.filter-tag--bsf11.filter-tag--active > span {
  @apply bg-bsf11Teal;
}

.filter-tag--bsf11::before,
.filter-tag--bsf11::after {
  @apply absolute top-0 left-0 transform translate-x-0 translate-y-0 transition-transform duration-100 block rounded-xl border-3 lg:border-4 border-black w-full h-full z-0;

  content: " ";
}

.filter-tag--bsf11::before {
  @apply bg-bsf11Yellow z-10;
}

.filter-tag--bsf11::after {
  @apply bg-bsf11Teal;
}

.filter-tag--active::before {
  @apply bg-bsf11Teal;
}

.filter-tag--bsf11:hover::before,
.filter-tag--bsf11.filter-tag--active::before {
  @apply translate-y-1.5 translate-x-1.5;
}

.filter-tag--bsf11:hover::after,
.filter-tag--bsf11.filter-tag--active::after {
  @apply translate-y-3 translate-x-3 delay-75;
}

.filter-nav-button {
  @apply relative w-full z-20 flex justify-between items-center;
}

.filter-nav-button--festival {
  @apply lg:text-lg px-5 py-2 lg:px-6 lg:py-4 font-festival_sans_italic border-5 border-navy text-left -mt-border lg:mt-0;
}

.filter-nav-button--bsf11 {
  @apply bg-white rounded-xl font-bsf11_sans border-3 lg:border-4 border-black text-2xl px-4 pr-2 py-0.5 relative z-20 flex;
}

.filter-nav-button--venues {
  @apply bg-bsf11Yellow;
}

.filter-nav-button--dates {
  @apply bg-bsf11Teal;
}

.filter-nav-button span:not(.filter-nav-button__toggle) {
  @apply mr-2;
}

.filter-nav-button__text {
  @apply overflow-ellipsis whitespace-nowrap overflow-hidden w-48 mr-2;
}

.filter-nav-button--bsf11 .filter-nav-button__text {
  @apply text-left;
}

.filter-nav-button__toggle {
  @apply block w-6 h-6 motion-safe:transition-transform flex-shrink-0;
}

.filter-nav-button--bsf11 .filter-nav-button__toggle {
  @apply text-2xl relative font-bold font-sans leading-none;
}

.filter-nav-button--bsf11 .filter-nav-button__toggle::before {
  content: "+";

  @apply block leading-none my-auto;
}

.filter-nav-button--active .filter-nav-button__toggle {
  @apply transform -rotate-45;
}
</style>
