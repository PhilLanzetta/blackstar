<template>
  <div v-if="button" class="fixed top-[25vh] right-0 z-40 pointer-events-none transform transition-transform duration-200" :class="{'translate-x-full': !visible}" @click="hide">
    <SiteLink :to="button.url|replaceSiteUrl" class-names="bg-bsf13purple text-normal p-6 border rounded-l-2xl pointer-events-auto">
      <span v-html="button.title" />
    </SiteLink>
  </div>
</template>

<script>
export default {
  name: 'Festival24StickyButton',
  data () {
    return {
      hidden: true,
      visible: false,
      stickyTriggerOffset: 0
    }
  },
  computed: {
    button () {
      if (this.hidden) {
        return false
      }

      if (this.$store.state.settings?.festival?.sticky_button?.enable_global_sticky_button) {
        return this.$store.state.settings.festival.sticky_button.button
      }

      return false
    }
  },
  mounted () {
    if (!this.$cookies.get('festival-24-sticky-cta-dismissed')) {
      this.hidden = false
    }

    if (typeof window === 'undefined') {
      return
    }

    window.addEventListener('scroll', this.onScroll, { passive: true })
    this.$nextTick(() => {
      if (document.getElementById('trigger-sticky')) {
        this.stickyTriggerOffset = document.getElementById('trigger-sticky').offsetTop
      }
    })
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    hide () {
      this.hidden = true
      this.$cookies.set('festival-24-sticky-cta-dismissed', true, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
    },
    onScroll () {
      if (!window.scrollY) {
        return
      }

      if (this.hidden) {
        window.removeEventListener('scroll', this.onScroll)
        return
      }

      if (this.stickyTriggerOffset) {
        this.visible = (window.scrollY > this.stickyTriggerOffset)
        return
      }

      this.visible = (window.scrollY > (window.innerHeight * 0.75))
    }
  }
}
</script>

<style scoped>

</style>
