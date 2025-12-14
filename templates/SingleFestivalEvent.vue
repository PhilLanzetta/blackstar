<template>
  <article
    class="single-festival-event"
    :class="`single-festival-event--${$store.state.theme}`"
    itemscope
    :itemtype="itemScope"
  >
    <div class="overflow-hidden">
      <header class="single-festival-event__header">
        <div class="single-festival-event__header__inside">
          <Container class="single-festival-event__header__inside__wrap">
            <LazyRellaxShape
              v-if="$store.state.theme==='bsf11'"
              key="shapeFlower"
              class="block top-0 right-0 z-0 w-full max-w-xs"
            >
              <ShapeFlower />
            </LazyRellaxShape>
            <LazyRellaxShape
              v-if="$store.state.theme==='bsf11'"
              key="shapeStarAlt"
              class="block -top-64 right-1/2 z-0 w-full max-w-sm"
            >
              <ShapeStarAlt />
            </LazyRellaxShape>
            <div>
              <template v-if="$store.state.theme==='festival'">
                <FestivalHeading v-if="post.tags" :reduced="true" width-class="w-auto">
                  <span class="flex flex-wrap"><SiteLink
                    v-for="tag in post.tags"
                    :key="`event${post.slug}tag${tag.term_id}`"
                    :to="`/festival-2021/schedule/?tags=${tag.slug}`"
                    class="single-festival-event__tag"
                  >
                    {{ tag.name }}
                  </SiteLink></span>
                </FestivalHeading>
              </template>
              <div class="single-festival-event__title">
                <template v-if="post.tags&&$store.state.theme==='bsf11'">
                  <span class="flex flex-wrap"><SiteLink
                    v-for="tag in post.tags"
                    :key="`event${post.slug}tag${tag.term_id}`"
                    :to="`/festival-2022/schedule/?tags=${tag.slug}`"
                    class="single-festival-event__tag"
                  >
                    {{ tag.name }}
                  </SiteLink></span>
                </template>
                <h1
                  itemprop="name"
                  v-html="title"
                />
              </div>
            </div>
          </Container>
        </div>
        <template v-if="$store.state.theme==='festival'">
          <SingleFestivalEventMedia :post="post" />
        </template>
        <template v-if="$store.state.theme==='bsf11'">
          <Container>
            <template v-if="layout!=='default'">
              <div class="relative z-20">
                <FestivalProse :alt="true">
                  <span v-html="content" />
                </FestivalProse>
              </div>
              <Space :lg="true" />
            </template>
            <SingleFestivalEventMedia :post="post" />
          </Container>
        </template>
      </header>
    </div>
    <div v-if="canBuyTickets" ref="buyButton" class="sticky-cta">
      <FestivalStickyCta
        :line1="(post.acf.sticky_call_to_action ? post.acf.sticky_call_to_action : 'Save your spot')"
        :line2="buyButtonLabel"
        link="#"
        :click-handler="maybeOpenEventive"
        style-name="red"
      />
      <div
        class="eventive-button sr-only"
        :data-event="post.acf.eventive_id"
      />
    </div>
    <div class="overflow-hidden">
      <Space v-if="layout==='default'||$store.state.theme==='bsf11'" :lg="true" />

      <template v-if="$store.state.theme==='festival'">
        <Container>
          <div class="lg:flex items-start text-navy relative z-20" :class="{'-mt-border': layout!=='default'}">
            <FestivalHeading :reduced="true" background-class="bg-yellow" width-class="max-w-full w-full lg:w-80">
              <time
                class="text-base md:text-lg font-festival_sans_italic"
                itemprop="startDate"
                :content="post.acf.start_time|formatMicroDate"
              >{{ post.acf.start_time|formatDate }} {{ post.acf.timezone_abv }}
              </time>
            </FestivalHeading>
            <FestivalHeading
              :reduced="true"
              background-class="bg-blue text-white border-t-0 lg:border-t-5 lg:-ml-border"
              width-class="w-full max-w-full lg:w-80"
            >
              <span class="text-base md:text-lg font-festival_sans_italic"><span
                v-if="post.acf.virtual_event"
                v-html="virtualScreeningLabel"
              /><span v-if="!post.acf.virtual_event" v-html="inPersonScreeningLabel" /></span>
            </FestivalHeading>
            <LazyFestivalBuyButton :action-heading="true" :post="post" />
            <LazyFestivalWatchLiveButton :post="post" />
          </div>
          <div
            class="single-festival-event__content relative z-10"
            :class="`single-festival-event__content--${layout}`"
          >
            <LazyRellaxShape v-if="$store.state.theme==='festival'" key="shape9" class="-top-40 right-5 z-10 w-60">
              <ShapeNine />
            </LazyRellaxShape>
            <template v-if="post.acf.multiple_showings && post.acf.duplicate_events">
              <div
                v-for="duplicateEvent in post.acf.duplicate_events"
                :key="`duplicateEvent${duplicateEvent}`"
                itemscope
                itemtype="https://schema.org/subEvent"
                class="lg:flex items-start text-navy relative z-20"
                :class="{'-ml-border -mr-border -mt-border': layout==='default', '-mt-border': layout!=='default'}"
              >
                <FestivalHeading
                  class="hidden lg:flex"
                  :reduced="true"
                  background-class="bg-yellow"
                  width-class="max-w-full w-full lg:w-80 max-w-none"
                >
                  <time
                    class="text-lg font-festival_sans_italic"
                    itemprop="startDate"
                    :content="duplicateEvent.acf.start_time|formatMicroDate"
                  >{{ duplicateEvent.acf.start_time|formatDate }} {{ duplicateEvent.acf.timezone_abv }}
                  </time>
                </FestivalHeading>
                <span class="block lg:-ml-border">
                  <FestivalActionHeading
                    :to="`/festival/events/${duplicateEvent.post_name}`"
                    background-class="bg-blue text-white"
                    width-class="max-w-full w-full lg:w-80"
                  >
                    <span class="text-base md:text-lg font-festival_sans_italic"><span
                      v-if="duplicateEvent.acf.virtual_event"
                      v-html="virtualScreeningLabel"
                    /><span v-if="!duplicateEvent.acf.virtual_event" v-html="inPersonScreeningLabel" /></span>
                  </FestivalActionHeading>
                </span>
                <LazyFestivalBuyButton class="hidden lg:flex" :action-heading="true" :post="duplicateEvent" />
                <FestivalWatchLiveButton class="hidden lg:flex" :post="duplicateEvent" />
              </div>
            </template>
            <FestivalEventWarnings v-if="layout!=='default'" :post="post" :layout="layout" />
            <Space v-if="layout!=='default'" :md="true" />

            <!--        <CursorHint v-if="hasReadMoreContent" :hint="(readMoreExpanded ? 'Read Less' : 'Read More')">
            <button class="absolute top-0 left-0 w-full h-full z-10" aria-controls="read-more-content" :aria-expanded="readMoreExpanded" @click.prevent="readMoreExpanded=!readMoreExpanded">
              <span v-if="readMoreExpanded" class="sr-only">Read Less</span>
              <span v-if="!readMoreExpanded" class="sr-only">Read More</span>
            </button>
          </CursorHint>-->
            <div class="single-festival-event__content__inside relative z-1" itemprop="description">
              <FestivalProse :alt="true">
                <span v-html="content" />
                <transition name="fade-in-up">
                  <div v-if="hasReadMoreContent" class="single-festival-event__content__more">
                    <Space />
                    <div v-if="film" class="single-festival-event__content__films">
                      <FestivalEventFilmDetails :film="film" />
                    </div>
                    <Space v-if="post.acf.additional_read_more_content" />
                    <div
                      v-if="post.acf.additional_read_more_content"
                      class="text-2xl"
                      v-html="post.acf.additional_read_more_content"
                    />
                  </div>
                </transition>
              </FestivalProse>
            </div>
            <Space v-if="layout!=='default'" :md="true" />

            <FestivalEventWarnings v-if="layout==='default'" :post="post" :layout="layout" />
          </div>
        </Container>
      </template>
      <template v-if="$store.state.theme==='bsf11'">
        <div class="relative">
          <Container>
            <div
              :class="{'md:flex md:space-x-10 justify-between items-stretch': post.acf.multiple_showings && post.acf.duplicate_events && post.acf.duplicate_events.length}"
            >
              <div class="single-festival-event__card">
                <div
                  class="single-festival-event__card__type"
                  :class="{'single-festival-event__card__type--virtual': post.acf.is_virtual}"
                >
                  <h3>
                    <span v-if="post.acf.is_virtual" v-html="virtualScreeningLabel" /><span
                      v-if="!post.acf.is_virtual"
                      v-html="inPersonScreeningLabel"
                    />
                  </h3>
                  <SiteLink
                    v-if="post.venue&&!post.acf.is_virtual"
                    :to="`/festival/venues/${post.venue.slug}`"
                    class="venue"
                    itemprop="location"
                    itemscope
                    itemtype="https://schema.org/Place"
                  >
                    <img
                      src="~/assets/icon-location.svg"
                      width="22"
                      height="28"
                      alt="In-person event"
                    ><span itemprop="name" v-html="post.venue.name" />
                  </SiteLink>
                </div>
                <div class="single-festival-event__card__details">
                  <time itemprop="startDate" :content="post.acf.start_time|formatMicroDate">
                    {{ post.acf.start_time|formatDate }} {{ post.acf.timezone_abv }}
                  </time>
                  <div class="single-festival-event__card__details__actions">
                    <LazyFestivalBuyButton class="mr-2 my-2" :post="post" />
                    <LazyFestivalWatchLiveButton class="mr-2 my-2" :post="post" />
                    <ClientOnly>
                      <FestivalAddToCalendarButton
                        class="mr-2 my-2"
                        :title="title"
                        :details="excerpt"
                        :location="(post.venue ? post.venue.address : title) + (post.acf.external_tickets_url ? ` - ${post.acf.external_tickets_url}` : '')"
                        :start-time="post.acf.start_time"
                        :end-time="(post.acf.end_time ? post.acf.end_time : null)"
                        :time-zone="post.acf.timezone"
                        :button="true"
                      />
                    </ClientOnly>
                  </div>
                </div>
              </div>

              <div
                v-for="duplicateEvent in post.acf.duplicate_events"
                :key="`duplicateEvent${duplicateEvent}`"
                itemscope
                itemtype="https://schema.org/subEvent"
                class="single-festival-event__card"
              >
                <div
                  class="single-festival-event__card__type"
                  :class="{'single-festival-event__card__type--virtual': duplicateEvent.acf.is_virtual}"
                >
                  <h3>
                    <span v-if="duplicateEvent.acf.is_virtual" v-html="virtualScreeningLabel" /><span
                      v-if="!duplicateEvent.acf.is_virtual"
                      v-html="inPersonScreeningLabel"
                    />
                  </h3>
                  <SiteLink
                    v-if="duplicateEvent.venue&&!duplicateEvent.acf.is_virtual"
                    :to="`/festival/venues/${duplicateEvent.venue.slug}`"
                    class="venue"
                    itemprop="location"
                    itemscope
                    itemtype="https://schema.org/Place"
                  >
                    <img
                      src="~/assets/icon-location.svg"
                      width="22"
                      height="28"
                      alt="In-person event"
                    ><span itemprop="name" v-html="duplicateEvent.venue.name" />
                  </SiteLink>
                </div>
                <div class="single-festival-event__card__details">
                  <time itemprop="startDate" :content="duplicateEvent.acf.start_time|formatMicroDate">
                    {{ duplicateEvent.acf.start_time|formatDate }} {{ duplicateEvent.acf.timezone_abv }}
                  </time>
                  <div class="single-festival-event__card__details__actions">
                    <LazyFestivalBuyButton class="mr-2 my-2" :post="duplicateEvent" />
                    <LazyFestivalWatchLiveButton class="mr-2 my-2" :post="duplicateEvent" />
                    <ClientOnly>
                      <FestivalAddToCalendarButton
                        class="mr-2 my-2"
                        :title="duplicateEvent.title.rendered"
                        :details="duplicateEvent.excerpt.rendered"
                        :location="(duplicateEvent.venue ? duplicateEvent.venue.address : title) + (duplicateEvent.acf.external_tickets_url ? ` - ${duplicateEvent.acf.external_tickets_url}` : '')"
                        :start-time="duplicateEvent.acf.start_time"
                        :end-time="(duplicateEvent.acf.end_time ? duplicateEvent.acf.end_time : null)"
                        :time-zone="duplicateEvent.acf.timezone"
                        :button="true"
                      />
                    </ClientOnly>
                  </div>
                </div>
              </div>
            </div>
          </Container>
          <LazyRellaxShape key="shapeSquiggle4" class="hidden lg:block bottom-0 -ml-64 left-1/2 max-w-4xl z-0">
            <ShapeSquiggle4 />
          </LazyRellaxShape>
        </div>
        <Space :lg="true" />
        <template v-if="layout==='default'">
          <Space :lg="true" />
          <Container class="relative">
            <FestivalHeading :butted="true">
              <span v-if="post.acf.information_heading" v-html="post.acf.information_heading" /><span v-if="!post.acf.information_heading">Info</span>
            </FestivalHeading>
            <div class="single-festival-event__information">
              <div class="single-festival-event__information__inside" :class="{'pb-8': !film||post.acf.hide_film_details}">
                <FestivalProse :alt="true">
                  <span v-html="content" />
                </FestivalProse>
                <FestivalEventWarnings :post="post" :layout="layout" :virtual-post="duplicateVirtualEvent" />
                <div v-if="hasReadMoreContent" class="single-festival-event__content__more">
                  <Space v-if="post.acf.additional_read_more_content" />
                  <div
                    v-if="post.acf.additional_read_more_content"
                    class="text-2xl"
                    v-html="post.acf.additional_read_more_content"
                  />
                </div>
              </div>
              <div v-if="film&&!post.acf.hide_film_details" class="single-festival-event__content__films">
                <FestivalEventFilmDetails :film="film" />
              </div>
              <div v-if="post.acf.additional_credits">
                <FestivalEventCreditSponsors
                  v-if="post.acf.additional_credits"
                  :additional-credits="post.acf.additional_credits"
                  :alt="true"
                />
                <Space :lg="true" />
              </div>
            </div>
            <LazyRellaxShape key="shapeElipseChain2" class="bottom-0 mb-20 right-1/4 max-w-lg z-0">
              <ShapeElipseChain2 />
            </LazyRellaxShape>
          </Container>
        </template>
      </template>
      <FestivalEventFilmListings
        v-if="post.acf.films&&layout==='collection'"
        :films="post.acf.films"
        :heading="(post.acf.listings_heading ? post.acf.listings_heading : 'Program')"
      />

      <FestivalInPersonScreenings
        v-if="layout==='in-person_screenings'||layout==='grouped_tag'"
        :screenings="post.acf.screenings"
        :show-time="(layout==='grouped_tag')"
      />

      <Container v-if="$store.state.theme==='festival'">
        <Space v-if="!(post.acf.films&&layout==='collection')" :md="true" />
        <Space v-if="post.acf.additional_credits" :md="true" />
        <FestivalEventCreditSponsors
          v-if="post.acf.additional_credits"
          :additional-credits="post.acf.additional_credits"
        />
      </Container>

      <template v-if="$store.state.theme==='bsf11'&&layout!=='default'">
        <div class="relative">
          <Space v-if="!(post.acf.films&&layout==='collection')" :md="true" />
          <Space v-if="post.acf.additional_credits" :md="true" />
          <FestivalEventCreditSponsors
            v-if="post.acf.additional_credits"
            :additional-credits="post.acf.additional_credits"
          />
          <LazyRellaxShape key="shapeFlower2" class="bottom-0 right-1/4 max-w-sm z-0">
            <ShapeFlower2 />
          </LazyRellaxShape>
        </div>
      </template>

      <FestivalEventLayouts
        v-if="post.acf.layouts"
        :layouts="post.acf.layouts"
        :event-id="post.id"
        :cover-image="(coverImage ? coverImage : null)"
        :event-layout="layout"
      />
      <FestivalTickets
        v-if="$store.state.theme==='bsf11'&&(post.acf.tickets_available&&!post.acf.hide_tickets_button&&!post.acf.hide_tickets_section)"
      />
      <FestivalFlexibleLayouts v-if="post.acf.festival_layouts" :post="post" />
      <Space :lg="true" />

      <LazyFestivalEventRelated
        v-if="post.acf.related_events&&!post.acf.hide_related_events"
        :events="post.acf.related_events"
      />
    </div>
  </article>
</template>

<script>
import eventiveOverrides from '~/mixins/eventiveOverrides'
import eventiveBuy from '~/mixins/eventiveBuy'
import ShapeNine from '~/assets/festival/shape-9.svg?inline'
import ShapeFlower from '~/assets/festival/11/shape-flower.svg?inline'
import ShapeStarAlt from '~/assets/festival/11/shape-star-alt.svg?inline'
import ShapeSquiggle4 from '~/assets/festival/11/shape-squiggle4.svg?inline'
import ShapeFlower2 from '~/assets/festival/11/shape-flower2.svg?inline'
import ShapeElipseChain2 from '~/assets/festival/11/shape-elipse-chain2.svg?inline'
import SingleFestivalEventMedia from '~/components/layouts/partials/SingleFestivalEventMedia'
import eventiveEverywhere from '~/mixins/eventiveEverywhere'

export default {
  name: 'SingleFestivalEvent',
  components: {
    SingleFestivalEventMedia,
    ShapeNine,
    ShapeFlower,
    ShapeStarAlt,
    ShapeSquiggle4,
    ShapeFlower2,
    ShapeElipseChain2
  },
  mixins: [eventiveOverrides, eventiveBuy, eventiveEverywhere],
  props: {
    post: {
      type: Object,
      required: false,
      default: null
    }
  },
  data () {
    return {
      readMoreExpanded: false
    }
  },
  computed: {
    layout () {
      if (this.post.acf.layout) {
        return this.post.acf.layout
      }

      return 'default'
    },
    hasReadMoreContent () {
      if (this.layout !== 'default') {
        return false
      }

      return (this.post.acf.films && this.$store.state.theme === 'festival') || this.post.acf.additional_read_more_content
    },
    film () {
      if (!this.post.acf.films) {
        return false
      }

      return this.post.acf.films[0]
    },
    virtualScreeningLabel () {
      if (this.post.acf.event_type) {
        return this.post.acf.event_type
      }

      return 'Virtual'
    },
    inPersonScreeningLabel () {
      if (this.post.acf.event_type) {
        return this.post.acf.event_type
      }

      return 'In-Person'
    },
    duplicateVirtualEvent () {
      if (this.post.acf.multiple_showings && this.post.acf.duplicate_events && this.post.acf.duplicate_events.length) {
        const virtualEventPost = this.post.acf.duplicate_events[0]
        if (virtualEventPost.acf.is_virtual) {
          return virtualEventPost
        }
      }

      return null
    }
  },
  mounted () {
    this.$root.setLayout(this.post.acf.theme)

    this.$nextTick(() => {
      setTimeout(() => {
        this.rebuildEventive()
      }, 1000)
    })
  },
  created () {
    this.$root.setLayout(this.post.acf.theme)
  }
}
</script>

<style>
.single-festival-event--festival {
  @apply font-festival_sans;
}

.single-festival-event--festival .single-festival-event__header {
  @apply relative bg-black w-full block;
}

.single-festival-event--festival .single-festival-event__header__inside {
  @apply absolute top-0 left-0 w-full h-full z-20;
}

.single-festival-event--festival .single-festival-event__header__inside__wrap {
  @apply flex justify-start items-end h-full;
}

/*
.single-festival-event__header::before {
  display: block;
  padding-top: 40%;
  content: " ";
}*/

.single-festival-event--festival .single-festival-event__title {
  @apply bg-blue text-white text-3xl p-7 pr-14 border-5 border-navy -mt-border;
}

.single-festival-event--festival .single-festival-event__tag {
  @apply block font-festival_sans_italic m-0.5 text-lg;
}

.single-festival-event--festival .single-festival-event__header img {
  @apply block w-full h-full object-cover;
}

.single-festival-event--festival .single-festival-event__content {
  @apply relative;
}

.single-festival-event--festival .single-festival-event__content--default {
  @apply bg-beige -mt-border border-5 border-navy;
}

.single-festival-event--festival .single-festival-event__content__inside {
  @apply p-6 xl:py-12  mx-auto xl:w-10/12 2xl:w-8/12 text-navy relative z-20;
}

.single-festival-event__content__films li {
  @apply mr-3 mb-3;
}

.single-festival-event--festival .single-festival-event__content__films li span:first-child {
  @apply font-festival_sans_light_italic;
}

.single-festival-event--festival .single-festival-event__content__films .film-details {
  @apply flex flex-wrap;
}

.single-festival-event__media {
  @apply relative;
}

.single-festival-event--festival .single-festival-event__media {
  @apply aspect-w-10 aspect-h-9 lg:aspect-w-16 lg:aspect-h-5 relative;
}

.single-festival-event--bsf11 .single-festival-event__title {
  @apply py-16 font-bsf11_sans leading-none relative z-10;
}

.single-festival-event--bsf11 .single-festival-event__title h1 {
  @apply text-7xl lg:text-8xl;
}

.single-festival-event--bsf11 .single-festival-event__tag {
  @apply text-4xl lg:text-5xl;
}

.single-festival-event--bsf11 .single-festival-event__header__inside__wrap {
  @apply relative;
}

.single-festival-event--bsf11 .single-festival-event__media,
.single-festival-event--bsf11 .single-festival-event__information {
  @apply border-4 lg:border-md 2xl:border-lg border-black rounded-3xl xl:rounded-4xl overflow-hidden relative z-20;
}

.single-festival-event--bsf11 .single-festival-event__information {
  @apply bg-white;
}

.single-festival-event--bsf11 .single-festival-event__information__inside {
  @apply px-6 pt-8;
}

.single-festival-event--bsf11 .single-festival-event__media::before {
  @apply block;

  content: " ";
  padding-top: 56%;
}

.single-festival-event--bsf11 .single-festival-event__media img,
.single-festival-event--bsf11 .single-festival-event__media video {
  @apply absolute top-0 left-0 w-full h-full object-cover;
}

.single-festival-event__card {
  @apply relative z-20 w-full mb-4 md:mb-0;
}

.single-festival-event__card__type,
.single-festival-event__card__details {
  @apply border-4 lg:border-md 2xl:border-lg border-black rounded-3xl xl:rounded-4xl px-6 py-8  md:flex justify-between items-center;
}

.single-festival-event__card__type {
  @apply pb-16 rounded-b-none bg-bsf11Yellow;
}

.single-festival-event__card__type h3 {
  @apply m-0;
}

.single-festival-event__card__type h3,
.single-festival-event__card__details time {
  @apply font-bsf11_sans text-4xl lg:text-5xl font-normal;
}

.single-festival-event__card__type--virtual {
  @apply bg-bsf11Teal;
}

.single-festival-event__card__details {
  @apply -mt-12 bg-white;
}

.single-festival-event__card__details__actions {
  @apply mt-6 md:mt-auto flex flex-wrap justify-end;
}

.single-festival-event__card__type .venue a {
  @apply flex space-x-2;
}

.single-festival-event--bsf11 .single-festival-event__content__films {
  @apply py-14 pb-0 my-14 px-6 border-t-lg border-dotted text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-4xl font-medium;
}

</style>
