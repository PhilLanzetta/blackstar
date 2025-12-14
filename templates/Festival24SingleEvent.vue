<template>
  <Festival24Section :section="{background: backgroundColour, layouts: [], style: 'full'}"  :padding-bottom="false" :extra-padding="false">
    <div class="border-b border-black hidden lg:block">
      <Container>
        <Space class="md:hidden" />

        <p>
          <Festival24Button :to="backRoute" :back-arrow="true">
            Back to {{ backContext }}
          </Festival24Button>
        </p>
        <Space />
        <Space />
        <Space />
      </Container>
    </div>
    <div class="rounded-b-3xl relative z-10" :class="`bg-${backgroundColour}`">
      <Space class="hidden lg:block" />
      <Space />

      <Container class="md:flex md:gap-4 space-y-4 md:space-y-0 justify-between">
        <div>
          <Festival24RichCardHighlights
            :card="{type: 'festival-event', event: post}"
            :inline="false"
            class="mr-0 mt-0 ml-auto float-right md:hidden"
          />
          <p
            v-if="(post.tags&&post.tags.length)||post.acf.event_type"
            class="flex lg:hidden flex-wrap gap-2 md:w-full"
          >
            <span v-if="post.acf.event_type" class="block" v-html="post.acf.event_type" />
            <template v-else>
              <RawLink
                v-for="tag in post.tags"
                :key="`tag${tag.term_id}`"
                :to="`/festival/schedule/?eventive-tag=${tag.term_id}`"
              >
                {{ tag.name }}
              </RawLink>
            </template>
          </p>
          <Festival24Heading class="max-w-3xl" :layout="{heading: post.title.rendered}" />
          <Festival24Prose v-if="post.acf.layout==='collection'&&content" class="max-w-3xl">
            <Space />
            <div itemprop="description" v-html="content" />
          </Festival24Prose>
        </div>
        <div class="">
          <Festival24Button v-if="post.acf.layout!=='collection'" to="#screenings" class="inline-block md:hidden">
            <span v-if="post.acf.films&&post.acf.films.length">Screenings</span><span v-else>Tickets</span>
          </Festival24Button>
          <p
            v-if="(post.tags&&post.tags.length)||post.acf.event_type"
            class="hidden lg:flex flex-wrap gap-2 md:justify-end w-full md:text-right"
          >
            <span v-if="post.acf.event_type" class="block" v-html="post.acf.event_type" />
            <template v-else>
              <RawLink
                v-for="tag in post.tags"
                :key="`tag${tag.term_id}`"
                :to="`/festival/schedule/?eventive-tag=${tag.term_id}`"
              >
                {{ tag.name }}
              </RawLink>
            </template>
          </p>
          <Festival24RichCardHighlights
            :card="{type: 'festival-event', event: post}"
            :inline="false"
            class="mr-0 mt-2 ml-auto hidden md:flex md:justify-end gap-2 flex-wrap"
          />
          <Festival24RichCardIcons class="mt-4 mb-auto md:justify-end" :card="{type: 'festival-event', event: post}" />
        </div>
      </Container>
      <Space />
      <Space />
    </div>

    <div class="absolute left-0 top-auto border-t border-black w-full" />
    <div v-if="post.acf.layout==='collection'" id="screenings">
      <Container>
        <Space />
        <Space />
        <div class="lg:flex lg:flex-row-reverse space-y-8 lg:space-y-0 justify-between">
          <div class="lg:w-1/3">
            <Festival24Box size="sm" class="offset-left">
              <Festival24EventTickets
                :post="post"
                :virtual-event-instances="virtualEventInstances"
                :in-person-event-instances="inPersonEventInstances"
                :has-virtual-events="hasVirtualEvents"
                :has-in-person-events="hasInPersonEvents"
                :can-buy-tickets="canBuyTickets"
                :hide-heading="false"
              />
            </Festival24Box>
          </div>
          <div class="lg:w-2/3 flex-shrink-1">
            <Festival24SecondaryHeading
              :layout="{'heading': (post.acf.films_heading ? post.acf.films_heading : 'Films in this Program')}"
            />
            <Space />
            <div class="lg:grid lg:grid-cols-2 2xl:grid-cols-3 gap-4 space-y-4 lg:space-y-0">
              <div
                v-for="film in post.acf.films"
                :key="`festivalFilm${film.ID}`"
                class="w-full"
              >
                <Festival24RichCard
                  class="w-full"
                  size="sm"
                  :card="{type: 'festival-film', 'film': film}"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
    <template v-if="post.acf.layout!=='collection'">
      <div class="film-cover">
        <div class="cover-image">
          <span v-if="post.acf.cover_image" v-html="post.acf.cover_image" />
          <img v-else src="~/assets/festival/12/fallback-image--lg.jpg" alt="Audience at a BlackStar Festival event">
        </div>
        <div v-if="post.acf.custom_cover_video" class="absolute top-0 left-0 w-full h-full z-10">
          <VideoPlayerRaw
            :video="{type: 'upload', video_file: post.acf.custom_cover_video[0].video}"
            :auto-play="true"
          />
        </div>
        <template v-if="trailer">
          <Festival24PlayButton class="absolute top-0 left-0 w-full h-full z-20" />
          <button class="block absolute top-0 left-0 w-full h-full z-30" @click.prevent="showFilmTrailer">
            <span class="sr-only">Play Trailer</span>
          </button>
        </template>
      </div>
      <Container>
        <Space class="hidden lg:block" :md="true" />
        <Space class="block lg:hidden" />
        <div class="lg:flex lg:flex-row-reverse space-y-8 lg:space-y-0 justify-between items-start">
          <div id="screenings" class="lg:w-1/3">
            <Festival24Box size="sm" class="offset-left">
              <Festival24EventTickets
                :post="post"
                :virtual-event-instances="virtualEventInstances"
                :in-person-event-instances="inPersonEventInstances"
                :has-virtual-events="hasVirtualEvents"
                :has-in-person-events="hasInPersonEvents"
                :can-buy-tickets="canBuyTickets"
                :hide-heading="false"
              />
            </Festival24Box>
          </div>
          <div class="lg:w-2/3">
            <template v-if="content">
              <Festival24SecondaryHeading
                v-if="post.acf.information_heading"
                :layout="{'heading': post.acf.information_heading}"
                class="mb-4"
              >
                <span v-html="post.acf.information_heading" />
              </Festival24SecondaryHeading>
              <Festival24Prose>
                <div itemprop="description" v-html="content" />
              </Festival24Prose>
            </template>
          </div>
        </div>
      </Container>

      <template v-if="film&&!post.acf.hide_film_details&&post.acf.layout==='default'&&film.directors_spotlight">
        <Space />
        <Space />
        <div class="absolute left-0 top-auto border-t border-black w-full" />
        <Container class="text-lg">
          <Space class="hidden lg:block" :md="true" />
          <Space class="block lg:hidden" />
          <Space class="block lg:hidden" />
          <Festival24Heading
            :layout="{'heading': (film.acf.directors_spotlight_heading ? film.acf.directors_spotlight_heading : 'Directors Spotlight')}"
          />
          <Space />
          <Space />
          <Festival24DirectorsSpotlight :bios="film.directors_spotlight" :short="true" />
          <Space />
          <Space />
        </Container>
      </template>

      <template v-if="film&&!post.acf.hide_film_details&&post.acf.layout==='default'">
        <Space />
        <Space />
        <div class="absolute left-0 top-auto border-t border-black w-full" />
        <Container class="text-lg">
          <Space />
          <Space />
          <Festival24EventFilmDetails :film="film" />
        </Container>
      </template>

      <template
        v-if="(post.acf.layout==='grouped_tag'||post.acf.layout==='in-person_screenings')&&post.acf.screenings&&post.acf.screenings.length"
      >
        <Space />
        <Space />
        <div class="absolute left-0 top-auto border-t border-black w-full" />
        <Space />
        <Space />
        <Festival24SecondaryHeading
          :layout="{'heading': (post.acf.screenings_heading ? post.acf.screenings_heading : 'Also showing')}"
        />
        <Space />
        <div class="lg:grid lg:grid-cols-2 2xl:grid-cols-3 gap-4">
          <div
            v-for="screening in post.acf.screenings"
            :key="`screening${screening.event.id}`"
            class="w-full"
          >
            <Festival24RichCard
              class="w-full"
              :card="{type: 'festival-event', 'event': screening.event}"
            />
          </div>
        </div>
      </template>
    </template>
    <template v-if="post.acf.layouts&&post.acf.layouts.length">
      <Space />
      <Space />
      <div class="absolute left-0 top-auto border-t border-black w-full z-20" />
      <Festival24Sections class="relative z-10" :layouts="post.acf.layouts" :event-id="post.id" />
    </template>
    <template v-if="post.acf.related_events&&!post.acf.hide_related_events">
      <Space />
      <Space />
      <Festival24RelatedEvents :event="post" />
    </template>
    <template v-else>
      <Space />
      <Space />
      <Space />
      <Space />
    </template>
  </Festival24Section>
</template>

<script>
import eventiveEverywhere from '~/mixins/eventiveEverywhere'
import hasFestivalTabs from '~/mixins/hasFestivalTabs'
import forceBsf13Layout from '~/mixins/forceBsf13Layout'
import eventiveOverrides from '~/mixins/eventiveOverrides'
import eventiveBuy from '~/mixins/eventiveBuy'

export default {
  name: 'Festival24SingleEvent',
  mixins: [eventiveEverywhere, eventiveOverrides, eventiveBuy, hasFestivalTabs, forceBsf13Layout],
  props: {
    post: {
      type: Object,
      required: true
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
    backContext () {
      if (this.$store.state.festival.tabContext) {
        if (this.$store.state.festival.tabContext.includes('event-guide')) {
          return 'Event Guide'
        }

        if (this.$store.state.festival.tabContext.includes('my-schedule')) {
          return 'My Schedule'
        }
      }

      return 'Schedule'
    },
    backRoute () {
      if (this.$store.state.festival.tabContext) {
        if (this.$store.state.festival.tabContext.includes('event-guide')) {
          return '/festival-2024/event-guide/'
        }

        if (this.$store.state.festival.tabContext.includes('my-schedule')) {
          return '/festival-2024/my-schedule/'
        }
      }

      return '/festival-2024/schedule/'
    },
    backgroundColour () {
      if (this.$store.state.festival.tabContext) {
        if (this.$store.state.festival.tabContext.includes('event-guide')) {
          return 'bsf13green'
        }
      }

      return 'beige'
    }
  },
  methods: {
    showFilmTrailer () {
      this.$store.commit('festival/trailer', this.trailer)
    }
  }
}
</script>

<style scoped>
.film-cover {
  @apply aspect-w-16 aspect-h-9 overflow-hidden rounded-xl border-black border m-4 md:m-0 md:rounded-none md:border-none md:aspect-w-16 md:aspect-h-6 bg-black relative z-0 md:-mt-6;
}

.offset-left {
  @apply lg:ml-10 lg:sticky lg:top-32 xl:top-40;
}
</style>
