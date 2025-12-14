<template>
  <ClientOnly>
    <span
      v-show="shouldShow"
      class="hidden lg:block pointer-events-none overflow-hidden transform select-none sticky-cta-wrapper"
      :class="{'-mt-96  -translate-y-full hidden lg:block pb-5': $store.state.theme === 'festival', '-mt-80 -translate-y-1/2': $store.state.theme === 'bsf11'}"
    >
      <span
        class="flex justify-end mr-5 pointer-events-none transform motion-safe:transition-transform duration-200"
        :class="{'translate-x-0': active, 'translate-x-72 2xl:translate-x-64': !active}"
        @mouseenter="mouseEnter"
        @mouseleave="mouseLeave"
      >
        <span class="pointer-events-auto relative" @click="setCookie">
          <FestivalCloseButton :alt="true" class="absolute top-10 right-0 z-50" :click-handler="setAngryCookie" />
          <SiteLink :click-handler="clickHandler" :to="link|replaceSiteUrl">
            <span
              :class="stickyCtaStyles"
            >
              <span class="block transform relative z-10" :class="{'rotate-12': $store.state.theme === 'festival'}">
                <span
                  class="block"
                  :class="{'font-festival_sans_light_italic': $store.state.theme === 'festival'}"
                  v-html="line1"
                />
                <span
                  v-if="line2&&$store.state.theme==='festival'"
                  class="block sticky-cta__action"
                  :class="{'font-festival_sans underline': $store.state.theme === 'festival'}"
                  v-html="line2"
                />
                <span class="block mt-4"><FestivalButton
                  v-if="line2&&$store.state.theme==='bsf11'"
                  to="#"
                  :click-handler="doNothing"
                ><span v-html="line2" /></FestivalButton></span>

              </span>
              <ShapeCloud />
            </span>
          </SiteLink>
        </span>
      </span>
    </span>
  </ClientOnly>
</template>

<script>
import ShapeCloud from '~/assets/festival/11/shape-cloud.svg?inline'

export default {
  name: 'FestivalStickyCta',
  components: {
    ShapeCloud
  },
  props: {
    line1: {
      type: String,
      required: true
    },
    line2: {
      type: String,
      required: false,
      default: ''
    },
    link: {
      type: String,
      required: true
    },
    styleName: {
      type: String,
      required: true
    },
    clickHandler: {
      type: Function,
      required: false,
      default: null
    }
  },
  data () {
    return {
      active: false,
      timeout: null,
      shown: false,
      clicked: false
    }
  },
  computed: {
    shouldShow () {
      if (this.clicked) {
        return false
      }

      const dismissedCookie = this.$cookies.get('sticky-cta-dismissed', { fromRes: true })
      if (dismissedCookie) {
        return false
      }

      const cookie = this.$cookies.get('sticky-cta', { fromRes: true })
      if (!cookie) {
        return true
      }

      return cookie !== this.line1
    },
    stickyCtaStyles () {
      let styles
      if (this.$store.state.theme === 'bsf11') {
        styles = [
          'font-bsf11_sans sticky-cta--bsf11 leading-none'
        ]
      } else {
        styles = [
          'fw-80 h-60 transform -rotate-12 mt-10 text-3xl leading-snug'
        ]

        if (this.styleName === 'navy') {
          styles.push('bg-navy text-pink hover:text-beige')
        }

        if (this.styleName === 'red') {
          styles.push('bg-red text-navy hover:text-white')
        }
      }

      styles = styles.concat(['sticky-cta flex items-center justify-center text-center']).join(' ')
      return styles
    }
  },
  mounted () {
    document.addEventListener('scroll', this.onScroll, { passive: true })
  },
  beforeDestroy () {
    document.removeEventListener('scroll', this.onScroll)
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  },
  methods: {
    onScroll () {
      if (!this.shown) {
        this.active = true
        this.shown = true
      }

      if (!this.active) {
        return
      }

      if (this.timeout) {
        clearTimeout(this.timeout)
      }

      this.timeout = setTimeout(() => {
        this.active = false
      }, 3000)
    },
    mouseEnter () {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.shown = true
      this.active = true
    },
    mouseLeave () {
      if (!this.active) {
        return
      }

      this.timeout = setTimeout(() => {
        this.active = false
      }, 3000)
    },
    setCookie () {
      this.clicked = true
      this.$cookies.set('sticky-cta', this.line1, {
        path: this.$route.fullPath,
        maxAge: 60 * 60 * 24 * 7
      })
    },
    setAngryCookie () {
      this.clicked = true
      this.$cookies.set('sticky-cta-dismissed', true, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
    },
    doNothing () {
      // do nothing
    }
  }
}
</script>

<style>
.sticky-cta {
  border-radius: 100%;
}

.sticky-cta--bsf11 {
  @apply rounded-none w-80 h-80 text-4xl leading-none;
}

.sticky-cta-wrapper a:hover .sticky-cta--bsf11 .festival-btn-wrapper::before {
  @apply translate-x-1.5 translate-y-1.5;
}

.sticky-cta-wrapper a:hover .sticky-cta--bsf11 .festival-btn-wrapper::after {
  @apply translate-y-3 translate-x-3 delay-75;
}

.sticky-cta--bsf11 svg {
  @apply absolute top-0 left-0 w-full h-full block z-0 pointer-events-none;
}
</style>
