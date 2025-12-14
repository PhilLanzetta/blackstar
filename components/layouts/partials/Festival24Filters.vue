<template>
  <div id="festival-24-filters" class="transition-all duration-300 fixed z-[60] top-0 left-0 w-full h-full md:relative md:z-10 md:top-auto md:h-auto overflow-auto md:overflow-hidden" :style="`${(open ? (!enter ? `height: ${height}px;` : '') : 'height: 0px;')}`" :class="($store.state.theme==='bsf13' ? ' bg-black md:bg-bsf13purple md:rounded-b-3xl  ' : ' bg-black md:bg-transparent  ')">
    <div class="text-white md:hidden  mt-20" :class="{'pt-10 pb-16 rounded-t-3xl border-t border-x -mb-6 border-white': $store.state.theme==='bsf13', 'pb-5': $store.state.theme==='bsf14'}">
      <Container>
        <Festival24FilterSearch key="mobileSearch" />
      </Container>
    </div>
    <div ref="inside" class=" md:rounded-t-none h-full md:h-auto" :class="{'bg-bsf13purple rounded-t-3xl': $store.state.theme==='bsf13'}">
      <Container>
        <div :class="($store.state.theme==='bsf14' ? `bg-${primaryBg} rounded-3xl px-10` : '')">
        <Space />
        <div class="flex justify-between gap-4 items-baseline">
          <Festival24SecondaryHeading :layout="{heading: 'Filter by'}" />

          <button class="w-12 h-12 2xl:w-14 2xl:h-14 rounded-full  flex items-center justify-center absolute top-4 right-4 md:relative md:top-auto md:right-auto" :class="($store.state.theme==='bsf13' ? 'bg-bsf13purple border-black border' : `bg-${secondaryBg}`)" @click.prevent="handleClose">
            <svg class="block w-7 h-7 lg:w-9 lg:h-9" width="39" height="40" viewBox="0 0 39 40" fill="none"><path d="M28.6378 29.546L9.5459 10.4541" stroke="black" stroke-width="2" stroke-miterlimit="10" /><path d="M28.6378 10.4541L9.5459 29.546" stroke="black" stroke-width="2" stroke-miterlimit="10" /></svg>
            <span class="sr-only">Close</span>
          </button>
        </div>

        <Space />
        <Space />

        <div class="md:grid md:grid-cols-2 space-y-4 md:space-y-0 md:gap-8 xl:gap-x-12">
          <Festival24FilterGroup
            id="festival-category-filter"
            key="festival-category-filter"
            name="eventive-tag"
            :film-guide="filmGuide"
            :event-guide="eventGuide"
            label="Category"
            :year="year"
          />
          <Festival24FilterGroup
            v-if="schedule||eventGuide"
            id="festival-venue-filter"
            key="festival-venue-filter"
            name="festival-venues"
            label="Venue"
            :year="year"

          />
          <Festival24FilterGroup
            v-if="!eventGuide"
            id="festival-award-filter"
            key="festival-award-filter"
            name="festival-awards"
            label="Award Nomination"
            :year="year"

          />
          <Festival24FilterGroup
            v-if="!eventGuide"
            id="festival-accessibility-filter"
            key="festival-accessibility-filter"
            name="accessibility"
            label="Accessibility Features"
            :year="year"

          />
          <Festival24FilterGroup
            v-if="!eventGuide"
            id="festival-premiere-filter"
            key="festival-premiere-filter"
            name="premiere-status"
            label="Premiere Status"
            :year="year"

          />
          <Festival24FilterSearch key="desktopSearch" class="hidden md:!block" />
        </div>
        <div v-if="schedule&&!eventGuide" class="lg:hidden">
          <Space />
          <Space />
          <Space />
          <Festival24VirtualToggle :alt="true" />
        </div>
        <div v-if="schedule&&additionalLinks" class="lg:hidden">
          <Space />
          <Space />
          <Space />
          <ul class="space-y-3">
            <li v-for="(download, downloadKey) in additionalLinks" :key="`download${downloadKey}`">
              <a :href="download.link.url" target="_blank" class="flex space-x-4 leading-none items-center"><span class="underline">Download {{ download.link.title }}</span> <Festival24Icon class="flex-shrink-0" icon="download-small" :small="true" /></a>
            </li>
          </ul>
        </div>
        <div v-if="clearFilters&&filtered" class="mt-4 ml-auto mr-0 flex justify-end">
          <Festival24Button to="#" :click-handler="clearFilters">
            Clear Filters
          </Festival24Button>
        </div>
        <Space />
        <Space />
        <Space />
        </div>
        <Space v-if="$store.state.theme==='bsf14'" />
        <Space v-if="$store.state.theme==='bsf14'" />
      </Container>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Festival24Filters',
  props: {
    open: {
      type: Boolean,
      required: true
    },
    handleClose: {
      type: Function,
      required: true
    },
    schedule: {
      type: Boolean,
      required: false,
      default: false
    },
    eventGuide: {
      type: Boolean,
      required: false,
      default: false
    },
    additionalLinks: {
      type: Array,
      required: false,
      default: null
    },
    clearFilters: {
      type: Function,
      required: false,
      default: null
    },
    filmGuide: {
      type: Boolean,
      required: false,
      default: false
    },
    primaryBg: {
      type: String,
      required: false,
      default: 'bsf14pink'
    },
    secondaryBg: {
      type: String,
      required: false,
      default: 'bsf14pinkTint'
    },
    year: {
      type: Number,
      required: false,
      default: 2024
    }
  },
  data () {
    return {
      height: 0,
      enter: false
    }
  },
  computed: {
    filtered () {
      return this.$route.query && Object.keys(this.$route.query).filter((key) => { return key !== 'view' }).length
    }
  },
  watch: {
    open (to) {
      if (to) {
        this.$nextTick(() => {
          this.calcHeight()
          setTimeout(() => {
            this.enter = true
          }, 300)
        })
      } else {
        this.enter = false
      }
    }
  },
  mounted () {
    this.calcHeight()
    window.addEventListener('resize', this.calcHeight)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.calcHeight)
  },
  methods: {
    calcHeight () {
      if (this.$refs.inside) {
        if (window.outerWidth < 768) {
          this.height = window.outerHeight
          return
        }
        this.height = this.$refs.inside.offsetHeight
      }
    }
  }
}
</script>

<style scoped>

</style>
