<template>
  <div class="overflow-hidden">
    <Container>
      <Space :md="true" />
      <div class="flex justify-between items-center">
        <template v-if="!showSeasonFilters">
          <h2
            v-if="!layout.link&&layout.title"
            class="sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl font-medium"
            v-html="layout.title"
          />
          <CircleButton v-if="layout.link" :to="layout.link.url|replaceSiteUrl" :color-scheme="layout.colour">
            <span
              v-html="layout.title"
            />
          </CircleButton>
          <span v-if="!layout.link&&!layout.title">&nbsp;</span>
        </template>
        <template v-if="showSeasonFilters">
          <div class="flex space-x-10">
            <CircleButton
              v-for="season in seasons"
              :key="`seasonFilter${season.id}`"
              :to="`/manylumens/${season.slug}`"
              :class="(activeSeason !== season.id ? `opacity-30` : '')"
              :color-scheme="layout.colour"
              :click-handler="() => {setActiveSeason(season.id)}"
            >
              <span
                v-html="season.name"
              />
            </CircleButton>
          </div>
        </template>
        <div class="disabled-gray">
          <button :id="`previous-${uniqueId}`" ref="prevArrow">
            <PrevArrow />
          </button>
          <button :id="`next-${uniqueId}`" ref="nextArrow">
            <NextArrow />
          </button>
        </div>
      </div>
      <Space :sm="true" />
      <template v-if="layout.type !== 'custom' && layout.type !== 'manual'">
        <ClientOnly v-if="items&&items.length">
          <PostsCarousel :arrow-next="`#next-${uniqueId}`" :arrow-previous="`#previous-${uniqueId}`">
            <swiper-slide v-for="item in items" :key="`item${(item.id ? item.id : item.ID)}`">
              <ListingArticleEvent v-if="item.type==='program-event'" :post="item" :color-scheme="layout.colour" />
              <ListingLumenEpisode v-if="item.type==='lumen-episode'" :post="item" :color-scheme="layout.colour" />
              <ListingPost v-if="item.type!=='program-event'&&item.type!=='lumen-episode'" :post="item" :color-scheme="layout.colour" />
            </swiper-slide>
          </PostsCarousel>
        </ClientOnly>
      </template>
      <template v-if="layout.type === 'manual'">
        <PostsCarousel :arrow-next="`#next-${uniqueId}`" :arrow-previous="`#previous-${uniqueId}`">
          <swiper-slide v-for="item in layout.posts" :key="`itemPost${(item.id ? item.id : item.ID)}`">
            <ListingArticleEvent v-if="item.type==='program-event'" :post="item" :color-scheme="layout.colour" />
            <ListingLumenEpisode v-if="item.type==='lumen-episode'" :post="item" :color-scheme="layout.colour" />
            <ListingPost v-if="item.type!=='program-event'&&item.type!=='lumen-episode'" :post="item" :color-scheme="layout.colour" />
          </swiper-slide>
        </PostsCarousel>
      </template>
      <template v-if="layout.type === 'custom'">
        <PostsCarousel :arrow-next="`#next-${uniqueId}`" :arrow-previous="`#previous-${uniqueId}`">
          <swiper-slide v-for="(customItem, customItemKey) in layout.custom_posts" :key="`itemCustomPost${customItemKey}`">
            <ListingCustom :custom-item="customItem" :colour-scheme="layout.colour" />
          </swiper-slide>
        </PostsCarousel>
      </template>
      <Space :lg="true" />
    </Container>
  </div>
</template>

<script>
import layout from '~/mixins/layout'
import livedata from '~/mixins/livedata'

export default {
  name: 'FlexiblePostsCarousel',
  mixins: [layout, livedata],
  data () {
    return {
      seasons: [],
      activeSeason: null
    }
  },
  async fetch () {
    if (this.layout.type !== 'custom' && this.layout.type !== 'manual') {
      let filter = ''
      if (this.layout.type === 'program-event' && this.layout.program_event_type) {
        filter = `&program-type=${this.layout.program_event_type}`
      }
      if (this.layout.type === 'post' && this.layout.post_category) {
        filter = `&categories=${this.layout.post_category}`
      }
      if (this.layout.type === 'lumen-episode') {
        this.seasons = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/lumen-season?routes=1`)
        if (this.layout.season) {
          this.activeSeason = this.layout.season
        } else if (!this.activeSeason) {
          this.activeSeason = this.seasons[0].id
        }
      }
      if (this.layout.type === 'lumen-episode' && this.activeSeason) {
        filter = `&lumen-season=${this.activeSeason}`
      }
      this.items = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/${this.layout.type}?per_page=16&parent=0${filter}`)
    }
  },
  computed: {
    showSeasonFilters () {
      if (this.layout.type !== 'lumen-episode') {
        return false
      }

      if (this.layout.season) {
        return false
      }

      return true
    },
    uniqueId () {
      return this._uid
    }
  },
  methods: {
    setActiveSeason (season) {
      if (this.$fetchState.pending) {
        return
      }

      this.activeSeason = season
      this.$fetch()
    }
  }
}
</script>

<style scoped>

</style>
