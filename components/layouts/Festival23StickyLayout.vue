<template>
  <div>
    <div class="lg:flex items-stretch lg:flex-row-reverse">
      <div class="relative z-30 -mx-4 sm:-mx-8 -mt-6 mb-6 md:-mt-10 lg:mb-10 lg:my-0 lg:mx-0" :class="`bg-${sectionColour}` + (wide ? ' lg:w-4/12 xl:w-3/12 ' : ' lg:w-4/12 xl:w-1/4 3xl:w-1/5  ')">
        <button v-if="!hideToggle" class="p-4 sm:px-8 text-white bg-black w-full flex items-center space-x-4 lg:hidden text-left text-lg fixed top-14 sm:top-20 z-30" @click.prevent="sidebarOpen=!sidebarOpen">
          <span>{{ toggleLabel }}</span><span><svg class="w-6 h-5 block transform transition-transform duration-300" :class="{'rotate-180': sidebarOpen}">
            <use xlink:href="#icon-arrow-down" />
          </svg></span>
        </button>
        <div v-if="!hideToggle" class="h-20 lg:hidden"></div>
        <div ref="sidebar" class="bg-black lg:bg-transparent" :class="{'lg:sticky lg:top-44 3xl:top-56': canStick, 'hidden lg:block': !sidebarOpen, 'block fixed top-0 z-20 pt-32 sm:pt-36 bottom-0 w-full h-full left-0 overflow-auto lg:relative lg:top-auto lg:bottom-auto lg:h-auto lg:left-auto lg:h-auto lg:pt-0 ': sidebarOpen}">
          <slot name="sidebar" />
        </div>
      </div>
      <div :class="{'lg:w-8/12 xl:w-3/4 3xl:w-4/5': !wide, 'lg:w-8/12 xl:w-9/12': wide}">
        <div class="lg:pr-8">
          <slot />
        </div>
      </div>
    </div>
    <span class="hidden lg:block absolute h-full right-0 top-0 w-1/4 pointer-events-none block z-0" :class="`bg-${sectionColour}`" />
  </div>
</template>

<script>
import Festival23SectionColors from '~/mixins/festival23SectionColors'

export default {
  name: 'Festival23StickyLayout',
  mixins: [Festival23SectionColors],
  props: {
    wide: {
      type: Boolean,
      required: false,
      default: false
    },
    toggleLabel: {
      type: String,
      required: false,
      default: 'Toggle'
    },
    hideToggle: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      canStick: true,
      sidebarOpen: false
    }
  },
  watch: {
    '$route.fullPath' () {
      this.sidebarOpen = false
      document.querySelector('html').classList.remove('no-scroll')
    },
    sidebarOpen (to) {
      if (to) {
        document.querySelector('html').classList.add('no-scroll')
      } else {
        document.querySelector('html').classList.remove('no-scroll')
      }
    }
  },
  mounted () {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.maybeStick)
      this.$nextTick(() => {
        this.maybeStick()
      })
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.maybeStick)
    document.querySelector('html').classList.remove('no-scroll')
  },
  methods: {
    maybeStick () {
      if (!this.$refs.sidebar) {
        return
      }

      const sidebarSpace = this.$refs.sidebar.offsetHeight + document.getElementById('site-header').offsetHeight

      this.canStick = (window.innerHeight > sidebarSpace)
    }
  }
}
</script>

<style scoped>

</style>
