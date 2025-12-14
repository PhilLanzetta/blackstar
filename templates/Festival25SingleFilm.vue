<template>
  <div>
  <Festival24Section :section="{background: 'bsf14yellow', gradient_style: 'bottom',  layouts: [], style: 'full'}" :extra-padding="false" :padding-bottom="false" :rounded-top="true">
      <Container>
        <Space class="md:hidden" />

        <p>
          <Festival24Button to="/festival/film-guide/" :back-arrow="true">
            Back to Films A-Z
          </Festival24Button>
        </p>
        <Space />
        <Space />
        <Space />
      </Container>
  </Festival24Section>
  <Festival24Section :section="{background: 'offWhite', layouts: [], style: 'full'}" class="-mt-5" :rounded-top="true">

      <Space />
      <Space />

      <Container class="md:flex md:gap-4 space-y-4 md:space-y-0 justify-between">
        <Festival24RichCardHighlights class="ml-auto mr-0 md:hidden mt-0 float-right" :card="{type: 'festival-film', film: post}" />

        <p v-if="post.tags&&post.tags.length" class="flex md:hidden flex-wrap gap-2">
          <RawLink
            v-for="tag in post.tags"
            :key="`tag${tag.term_id}`"
            :to="`/festival/film-guide/?eventive-tag=${tag.term_id}`"
          >
            {{ tag.name }}
          </RawLink>
        </p>
        <Festival24Heading class="max-w-3xl" :layout="{heading: post.title.rendered}" />
        <div>

          <Festival24Button v-if="$store.state.settings?.festival?.enable_film_guide_screenings" to="#screenings" class="inline-block mb-4 md:hidden">
            Screenings
          </Festival24Button>
          <p v-if="post.tags&&post.tags.length" class="hidden md:flex flex-wrap gap-2 md:justify-end w-full md:text-right">
            <RawLink
              v-for="tag in post.tags"
              :key="`tag${tag.term_id}`"
              :to="`/festival/film-guide/?eventive-tag=${tag.term_id}`"
            >
              {{ tag.name }}
            </RawLink>
          </p>

          <Festival24RichCardIcons class="mt-4 mb-auto md:justify-end" :card="{type: 'festival-film', film: post}" />
          <Festival24RichCardHighlights class="ml-auto mr-0 hidden md:flex md:justify-end mt-4 float-right" :card="{type: 'festival-film', film: post}" />

        </div>
      </Container>
      <Space />
      <Space />
    <Space />

    <div class="film-cover">
      <div class="cover-image">
        <span v-if="post.acf.cover_image||post.acf.still_image" v-html="(post.acf.still_image ? post.acf.still_image : post.acf.cover_image)" />
        <img v-else src="~/assets/festival/12/fallback-image--lg.jpg" alt="Audience at a BlackStar Festival event">
      </div>
      <template v-if="post.acf.trailer">
        <Festival24PlayButton class="absolute top-0 left-0 w-full h-full z-20" />
        <button class="block absolute top-0 left-0 w-full h-full z-30" @click.prevent="showFilmTrailer">
          <span class="sr-only">Play Trailer</span>
        </button>
      </template>
    </div>

    <Container>
      <Space class="hidden lg:block" />
      <Space class="hidden lg:block" />
      <Space class="hidden lg:block" />
      <Space class="hidden lg:block" />
      <Space class="hidden lg:block" />
      <Space />
      <div class="lg:flex lg:flex-row-reverse space-y-8 lg:space-y-0 justify-between">
        <div id="screenings" class="lg:w-1/3">
          <Festival24Box v-if="$store.state.settings?.festival?.enable_film_guide_screenings" size="sm" background="bsf14yellowTint" class="offset-left lg:min-h-full">
            <Festival24FilmScreenings :in-person-screenings="inPersonScreenings" :virtual-screenings="virtualScreenings" />
          </Festival24Box>
          <Space />
          <Space />
        </div>
        <div class="lg:w-2/3 flex-shrink-1">
          <Festival24Prose v-if="post.content">
            <div v-html="post.content.rendered" />
          </Festival24Prose>
          <Space />
        </div>
      </div>
      <Space />
      <Space />
      <Space />
      <Space />
    </Container>

    <Festival24Section :section="{background: 'bsf14yellowTint', gradient_style: 'none',  layouts: [], style: 'full'}" :rounded-top="true" v-if="post.directors_spotlight">
      <Container class="text-lg">
        <Space class="hidden lg:block" :md="true" />
        <Space class="block lg:hidden" />
        <Space class="block lg:hidden" />
        <Festival24Heading :layout="{'heading': (post.acf.directors_spotlight_heading ? post.acf.directors_spotlight_heading : 'Directors Spotlight')}" />
        <Space />
        <Space />
        <Festival24DirectorsSpotlight :bios="post.directors_spotlight" background="offWhite" :short="true" />
        <Space />
        <Space />
      </Container>
    </Festival24Section>

    <Festival24Section :section="{background: 'offWhite', layouts: [], style: 'full'}" class="-mt-5" :rounded-top="true">
      <Space />
      <Space />
    <Container class="text-lg">
      <Space />
      <Space />
      <Festival24EventFilmDetails :film="post" />
    </Container>
    </Festival24Section>
    <div v-if="post.acf.layouts&&post.acf.layouts.length">
      <Space />
      <Space />
      <Festival24Sections class="relative z-10" :layouts="post.acf.layouts" :event-id="post.id" />
    </div>
    <div class="-mb-16" v-if="post.tags&&post.tags.length">
      <Space />
      <Space />
      <Festival24RelatedFilms :film="post" />
    </div>
  </Festival24Section>
  </div>
</template>

<script>
import moment from 'moment-timezone'
import eventiveEverywhere from '~/mixins/eventiveEverywhere'
import hasFestivalTabs from '~/mixins/hasFestivalTabs'
import forceBsf14Layout from '~/mixins/forceBsf14Layout'

export default {
  name: 'Festival25SingleFilm',
  mixins: [eventiveEverywhere, hasFestivalTabs, forceBsf14Layout],
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      sectionColour: 'bsf14yellow'
    }
  },
  computed: {
    screenings () {
      if (!this.post) {
        return []
      }

      if (!this.post.acf.events) {
        return []
      }

      if (!this.post.acf.events.length) {
        return []
      }

      return this.post.acf.events
    },
    virtualScreenings () {
      return this.screenings.filter((to) => {
        return to.acf.is_virtual && to.post_status === 'publish'
      })
    },
    inPersonScreenings () {
      return this.screenings.filter((to) => {
        return !to.acf.is_virtual && to.post_status === 'publish'
      })
    },
    canBuyTickets () {
      return this.screenings.filter((to) => {
        if (to.acf.hide_tickets_button) {
          return false
        }

        if (to.acf.coming_soon && !to.acf.allow_preorder) {
          return false
        }

        if (!to.acf.availability) {
          return false
        }

        if (!to.acf.eventive_id) {
          return false
        }

        if (!to.acf.tickets_available) {
          return false
        }

        const checkTime = moment().tz('America/New_York')
        return !checkTime.isSameOrAfter(moment.tz(to.acf.end_time, 'America/New_York'))
      }).length
    }
  },
  methods: {
    showFilmTrailer () {
      this.$store.commit('festival/trailer', this.post.acf.trailer)
    }
  }
}
</script>

<style scoped>
.film-cover {
  @apply aspect-w-16 aspect-h-9 overflow-hidden rounded-xl  m-4 md:m-0 md:rounded-none md:border-none md:aspect-w-16 md:aspect-h-6 bg-black relative z-0 md:-mt-6;
}

.offset-left {
  @apply lg:ml-10;
}
</style>
