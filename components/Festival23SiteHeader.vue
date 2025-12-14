<template>
  <header id="site-header" class="sticky top-0 z-40 bg-beige">
    <div class="hidden lg:block bg-black text-white py-1.5 2xl:py-2.5">
      <Container>
        <nav class="secondary">
          <ul class="flex justify-end items-center space-x-8 text-sm">
            <li>
              <SiteLink to="/">
                <span class="flex space-x-1 items-baseline"><span>Back to BlackStar</span> <span><svg class="block w-3 h-2"><use xlink:href="#icon-ext" /></svg></span></span>
              </SiteLink>
            </li>
            <li>
              <SiteLink to="/news">
                News
              </SiteLink>
            </li>
            <li><a href="https://shop.blackstarfest.org" target="_blank">Merch</a></li>
          </ul>
        </nav>
      </Container>
    </div>
    <div class="py-4 sm:py-5 lg:pt-4 lg:pb-3 3xl:pt-5 3xl:pb-4 4xl:pt-8 4xl:pb-4 transition-colors duration-200 relative z-50" :class="{'bg-black text-white lg:bg-bsf12Bg lg:text-black': mobileMenuOpen, 'bg-bsf12Bg text-black': !mobileMenuOpen}">
      <Container>
        <div class="flex justify-between items-center">
          <div class="block lg:hidden">
            <SiteLink to="/festival/">
              <svg class="block w-56 h-6 xs:w-58 xs:h-8 sm:w-64 sm:h-10">
                <use xlink:href="#svg-logo-sm" />
              </svg>
              <span class="sr-only">BlackStar Festival 2023 - August 2nd to 6th</span>
            </SiteLink>
          </div>
          <button class="festival-burger" :class="{'festival-burger--active': mobileMenuOpen}" @click.prevent="toggleMobileMenu">
            <span class="festival-burger__inside">
              <span />
              <span />
              <span />
            </span>
            <span class="sr-only">Toggle Main Menu</span>
          </button>
          <div class="hidden lg:block -mb-6 2xl:-mb-8 4xl:-mb-10">
            <SiteLink to="/festival/">
              <img src="~/assets/festival/12/logo.svg" class="block w-[226.6816px] h-[92.672px] 2xl:w-[283.352px] 2xl:h-[115.84px] 4xl:w-[354.19px] 4xl:h-[144.8px]" alt="BlackStar Festival 2023 - August 2nd to 6th">
            </SiteLink>
          </div>
          <nav class="text-lg 2xl:text-xl 4xl:text-2xl primary hidden lg:flex">
            <ul class="flex justify-end items-center space-x-8">
              <li
                v-for="(menuItem, key) in festivalMenuItemsByTheme($store.state.theme)"
                :key="`menuItem${key}`"
              >
                <Festival23HeaderNavItem :to="menuItem.link.url|replaceSiteUrl">
                  <span v-html="menuItem.link.title" />
                </Festival23HeaderNavItem>
              </li>
              <li>
                <ClientOnly>
                  <Festival23HeaderNavItem to="https://festival.blackstarfest.org/login" :click-handler="($store.state.festival.loggedIn&&!$store.state.festival.loggedInGuest ? null : handleLogin )">
                    <span v-if="$store.state.festival.loggedIn&&!$store.state.festival.loggedInGuest">My Account</span>  <span v-else>Sign In</span>
                  </Festival23HeaderNavItem>
                </ClientOnly>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </div>
    <Transition name="slide-down">
      <div v-if="mobileMenuOpen" class="festival-mobile-menu">
        <div class="festival-mobile-menu__inside">
          <ul class="space-y-8 mb-8 py-6 border-y border-darkGray text-xl sm:text-2xl">
            <li
              v-for="(menuItem, key) in festivalMenuItemsByTheme($store.state.theme)"
              :key="`menuItem${key}`"
            >
              <SiteLink :to="menuItem.link.url|replaceSiteUrl">
                <span v-html="menuItem.link.title" />
              </SiteLink>

              <ul v-if="menuItem.submenu_items&&menuItem.submenu_items.length" class="flex -mx-4 flex-wrap text-sm sm:text-base text-darkGray py-2">
                <li
                  v-for="(subMenuitem, subKey) in menuItem.submenu_items"
                  :key="`subMenuItem${key}-${subKey}`"
                  class="px-4 py-2"
                >
                  <SiteLink :to="subMenuitem.link.url|replaceSiteUrl">
                    <span v-html="subMenuitem.link.title" />
                  </SiteLink>
                </li>
              </ul>
            </li>
          </ul>
          <ul class="space-y-4 text-sm sm:text-base text-darkGray">
            <li>
              <ClientOnly>
                <SiteLink to="https://festival.blackstarfest.org/login"  :click-handler="($store.state.festival.loggedIn&&!$store.state.festival.loggedInGuest ? null : handleLogin )">
                  <span v-if="$store.state.festival.loggedIn&&!$store.state.festival.loggedInGuest">My Account</span>  <span v-else>Sign In</span>
                </SiteLink>
              </ClientOnly>
            </li>
            <li>
              <SiteLink to="/news">
                News
              </SiteLink>
            </li>
            <li><a href="https://shop.blackstarfest.org" target="_blank">Merch</a></li>
            <li>
              <SiteLink to="/">
                Back to BlackStar
              </SiteLink>
            </li>
          </ul>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script>
import festivalMenuItems from '~/mixins/festivalMenuItems'

export default {
  name: 'Festival23SiteHeader',
  mixins: [festivalMenuItems],
  data () {
    return {
      mobileMenuOpen: false
    }
  },
  watch: {
    '$nuxt.$route' () {
      this.mobileMenuOpen = false
    }
  },
  methods: {
    toggleMobileMenu () {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    handleLogin () {
      this.$store.commit('festival/openLogin')
    }
  }
}
</script>

<style scoped>
.festival-burger {
  @apply block p-1 lg:hidden;
}

.festival-burger__inside {
  @apply relative block w-6 h-4;
}

.festival-burger__inside span {
  @apply h-0.5 bg-black w-full block absolute left-0 top-1/2 transition-all duration-200;
}

.festival-burger__inside span:first-child {
  @apply top-0 translate-y-0;
}

.festival-burger__inside span:last-child {
  @apply top-full translate-y-0;
}

.festival-burger--active .festival-burger__inside span {
  @apply bg-white opacity-0;
}

.festival-burger--active .festival-burger__inside span:first-child {
  @apply rotate-45 opacity-100 top-1/2;
}

.festival-burger--active .festival-burger__inside span:last-child {
  @apply -rotate-45 opacity-100 top-1/2;
}

.festival-mobile-menu {
  @apply fixed lg:hidden top-0 left-0 w-full h-full bg-black text-white z-40 overflow-auto;
}

.festival-mobile-menu__inside {
  @apply pt-16 sm:pt-20 px-4 sm:px-8 pb-20;
}

</style>
