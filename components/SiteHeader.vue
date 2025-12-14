<template>
  <header
    id="site-header"
    ref="header"
    class="sticky top-0 z-50 transition-colors duration-500 motion-reduce:transition-none"
    :class="themeStylesHeader"
    @mouseleave="$store.commit('setMegaNav', null)"
  >
    <div class="container max-w-screen-2xl mx-auto px-4 sm:px-8">
      <div
        v-if="$store.state.theme!=='seen'"
        key="blackstar-header-inside"
        class="flex justify-between items-center relative z-10 transition-colors duration-500 motion-reduce:transition-none"
        :class="themeStyles + ' ' + themeStylesHeaderInside"
      >
        <SiteLink class="w-40 sm:w-52 2xl:w-64" to="/">
          <Logo />
        </SiteLink>
        <button
          v-cursor-interact
          class="mobile-toggle"
          :class="{'open': $store.state.mobileNav.open, 'active': mobileToggleActive}"
          @click.prevent="toggleMobileNav"
          @mouseenter="mobileToggleActive=true"
          @mouseleave="mobileToggleActive=false"
        >
          <span class="mobile-toggle__icon" /> <span>{{ mobileToggleText }}</span>
        </button>
        <div
          v-if="$store.state.theme==='default'||$store.state.theme==='bsf13'"
          class="hidden lg:flex items-center justify-start space-x-6 2xl:space-x-8"
        >
          <nav
            v-if="$store.state.settings.header_menus&&$store.state.settings.header_menus.main"
            class="site-nav"
            :class="`site-nav--${$store.state.theme}`"
          >
            <ul
              v-if="$store.state.settings.header_menus.main.length"
              class="flex items-center justify-start 2xl:text-lg"
            >
              <li
                v-for="(menuItem, key) in $store.state.settings.header_menus.main"
                :key="`menuItem${key}`"
                @mouseenter="maybeOpenMegaNav(menuItem)"
              >
                <SiteLink
                  :to="menuItem.link.url|replaceSiteUrl"
                  :class="{'active': menuItem.mega_nav&&$store.state.megaNav===menuItem.mega_nav}"
                >
                  <span v-html="menuItem.link.title" />
                </SiteLink>
              </li>
              <li>
                <SiteLink to="/search">
                  <span>Search</span>
                </SiteLink>
              </li>
            </ul>
          </nav>
        </div>
        <div
          v-if="$store.state.theme==='bsf10'||$store.state.theme==='bsf11'||$store.state.theme==='festival'"
          class="hidden lg:flex items-center justify-start space-x-6 2xl:space-x-8"
        >
          <nav v-if="$store.state.settings.header_menus" class="site-nav" :class="`site-nav--${$store.state.theme}`">
            <ul class="flex items-center justify-start 2xl:text-lg">
              <li
                v-for="(menuItem, key) in festivalMenuItemsByTheme($store.state.theme)"
                :key="`menuItem${key}`"
                @mouseenter="maybeOpenMegaNav(menuItem)"
              >
                <SiteLink
                  :to="menuItem.link.url|replaceSiteUrl"
                  :class="{'active': menuItem.mega_nav&&$store.state.megaNav===menuItem.mega_nav}"
                >
                  <span v-html="menuItem.link.title" />
                </SiteLink>
              </li>
              <li>
                <SiteLink to="https://festival.blackstarfest.org/passes">
                  <span
                    v-if="$store.state.festival.loggedIn&&!$store.state.festival.loggedInGuest"
                  >My Account</span> <span v-else>Log-in</span>
                </SiteLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div
        v-if="$store.state.theme==='seen'&&$store.state.settings.seen"
        key="seen-header-inside"
        class="relative z-10 transition-colors duration-500 motion-reduce:transition-none"
        :class="themeStyles + ' ' + themeStylesHeaderInside"
      >
        <div class="flex justify-between items-center ">
          <div class="w-1/3 relative" :class="{'opacity-30': $store.state.seen.headerSearchOpen}">
            <SiteLink class-names="blackstar-logo-tran" to="/#home">
              <BlackStarBLogo class="blackstar-logo-tran__b" />
              <Logo class="blackstar-logo-tran__full" />
            </SiteLink>
          </div>
          <SiteLink to="/seen" :class="{'opacity-30': $store.state.seen.headerSearchOpen}">
            <SeenLogo class="block w-28 h-10 lg:w-48 lg:h-16" />
          </SiteLink>

          <div
            class="w-1/3 flex justify-end items-center space-x-20"
            :class="{'opacity-30': $store.state.seen.headerSearchOpen}"
          >
            <SiteLink
              v-if="$store.state.settings&&$store.state.settings.seen&&$store.state.settings.seen.header_cta&&$store.state.settings.seen.header_cta.url"
              :to="$store.state.settings.seen.header_cta.url|replaceSiteUrl"
              class="hidden lg:block lg:text-lg"
            >
              <span v-html="$store.state.settings.seen.header_cta.title" />
            </SiteLink>
          </div>
        </div>
        <transition name="fade-in-down">
          <nav
            v-if="$store.state.settings&&$store.state.settings.seen&&$store.state.settings.seen.main_menu"
            class="seen-menu text-center font-seen_serif_light_italic text-base lg:text-xl pt-2 lg:pt-6"
          >
            <ul class="flex items-center justify-center space-x-4 sm:space-x-8">
              <li
                v-for="(seenMenuItem, seenMenuItemKey) in $store.state.settings.seen.main_menu"
                :class="{'seen-menu__link--active': seenMenuItem.link.title==='Read' && ($route.path.includes('/seen/category') || $route.path.includes('/seen/author'))}"
                :key="`seenMenuItem${seenMenuItemKey}`"
              >
                <SiteLink :to="seenMenuItem.link.url|replaceSiteUrl">
                  <span v-html="seenMenuItem.link.title" />
                </SiteLink>
              </li>
              <li class="flex-shrink-0">
                <SiteLink
                  to="/seen/read"
                  :click-handler="toggleSeenSearch"
                  class="flex items-center justify-center flex-shrink-0 seen-search-link"
                  :class="{'seen-search-link--active': $store.state.seen.headerSearchOpen}"
                >
                  <img src="~/assets/seen/search.svg" class="block lg:hidden w-5 h-5" alt="Search">
                  <span v-if="!$store.state.seen.headerSearchOpen" class="hidden lg:block allow-click">Search</span>
                  <span v-if="$store.state.seen.headerSearchOpen" class="hidden lg:block">Close</span>
                </SiteLink>
              </li>
            </ul>
          </nav>
        </transition>
      </div>
      <ClientOnly v-if="$store.state.settings&&$store.state.settings.mega_navs&&$store.state.settings.mega_navs.length">
        <MqLayout mq="xl+">
          <MegaNav
            v-for="megaNav in $store.state.settings.mega_navs"
            :key="`megaNav${megaNav.id}`"
            :mega-nav="megaNav"
          />
        </MqLayout>
      </ClientOnly>
      <ClientOnly>
        <MqLayout :mq="['sm', 'md', 'lg']">
          <MobileNav v-if="$store.state.mobileNav.open" />
        </MqLayout>
      </ClientOnly>
    </div>
    <template v-if="$store.state.theme === 'seen' && $store.state.seen.headerSearchOpen">
      <div class="position absolute top-0 left-0 w-full h-full cursor-pointer z-20" @click.prevent="closeSeenSearch" />
      <SeenHeaderSearch />
    </template>
  </header>
</template>

<script>
import SeenLogo from '~/assets/seen-logo.svg?inline'
import BlackStarBLogo from '~/assets/blackstar-b.svg?inline'
import seenToc from '~/mixins/seenToc'
import festivalMenuItems from '~/mixins/festivalMenuItems'

export default {
  name: 'SiteHeader',
  components: {
    SeenLogo,
    BlackStarBLogo
  },
  mixins: [seenToc, festivalMenuItems],
  data () {
    return {
      mobileToggleActive: false,
      seenScrollToggled: false
    }
  },
  computed: {
    themeStylesHeader () {
      if (this.$store.state.theme === 'seen') {
        return 'border-b border-black ' + (this.$store.state.seen.headerSearchOpen ? ' seen-search-open ' : '') + this.themeStyles
      }

      return this.themeStyles
    },
    themeStyles () {
      if (this.$store.state.theme === 'seen') {
        return 'bg-white text-black'
      }

      if (this.$store.state.theme === 'festival') {
        return 'bg-pink text-black'
      }

      if (this.$store.state.theme === 'bsf11') {
        return 'bg-bsf11Teal text-black'
      }

      return 'bg-offWhite text-black'
    },
    themeStylesHeaderInside () {
      if (this.$store.state.theme === 'seen') {
        return 'py-2 sm:py-4  2xl:py-6'
      }

      return 'py-4 sm:py-6  2xl:py-8'
    },
    mobileToggleText () {
      return (this.$store.state.mobileNav.open ? 'Close' : (this.mobileToggleActive ? 'Open' : 'Menu'))
    }
  },
  watch: {
    '$route' () {
      this.$store.commit('seen/closeHeaderSearch')
    }
  },
  mounted () {
    window.addEventListener('resize', this.setHeaderOffset, {
      passive: true
    })
    this.setHeaderOffset()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setHeaderOffset)
  },
  methods: {
    toggleMobileNav () {
      this.$store.commit('mobileNav/toggle')
    },
    setHeaderOffset () {
      this.$nextTick(() => {
        if (this.$refs.header) {
          this.$store.commit('cover/setHeaderOffset', this.$refs.header.offsetHeight)
        }
      })
    },
    maybeOpenMegaNav (menuItem) {
      if (!menuItem.mega_nav) {
        return
      }

      this.$store.commit('setMegaNav', menuItem.mega_nav)
    },
    toggleSeenSearch () {
      if (this.$store.state.seen.headerSearchOpen) {
        this.$store.commit('seen/closeHeaderSearch')
      } else {
        this.$store.commit('seen/openHeaderSearch')
      }
    },
    closeSeenSearch () {
      this.$store.commit('seen/closeHeaderSearch')
    }
  }
}
</script>

<style>
.site-nav li a {
  @apply block text-center py-2 px-5;
}

.site-nav li.short a {
  @apply block text-center py-2 w-24;
}

.site-nav li a.nuxt-link-active {
  @apply font-sans font-medium;
}

.site-nav.site-nav--bsf11 li a.nuxt-link-active {
  @apply font-normal font-sans;
}

.site-nav.site-nav--bsf11 li a.nuxt-link-exact-active {
  @apply font-medium font-sans;
}

.site-nav.site-nav--bsf11 li a {
  @apply text-black;
}

.site-nav li a:hover,
.site-nav li.active a {
  @apply font-serif_italic;
}

.site-nav.site-nav--bsf11 li a:hover,
.site-nav.site-nav--bsf11 li.active a {
  @apply font-sans font-medium opacity-80;
}

.mobile-toggle {
  @apply flex lg:hidden space-x-2 items-start justify-center lg:hidden leading-tight font-medium p-2.5 md:text-xl md:leading-5 focus:outline-none focus:text-purple;
}

.mobile-toggle__icon {
  @apply w-4 h-4 md:w-5 md:h-5 rounded-full bg-black block;
}

.mobile-toggle:focus .mobile-toggle__icon, .mobile-toggle.open .mobile-toggle__icon, .mobile-toggle.active .mobile-toggle__icon {
  @apply bg-purple;
}

.mobile-toggle.open, .mobile-toggle.active {
  @apply text-purple;
}

#site-header.bg-pink .mobile-toggle:focus .mobile-toggle__icon, #site-header.bg-pink .mobile-toggle.open .mobile-toggle__icon, #site-header.bg-pink .mobile-toggle.active .mobile-toggle__icon {
  @apply bg-blue;
}

#site-header.bg-pink .mobile-toggle.open, #site-header.bg-pink .mobile-toggle.active {
  @apply text-blue
}

#site-header.bg-bsf11Teal .mobile-toggle:focus .mobile-toggle__icon, #site-header.bg-bsf11Teal .mobile-toggle.open .mobile-toggle__icon, #site-header.bg-bsf11Teal .mobile-toggle.active .mobile-toggle__icon {
  @apply bg-bsf11Purple;
}

#site-header.bg-bsf11Teal .mobile-toggle.open, #site-header.bg-bsf11Teal .mobile-toggle.active, #site-header.bg-bsf11Teal .mobile-toggle:focus {
  @apply text-bsf11Purple
}

.seen-mobile-toggle {
  @apply p-2 w-10 h-9 flex flex-shrink-0 flex-col justify-between block outline-none items-end;
}

.seen-mobile-toggle span:not(.sr-only) {
  @apply w-full block h-0.5 bg-black transition-transform duration-200;
}

.seen-mobile-toggle--active span:not(.sr-only) {
  @apply transform rotate-45 -translate-y-2 origin-center;
}

.seen-mobile-toggle--active span:not(.sr-only):first-child {
  @apply -rotate-45 translate-y-2.5;
}

.seen-mobile-toggle span:not(.sr-only):nth-child(2n) {
  @apply w-10/12;
}

.seen-mobile-toggle--active span:not(.sr-only):nth-child(2n) {
  @apply opacity-0
}

.seen-menu a {
  @apply border-b border-transparent inline-block pb-0.5;
}

.seen-menu a.nuxt-link-exact-active,
.seen-menu__link--active a {
  @apply border-black;
}

.blackstar-logo-tran__b {
  @apply block w-7 h-7 lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 opacity-100 transition-opacity duration-500 ease-in-out;
}

.blackstar-logo-tran__full {
  @apply hidden lg:block w-52 2xl:w-64 absolute top-0 left-0 mt-1 ml-2.5 2xl:mt-2 2xl:ml-3 block opacity-0 transition-opacity duration-500 ease-in-out;
}

.blackstar-logo-tran:hover .blackstar-logo-tran__b {
  @apply opacity-0;
}

.blackstar-logo-tran:hover .blackstar-logo-tran__full {
  @apply opacity-100;
}

.seen-search-open .seen-menu a {
  @apply opacity-30 border-transparent;
}

.seen-search-open .seen-menu .seen-search-link--active a {
  @apply opacity-100 border-black;
}

</style>
