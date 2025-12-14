<template>
  <Festival23Section :background="sectionColour">
    <Container>
      <Festival23StickyLayout :section-colour="sectionColour" :toggle-label="(canBuyTickets ? 'Get tickets' : 'Time, Date &amp; Venue')">
        <Festival23H1 size="xl" class="mb-6">
          <span v-html="post.title.rendered" />
        </Festival23H1>
        <div class="mb-6 md:mb-10 lg:mb-16 flex justify-between items-center">
          <div class="lg:flex lg:space-x-4 items-center">
            <Festival23H2 size="md">
              <span v-if="post.tags&&post.tags.length" class="display flex flex-wrap space-x-2">
                <RawLink
                  v-for="tag in post.tags"
                  :key="`tag${tag.term_id}`"
                  :to="`/festival-2023/film-guide/?eventive-tag=${tag.term_id}`"
                >
                  {{ tag.name }}
                </RawLink>
              </span>
            </Festival23H2>
            <Festival23RichCardHighlights :card="{type: 'festival-film', film: post}" :inline="true" />
          </div>
          <div class="flex items-center space-x-1 md:space-x-2 lg:space-x-6">
            <Festival23RichCardIcons :card="{type: 'festival-film', film: post}" />
          </div>
        </div>

        <template v-if="screenings.length">
          <ClientOnly>
            <MqLayout :mq="['sm', 'md', 'lg']">
              <Festival23FilmScreenings key="mobile-screenings-alt" :in-person-screenings="inPersonScreenings" :virtual-screenings="virtualScreenings" :alt="false" />
              <Space />
            </MqLayout>
          </ClientOnly>
        </template>

        <Festival23BoxMask>
          <div class="relative">
            <div class="aspect-w-10 aspect-h-10 md:aspect-w-16 md:aspect-h-9 bg-black">
              <div class="cover-image bg-block">
                <span v-if="post.acf.cover_image" v-html="post.acf.cover_image" />
                <img v-else src="~/assets/festival/12/fallback-image--lg.jpg" alt="Audience at a BlackStar Festival event">
              </div>
              <template v-if="post.acf.trailer">
                <Festival23PlayButton class="absolute top-0 left-0 w-full h-full z-20" />
                <button class="block absolute top-0 left-0 w-full h-full z-30" @click.prevent="showFilmTrailer">
                  <span class="sr-only">Play Trailer</span>
                </button>
              </template>
            </div>
          </div>
        </Festival23BoxMask>

        <template v-if="post.content">
          <Space class="hidden lg:block" :md="true" /> <Space class="block lg:hidden" />

          <Festival23Prose>
            <span v-html="post.content.rendered" />
          </Festival23Prose>
        </template>

        <template v-if="post.directors_spotlight">
          <Space class="hidden lg:block" :md="true" /> <Space class="block lg:hidden" /><Space class="block lg:hidden" />
          <div class="absolute left-0 top-auto border-t-2 border-black w-full" />
          <div class="text-lg">
            <Space class="hidden lg:block" :md="true" /> <Space class="block lg:hidden" /><Space class="block lg:hidden" />
            <Festival23H2 size="lg">
              <span v-if="post.acf.directors_spotlight_heading" v-html="post.acf.directors_spotlight_heading" /><span v-else>Directors Spotlight</span>
            </Festival23H2>
            <Space />
            <Festival23DirectorsSpotlight :bios="post.directors_spotlight" :short="true" />
          </div>
        </template>

        <Space class="hidden lg:block" :md="true" /> <Space class="block lg:hidden" />
        <div class="absolute left-0 top-auto border-t-2 border-black w-full" />
        <div class="text-lg">
          <Space class="hidden lg:block" :md="true" /> <Space class="block lg:hidden" />
          <FestivalEventFilmDetails :film="post" />
        </div>

        <template v-if="screenings.length" #sidebar>
          <ClientOnly>
            <MqLayout mq="xl+">
              <Festival23Box :bg="`bg-${sectionColour}`">
                <div class="px-4 py-1">
                  <Festival23H2 size="md" class="mb-5">
                    <span v-html="(canBuyTickets ? 'Get tickets' : 'Time, Date &amp; Venue')" />
                  </Festival23H2>
                  <Festival23FilmScreenings key="desktop-screenings" :in-person-screenings="inPersonScreenings" :virtual-screenings="virtualScreenings" />
                </div>
              </Festival23Box>
            </MqLayout>
            <MqLayout :mq="['sm', 'md', 'lg']">
              <div class="text-white bg-black border-white pb-6 px-4 sm:px-8">
                <Festival23FilmScreenings key="mobile-screenings" :in-person-screenings="inPersonScreenings" :virtual-screenings="virtualScreenings" :alt="true" />
              </div>
            </MqLayout>
          </ClientOnly>
        </template>
      </Festival23StickyLayout>
    </Container>
    <template v-if="post.acf.layouts&&post.acf.layouts.length">
      <Space class="hidden lg:block" :md="true" /> <Space class="block lg:hidden" />
      <div class="absolute left-0 top-auto border-t-2 border-black w-full z-20" />
      <Festival23Sections class="relative z-10" :layouts="post.acf.layouts" :event-id="post.id" />
    </template>
    <Festival23RelatedFilms v-if="post.tags&&post.tags.length" :film="post" :section-colour="sectionColour" />
  </Festival23Section>
</template>

<script>
import moment from 'moment-timezone'
import forceBsf12Layout from '~/mixins/forceBsf12Layout'
import eventiveEverywhere from '~/mixins/eventiveEverywhere'

export default {
  name: 'Festival23SingleFilm',
  mixins: [forceBsf12Layout, eventiveEverywhere],
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      sectionColour: 'bsf12green'
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
        return to.acf.is_virtual
      })
    },
    inPersonScreenings () {
      return this.screenings.filter((to) => {
        return !to.acf.is_virtual
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
          permalink: '/festival-2023/film-guide',
          post_title: 'Back to Film Guide',
          colour: 'bsf12blue'
        },
        {
          ID: this.post.id,
          permalink: this.post.link,
          post_title: 'Film info',
          colour: 'bsf12green'
        }
      ])
    },
    showFilmTrailer () {
      this.$store.commit('festival/trailer', this.post.acf.trailer)
    }
  }
}
</script>

<style scoped>

</style>
