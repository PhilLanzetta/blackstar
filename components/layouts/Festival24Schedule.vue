<template>
  <div class="min-h-screen">
    <Festival24ScheduleHeader :post="post" :show-time-view="showTimeView" :active-view="activeView" :my-schedule="mySchedule" :clear-filters="clearFilters" />
    <div v-if="ready">
      <Space />
      <Space class="hidden md:block" />
      <Space class="hidden md:block" />
      <template v-if="activeView==='day'&&!filtered&&activeDay">
        <Container>
          <div class="flex justify-between items-center">
            <Festival24SwiperButton id="prev-day" :click-handler="prevScheduleDay" :disabled="!hasPastDays" />

            <Festival24Heading :layout="{'heading': `${activeDay.name}`}" />

            <Festival24SwiperButton
              id="next-day"
              :click-handler="nextScheduleDay"
              type="next"
              :disabled="!hasUpcomingDays"
            />
          </div>
          <Space class="hidden md:block" />
          <Space />
        </Container>
        <div class="border-t border-black w-full">
          <Space class="hidden md:block" />
          <Space />
          <Space />
        </div>
      </template>
      <template v-if="items&&items.length">
        <Container>
          <div :class="{'sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0 items-stretch': format==='columns', 'md:grid md:grid-cols-2 md:gap-4 lg:block lg:gap-0 items-stretch': format!=='columns'}">
            <div
              v-for="(item, key) in items"
              :key="`festivalEvent${item.id}`"
              :class="{'md:pt-12': filtered&&activeView==='day', 'mb-4 md:mb-0 lg:mb-12': format!=='columns'}"
            >
              <template v-if="filtered&&activeView==='day'&&getItemsDate(item)&&(key===0||(getItemsDate(items[key-1]) !== getItemsDate(item)))">
                <div class="md:absolute md:-mt-10 xl:relative xl:mt-0">
                  <Festival24SecondaryHeading :layout="{heading: getItemsDate(item).name }" />
                  <Space />
                  <Space class="hidden md:block" />
                </div>
              </template>
              <Festival24FullRichCard
                v-if="format!=='columns'"
                class="w-full min-h-full"
                size="sm"
                :card="{type: 'festival-event', 'event': item}"
              />
              <Festival24RichCard
                v-if="format==='columns'"
                class="w-full"
                size="sm"
                :card="{type: 'festival-event', 'event': item}"
              />
            </div>
          </div>
          <Space :md="true"  class="xl:hidden"/>

          <template v-if="activeView !== 'day'||filtered">
            <Space :md="true" />
            <div v-if="totalPages>page" class="flex justify-center">
              <Festival24Button to="#" :click-handler="loadMore">
                Load More
              </Festival24Button>
              <RawLink class="sr-only" :to="`${post.link}?page=${page+1}`|replaceSiteUrl">
                Next Page
              </RawLink>
            </div>
            <Space :md="true" />
          </template>
        </Container>

        <template v-if="activeView==='day'&&!filtered&&activeDay">
          <div class="border-t border-black w-full">
            <Space class="hidden md:block" />
            <Space />
            <Space />
          </div>
          <Container>
            <div class="flex justify-between items-center">
              <Festival24SwiperButton id="prev-day" :click-handler="prevScheduleDay" :disabled="!hasPastDays" />

              <Festival24Heading :layout="{'heading': `${activeDay.name}`}" />

              <Festival24SwiperButton
                id="next-day"
                :click-handler="nextScheduleDay"
                type="next"
                :disabled="!hasUpcomingDays"
              />
            </div>
            <Space />
            <Space />
            <Space />
          </Container>
        </template>
      </template>
      <template v-else>
        <Container v-if="!$fetchState.pending&&loaded" class="text-center">
          <template v-if="!mySchedule">
            <Festival24SecondaryHeading :layout="{heading: 'No results found'}" />
            <Festival24Prose class="my-4">
              <p>
                Sorry but no results have been found for the selected tags and filters.
              </p>
            </Festival24Prose>

            <div class="flex my-10 space-x-4 justify-center">
              <Festival24Button :click-handler="clearFilters" to="#">
                Clear Filters
              </Festival24Button>
            </div>
          </template>
          <template v-if="mySchedule">
            <Festival24SecondaryHeading :layout="{heading: 'No events found'}" />
            <Festival24Prose class="my-4">
              <p>Add some saved events by tapping the heart button next to any event in the schedule or buy tickets to add to My Schedule.</p>
            </Festival24Prose>
            <div class="flex my-10 space-x-4 justify-center">
              <Festival24Button to="/festival/schedule">
                View Full Schedule
              </Festival24Button>
            </div>
          </template>
        </Container>
      </template>
    </div>
    <Transition name="fade">
      <Festival24Loader v-if="$fetchState.pending||!ready" />
    </Transition>
  </div>
</template>

<script>
import hasFestivalSchedule from '~/mixins/hasFestivalSchedule'
import updateRouteQuery from '~/mixins/updateRouteQuery'
import forceBsf13Layout from '~/mixins/forceBsf13Layout'

export default {
  name: 'Festival24Schedule',
  mixins: [hasFestivalSchedule, updateRouteQuery, forceBsf13Layout],
  props: {
    post: {
      type: Object,
      required: true
    },
    format: {
      type: String,
      required: false,
      default: 'rows'
    },
    mySchedule: {
      type: Boolean,
      required: false,
      default: false
    },
    showTimeView: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    getItemsDate (item) {
      if (!item['festival-dates']) {
        return false
      }

      if (!item['festival-dates'].length) {
        return false
      }

      return this.days.find((date) => {
        return item['festival-dates'].includes(date.id)
      })
    }
  }
}
</script>

<style scoped>

</style>
