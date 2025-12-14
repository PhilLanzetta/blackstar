<template>
  <Festival23Section :background="sectionColour">
    <Container>
      <Festival23StickyLayout itemscope itemtype="https://schema.org/ScreeningEvent" :section-colour="sectionColour" :toggle-label="(canBuyTickets ? 'Get tickets' : 'Time, Date &amp; Venue')">
        <Festival23H1 size="xl" class="mb-6">
          <span itemprop="name" v-html="title" />
        </Festival23H1>
        <div class="mb-6 md:mb-10 lg:mb-16 flex justify-between items-center">
          <div class="lg:flex lg:space-x-4 items-center">
            <template v-if="post.acf.layout==='collection'">
              <span class="text-2xl 2xl:text-2xl 3xl:text-3xl font-normal" v-html="content" />
            </template>
            <template v-else>
              <Festival23H2 size="md">
                <span v-if="post.acf.event_type" v-html="post.acf.event_type" />
                <span v-if="!post.acf.event_type&&post.tags&&post.tags.length" class="display flex flex-wrap space-x-2">
                  <RawLink
                    v-for="tag in post.tags"
                    :key="`tag${tag.term_id}`"
                    :to="`/festival-2023/schedule/?eventive-tag=${tag.term_id}`"
                  >
                    {{ tag.name }}
                  </RawLink>
                </span>
              </Festival23H2>
              <Festival23RichCardHighlights :card="{type: 'festival-event', event: post}" :inline="true" />
            </template>
          </div>
          <div class="flex items-center space-x-1 lg:space-x-2 2xl:space-x-6">
            <Festival23RichCardIcons :card="{type: 'festival-event', event: post}" />
            <Festival23SaveButton :event="post" :large="true" />
          </div>
        </div>
        <template v-if="!post.acf.hide_tickets_section">
          <MqLayout :mq="['sm', 'md', 'lg']">
            <Festival23EventTickets
              :post="post"
              :virtual-event-instances="virtualEventInstances"
              :in-person-event-instances="inPersonEventInstances"
              :has-virtual-events="hasVirtualEvents"
              :has-in-person-events="hasInPersonEvents"
              :can-buy-tickets="canBuyTickets"
              :hide-heading="true"
            />
            <Space />
          </MqLayout>
        </template>
        <template v-if="post.acf.layout==='collection'">
          <div class="absolute left-0 top-auto border-t-2 border-black w-full" />
          <Space class="hidden lg:block" :md="true" /> <Space class="block lg:hidden" /><Space class="block lg:hidden" />
          <Space class="hidden lg:block" :sm="true" />

          <Festival23H2 size="xl">
            <span v-if="post.acf.films_heading" v-html="post.acf.films_heading" /><span v-else>Films in this Program</span>
          </Festival23H2>
          <Space class="hidden lg:block" :sm="true" />
          <Space :sm="true" />
          <div class="flex flex-wrap -mx-2 3xl:-mx-4">
            <div v-for="film in post.acf.films" :key="`festivalFilm${film.ID}`" class="w-full lg:w-1/2 2xl:w-1/3 p-2 3xl:p-4 flex items-stretch">
              <Festival23RichCard
                class="w-full"
                :section-colour="sectionColour"
                :card="{type: 'festival-film', 'film': film}"
              />
            </div>
          </div>
        </template>
        <template v-if="post.acf.layout!=='collection'">
          <Festival23BoxMask>
            <div class="relative">
              <div class="aspect-w-10 aspect-h-10 md:aspect-w-16 md:aspect-h-9 bg-black">
                <div class="cover-image bg-block">
                  <span v-if="post.acf.cover_image" v-html="post.acf.cover_image" />
                  <img v-else src="~/assets/festival/12/fallback-image--lg.jpg" alt="Audience at a BlackStar Festival event">
                </div>

                <div class="absolute top-0 left-0 w-full h-full z-10">
                  <VideoPlayerRaw
                    v-if="post.acf.custom_cover_video"
                    :video="{type: 'upload', video_file: post.acf.custom_cover_video[0].video}"
                    :auto-play="true"
                  />
                </div>
                <template v-if="trailer">
                  <Festival23PlayButton class="absolute top-0 left-0 w-full h-full z-20" />
                  <button class="block absolute top-0 left-0 w-full h-full z-30" @click.prevent="showFilmTrailer">
                    <span class="sr-only">Play Trailer</span>
                  </button>
                </template>
              </div>
            </div>
          </Festival23BoxMask>
          <template v-if="content">
            <Space class="hidden lg:block" :md="true" /> <Space class="block lg:hidden" />
            <Festival23H2 v-if="post.acf.information_heading" size="lg" class="mb-4">
              <span v-html="post.acf.information_heading" />
            </Festival23H2>
            <Festival23Prose>
              <span itemprop="description" v-html="content" />
            </Festival23Prose>
          </template>

          <template v-if="film&&!post.acf.hide_film_details&&post.acf.layout==='default'&&film.directors_spotlight">
            <Space class="hidden lg:block" :md="true" /> <Space class="block lg:hidden" />
            <div class="absolute left-0 top-auto border-t-2 border-black w-full" />
            <div class="text-lg">
              <Space class="hidden lg:block" :md="true" /> <Space class="block lg:hidden" /><Space class="block lg:hidden" />
              <Festival23H2 size="lg">
                <span v-if="film.acf.directors_spotlight_heading" v-html="film.acf.directors_spotlight_heading" /><span v-else>Directors Spotlight</span>
              </Festival23H2>
              <Space />
              <Festival23DirectorsSpotlight :bios="film.directors_spotlight" :event-id="post.id" :short="true" />
            </div>
          </template>

          <template v-if="film&&!post.acf.hide_film_details&&post.acf.layout==='default'">
            <Space class="hidden lg:block" :md="true" /> <Space class="block lg:hidden" />
            <div class="absolute left-0 top-auto border-t-2 border-black w-full" />
            <div class="text-lg">
              <Space class="hidden lg:block" :md="true" /> <Space class="block lg:hidden" /><Space class="block lg:hidden" />
              <FestivalEventFilmDetails :film="film" />
            </div>
          </template>

          <template v-if="(post.acf.layout==='grouped_tag'||post.acf.layout==='in-person_screenings')&&post.acf.screenings&&post.acf.screenings.length">
            <Space class="hidden lg:block" :md="true" /> <Space class="block lg:hidden" />
            <div class="absolute left-0 top-auto border-t-2 border-black w-full" />
            <Space class="hidden lg:block" :md="true" /> <Space class="block lg:hidden" />
            <Festival23H2 size="xl">
              <span v-if="post.acf.screenings_heading" v-html="post.acf.screenings_heading" /><span v-else>Also showing</span>
            </Festival23H2>
            <Space :sm="true" />
            <Space class="hidden lg:block" :sm="true" />
            <div class="flex flex-wrap -mx-2 3xl:-mx-4">
              <div v-for="screening in post.acf.screenings" :key="`screening${screening.event.id}`" class="w-full lg:w-1/2 2xl:w-1/3 p-2 3xl:p-4 flex items-stretch">
                <Festival23RichCard
                  class="w-full"
                  :section-colour="sectionColour"
                  :card="{type: 'festival-event', 'event': screening.event}"
                />
              </div>
            </div>
          </template>
        </template>
        <template v-if="!post.acf.hide_tickets_section" #sidebar>
          <ClientOnly>
            <MqLayout mq="xl+">
              <Festival23Box :bg="`bg-${sectionColour}`">
                <Festival23EventTickets
                  class="px-4 py-1"
                  :post="post"
                  :virtual-event-instances="virtualEventInstances"
                  :in-person-event-instances="inPersonEventInstances"
                  :has-virtual-events="hasVirtualEvents"
                  :has-in-person-events="hasInPersonEvents"
                  :can-buy-tickets="canBuyTickets"
                />
              </Festival23Box>
            </MqLayout>
            <MqLayout :mq="['sm', 'md', 'lg']">
              <div class="text-white bg-black border-white pb-6 px-4 sm:px-8 mobile-events-dropdown">
                <Festival23EventTickets
                  :post="post"
                  :virtual-event-instances="virtualEventInstances"
                  :in-person-event-instances="inPersonEventInstances"
                  :has-virtual-events="hasVirtualEvents"
                  :has-in-person-events="hasInPersonEvents"
                  :can-buy-tickets="canBuyTickets"
                  :alt="true"
                />
              </div>
            </MqLayout>
          </ClientOnly>
        </template>
      </Festival23StickyLayout>
    </Container>
    <template v-if="post.acf.additional_credits">
      <Space class="hidden lg:block" :md="true" /> <Space class="block lg:hidden" /><Space class="block lg:hidden" />
      <div class="absolute left-0 top-auto border-t-2 border-black w-full" />
      <Space class="hidden lg:block" :md="true" /> <Space class="block lg:hidden" /><Space class="block lg:hidden" />
      <FestivalEventCreditSponsors
        :alt="true"
        :additional-credits="post.acf.additional_credits"
      />
    </template>
    <template v-if="post.acf.layouts&&post.acf.layouts.length">
      <Space class="hidden lg:block" :md="true" /> <Space class="block lg:hidden" />
      <div class="absolute left-0 top-auto border-t-2 border-black w-full z-20" />
      <Festival23Sections class="relative z-10" :layouts="post.acf.layouts" :event-id="post.id" />
    </template>
    <template v-if="post.acf.related_events&&!post.acf.hide_related_events">
      <Space class="hidden lg:block" :md="true" /> <Space class="block lg:hidden" /><Space class="block lg:hidden" />
      <div class="absolute left-0 top-auto border-t-2 border-black w-full" />
      <Space class="hidden lg:block" :md="true" /> <Space class="block lg:hidden" /><Space class="block lg:hidden" />
      <Container>
        <Festival23H2 size="lg">
          <span v-if="post.acf.related_events_heading" v-html="post.acf.related_events_heading" /><span v-else>You may also like</span>
        </Festival23H2>
        <Space :sm="true" />
        <Space class="hidden lg:block" :sm="true" />
      </Container>
      <ClientOnly>
        <FestivalRichCardCarouselWrapper>
          <Container>
            <swiper ref="swiper" :options="swiperOptions">
              <swiper-slide v-for="(card, key) in relatedEventCards" :key="`card${key}`">
                <Festival23RichCard :card="card" :section-colour="(card.event.acf.is_virtual ? 'bsf12yellow' : sectionColour)" />
              </swiper-slide>
            </swiper>

            <Space />

            <div class="flex justify-end lg:justify-between space-x-4 lg:space-x-0">
              <Festival23SwiperButton :id="`prev-${uniqueId}`" class="flex-grow-0" />

              <Festival23Pagination
                class="hidden lg:block"
                :go-to-page="handleChangePage"
                :total-pages="totalPages"
                :active-page="activePage"
              />

              <Festival23SwiperButton :id="`next-${uniqueId}`" class="flex-grow-0" type="next" />
            </div>
          </Container>
        </FestivalRichCardCarouselWrapper>
      </ClientOnly>
    </template>
  </Festival23Section>
</template>

<script>
import eventiveOverrides from '~/mixins/eventiveOverrides'
import eventiveBuy from '~/mixins/eventiveBuy'
import festivalSwiper from '~/mixins/festivalSwiper'
import forceBsf12Layout from '~/mixins/forceBsf12Layout'
import eventiveEverywhere from '~/mixins/eventiveEverywhere'

export default {
  name: 'Festival23SingleEvent',
  mixins: [eventiveOverrides, festivalSwiper, eventiveBuy, forceBsf12Layout, eventiveEverywhere],
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      swiperOverrideOptions: {
        slidesPerView: 1.05,
        spaceBetween: 10,
        breakpoints: {
          460: {
            slidesPerView: 1.5,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          1024: {
            slidesPerView: 2.5,
            spaceBetween: 20
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          1920: {
            slidesPerView: 3.5,
            spaceBetween: 20
          }
        }
      }
    }
  },
  computed: {
    trailer () {
      if (this.film) {
        return this.film.acf.trailer
      }

      return false
    },
    multipleInstances () {
      return this.post.acf.multiple_showings && this.post.acf.duplicate_events && this.post.acf.duplicate_events.length
    },
    virtualEventInstances () {
      if (!this.multipleInstances) {
        return []
      }

      return this.post.acf.duplicate_events.filter((eventInstance) => {
        return eventInstance.acf.is_virtual
      })
    },
    inPersonEventInstances () {
      if (!this.multipleInstances) {
        return []
      }

      return this.post.acf.duplicate_events.filter((eventInstance) => {
        return !eventInstance.acf.is_virtual
      })
    },
    hasVirtualEvents () {
      if (this.post.acf.is_virtual) {
        return true
      }

      return (!!this.virtualEventInstances.length)
    },
    hasInPersonEvents () {
      if (!this.post.acf.is_virtual) {
        return true
      }

      return (!!this.inPersonEventInstances.length)
    },
    relatedEventCards () {
      if (!this.post.acf.related_events) {
        return []
      }

      return this.post.acf.related_events.map((eventInstance) => {
        return {
          type: 'festival-event',
          event: eventInstance
        }
      })
    },
    sectionColour () {
      if (this.post && this.post.tags && this.post.tags.length) {
        if (this.post.tags.find(tag => tag.slug === 'shorts-programs')) {
          return 'bsf12yellow'
        }

        if (this.post.tags.find(tag => tag.slug === 'feature-narrative') || this.post.tags.find(tag => tag.slug === 'feature-documentary')) {
          return 'bsf12green'
        }
      }

      return 'bsf12blue'
    }

  },
  mounted () {
    this.setTabs()
  },
  created () {
    this.setTabs()
  },
  methods: {
    setTabs () {
      this.$store.commit('festival/setActiveTab', this.post.id)
      this.$store.commit('festival/setTabs', [
        {
          ID: 'back',
          permalink: '/festival-2023/schedule',
          post_title: 'Back to schedule',
          back_button: true,
          colour: 'bsf12blue'
        },
        {
          ID: this.post.id,
          permalink: this.post.link,
          post_title: 'Event info',
          colour: this.sectionColour
        }
      ])
    },
    showFilmTrailer () {
      this.$store.commit('festival/trailer', this.trailer)
    }
  }
}
</script>

<style scoped>

</style>
