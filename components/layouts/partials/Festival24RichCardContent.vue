<template>
  <div :class="`bsf24-card bsf24-card--${size} space-y-6`">
    <h3 v-if="content.preHeading" v-html="content.preHeading" />
    <h2 v-if="content.heading" class="tracking-tight font-normal 2xl:text-3xl mb-3" itemprop="name" :class="headingSizes" v-html="content.heading" />
    <slot />
    <template v-if="card.type==='custom'">
      <ul v-if="card.custom.details&&card.custom.details.length">
        <li v-for="(detail, key) in card.custom.details" :key="`detail${key}`" v-html="detail.line" />
      </ul>
    </template>

    <ul v-if="card.type === 'festival-event'" class="swiper-no-swiping font-medium">
      <li v-if="card.event.acf.event_type" v-html="card.event.acf.event_type" />
      <li v-if="!card.event.acf.event_type&&card.event.tags&&card.event.tags.length&&card.event.acf.layout!=='collection'" class="display flex flex-wrap space-x-2">
        <SiteLink
          v-for="tag in card.event.tags"
          :key="`event${card.event.slug}tag${tag.term_id}`"
          :to="`/festival/schedule/?eventive-tag=${tag.term_id}`"
          :click-handler="(filterByTagCallback ? () => { filterByTagCallback(tag) } : null)"
        >
          {{ tag.name }}
        </SiteLink>
      </li>
      <li v-if="showTime&&eventTime">
        <time itemprop="startDate" :content="eventTime|formatMicroDate">
          {{ eventTime|formatDate }} {{ card.event.acf.timezone_abv }}
        </time>
      </li>
      <li v-if="card.event.venue||showTime&&eventTime">
        <SiteLink
          v-if="card.event.venue"
          :to="`/festival/schedule/?festival-venues=${card.event.venue.term_id}`"
          class="venue mr-2"
          itemprop="location"
          itemscope
          itemtype="https://schema.org/Place"
        >
          <span itemprop="name" v-html="card.event.venue.name" />
        </SiteLink>
        <span v-if="showTime&&eventTime" class="font-normal">
          <ClientOnly>
            <FestivalAddToCalendarButton
              :title="content.heading"
              :details="(content.description ? content.description : content.heading)"
              :location="(card.event.venue ? card.event.venue.address : content.heading) + (card.event.acf.external_tickets_url ? ` - ${card.event.acf.external_tickets_url}` : '')"
              :start-time="card.event.acf.start_time"
              :end-time="(card.event.acf.end_time ? card.event.acf.end_time : null)"
              :time-zone="card.event.acf.timezone"
            />
          </ClientOnly>
        </span>
      </li>
    </ul>
    <ul v-if="card.type === 'festival-film'" class="2xl:text-lg">
      <li v-if="card.film.tags&&card.film.tags.length" class="display flex flex-wrap space-x-2">
        <RawLink
          v-for="tag in card.film.tags"
          :key="`film${card.film.slug}tag${tag.term_id}`"
          :to="`/festival/film-guide/?eventive-tag=${tag.term_id}`"
          :click-handler="(filterByTagCallback ? () => { filterByTagCallback(tag) } : null)"
        >
          {{ tag.name }}
        </RawLink>
      </li>
      <template v-if="filmDirectors&&filmDirectors.length">
        <li v-for="(credit, creditKey) in filmDirectors" :key="`credit${creditKey}`">
          <span v-html="credit.name" />
        </li>
      </template>
      <li>Runtime: {{ card.film.acf.runtime }} minutes</li>
      <!--      <li v-if="card.film.acf.country">
        Countries: <span v-html="card.film.acf.country" />
      </li>-->
      <!--      <li v-if="card.film.acf.premiere">
        Premiere: <span v-html="card.film.acf.premiere" />
      </li>-->
    </ul>

    <p v-if="content.description" itemprop="description" :class="{'hidden md:block': card.type!=='custom'}" v-html="content.description" />
  </div>
</template>

<script>
import festival24HeadingSizes from '~/mixins/festival24HeadingSizes'
import festival23EventProps from '~/mixins/festival23EventProps'

export default {
  name: 'Festival24RichCardContent',
  mixins: [festival24HeadingSizes, festival23EventProps],
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  computed: {
    content () {
      if (this.card.type === 'festival-event') {
        return {
          preHeading: '',
          heading: (this.card.event.acf.custom_title ? this.card.event.acf.custom_title : this.card.event.title.rendered),
          description: (this.card.event.acf.custom_excerpt ? this.card.event.acf.custom_excerpt : this.card.event.post_excerpt)
        }
      }

      if (this.card.type === 'festival-film') {
        return {
          preHeading: '',
          heading: (this.card.film.title ? this.card.film.title.rendered : this.card.film.post_title)
          //   description: this.card.film.excerpt.rendered
        }
      }

      if (this.card.type === 'festival-post') {
        return {
          preHeading: '',
          heading: this.card.news_post.title.rendered,
          description: this.card.news_post.excerpt.rendered
        }
      }

      return {
        preHeading: this.card.custom.pre_heading,
        heading: this.card.custom.heading,
        description: this.card.custom.description
      }
    },
    eventTime () {
      if (this.overrideTime) {
        return this.overrideTime
      }

      if (this.card.type === 'festival-event') {
        return this.card.event.acf.start_time
      }

      return null
    },
    filmDirectors () {
      if (this.card.type !== 'festival-film') {
        return false
      }

      if (!this.card.film.acf.credits || !this.card.film.acf.credits.length) {
        return false
      }

      return this.card.film.acf.credits.filter((credit) => {
        return credit.type && credit.type.toLowerCase() === 'director'
      })
    }
  }
}
</script>

<style scoped>
.bsf24-card {
  @apply text-sm 2xl:text-base;
}

.bsf24-card--lg {
  @apply text-base 2xl:text-lg;
}

.bsf24-card--xl {
  @apply text-base 2xl:text-lg 3xl:text-xl;
}

.bsf24-card ul {
  @apply my-4 2xl:my-5 3xl:my-6;
}

.bsf24-card ul li {
  @apply my-0.5 2xl:my-1 3xl:my-2;
}
</style>
