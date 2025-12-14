<template>
  <ClientOnly>
    <section class="bg-black relative overflow-hidden">
      <Container class="relative">
        <div
          class=""
        >
          <MqLayout :mq="['sm']">
            <div class="disabled-gray text-white flex justify-end space-x-6">
              <button :id="`team-previous-${uniqueId}`" ref="teamPrevArrow">
                <PrevArrow />
              </button>
              <button :id="`team-next-${uniqueId}`" ref="teamNextArrow">
                <NextArrow />
              </button>
            </div>
            <PostsCarousel :arrow-next="`#team-next-${uniqueId}`" :arrow-previous="`#team-previous-${uniqueId}`" :after-swipe-callback="maybeLoadMore" :trigger-update="triggerUpdate">
              <swiper-slide v-for="bio in bios" :key="`teamMemberSlider${bio.id}`">
                <TeamMember
                  class="px-6"
                  :team-member="bio"
                  :click-handler="$route.fullPath.includes('/events') ? setActiveBio : null"
                  :event-id="(post&&post.type==='program-event' ? post.id : null)"
                />
              </swiper-slide>
            </PostsCarousel>
            <Space />
          </MqLayout>
          <MqLayout mq="md+">
            <div class="p-6" :style="(teamMember ? `height: ${height}px` : '')">
              <div class="flex flex-wrap relative -px-6">
                <TeamMember
                  v-for="bio in bios"
                  :key="`teamMember${bio.id}`"
                  class="w-1/2 lg:w-1/3 xl:w-1/4 px-6 relative z-10"
                  :team-member="bio"
                  :click-handler="setActiveBio"
                  :event-id="(post&&post.type==='program-event' ? post.id : null)"
                />
              </div>
              <Space :md="true" />
              <div v-if="items.length && page < totalPages" class="text-center flex justify-center">
                <PillButton
                  to="#"
                  :click-handler="loadMore"
                  color-scheme="white"
                  :force-scheme="true"
                >
                  Load More
                </PillButton>
                <Space :md="true" />
              </div>
            </div>
          </MqLayout>
        </div>
      </Container>
      <transition name="fade-in-down">
        <TeamMemberExpanded
          v-if="teamMember"
          :team-member="teamMember"
          :team-member-index="teamMemberIndex"
          :previous-bio="previousBio"
          :next-bio="nextBio"
          :set-active-bio="setActiveBio"
          :close-bio="closeBio"
          :set-height="setHeight"
          :event-id="(post&&post.type==='program-event' ? post.id : null)"
        />
      </transition>
      <Space :lg="true" />
    </section>
  </ClientOnly>
</template>

<script>
import layout from '~/mixins/layout'
import livedata from '~/mixins/livedata'
import bios from '~/mixins/bios'

export default {
  name: 'TeamListings',
  mixins: [layout, livedata, bios],
  props: {
    post: {
      type: Object,
      required: false,
      default: null
    }
  },
  data () {
    return {
      page: 1,
      totalPages: null,
      triggerUpdate: 0,
      postsPerPage: 20
    }
  },
  async fetch () {
    try {
      const response = await this.$axios.get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/biography?per_page=${this.postsPerPage}&page=${this.page}&order=asc&orderby=menu_order&collection=${this.layout.collection.slug}`)
      this.items = this.items.concat(response.data)
      this.totalPages = parseInt(response.headers['x-wp-totalpages'])

      this.$nextTick(() => {
        this.triggerUpdate++
      })
    } catch (e) {
    }
  },
  computed: {
    uniqueId () {
      return this._uid
    }
  },
  methods: {
    loadMore () {
      this.page++
      this.$fetch()
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
</style>
