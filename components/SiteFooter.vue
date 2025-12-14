<template>
  <footer
    v-if="!$store.state.mobileNav.open"
    ref="footer"
    class="site-footer bg-black text-white z-0"
    :class="{'sticky bottom-0': sticky, 'relative': !sticky}"
  >
    <Container class="relative z-1">
      <Space :lg="true" />
      <div class="md:flex justify-between items-end">
        <nav class="main-nav mb-8 md:mb-0 md:pr-20">
          <ul class="space-y-3" v-if="menus">
            <li class="mb-8">
              <RawLink
                v-cursor-interact-alt
                to="/"
                class="block w-10 h-10 md:w-20 md:h-20 rounded-full bg-white"
                :class="{'motion-safe:animate-color-cycle': $store.state.theme === 'default'|| $store.state.theme === 'bsf13', 'motion-safe:animate-color-cycle-festival': $store.state.theme === 'festival', 'motion-safe:animate-color-cycle-bsf11': $store.state.theme === 'bsf11'}"
              >
                <span class="sr-only">Home</span>
              </RawLink>
            </li>
            <li v-for="(menuItem, key) in menus.primary" :key="`footerMenuItem${key}`">
              <RawLink v-cursor-interact-alt :to="menuItem.link.url|replaceSiteUrl">
                <span v-html="menuItem.link.title"></span>
              </RawLink>
            </li>
          </ul>
        </nav>
        <div class="max-w-xl w-full">
          <NewsletterSignup color-scheme="white" />
          <SocialNav />
        </div>
      </div>
      <div
        class="xl:flex justify-between items-stretch mt-10 pt-10 border-dotted border-t-5 border-white font-serif_italic text-sm"
      >
        <nav class="mb-8 xl:mb-0 xl:max-w-sm secondary-nav" v-if="menus">
          <ul class="flex flex-wrap">
            <li v-for="(menuItem, key) in menus.secondary" :key="`footerSecondaryMenuItem${key}`">
              <RawLink v-cursor-interact-alt :to="menuItem.link.url|replaceSiteUrl">
                <span v-html="menuItem.link.title"></span>
              </RawLink>
            </li>
          </ul>
        </nav>
        <div class="flex lg:justify-end items-stretch flex-wrap space-y-2 md:space-y-0 md:space-x-10" v-if="menus">
          <span class="w-full md:w-auto">&copy; 2025 BlackStar</span>
          <RawLink class="mr-2 lg:mr-0"  v-for="(menuItem, key) in menus.legal_menu" :key="`legalMenuItem${key}`" v-cursor-interact-alt :to="menuItem.link.url|replaceSiteUrl">
            <span v-html="menuItem.link.title"></span>
          </RawLink>
          <span class="w-full lg:text-right mt-auto flex items-end justify-end mb-0"><MadeWithLove /></span>
        </div>
      </div>
      <Space :lg="true" />
    </Container>
  </footer>
</template>

<script>

export default {
  name: 'SiteFooter',
  data () {
    return {
      sticky: false
    }
  },
  computed: {
    menus () {
      return this.$store.state.settings.footer_menus
    }
  },
  mounted () {
    window.addEventListener('resize', this.handleResize, { passive: true })
    this.$nextTick(() => {
      this.handleResize()
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize () {
      if (!this.$refs.footer) {
        return
      }

      this.sticky = (window.outerHeight > this.$refs.footer.offsetHeight)
    }
  }
}
</script>

<style>
.main-nav li {
  @apply text-3xl 2xl:text-4xl font-medium;
}

.secondary-nav li {
  @apply block w-1/2 sm:w-1/3 md:w-auto md:mr-10 xl:mr-0 xl:w-5/12 mb-2;
}

.site-footer a:hover:not(.made-with-love) {
  @apply text-teal;
}

.site-footer .main-nav li a:hover {
  @apply text-white font-serif_italic font-normal text-2xl 2xl:text-3xl;
}

</style>
