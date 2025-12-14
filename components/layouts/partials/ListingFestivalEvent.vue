<template>
  <article class="festival-event" :class="`festival-event--${$store.state.theme}`" itemscope :itemtype="itemScope">
    <div class="festival-event__inside">
      <RawLink v-cursor-hint="'View'" :to="`/festival/events/${post.slug}`">
        <span
          v-if="featuredImage"
          class="aspect-cover-img"
          v-html="(carousel ? featuredImageCarousel : featuredImage)"
        />
        <span v-if="!featuredImage" class="aspect-cover-img"><img
          v-if="$store.state.theme==='festival'"
          src="~/assets/festival/default-image.png"
          alt=""
        ><img
          v-if="$store.state.theme==='bsf11'"
          src="~/assets/festival/11/default-image.png"
          alt=""
        ></span>
        <span v-if="post.stickers&&post.stickers.length" class="festival-event__badge"><ShapeBadge
          v-if="$store.state.theme==='bsf11'"
        /><span>{{ post.stickers[0].name }}</span></span>
        <span class="sr-only">View {{ title }}</span>
      </RawLink>
      <header>
        <div class="flex w-full justify-between items-center mb-2">
          <span v-if="post.tags" class="display flex flex-wrap space-x-2">
            <span
              v-for="tag in post.tags"
              :key="`event${post.slug}tag${tag.term_id}`"
              class="tag"
            >
              {{ tag.name }}
            </span>
          </span>

          <SiteLink
            v-if="post.venue&&$store.state.theme==='bsf11'"
            :to="`/festival/venues/${post.venue.slug}`"
            :click-handler="(filterByVenue ? handleFilterByVenue : null)"
            class="venue"
            itemprop="location"
            itemscope
            itemtype="https://schema.org/Place"
          >
            <img
              v-if="post.venue.virtual"
              src="~/assets/icon-virtual.svg"
              alt="Virtual event"
              width="30"
              height="24"
            ><img
              v-if="!post.venue.virtual"
              src="~/assets/icon-location.svg"
              width="22"
              height="28"
              alt="In-person event"
            ><span itemprop="name" v-html="post.venue.name" />
          </SiteLink>
        </div>
        <h1
          class="mb-1"
          :class="{'secondary-heading': $store.state.theme==='festival'}"
          itemprop="name"
          v-html="title"
        />
        <h2 v-if="post.acf.subtitle" v-html="post.acf.subtitle" />
        <time v-if="!screening||showTime" itemprop="startDate" :content="post.acf.start_time|formatMicroDate">
          {{ post.acf.start_time|formatDate }} {{ post.acf.timezone_abv }}
        </time>
        <time v-if="screening">
          {{ screeningTime }}
        </time>
        <SiteLink
          v-if="post.venue&&$store.state.theme==='festival'"
          :to="`/festival/venues/${post.venue.slug}`"
          class="venue"
          itemprop="location"
          itemscope
          itemtype="https://schema.org/Place"
        >
          <img v-if="post.venue.virtual" src="~/assets/icon-virtual.svg" alt="Virtual event" width="30" height="24"><img
            v-if="!post.venue.virtual"
            src="~/assets/icon-location.svg"
            width="22"
            height="28"
            alt="In-person event"
          ><span itemprop="name" v-html="post.venue.name" />
        </SiteLink>
      </header>
      <ClientOnly>
        <FestivalAddToCalendarButton
          v-if="!screening&&$store.state.theme==='bsf11'"
          :title="title"
          :details="excerpt"
          :location="(post.venue ? post.venue.address : title) + (post.acf.external_tickets_url ? ` - ${post.acf.external_tickets_url}` : '')"
          :start-time="post.acf.start_time"
          :end-time="(post.acf.end_time ? post.acf.end_time : null)"
          :time-zone="post.acf.timezone"
        />
      </ClientOnly>
    </div>

    <div class="festival-event__inside__content">
      <span itemprop="description" v-html="excerpt" />
    </div>
    <footer class="flex flex-wrap mt-6 swiper-no-swiping">
      <FestivalButton class="mb-2 mr-2" :to="`/festival/events/${post.slug}`">
        Read More
      </FestivalButton>
      <LazyFestivalBuyButton v-if="!screening" class="mb-2 mr-2" :post="post" />
      <LazyFestivalWatchLiveButton v-if="post.acf.live_stream&&post.acf.facebook_livestream_url" class="mb-2 mr-2" :post="post" />
    </footer>
  </article>
</template>

<script>
import eventiveOverrides from '~/mixins/eventiveOverrides'
import ShapeBadge from '~/assets/festival/11/badge.svg?inline'

export default {
  name: 'ListingFestivalEvent',
  components: { ShapeBadge },
  mixins: [eventiveOverrides],
  props: {
    post: {
      type: Object,
      required: true
    },
    screeningTime: {
      type: String,
      required: false,
      default: null
    },
    screening: {
      type: Boolean,
      required: false,
      default: false
    },
    showTime: {
      type: Boolean,
      required: false,
      default: false
    },
    carousel: {
      type: Boolean,
      required: false,
      default: false
    },
    filterByTag: {
      type: Function,
      required: false,
      default: null
    },
    filterByVenue: {
      type: Function,
      required: false,
      default: null
    }
  },
  methods: {
    handleFilterByVenue () {
      this.filterByVenue(this.post.venue)
    }
  }
}
</script>

<style>
@import "~/assets/css/components/festival-event.css";
</style>
