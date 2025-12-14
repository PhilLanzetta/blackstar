<template>
  <ClientOnly>
    <div>
      <div
        class="sticky top-0 text-black w-full z-50 transition-all duration-200"
        :class="{'pt-3 lg:pt-10 bg-transparent': $store.state.festival.takeoverOpen, 'bg-bsf22green': !$store.state.festival.takeoverOpen}"
      >
        <button
          v-if="!$store.state.festival.takeoverOpen"
          v-cursor-interact
          class="absolute top-0 left-0 w-full h-full uppercase text-center flex justify-center items-center font-sans font-medium"
          @click.prevent="toggleModal"
        >
          Buy 2023 Festival Early Bird Passes
        </button>
        <span class="block container max-w-screen-2xl mx-auto px-4 sm:px-8 flex justify-end">
          <button
            v-cursor-interact
            class="pointer-events-auto transition-transform duration-200 block p-2.5"
            :class="{'transform rotate-45': $store.state.festival.takeoverOpen}"
            @click.prevent="toggleModal"
          ><SeenCloseIcon class="h-6 w-6 block" /><span v-if="$store.state.festival.takeoverOpen" class="sr-only">Close 2023 Festival Announcement</span><span
            v-if="!$store.state.festival.takeoverOpen"
            class="sr-only"
          >Buy 2023 Festival Early Bird Passes</span></button></span>
      </div>
      <transition name="slide-down">
        <div
          v-if="$store.state.festival.takeoverOpen"
          ref="modal"
          role="dialog"
          aria-modal="true"
          class="bg-bsf22Bg text-black top-0 left-0 fixed w-full h-full z-40 overflow-auto scroll-smooth"
        >
          <FestivalTwentyThreeLanding :close-modal-handler="closeModal">
            <button
              v-cursor-interact
              class="py-10 bg-black w-full text-white text-xl font-medium flex items-center justify-center space-x-4 text-center"
              @click.prevent="closeModal"
            >
              <ArrowShort />
              <span>Back to BlackStar</span>
            </button>
          </FestivalTwentyThreeLanding>
        </div>
      </transition>
    </div>
  </ClientOnly>
</template>

<script>
import SeenCloseIcon from '~/assets/seen/close-icon.svg?inline'
import ArrowShort from '~/assets/arrow.svg?inline'

export default {
  name: 'FestivalTwentyThreeTakeover',
  components: {
    SeenCloseIcon,
    ArrowShort
  },
  watch: {
    '$store.state.festival.takeoverOpen' () {
      this.$nextTick(() => {
        this.maybeFocusAndTogglePreventScroll()
      })
    }
  },
  mounted () {
    document.addEventListener('keydown', this.maybeClose)
    document.addEventListener('keydown', this.maybeTrapFocus)

    this.$nextTick(() => {
      this.maybeOpenOnLaunch()
    })
  },
  beforeDestroy () {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    document.removeEventListener('keydown', this.maybeClose)
    document.removeEventListener('keydown', this.maybeTrapFocus)
    if (document.querySelector('html')) {
      document.querySelector('html').classList.remove('no-scroll')
    }
  },
  methods: {
    maybeOpenOnLaunch () {
      const cookie = this.$cookies.get('festival-takeover', { fromRes: true })

      if (cookie && cookie === 'festival23announcement') {
        return
      }

      this.$store.commit('festival/openTakeover')
      this.$cookies.set('festival-takeover', 'festival23announcement', {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
    },
    toggleModal () {
      if (this.$store.state.festival.takeoverOpen) {
        this.closeModal()
        return
      }

      this.$store.commit('festival/openTakeover', null)
    },
    closeModal () {
      this.$store.commit('festival/closeTakeover', null)
    },
    maybeClose (e) {
      if (!this.$store.state.festival.takeoverOpen) {
        return
      }

      if (e.key !== 'Escape') {
        return
      }

      this.closeModal()
    },
    maybeFocusAndTogglePreventScroll () {
      if (!this.$store.state.festival.takeoverOpen || !this.$refs.modal) {
        document.querySelector('html').classList.remove('no-scroll')
        return
      }

      document.querySelector('html').classList.add('no-scroll')

      if (!this.$refs.scrollButton) {
        return
      }

      this.$refs.scrollButton.focus()
    },
    maybeTrapFocus (e) {
      if (!this.$store.state.festival.takeoverOpen) {
        return
      }

      const isTabPressed = e.key === 'Tab' || e.keyCode === 9

      if (isTabPressed) {
        const $activeModal = this.$refs.modal
        if ($activeModal) {
          const focusableContent = $activeModal.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')
          if (focusableContent.length) {
            const firstFocusableElement = focusableContent[0]
            const lastFocusableElement = focusableContent[focusableContent.length - 1]
            if (e.shiftKey) {
              if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus()
                e.preventDefault()
              }
            } else if (document.activeElement === lastFocusableElement) {
              firstFocusableElement.focus()
              e.preventDefault()
            }
          }
        }
      }
    }
  }
}
</script>

<style>

</style>
