<template>
  <div v-if="shouldShow" class="relative z-30" :class="{'-mt-border': $store.state.theme==='festival', 'pl-6': $store.state.theme==='bsf11'&&!button, 'inline-block': $store.state.theme==='bsf13'}" @mouseleave="open=false">
    <FestivalButton v-if="$store.state.theme==='festival'||button" default-font="font-festival_sans_light_italic" to="#" :click-handler="toggle">
      Add to Calendar
    </FestivalButton>
    <button v-if="$store.state.theme==='bsf11'&&!button" v-cursor-interact class="py-0.5 text-bsf11Purple" @click.prevent="toggle">
      Add to calendar
    </button>
    <button v-if="($store.state.theme==='bsf12'||$store.state.theme==='bsf13')&&!button" class="leading-tight mb-4" :class="{'border-b-3': $store.state.theme==='bsf12', 'underline text-sm': $store.state.theme==='bsf13'}" @click.prevent="toggle">
      <span>Add to Calendar</span>
    </button>
    <add-to-calendar
      v-if="open"
      :title="title"
      :location="location"
      :start="start"
      :end="end"
      :details="details"
      inline-template
    >
      <div class="add-to-calendar-dropdown" :class="`add-to-calendar-dropdown--${$store.state.theme}`">
        <ul>
          <li>
            <google-calendar v-cursor-interact>
              Add to Google
            </google-calendar>
          </li>
          <li v-cursor-interact>
            <microsoft-calendar v-cursor-interact>
              Add to Outlook
            </microsoft-calendar>
          </li>
          <li v-cursor-interact>
            <office365-calendar v-cursor-interact>
              Add to Outlook.com
            </office365-calendar>
          </li>
        </ul>
      </div>
    </add-to-calendar>
  </div>
</template>

<script>
import moment from 'moment-timezone'

export default {
  name: 'FestivalAddToCalendarButton',
  props: {
    title: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: false,
      default: null
    },
    timeZone: {
      type: String,
      required: true
    },
    details: {
      type: String,
      required: true
    },
    button: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      open: false
    }
  },
  computed: {
    start () {
      return new Date(moment.tz(this.startTime, this.timeZone).format())
    },
    end () {
      if (!this.endTime) {
        return new Date(moment.tz(this.startTime, this.timeZone).add(1, 'hours').format())
      }

      return new Date(moment.tz(this.endTime, this.timeZone).format())
    },
    shouldShow () {
      return true
      /*
      const checkTime = moment().tz('America/New_York')
      if (checkTime.isSameOrAfter(moment.tz((this.endTime ? this.endTime : this.startTime), 'America/New_York'))) {
        return false
      }

      return true */
    }
  },
  methods: {
    toggle () {
      this.open = !this.open
    }
  }
}
</script>

<style>
.add-to-calendar-dropdown {
  @apply absolute;
}

.add-to-calendar-dropdown--festival {
  @apply border-5 border-navy bg-white p-4  -mt-border;
}

.add-to-calendar-dropdown--bsf11 ul {
  @apply block bg-white p-4 rounded-xl border-3 lg:border-4 border-black;
}

.add-to-calendar-dropdown ul li {
  @apply block mb-2;
}

.add-to-calendar-dropdown ul li:last-child {
  @apply mb-0;
}

.add-to-calendar-dropdown ul li a:hover {
  @apply text-blue;
}

.add-to-calendar-dropdown--bsf12 ul {
  @apply block bg-black text-white py-2 px-4 text-sm;
}

.add-to-calendar-dropdown--bsf12 ul li a:hover {
  @apply text-white underline;
}

.add-to-calendar-dropdown--bsf12::before {
  @apply w-10 h-10 bg-black transform rotate-45 -top-1 left-4 z-0 absolute block;

  content: " ";
}

.add-to-calendar-dropdown--bsf12 ul {
  @apply relative z-10;
}

.add-to-calendar-dropdown--bsf13 {
  @apply bg-black text-white p-3 rounded-md text-sm leading-none;
}

.add-to-calendar-dropdown--bsf13 ul li a:hover {
  @apply text-white underline;
}

</style>
