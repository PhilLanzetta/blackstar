<template>
  <header id="site-header" class="sticky -mb-11 w-full top-0 z-50 bg-black rounded-b-3xl lg:rounded-b-4xl" :class="{'!fixed !mb-0': $store.state.theme==='bsf14'}">
    <div class="hidden lg:block rounded-b-3xl text-black py-1.5" :class="{'bg-bsf13purple': $store.state.theme==='bsf13', 'bg-bsf14yellowTint': $store.state.theme==='bsf14'}">
      <Container>
        <nav class="secondary px-6 lg:px-8">
          <ul class="flex justify-end items-center space-x-8 text-sm">
            <li>
              <SiteLink to="/">
                <span class="flex space-x-1 items-baseline"><span>Back to BlackStar</span> <span><svg class="block w-3 h-2"><use xlink:href="#icon-ext" /></svg></span></span>
              </SiteLink>
            </li>
            <li  v-for="(menuItem, key) in festivalTopMenuItemsByTheme($store.state.theme)"
                 :key="`topMenuItem${key}`">
              <SiteLink :to="menuItem.link.url|replaceSiteUrl">
                <span v-html="menuItem.link.title" />
              </SiteLink>
            </li>

          </ul>
        </nav>
      </Container>
    </div>
    <div class="pt-4 pb-6 lg:py-6 transition-colors duration-200 bg-black rounded-b-3xl lg:rounded-b-4xl relative z-50" :class="{'text-white lg:bg-bsf12Bg lg:text-black': mobileMenuOpen, 'text-beige': !mobileMenuOpen}">
      <Container>
        <div class="flex justify-between items-center px-1 sm:px-6 lg:px-8">
          <div class="block lg:hidden">
            <SiteLink v-if="$store.state.theme==='bsf13'" to="/festival/">
              <img src="~/assets/festival/13/logo.svg" class="block w-[120px] h-[60px]" alt="BlackStar Festival 2024 - August 1st to 4th">
              <span class="sr-only">BlackStar Festival 2024 - August 1st to 4th</span>
            </SiteLink>
            <SiteLink v-if="$store.state.theme==='bsf14'" to="/festival/">
              <img src="~/assets/festival/14/logo-mobile-new.svg" class="block w-[220px] h-auto" alt="BlackStar Festival 2025 - July 31st to 3rd August">
              <span class="sr-only">BlackStar Festival 2025 - July 31st to 3rd August</span>
            </SiteLink>
          </div>
          <button class="festival-burger" :class="{'festival-burger--active': mobileMenuOpen}" @click.prevent="toggleMobileMenu">
            <span class=" lg:hidden w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl" :class="{'bg-bsf13purple': $store.state.theme==='bsf13', 'bg-bsf14pink': $store.state.theme==='bsf14'}">
              <span class="festival-burger__inside">
                <span />
                <span />
                <span />
              </span>
              <span class="sr-only">Toggle Main Menu</span>
            </span>
          </button>
          <div class="hidden lg:block mr-10">
            <SiteLink v-if="$store.state.theme==='bsf13'" to="/festival/">
              <img src="~/assets/festival/13/logo-desktop.svg" class="block" alt="BlackStar Festival 2024 - August 1st to 4th">
            </SiteLink>
            <SiteLink v-if="$store.state.theme==='bsf14'" to="/festival/">
              <img src="~/assets/festival/14/logo-new.svg" class="block" alt="BlackStar Festival 2025 - July 31st to August 3rd">
            </SiteLink>
          </div>
          <div class="text-lg 2xl:text-xl 4xl:text-2xl primary hidden lg:flex">
            <div class="flex justify-end items-center space-x-8">
              <div
                v-for="(menuItem, key) in festivalMenuItemsByTheme($store.state.theme)"
                :key="`menuItem${key}`"
              >
                <Festival24HeaderNavItem :to="menuItem.link.url|replaceSiteUrl" :menu-item="menuItem">
                  <span class="whitespace-nowrap" v-html="menuItem.link.title" />
                </Festival24HeaderNavItem>
              </div>
              <ClientOnly>
                <div>
                  <Festival24HeaderNavItem to="https://festival.blackstarfest.org/login" :click-handler="($store.state.festival.loggedIn&&!$store.state.festival.loggedInGuest ? null : handleLogin )" :menu-item="{colour: 'bsf14pinkTint'}">
                    <span v-if="$store.state.festival.loggedIn&&!$store.state.festival.loggedInGuest" class="whitespace-nowrap">My Account</span>
                    <span v-else class="whitespace-nowrap">Login</span>
                  </Festival24HeaderNavItem>
                </div>
              </ClientOnly>
            </div>
          </div>
        </div>
      </Container>
    </div>
    <Transition name="slide-down">
      <div v-if="mobileMenuOpen" class="festival-mobile-menu" :class="`festival-mobile-menu--${$store.state.theme}`">
        <div class="festival-mobile-menu__inside">
          <ul class="space-y-4 mb-7 pb-2 pt-12 text-2xl">
            <li
              v-for="(menuItem, key) in festivalMenuItemsByTheme($store.state.theme)"
              :key="`menuItem${key}`"
            >
              <SiteLink :to="menuItem.link.url|replaceSiteUrl">
                <span v-html="menuItem.link.title" />
              </SiteLink>
            </li>
          </ul>
          <ul class="space-y-4 text-sm text-black">
            <li>
              <SiteLink to="/">
                <span class="flex items-center">
                  <span class="flex space-x-1 items-baseline"><span>Back to BlackStar</span> <span><svg class="block w-3 h-2"><use xlink:href="#icon-ext" /></svg></span></span>
                </span>
              </SiteLink>
            </li>
            <li>
              <ClientOnly>
                <SiteLink to="https://festival.blackstarfest.org/login" :click-handler="($store.state.festival.loggedIn&&!$store.state.festival.loggedInGuest ? null : handleLogin )">
                  <span v-if="$store.state.festival.loggedIn&&!$store.state.festival.loggedInGuest" class="text-black">My Account</span>
                  <span v-else class="text-black">Login</span>
                </SiteLink>
              </ClientOnly>
            </li>
            <li  v-for="(menuItem, key) in festivalTopMenuItemsByTheme($store.state.theme)"
                 :key="`menuTopMenuItem${key}`">
              <SiteLink :to="menuItem.link.url|replaceSiteUrl">
                <span v-html="menuItem.link.title" />
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
  name: 'Festival24SiteHeader',
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
      this.mobileMenuOpen = false
    }
  }
}
</script>

<style scoped>
.festival-burger {
  @apply block lg:hidden;
}

.festival-burger__inside {
  @apply relative block w-5 h-4 sm:w-6 sm:h-5;
}

.festival-burger__inside span {
  @apply h-[3px] bg-black w-full block absolute left-0 top-1/2 transition-all duration-200;
}

.festival-burger__inside span:first-child {
  @apply top-0 translate-y-0;
}

.festival-burger__inside span:last-child {
  @apply top-full translate-y-0;
}

.festival-burger--active .festival-burger__inside span {
  @apply bg-black opacity-0 w-7 -left-0.5;
}

.festival-burger--active .festival-burger__inside span:first-child {
  @apply rotate-45 opacity-100 top-1/2;
}

.festival-burger--active .festival-burger__inside span:last-child {
  @apply -rotate-45 opacity-100 top-1/2;
}

.festival-mobile-menu {
  @apply fixed lg:hidden top-0 left-0 w-full text-black lg:bg-black lg:text-white z-40 overflow-auto rounded-b-3xl;
}

.festival-mobile-menu--bsf13 {
  @apply bg-bsf13green border border-black;
}

.festival-mobile-menu--bsf14 {
  @apply bg-bsf14pinkTint;
}

.festival-mobile-menu__inside {
  @apply pt-20 pb-8 px-4;
}

.timetable-active {
  @apply !rounded-b-none;
}

</style>
