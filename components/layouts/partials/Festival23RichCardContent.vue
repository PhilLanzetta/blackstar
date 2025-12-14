<template>
  <div :class="`bsf23-card bsf23-card--${size}`">
    <h3 v-if="content.preHeading" v-html="content.preHeading" />
    <h2 itemprop="name" v-if="content.heading" :class="headingSizes" v-html="content.heading" />
    <slot />
    <template v-if="card.type==='custom'">
      <ul v-if="card.custom.details&&card.custom.details.length">
        <li v-for="(detail, key) in card.custom.details" :key="`detail${key}`" v-html="detail.line"></li>
      </ul>
    </template>

    <ul v-if="card.type === 'festival-event'" class="swiper-no-swiping">
      <li v-if="card.event.acf.event_type" v-html="card.event.acf.event_type" />
      <li v-if="!card.event.acf.event_type&&card.event.tags&&card.event.tags.length" class="display flex flex-wrap space-x-2">
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
      <li v-if="card.event.venue">
        <SiteLink
          :to="`/festival/venues/${card.event.venue.slug}`"
          class="venue"
          itemprop="location"
          itemscope
          itemtype="https://schema.org/Place"
        >
          <span itemprop="name" v-html="card.event.venue.name" />
        </SiteLink>
      </li>
      <li v-if="showTime&&eventTime">
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
      </li>
    </ul>
    <ul v-if="card.type === 'festival-film'">
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
      <li>Runtime: {{ card.film.acf.runtime }} minutes</li>
      <li v-if="card.film.acf.country">Countries: <span v-html="card.film.acf.country"></span></li>
      <li v-if="card.film.acf.premiere">Premiere: <span v-html="card.film.acf.premiere"></span></li>
    </ul>

    <p itemprop="description" :class="{'hidden md:block': card.type!=='custom'}" v-if="content.description" v-html="content.description" />
  </div>
</template>

<script>
import festival23HeadingSizes from '~/mixins/festival23HeadingSizes'
import festival23EventProps from '~/mixins/festival23EventProps'

export default {
  name: 'Festival23RichCardContent',
  mixins: [festival23HeadingSizes, festival23EventProps],
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
          heading: (this.card.film.title ? this.card.film.title.rendered : this.card.film.post_title),
          description: this.card.film.excerpt.rendered
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
    }
  }
}
</script>

<style scoped>
.bsf23-card h2,
.bsf23-card h3 {
  @apply font-normal mb-2 2xl:mb-4;
}

.bsf23-card--xl h3 {
  @apply text-lg 2xl:text-xl 3xl:text-2xl;
}

.bsf23-card {
  @apply text-sm 2xl:text-base;
}

.bsf23-card--lg {
  @apply text-base 2xl:text-lg;
}

.bsf23-card--xl {
  @apply text-base 2xl:text-lg 3xl:text-xl;
}

.bsf23-card ul {
  @apply my-4 2xl:my-5 3xl:my-6;
}

.bsf23-card ul li {
  @apply my-0.5 2xl:my-1 3xl:my-2;
}
</style>
