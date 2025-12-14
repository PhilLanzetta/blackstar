<template>
  <ClientOnly>
    <div>
      <Container>
        <div class="flex justify-between items-center space-x-4">
          <template v-if="!mySchedule">
            <Festival23Links v-if=" post.acf.additional_links" :links="post.acf.additional_links" :inline="true" />
          </template>
          <template v-else>
            <Festival23MyScheduleViewFilters />
          </template>
          <Festival23ScheduleViewSwitcher :active-view="activeView" :show-time-view="true" />
        </div>
      </Container>
      <Space />
      <Space />
      <div class="border-t-2 border-black" />
      <Space />

      <Container v-if="activeDay">
        <div class="relative">
          <Space :md="true" />
          <div class="flex justify-center items-center space-x-4">
            <Festival23SwiperButton
              id="prev-day"
              :click-handler="prevScheduleDay"
              :disabled="!hasPastDays"
            />
            <Festival23H2 size="lg">
              <span v-html="activeDay.name" /><sup>{{ activeDay.acf.suffix }}</sup>
            </Festival23H2>
            <Festival23SwiperButton
              id="next-day"
              :click-handler="nextScheduleDay"
              type="next"
              :disabled="!hasUpcomingDays"
            />
          </div>
          <div v-if="!mySchedule" class="absolute right-0 bottom-0">
            <Festival23FilterToggle
              id="show-virtual-toggle"
              name="virtual"
              label="Also Show Virtual?"
              :section-colour="sectionColour"
            />
          </div>
        </div>
        <Space />
        <Festival23Box :bg="`bg-${sectionColour}`" :x-small="true" :outline="true">
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
        </Festival23Box>
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
          <div class="timetable__results">
            <div
              v-for="item in inPersonItems"
              :key="`festivalEvent${item.id}`"
              class="-mt-0.5"
              :style="eventStyles(item)"
            >
              <Festival23EventTimeCard
                :key="`festivalEventCard${item.id}`"
                :item="item"
                :section-colour="sectionColour"
                :click-handler="setActiveEvent"
                :active="$store.state.festival.activeEvent&&$store.state.festival.activeEvent.id===item.id"
              />
            </div>
            <div
              v-for="item in virtualItems"
              :key="`festivalVirtualEvent${item.id}`"
              class="-mt-0.5"
              :style="eventStyles(item)"
            >
              <Festival23EventTimeCard
                :key="`festivalVirtualEventCard${item.id}`"
                :item="item"
                :section-colour="sectionColour"
                :click-handler="setActiveEvent"
                :active="$store.state.festival.activeEvent&&$store.state.festival.activeEvent.id===item.id"
                :left="eventLeft(item)"
              />
            </div>
          </div>
          <div class="timetable__grid">
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
          <div class="timetable__current-time" :style="`width: ${currentTimeWidth}px`">
            <div class="timetable__current-time__indicator">
              <svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 0H0V2.78824L4.215 6.83676L4.23853 6.85762L8.54945 11L11.4505 10.9983L11.4958 10.9548L15.7398 6.88022L17.2346 5.44264L20 2.78824V0Z"
                  fill="black"
                />
              </svg>
              <span />
            </div>
          </div>
        </div>
      </Container>
      <Container v-else class="min-h-screen">
        <template v-if="ready&&!$fetchState.pending">
          <Space :lg="true" />
          <Festival23H2 size="md">
            No events found
          </Festival23H2>
          <Festival23Prose v-if="mySchedule" class="my-4">
            <p>Add some saved events by tapping the heart button next to any event in the schedule or buy tickets to add to My Schedule.</p>
          </Festival23Prose>
          <div class="flex my-10 space-x-4">
            <Festival23Button to="/festival/schedule">
              View Schedule
            </Festival23Button>
          </div>
        </template>
      </Container>
      <Transition name="fade">
        <Festival23Loader v-if="$fetchState.pending" />
      </Transition>
    </div>
  </ClientOnly>
</template>

<script>
import moment from 'moment-timezone'
import hasFestivalSchedule from '~/mixins/hasFestivalSchedule'
import festival23SectionColors from '~/mixins/festival23SectionColors'

export default {
  name: 'Festival23ScheduleByTime',
  mixins: [hasFestivalSchedule, festival23SectionColors],
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
      dragTimeout: null
    }
  },
  computed: {
    currentTimeWidth () {
      let width = 0

      const normalisedHour = this.currentHour - 8

      if (normalisedHour <= 0 && this.currentMinute === 0) {
        return 0
      }

      width = 150 * normalisedHour

      if (this.currentMinute > 0) {
        width += (150 * (this.currentMinute / 60))
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
    }
  },
  beforeDestroy () {
    if (this.interval) {
      clearInterval(this.interval)
    }
    window.removeEventListener('resize', this.handleResize)
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
    eventStyles (event) {
      let width = 0
      let offset = 0

      const startTime = moment(event.acf.start_time)
      const endTime = moment(event.acf.end_time)
      const dayStart = moment(this.activeDay.acf.start_time).set('hour', 8)
      let duration = endTime.diff(startTime, 'minutes')

      if (endTime.isSame(dayStart, 'day') && !startTime.isSame(dayStart, 'day')) {
        duration = endTime.diff(dayStart, 'minutes')
      }

      width = (150 * (duration / 60))
      offset = 0

      const normalisedHour = startTime.hour() - 8

      offset = 150 * normalisedHour

      if (startTime.minute() > 0) {
        offset += (150 * (startTime.minute() / 60))
      }

      if (!startTime.isSame(dayStart, 'day')) {
        if (!endTime.isSame(dayStart, 'day')) {
          width += offset
        }
        offset = 0
      }

      if (!endTime.isSame(dayStart, 'day')) {
        return 'width: auto'
      }

      return `width: ${width}px; margin-left: ${offset}px;`
    },
    eventLeft (event) {
      if (this.$refs.timetable) {
        const endTime = moment(event.acf.end_time)
        const dayStart = moment(this.activeDay.acf.start_time).set('hour', 8)
        if (!endTime.isSame(dayStart, 'day')) {
          return this.$refs.timetable.scrollLeft
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
    }
  }
}
</script>

<style scoped>
.timetable {
  @apply relative pt-10 overflow-auto min-h-[70vh];

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
  @apply absolute top-0 bottom-0 left-0 flex border-l-2 border-black border-opacity-25 w-full z-0;
}

.timetable__grid--key {
  @apply sticky top-40 2xl:top-52 bottom-auto left-auto border-transparent;
}

.timetable__grid > div {
  @apply w-[150px] flex-shrink-0;
}

.timetable__grid > div > span {
  @apply border-r-2 border-opacity-25 border-black uppercase text-sm p-1 flex w-full h-full items-start text-center justify-center;
}

.timetable__grid--key > div > span {
  @apply border-transparent;
}

.timetable__current-time {
  @apply absolute top-0 left-0 bottom-0 w-1/13 bg-bsf12blue bg-opacity-60 z-20 pointer-events-none;
}

.timetable__current-time__indicator {
  @apply absolute h-full right-0 top-0;
}

.timetable__current-time__indicator svg {
  @apply transform translate-x-1/2;
}

.timetable__current-time__indicator span {
  @apply border-r-2 border-dashed block h-full absolute top-0 -right-0.5;
}

input[type=range] {
  width: 100%;
  margin: 0px 0;
  background-color: transparent;
  -webkit-appearance: none;

  @apply cursor-grab;
}

input[type=range]:focus {
  outline: none;

  @apply cursor-grabbing;
}

input[type=range]::-webkit-slider-runnable-track {
  background: transparent;
  border: 0;
  width: 100%;
  height: 30px;

  @apply cursor-grab;
}

input[type=range]:focus::-webkit-slider-runnable-track {
  @apply cursor-grabbing;
}

input[type=range]::-webkit-slider-thumb {
  margin-top: 0px;
  width: 100px;
  height: 30px;
  background: url("assets/festival/12/drag-tab.svg") no-repeat;
  background-size: 100px 30px;
  border: 0;
  -webkit-appearance: none;

  @apply cursor-grab;
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
  height: 30px;

  @apply cursor-grab;
}

input[type=range]:focus::-moz-range-track {
  @apply cursor-grabbing;
}

input[type=range]::-moz-range-thumb {
  width: 100px;
  height: 30px;
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

</style>
