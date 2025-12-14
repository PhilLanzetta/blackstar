<template>
  <ClientOnly>
    <section>
      <Container class="relative z-20">
        <div v-if="$store.state.theme==='festival'" class="hidden sm:flex mb-6 lg:mb-0">
          <button
            v-for="(type, typeIndex) in layout.types"
            :key="`type${type.term_id}`"
            v-cursor-interact
            class="block font-festival_sans text-2xl w-full max-w-sm border-5 font-normal border-lime lg:border-b-0 px-10 py-7 pr-14 focus:outline-none"
            :class="[(activeType.term_id === type.term_id ? 'bg-pink' : ''), ((typeIndex+1) < layout.types.length ? ' border-r-0 ' : '')]"
            role="switch"
            :aria-checked="(activeType && activeType.term_id === type.term_id).toString()"
            @click.prevent="setActiveType(type)"
          >
            <span>{{ type.name }}</span>
          </button>
        </div>
        <div v-if="$store.state.theme==='bsf11'" class="hidden sm:flex mb-8 space-x-6">
          <FestivalButton
            v-for="type in layout.types"
            :key="`type${type.term_id}`"
            :click-handler="() => { setActiveType(type) }"
            :active="(activeType && activeType.term_id === type.term_id)"
            to="#"
          >
            <span>{{ type.name }}</span>
          </FestivalButton>
        </div>
        <div
          class="relative -mx-4 sm:-mx-8 md:-mx-0"
          :class="{'team-members-with-bg': activeType.layout==='with_photo'&&$store.state.theme==='festival', 'md:border-5 border-lime bg-navy overflow-hidden': $store.state.theme==='festival'}"
        >
          <div v-if="activeType.show_filters&&filters&&filters.length" class="hidden md:flex justify-start">
            <div v-if="$store.state.theme==='festival'" class="flex border-b-5 border-lime">
              <button
                v-for="filter in filters"
                :key="`filter${filter.id}`"
                v-cursor-interact
                class="block font-festival_sans_light_italic text-lg max-w-sm border-r-5  border-lime px-10 py-4 focus:outline-none"
                :class="(activeFilter&&activeFilter.id === filter.id ? 'bg-lime text-navy' : 'bg-navy text-white')"
                role="switch"
                :aria-checked="((activeFilter&&activeFilter.id) === filter.id).toString()"
                @click.prevent="setActiveFilter(filter)"
              >
                <span>{{ filter.name }}</span>
              </button>
            </div>
            <div v-if="$store.state.theme==='bsf11'" class="flex space-x-4">
              <FestivalButton
                v-for="filter in filters"
                :key="`filter${filter.id}`"
                :click-handler="() => { setActiveFilter(filter) }"
                :alt="((activeFilter&&activeFilter.id) === filter.id)"
                :alt2="!((activeFilter&&activeFilter.id) === filter.id)"
                to="#"
              >
                <span>{{ filter.name }}</span>
              </FestivalButton>
            </div>
          </div>
          <MqLayout :mq="['sm']">
            <Container>
              <Space />
              <div v-if="$store.state.theme==='bsf11'" class="flex justify-between">
                <div class="flex flex-wrap">
                  <div
                    v-for="type in layout.types"
                    :key="`type${type.term_id}`"
                    class="mb-4 mr-4"
                  >
                    <FestivalButton
                      :click-handler="() => { setActiveType(type) }"
                      :active="(activeType && activeType.term_id === type.term_id)"
                      to="#"
                    >
                      <span>{{ type.name }}</span>
                    </FestivalButton>
                  </div>
                </div>
                <div class="flex text-bsf11Teal mb-4 2xl:mb-8">
                  <button :id="`previous-${uniqueId}`" ref="arrowPostsPrev">
                    <FestivalPrevArrow />
                  </button>
                  <button :id="`next-${uniqueId}`" ref="arrowPostsNext">
                    <FestivalNextArrow />
                  </button>
                </div>
              </div>
              <template v-if="$store.state.theme==='festival'">
                <button
                  v-for="(type, typeIndex) in layout.types"
                  :key="`typeMobile${type.term_id}`"
                  v-cursor-interact
                  class="block font-festival_sans text-lg w-full max-w-sm border-5 font-normal border-lime  px-5 py-2 focus:outline-none"
                  :class="[(activeType.term_id === type.term_id ? 'bg-navy text-white' : 'bg-white text-navy'), ((typeIndex+1) < layout.types.length ? ' -mt-border ' : '')]"
                  role="switch"
                  :aria-checked="(activeType&&activeType.term_id === type.term_id).toString()"
                  @click.prevent="setActiveType(type)"
                >
                  <span>{{ type.name }}</span>
                </button>
              </template>
            </Container>
            <div class="overflow-hidden">
              <PostsCarousel :after-swipe-callback="maybeLoadMore" :trigger-update="triggerUpdate"  :arrow-next="`#next-${uniqueId}`" :arrow-previous="`#previous-${uniqueId}`">
                <swiper-slide v-for="(bio, key) in bios" :key="`teamMemberSlider${bio.id}`">
                  <FestivalTeamMember
                    class="px-6"
                    :index="key"
                    :team-member="bio"
                    :alt="(key%2===1)"
                    :show-photo="activeType.layout==='with_photo'"
                    :click-handler="(bio.content.rendered&&activeType.show_bios ? () => { setActiveBio(bio) } : null)"
                  />
                </swiper-slide>
              </PostsCarousel>
            </div>
            <transition name="fade-in-down">
              <FestivalTeamMemberExpanded
                v-if="teamMember&&$store.state.theme==='bsf11'"
                :team-member="teamMember"
                :team-member-index="teamMemberIndex"
                :previous-bio="previousBio"
                :next-bio="nextBio"
                :set-active-bio="setActiveBio"
                :close-bio="closeBio"
                :set-height="null"
                :alt-style="true"
              />
            </transition>
            <Space />
          </MqLayout>
          <MqLayout mq="md+">
            <div class="p-6" :style="(teamMember ? `height: ${height}px` : '')">
              <div class="flex flex-wrap relative -px-6">
                <div
                  v-for="(bio, key) in bios"
                  :key="`teamMember${bio.id}`"
                  class="w-1/2 lg:w-1/3 2xl:w-1/4 px-6"
                  :class="{'relative z-10': $store.state.theme==='festival'}"
                >
                  <FestivalTeamMember
                    :index="key"
                    :team-member="bio"
                    :alt="(key%2===1)"
                    :show-photo="activeType.layout==='with_photo'"
                    :click-handler="(bio.content.rendered&&activeType.show_bios ? () => { setActiveBio(bio) } : null)"
                    :active="teamMember&&teamMember.id===bio.id"
                  />
                  <transition name="fade-in-down">
                    <FestivalTeamMemberExpanded
                      v-if="teamMember&&teamMember.id===bio.id&&$store.state.theme==='bsf11'"
                      :team-member="teamMember"
                      :team-member-index="teamMemberIndex"
                      :previous-bio="previousBio"
                      :next-bio="nextBio"
                      :set-active-bio="setActiveBio"
                      :close-bio="closeBio"
                      :set-height="null"
                      :alt-style="true"
                    />
                  </transition>
                </div>
                <LazyRellaxShape v-if="$store.state.theme==='festival'" key="shape7" class="-top-10 left-1/4 z-0 w-60">
                  <ShapeSeven />
                </LazyRellaxShape>
              </div>
              <Space :md="true" />
              <div v-if="items.length && page < totalPages" class="text-center">
                <FestivalButton to="#" :alt="true" :click-handler="loadMore">
                  Load More
                </FestivalButton>
                <Space :md="true" />
              </div>
            </div>
          </MqLayout>
          <transition name="fade-in-down">
            <FestivalTeamMemberExpanded
              v-if="teamMember&&$store.state.theme==='festival'"
              :team-member="teamMember"
              :team-member-index="teamMemberIndex"
              :previous-bio="previousBio"
              :next-bio="nextBio"
              :set-active-bio="setActiveBio"
              :close-bio="closeBio"
              :set-height="setHeight"
              :alt-style="true"
            />
          </transition>
        </div>
        <LazyRellaxShape v-if="$store.state.theme==='festival'" key="shape8" class="hidden lg:block bottom-1/3 right-1/4 z-10 w-60">
          <ShapeEight />
        </LazyRellaxShape>
      </Container>
    </section>
  </ClientOnly>
</template>

<script>
import layout from '~/mixins/layout'
import livedata from '~/mixins/livedata'
import ShapeSeven from '~/assets/festival/shape-7.svg?inline'
import ShapeEight from '~/assets/festival/shape-8.svg?inline'
import bios from '~/mixins/bios'

export default {
  name: 'FestivalTeamListings',
  components: {
    ShapeSeven,
    ShapeEight
  },
  mixins: [layout, livedata, bios],
  data () {
    return {
      activeType: this.layout.types[0],
      page: 1,
      totalPages: null,
      filters: null,
      activeFilter: null,
      triggerUpdate: 0
    }
  },
  async fetch () {
    try {
      const response = await this.$axios.get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/biography?per_page=${this.postsPerPage}&page=${this.page}&order=asc&orderby=menu_order&collection=festival&festival-team-type=${this.activeType.term_id}` + (this.activeFilter ? `&festival-team-filter=${this.activeFilter.id}` : ''))
      this.items = this.items.concat(response.data)
      this.totalPages = parseInt(response.headers['x-wp-totalpages'])

      if (this.activeType.show_filters && !this.filters) {
        this.filters = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/festival-team-filter`)
      }

      this.$nextTick(() => {
        this.triggerUpdate++
      })
    } catch (e) {
    }
  },
  computed: {
    postsPerPage () {
      if (this.activeType.layout === 'with_photo') {
        return 8
      }

      return 20
    }
  },
  watch: {
    'activeType.term_id' () {
      this.items = []
      this.page = 1
      this.activeFilter = null
      this.$nextTick(() => {
        this.$fetch()
      })
    },
    'activeFilter.id' () {
      this.items = []
      this.page = 1
      this.$nextTick(() => {
        this.$fetch()
      })
    }
  },
  methods: {
    loadMore () {
      this.page++
      this.$fetch()
    },
    setActiveFilter (filter) {
      this.closeBio()
      this.activeFilter && this.activeFilter.id === filter.id ? this.activeFilter = null : this.activeFilter = filter
    },
    setActiveType (type) {
      this.closeBio()
      this.activeType = type
    },
    maybeLoadMore (slider) {
      if (this.page >= this.totalPages) {
        return
      }

      if ((slider.activeIndex + 1) >= this.bios.length) {
        this.loadMore()
      }
    }
  }
}
</script>

<style scoped>
.team-members-with-bg {
  background-image: url("~/assets/festival/pink-transparent-bg.png");
  @apply bg-repeat bg-fixed bg-center;
  background-size: 158px 1255px;
}
</style>
