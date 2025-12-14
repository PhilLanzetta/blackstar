<template>
  <div class="hidden lg:flex space-x-6 items-center">
    <button :class="{'opacity-50': activeView!=='day'}" :aria-checked="activeView==='day'" @click.prevent="setByDay">
      <svg>
        <use xlink:href="#icon-square-calendar" />
      </svg>  <span>By Day</span>
    </button>
    <button v-if="showTimeView" :class="{'opacity-50': activeView!=='time'}" :aria-checked="activeView==='time'" @click.prevent="setByTime">
      <svg>
        <use xlink:href="#icon-square-time" />
      </svg>
      <span>By Time</span>
    </button>
  </div>
</template>

<script>
import updateRouteQuery from '~/mixins/updateRouteQuery'

export default {
  name: 'Festival23ScheduleViewSwitcher',
  mixins: [updateRouteQuery],
  props: {
    activeView: {
      type: String,
      required: false,
      default: 'day'
    },
    showTimeView: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    setByDay () {
      this.updateQueryVar('view', 'day')
    },
    setByTime () {
      this.updateQueryVar('view', 'time')
    }
  }
}
</script>

<style scoped>
button {
  @apply flex space-x-1 items-center justify-center leading-none;
}

button svg {
  @apply block w-8 h-8;
}
</style>
