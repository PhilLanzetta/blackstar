<template>
  <Container class="min-h-screen">
    <Festival23StickyLayout :section-colour="sectionColour" :wide="mySchedule" :toggle-label="(mySchedule ? 'Up next' : 'Filter by')">
      <div class="flex justify-between items-end">
        <div class="flex space-x-4 items-baseline">
          <Festival23H2 size="xl">
            <span v-html="title" />
          </Festival23H2>
          <Festival23HelpTextButton v-if="post.acf.help_text" :help-text="post.acf.help_text" />
        </div>
        <Festival23ScheduleViewSwitcher v-if="mySchedule&&ready" :active-view="activeView" :show-time-view="showTimeView" />
      </div>
      <Space class="hidden xl:block" />
      <Space />
      <div class="xl:flex xl:flex-row-reverse justify-between items-start space-y-4 xl:space-y-0">
        <template v-if="!mySchedule">
          <Festival23ScheduleViewSwitcher v-if="ready&&showTimeView" :active-view="activeView" :show-time-view="showTimeView" />
          <span v-else />
          <Festival23ScheduleTagFilters
            :event-tags-only="post.template==='views/festival-event-guide.blade.php'"
            :non-event-tags-only="post.template==='views/festival-virtual-guide.blade.php'"
          />
        </template>
        <template v-else>
          <span />
          <Festival23MyScheduleViewFilters />
        </template>
      </div>
      <Space class="block xl:hidden" />
      <Space class="block xl:hidden" />
      <Space class="hidden xl:block" :md="true" />
      <div class="border-t-2 border-black w-full absolute left-0 z-0" />
      <Space class="block xl:hidden" />
      <Space class="block xl:hidden" />
      <Space class="hidden xl:block" :md="true" />
      <template v-if="ready">
        <template v-if="activeView==='day'&&!filtered&&activeDay">
          <div class="flex justify-between items-baseline">
            <Festival23H3 size="xl">
              {{ activeDay.name }}<sup>{{ activeDay.acf.suffix }}</sup>
            </Festival23H3>

            <div>
              <Festival23SwiperButton id="prev-day" :click-handler="prevScheduleDay" :disabled="!hasPastDays" />
              <Festival23SwiperButton
                id="next-day"
                :click-handler="nextScheduleDay"
                type="next"
                :disabled="!hasUpcomingDays"
              />
            </div>
          </div>
          <Space />
          <Space />
        </template>
        <template v-if="items&&items.length">
          <div class="flex flex-wrap -mx-2" :class="{'flex flex-wrap -mx-2': format==='columns'}">
            <div
              v-for="(item, key) in items"
              :key="`festivalEvent${item.id}`"
              :class="{'w-full md:w-1/2 2xl:w-1/3 p-2 3xl:p-4 flex items-stretch': format==='columns', 'w-full p-2 md:w-1/2 md:flex md:items-stretch xl:pt-5 xl:block xl:py-5 xl:w-full': format!=='columns', 'md:pt-12': filtered&&activeView==='day'}"
            >
              <template v-if="filtered&&activeView==='day'&&getItemsDate(item)&&(key===0||(getItemsDate(items[key-1]) !== getItemsDate(item)))">
                <div class="md:absolute md:-mt-10 xl:relative xl:mt-0">
                  <Festival23H3 size="xl">
                    {{ getItemsDate(item).name }}<sup>{{ getItemsDate(item).acf.suffix }}</sup>
                  </Festival23H3>
                  <Space />
                  <Space class="hidden md:block" />
                </div>
              </template>
              <Festival23FullRichCard
                v-if="format!=='columns'"
                class="w-full"
                :section-colour="(item.acf.is_virtual ? 'bsf12yellow' : sectionColour)"
                :card="{type: 'festival-event', 'event': item}"
              />
              <Festival23RichCard
                v-if="format==='columns'"
                class="w-full"
                :section-colour="(item.acf.is_virtual ? 'bsf12yellow' : sectionColour)"
                :card="{type: 'festival-event', 'event': item}"
              />
            </div>
          </div>
          <template v-if="activeView !== 'day'||filtered">
            <Space :md="true" />
            <div v-if="totalPages>page" class="flex justify-center">
              <Festival23Button to="#" :click-handler="loadMore">
                Load More
              </Festival23Button>
              <RawLink class="sr-only" :to="`${post.link}?page=${page+1}`|replaceSiteUrl">
                Next Page
              </RawLink>
            </div>
            <Space :md="true" />
          </template>
        </template>
        <template v-else>
          <template v-if="!$fetchState.pending&&loaded">
            <template v-if="!mySchedule">
              <Festival23H2 size="md">
                No results found
              </Festival23H2>
              <Festival23Prose class="my-4">
                <p>
                  Sorry but no results have been found for the selected tags and filters.
                </p>
              </Festival23Prose>

              <div class="flex my-10 space-x-4">
                <Festival23Button :click-handler="clearFilters" to="#">
                  Clear Filters
                </Festival23Button>
              </div>
            </template>
            <template v-if="mySchedule">
              <Festival23H2 size="md">
                No events found
              </Festival23H2>
              <Festival23Prose class="my-4">
                <p>Add some saved events by tapping the heart button next to any event in the schedule or buy tickets to add to My Schedule.</p>
              </Festival23Prose>
              <div class="flex my-10 space-x-4">
                <Festival23Button to="/festival/schedule">
                  View Full Schedule
                </Festival23Button>
              </div>
            </template>
          </template>
        </template>
      </template>
      <template #sidebar>
        <template v-if="mySchedule">
          <ClientOnly>
            <MqLayout mq="xl+">
              <Festival23UpNext key="desktop-up-next" :section-colour="sectionColour" />
            </MqLayout>
            <MqLayout :mq="['sm', 'md', 'lg']">
              <div class="text-white border-white">
                <Festival23UpNext key="mobile-up-next" :section-colour="sectionColour" :alt="true" />
              </div>
            </MqLayout>
          </ClientOnly>
        </template>
        <template v-if="!mySchedule">
          <ClientOnly>
            <MqLayout mq="xl+">
              <Festival23Box :bg="`bg-${sectionColour}`">
                <Festival23ScheduleFilters key="desktop-filters" class="py-2 px-4" :post="post" :section-colour="sectionColour" />
              </Festival23Box>
            </MqLayout>
            <MqLayout :mq="['sm', 'md', 'lg']">
              <div class="text-white border-white">
                <Festival23ScheduleFilters key="mobile-filters" class="py-6 px-4 sm:px-8 border-t-2 border-bsf12Bg" :post="post" :alt="true" section-colour="bsf12Bg" />
              </div>
            </MqLayout>
          </ClientOnly>
        </template>
      </template>
    </Festival23StickyLayout>
    <Transition name="fade">
      <Festival23Loader v-if="$fetchState.pending||!ready" />
    </Transition>
  </Container>
</template>

<script>
import festival23SectionColors from '~/mixins/festival23SectionColors'
import hasFestivalSchedule from '~/mixins/hasFestivalSchedule'
import updateRouteQuery from '~/mixins/updateRouteQuery'
import forceBsf12Layout from '~/mixins/forceBsf12Layout'

export default {
  name: 'Festival23Schedule',
  mixins: [festival23SectionColors, hasFestivalSchedule, updateRouteQuery, forceBsf12Layout],
  props: {
    post: {
      type: Object,
      required: true
    },
    showTimeView: {
      type: Boolean,
      required: false,
      default: false
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
    }
  },
  computed: {
    title () {
      if (this.post.acf.custom_title) {
        return this.post.acf.custom_title
      }

      return this.post.title.rendered
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
