<template>
  <div class="cursor-auto bg-beige z-10 bsf13-wrap">
    <a href="#main" class="sr-only focus:not-sr-only">Skip to content</a>
    <Festival24SiteHeader />
    <Festival24Tabs />
    <main id="main" class="site-wrapper bg-beige">
      <Nuxt :key="$route.path" keep-alive />
    </main>
    <Festival24NewsletterSignup />
    <Festival24NewsletterSignupTwo />
    <Festival24SiteFooter />
    <span class="hidden bsf13-dynamic-styles" />
    <Festival24Icons />
    <Festival24StickyButton class="hidden lg:block" />
    <LivePreviewNotice />
    <transition name="fade-in-down">
      <Festival24TrailerModal v-if="$store.state.festival.trailer" />
    </transition>
    <transition name="fade-in-down">
      <Festival24ActiveEventModal v-if="$store.state.festival.activeEvent" />
    </transition>
    <transition name="fade-in-down">
      <Festival24BioModal
        v-if="$store.state.festival.activeBio"
        :team-member="$store.state.festival.activeBio.bio"
        :event-id="$store.state.festival.activeBio.eventId"
        :modal-colour="$store.state.festival.activeBio.bgColour"
        :close-bio="handleCloseBio"
      />
    </transition>
    <transition name="fade-in-down">
      <Festival24LoginModal v-if="$store.state.festival.loginModalOpen" />
    </transition>
    <transition name="fade-in-down">
      <Festival24HelpModal v-if="$store.state.festival.helpText" />
    </transition>
    <transition name="fade-in-down">
      <Festival24DownloadsModal v-if="$store.state.festival.downloads" />
    </transition>
    <transition name="fade-in-down">
      <Festival24ExternalTicketsNotice v-if="$store.state.festival.externalTicketsNotice" />
    </transition>
  </div>
</template>

<script>
import scrollToHash from '~/mixins/scrollToHash'

export default {
  name: 'Bsf13',
  mixins: [scrollToHash],
  mounted () {
    this.$store.commit('setTheme', 'bsf13')
    this.$store.commit('mobileNav/close')
    this.$store.commit('setMegaNav', null)
  },
  created () {
    this.$store.commit('setTheme', 'bsf13')
    this.$store.commit('mobileNav/close')
    this.$store.commit('setMegaNav', null)
  },
  methods: {
    handleCloseBio () {
      this.$store.commit('festival/setActiveBio', null)
    }
  }
}
</script>

<style>
.bsf13-dynamic-styles {
  @apply bg-bsf13green bg-bsf13purple bg-bsf13orange lg:bg-bsf13green lg:bg-bsf13purple lg:bg-bsf13orange lg:bg-beige;
}

.bsf14-dyanmic-styles {
  @apply bg-bsf14cherry bg-bsf14orange bg-bsf14orangeTint bg-bsf14pink bg-bsf14pinkTint bg-bsf14yellow bg-bsf14yellowTint;
}
</style>
