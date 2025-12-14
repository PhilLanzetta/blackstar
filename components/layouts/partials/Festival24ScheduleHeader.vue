<script>
import updateRouteQuery from '~/mixins/updateRouteQuery'

export default {
  name: 'Festival24ScheduleHeader',
  mixins: [updateRouteQuery],
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
    activeView: {
      type: String,
      required: false,
      default: 'day'
    },
    mySchedule: {
      type: Boolean,
      required: false,
      default: false
    },
    clearFilters: {
      type: Function,
      required: false,
      default: null
    },
    scheme: {
      type: String,
      required: false,
      default: ''
    },
    year: {
      type: Number,
      required: false,
      default: 2024
    }
  },
  data () {
    return {
      filtersOpen: false
    }
  },
  computed: {
    title () {
      if (this.post.acf.custom_title) {
        return this.post.acf.custom_title
      }

      return this.post.title.rendered
    },
    tooltipBackground () {
      if (this.$store.state.theme === 'bsf14') {
        if (this.scheme) {
          if (this.scheme === 'orange') {
            return 'bsf14orange'
          }

          if (this.scheme === 'red') {
            return 'bsf14cherry'
          }
        }
        return 'bsf14pink'
      }

      return 'beige'
    }
  },
  methods: {
    openDownloadsModal () {
      this.$store.commit('festival/setDownloads', { heading: this.post.acf.additional_links_heading, downloads: this.post.acf.additional_links })
    },
    closeFilters () {
      this.filtersOpen = false
    }
  }
}
</script>

<template>
  <div :class="{'bg-gradient-to-b from-bsf14pink to-bsf14pinkTint transition-all duration-200 pb-5': $store.state.theme==='bsf14'&&!scheme, 'bg-gradient-to-b from-bsf14orangeTint to-bsf14orange pb-5': $store.state.theme==='bsf14'&&scheme==='orange', 'bg-gradient-to-b from-bsf14cherryTint to-bsf14cherry pb-5': $store.state.theme==='bsf14'&&scheme==='red', 'from-[0%] to-[60%]': !filtersOpen, 'md:from-[0%] md:to-[20%]': filtersOpen}">
    <Container>
      <div class="gap-4 justify-between items-center" :class="{'block md:flex': mySchedule, 'flex': !mySchedule}">
        <div class="flex space-x-4 items-start">
          <Festival24Heading :layout="{'heading': title}" />
          <Festival23HelpTextButton v-if="post.acf.help_text" :help-text="post.acf.help_text" />
        </div>
        <div v-if="post.template !== 'views/festival-event-guide.blade.php' && !mySchedule" class="hidden lg:block">
          <Festival24VirtualToggle />
        </div>
        <Festival23MyScheduleViewFilters v-if="mySchedule" />
        <div class="flex space-x-4 items-center">
          <Festival24Tooltip v-if="!mySchedule" tooltip="Filter" :bg="tooltipBackground">
            <button aria-controls="festival-24-filters" :aria-expanded="filtersOpen" @click="filtersOpen=!filtersOpen">
              <Festival24Icon :icon="(scheme ? `filter-${scheme}` : 'filter')" :large="true" />
            </button>
          </Festival24Tooltip>
          <div class="hidden lg:flex space-x-4 items-center">
            <template v-if="post.acf.additional_links && !mySchedule">
              <Festival24Tooltip tooltip="Download"  :bg="tooltipBackground">
                <button @click.prevent="openDownloadsModal">
                  <Festival24Icon :icon="(scheme ? `download-${scheme}` : 'download')" :large="true" />
                </button>
              </Festival24Tooltip>
            </template>
            <template v-if="showTimeView">
              <Festival24Tooltip tooltip="Calendar View" :bg="tooltipBackground">
                <button :class="{'opacity-50': activeView!=='day'}" @click.prevent="updateQueryVar('view', 'time')">
                  <Festival24Icon :icon="(scheme ? `calendar-${scheme}` : 'calendar')" :large="true" />
                </button>
              </Festival24Tooltip>
              <Festival24Tooltip tooltip="List View"  :bg="tooltipBackground">
                <button :class="{'opacity-50': activeView==='day'}" @click.prevent="updateQueryVar('view', 'day')">
                  <Festival24Icon :icon="(scheme ? `list-${scheme}` : 'list')" :large="true" />
                </button>
              </Festival24Tooltip>
            </template>
          </div>
        </div>
      </div>
      <div class="flex justify-between items-start space-x-4" />
      <Space />
      <Space class="hidden md:block" />
      <Space class="hidden md:block" />
    </Container>
    <ClientOnly>
      <div :class="($store.state.theme==='bsf13' ? ' border-t border-black ' : '')" />
      <Festival24Filters
        :handle-close="closeFilters"
        :open="filtersOpen"
        :schedule="true"
        :event-guide="post.template==='views/festival-event-guide.blade.php'"
        :additional-links="(post.acf.additional_links ? post.acf.additional_links : [])"
        :clear-filters="clearFilters"
        :primary-bg="(scheme==='orange' ? 'bsf14orangeTint' : 'bsf14pink')"
        :secondary-bg="(scheme==='orange' ? 'bsf14orange' : 'bsf14pinkTint')"
        :year="year"
      />
    </ClientOnly>
  </div>
</template>

<style scoped>

</style>
