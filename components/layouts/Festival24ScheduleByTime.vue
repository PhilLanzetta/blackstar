<template>
  <ClientOnly>
    <div>
      <Festival24ScheduleHeader :post="post" :show-time-view="true" active-view="time" :my-schedule="mySchedule" :clear-filters="clearFilters" />
      <Space />
      <div v-if="ready" class="border-t border-black">
        <div v-if="activeDay">
          <div class="relative">
            <Space />
            <Space />
            <Space />
            <Container class="flex justify-between items-center space-x-4 w-full">
              <Festival24SwiperButton id="prev-day" :click-handler="prevScheduleDay" :disabled="!hasPastDays" />

              <Festival24Heading :layout="{'heading': `${activeDay.name}`}" />

              <Festival24SwiperButton
                id="next-day"
                :click-handler="nextScheduleDay"
                type="next"
                :disabled="!hasUpcomingDays"
              />
            </Container>
            <Space />
            <Space />
          </div>
          <Space />
          <div class="border-y border-black">
            <input
              ref="rangeInput"
              v-model="rangeScroll"
              type="range"
              step="1"
              min="1"
              max="100"
              class="w-full"
              @input="updateScroll"
            >
          </div>
          <Space />
          <Space />

          <div
            ref="timetable"
            class="timetable"
            :class="{'cursor-grabbing': pos!==null, 'cursor-grab': pos===null}"
            @mousemove="drag"
            @mousedown="setPosition"
            @mouseup="pos=null"
            @mouseleave="pos=null"
            @scroll="updateDragBar"
          >

            <div ref="headerKey" class="timetable__grid timetable__grid--header" :style="`top: ${keyTop}px`">
              <div><span>&nbsp;</span></div>
              <div><span>8am</span></div>
              <div><span>9am</span></div>
              <div><span>10am</span></div>
              <div><span>11am</span></div>
              <div><span>12pm</span></div>
              <div><span>1pm</span></div>
              <div><span>2pm</span></div>
              <div><span>3pm</span></div>
              <div><span>4pm</span></div>
              <div><span>5pm</span></div>
              <div><span>6pm</span></div>
              <div><span>7pm</span></div>
              <div><span>8pm</span></div>
              <div><span>9pm</span></div>
              <div><span>10pm</span></div>
              <div><span>11pm</span></div>
              <div><span>12am</span></div>
            </div>
            <div
              v-for="venue in venuesWithEvents"
              :id="`time-grid-${venue.slug}`"
              :key="`venue${venue.id}`"
              class="border-b border-[#D2C7BA] w-[3600px] relative select-none odd:bg-[#E7E1DA]"
              :class="{'h-[150px]': venue.slug !== 'virtual', 'grid schedule-grid': venue.slug === 'virtual'}"
            >
              <div><span class="pl-5 text-sm absolute top-1/2 transform -translate-y-1/2">{{ venue.name }}</span></div>
              <div
                v-for="item in eventsInVenue(venue)"
                :key="`festivalEvent${venue.id}-${item.id}`"
                :ref="`item${item.id}`"
                class="z-10"
                :class="{'absolute top-1/2 transform -translate-y-1/2': venue.slug !== 'virtual', 'relative my-2': venue.slug === 'virtual', '!w-auto !z-20': expanded===item.id}"
                :style="eventStyles(item)"
                @mouseenter="maybeExpand(item)"
                @mouseleave="collapse"
              >
                <Festival24EventTimeCard
                  :ref="`item${item.id}__inside`"
                  :key="`festivalEventCard${venue.id}-${item.id}`"
                  :item="item"
                  :click-handler="setActiveEvent"
                  :active="$store.state.festival.activeEvent&&$store.state.festival.activeEvent.id===item.id"
                />
              </div>
            </div>
            <div class="timetable__current-time" :style="`width: ${currentTimeWidth}px`">
              <div class="timetable__current-time__indicator">
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 10L0 0H12L6 10Z" fill="black"/>
                </svg>
                <span />
              </div>
            </div>
            <div class="timetable__grid">
              <div><span /></div>
              <div><span /></div>
              <div><span /></div>
              <div><span /></div>
              <div><span /></div>
              <div><span /></div>
              <div><span /></div>
              <div><span /></div>
              <div><span /></div>
              <div><span /></div>
              <div><span /></div>
              <div><span /></div>
              <div><span /></div>
              <div><span /></div>
              <div><span /></div>
              <div><span /></div>
              <div><span /></div>
            </div>
          </div>
        </div>
        <Container v-else class="min-h-screen">
          <template v-if="ready&&!$fetchState.pending">
            <Space :lg="true" />
            <Festival24SecondaryHeading :layout="{'heading': 'No events found'}" size="md" />
            <Festival24Prose v-if="mySchedule" class="my-4">
              <p>
                Add some saved events by tapping the heart button next to any event in the schedule or buy tickets to
                add to My Schedule.
              </p>
            </Festival24Prose>
            <div class="flex my-10 space-x-4">
              <Festival24Button to="/festival/schedule">
                View Schedule
              </Festival24Button>
            </div>
          </template>
        </Container>
      </div>
      <Transition name="fade">
        <Festival24Loader v-if="$fetchState.pending" />
      </Transition>
      <Space />
      <Space />
      <Space />
    </div>
  </ClientOnly>
</template>

<script>
import moment from 'moment-timezone'
import hasFestivalSchedule from '~/mixins/hasFestivalSchedule'

export default {
  name: 'Festival24ScheduleByTime',
  mixins: [hasFestivalSchedule],
  beforeRouteLeave () {
    this.$store.commit('festival/setActiveEvent', null)
  },
  props: {
    post: {
      type: Object,
      required: true
    },
    mySchedule: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      currentHour: 0,
      currentMinute: 0,
      interval: null,
      overflowing: false,
      pos: null,
      rangeScroll: 0,
      dragging: false,
      dragTimeout: null,
      keyTop: 0,
      expanded: null
    }
  },
  computed: {
    currentTimeWidth () {
      let width = 0

      const normalisedHour = this.currentHour - 7

      if (normalisedHour <= 0 && this.currentMinute === 0) {
        return 0
      }

      width = 200 * normalisedHour

      if (this.currentMinute > 0) {
        width += (200 * (this.currentMinute / 60))
      }

      return width
    },
    virtualItems () {
      if (!this.items) {
        return []
      }

      if (!this.items.length) {
        return []
      }

      return this.items.filter((event) => {
        return event.acf.is_virtual
      })
    },
    inPersonItems () {
      if (!this.items) {
        return []
      }

      if (!this.items.length) {
        return []
      }

      return this.items.filter((event) => {
        return !event.acf.is_virtual
      })
    },
    venuesWithEvents () {
      if (!this.items) {
        return []
      }

      if (!this.items.length) {
        return []
      }

      return this.venues.filter((venue) => {
        return this.items.filter((item) => {
          return item['festival-venues'].includes(venue.id)
        }).length
      })
    }

  },
  watch: {
    activeDay () {
      this.$nextTick(() => {
        this.setTime()
        if (this.$refs.timetable) {
          this.$refs.timetable.scrollLeft = 0
        }
      })
    }
  },
  mounted () {
    if (typeof window !== 'undefined') {
      this.setTime()
      window.addEventListener('resize', this.handleResize)
      window.addEventListener('scroll', this.stickyKey)
      window.addEventListener('resize', this.stickyKey)
    }
  },
  beforeDestroy () {
    if (this.interval) {
      clearInterval(this.interval)
    }
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('resize', this.stickyKey)
    window.removeEventListener('scroll', this.stickyKey)

    this.$store.commit('festival/setActiveEvent', null)
  },
  methods: {
    setTime () {
      const now = moment().tz('America/New_York')
      this.currentHour = 0
      this.currentMinute = 0

      if (this.activeDay) {
        const dayStart = moment(this.activeDay.acf.end_time)
        if (dayStart.isSame(now.toDate(), 'day')) {
          this.currentHour = now.hour()
          this.currentMinute = now.minute()

          if (!this.interval) {
            this.interval = setInterval(this.setTime, 60000)
          }
        }
      }
    },
    calculateEventTimetableValues (event) {
      let width = 0
      let offset = 0

      const startTime = moment(event.acf.start_time)
      const endTime = moment(event.acf.end_time)
      const dayStart = moment(this.activeDay.acf.start_time).set('hour', 8)
      let duration = endTime.diff(startTime, 'minutes')

      if (endTime.isSame(dayStart, 'day') && !startTime.isSame(dayStart, 'day')) {
        duration = endTime.diff(dayStart, 'minutes')
      }

      width = (200 * (duration / 60))
      offset = 0

      const normalisedHour = startTime.hour() - 8

      offset = 200 * normalisedHour

      if (startTime.minute() > 0) {
        offset += (200 * (startTime.minute() / 60))
      }

      if (!startTime.isSame(dayStart, 'day')) {
        if (!endTime.isSame(dayStart, 'day')) {
          width += offset
        }
        offset = 0
      }

      offset = offset + 200

      if (!endTime.isSame(dayStart, 'day')) {
        if (event.acf.is_virtual) {
          const colSpan = Math.floor((3600 - offset) / 100)
          const colStart = Math.floor(offset / 100) + 1
          return {
            colSpan,
            colStart,
            width,
            offset
          }
        }

        width = (3600 - offset)
        return {
          colSpan: 0,
          colStart: 0,
          width,
          offset
        }
      }

      if (event.acf.is_virtual) {
        const colSpan = Math.floor((width - offset) / 100) + 2 // + 2 to ignore the venue row.
        const colStart = Math.floor(offset / 100) + 1

        return {
          colSpan,
          colStart,
          width,
          offset
        }
      }

      return {
        colSpan: 0,
        colStart: 0,
        width,
        offset
      }
    },
    eventStyles (event) {
      const calcs = this.calculateEventTimetableValues(event)
      if (event.acf.is_virtual) {
        return `width: auto; grid-column: span ${calcs.colSpan} / span ${calcs.colSpan}; grid-column-start: ${calcs.colStart};`
      }

      return `width: ${calcs.width}px; left: ${calcs.offset}px;`
    },
    eventLeft (event) {
      if (this.$refs.timetable) {
        const endTime = moment(event.acf.end_time)
        const dayStart = moment(this.activeDay.acf.start_time).set('hour', 8)
        if (!endTime.isSame(dayStart, 'day')) {
          return Math.max(0, this.$refs.timetable.scrollLeft - 200)
        }
      }

      return 0
    },
    setActiveEvent (event) {
      this.$store.commit('festival/setActiveEvent', event)
    },
    drag (e) {
      if (!this.$refs.timetable) {
        return
      }

      if (!this.pos) {
        return
      }

      const dx = e.clientX - this.pos.x
      this.$refs.timetable.scrollLeft = this.pos.left - dx
    },
    setPosition (e) {
      if (!this.$refs.timetable) {
        return
      }

      this.pos = {
        left: this.$refs.timetable.scrollLeft,
        x: e.clientX
      }
    },
    updateDragBar () {
      if (!this.$refs.timetable) {
        return
      }

      if (this.dragging) {
        return
      }

      if (!this.$refs.rangeInput) {
        return
      }

      const full = (this.$refs.timetable.scrollWidth - this.$refs.timetable.clientWidth)
      const progress = (this.$refs.timetable.scrollWidth - (this.$refs.timetable.scrollWidth - this.$refs.timetable.scrollLeft))
      this.rangeScroll = Math.floor((progress / full) * 100)
    },
    updateScroll () {
      if (this.dragTimeout) {
        clearTimeout(this.dragTimeout)
      }
      this.dragging = true
      if (this.$refs.timetable) {
        if (this.rangeScroll > 1) {
          this.$refs.timetable.scrollLeft = ((this.$refs.timetable.scrollWidth - this.$refs.timetable.clientWidth) / 100) * this.rangeScroll
        } else {
          this.$refs.timetable.scrollLeft = 0
        }
      }

      this.dragTimeout = setTimeout(() => {
        this.dragging = false
      }, 1000)
    },
    handleResize () {
      this.updateDragBar()
    },
    eventsInVenue (venue) {
      const events = this.items.filter((item) => {
        return item['festival-venues'].includes(venue.id)
      })

      return events
    },
    stickyKey () {
      if (!this.$refs.timetable) {
        return
      }
      const siteHeader = document.querySelector('#site-header')

      if ((window.scrollY - (this.$refs.headerKey.offsetHeight + siteHeader?.offsetHeight)) >= this.$refs.timetable.offsetTop) {
        this.keyTop = window.scrollY - (this.$refs.timetable.offsetTop + this.$refs.headerKey.offsetHeight + siteHeader?.offsetHeight + 27)
        siteHeader.classList.add('timetable-active')
      } else {
        this.keyTop = 0
        siteHeader.classList.remove('timetable-active')
      }
    },
    collapse () {
      this.expanded = null
    },
    maybeExpand (item) {
      if (this.$refs[`item${item.id}`] && this.$refs[`item${item.id}`].length) {
        const inside = this.$refs[`item${item.id}`][0].querySelector('.whitespace-nowrap')
        if (inside) {
          this.expanded = (this.$refs[`item${item.id}`][0].clientWidth < this.$refs[`item${item.id}`][0].querySelector('.whitespace-nowrap').clientWidth ? item.id : null)
          return
        }
      }

      this.expanded = null
    }
  }
}
</script>

<style scoped>
.timetable {
  @apply relative overflow-auto min-h-[70vh] pt-10;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.timetable::-webkit-scrollbar {
  display: none;
}

.timetable__results {
  @apply relative z-10 pt-14 -mt-10 overflow-hidden w-[2550px];
}

.timetable__grid {
  @apply absolute top-10 bottom-0 left-0 flex border-l border-[#D2C7BA] w-full z-0;
}

.timetable__grid--key {
  @apply sticky top-40 2xl:top-52 bottom-auto left-auto border-transparent;
}

.timetable__grid > div {
  @apply w-[200px] flex-shrink-0;
}

.timetable__grid > div > span {
  @apply border-r border-[#D2C7BA] uppercase text-sm p-1 flex w-full h-full items-start text-center justify-center relative;
}

.timetable__grid--key > div > span {
  @apply border-transparent;
}

.timetable__grid--header {
  @apply relative z-30 top-0 h-auto left-auto -mt-4 xl:-mt-1 2xl:mt-0;
}

.timetable__grid--header > div {
  @apply bg-[#E7E1DA] sticky top-[200px];
}

.timetable__grid--header > div > span {
  @apply py-5 border-y border-[#D2C7BA] text-sm;
}

.timetable__current-time {
  @apply absolute top-0 left-0 bottom-0 w-1/13 bg-transparent bg-opacity-60 z-40 pointer-events-none;
}

.timetable__current-time__indicator {
  @apply absolute h-full right-0 top-0;
}

.timetable__current-time__indicator svg {
  @apply transform translate-x-1/2;
}

.timetable__current-time__indicator span {
  @apply border-r block h-full absolute top-0 right-0 transform translate-x-1/2;
}

input[type=range] {
  width: 100%;
  margin: 0px 0;
  background-color: transparent;
  -webkit-appearance: none;

  @apply cursor-grab block;
}

input[type=range]:focus {
  outline: none;

  @apply cursor-grabbing;
}

input[type=range]::-webkit-slider-runnable-track {
  background: transparent;
  border: 0;
  width: 100%;
  height: 20px;

  @apply cursor-grab;
}

input[type=range]:focus::-webkit-slider-runnable-track {
  @apply cursor-grabbing;
}

input[type=range]::-webkit-slider-thumb {
  margin-top: -1px;
  margin-bottom: -1px;
  width: 25%;
  height: 22px;
  -webkit-appearance: none;
  border: 1px solid #000 !important;

  @apply cursor-grab bg-[#E7E1DA] rounded-3xl;
}

input[type=range]:focus::-webkit-slider-thumb {
  @apply cursor-grabbing;
}

input[type=range]:focus::-webkit-slider-runnable-track {
  background: transparent;
}

input[type=range]::-moz-range-track {
  background: transparent;
  border: 0;
  width: 100%;
  height: 20px;

  @apply cursor-grab;
}

input[type=range]:focus::-moz-range-track {
  @apply cursor-grabbing;
}

input[type=range]::-moz-range-thumb {
  width: 100px;
  height: 20px;
  background: #000000;
  border: 0;

  @apply cursor-grab;
}

input[type=range]:focus::-moz-range-thumb {
  @apply cursor-grabbing;
}

input[type=range]::-ms-track {
  background: transparent;
  border-color: transparent;
  border-width: 0px 0;
  color: transparent;
  width: 100%;
  height: 30px;

  @apply cursor-grab;
}

input[type=range]::-ms-fill-lower {
  background: transparent;
  border: 0;
}

input[type=range]::-ms-fill-upper {
  background: transparent;
  border: 0;
}

input[type=range]::-ms-thumb {
  width: 100px;
  height: 30px;
  background: #000000;
  border: 0;
  margin-top: 0px;
  /*Needed to keep the Edge thumb centred*/

  @apply cursor-grab;
}

input[type=range]:focus::-ms-thumb {
  @apply cursor-grabbing;
}

input[type=range]:focus::-ms-fill-lower {
  background: transparent;
}

input[type=range]:focus::-ms-fill-upper {
  background: transparent;
}

/*TODO: Use one of the selectors from https://stackoverflow.com/a/20541859/7077589 and figure out
how to remove the virtical space around the range input in IE*/
@supports (-ms-ime-align:auto) {
  /* Pre-Chromium Edge only styles, selector taken from hhttps://stackoverflow.com/a/32202953/7077589 */
  input[type=range] {
    margin: 0;
    /*Edge starts the margin from the thumb, not the track as other browsers do*/
  }
}

.schedule-grid {
  grid-template-columns: repeat(36, 1fr);
  grid-template-rows: masonry;
}

</style>
