<template>
  <div
    class="block h-screen overflow-auto -mx-4 sm:-mx-8"
    :class="{'bg-offWhite' : $store.state.theme === 'default', 'bg-pink' : $store.state.theme === 'festival', 'bg-bsf11Teal' : $store.state.theme === 'bsf11'}"
  >
    <div class="pb-40">
      <Container>
        <!--        <div v-if="$store.state.theme==='bsf11'">
                  <FestivalButton to="https://watch.blackstarfest.org/">
                    Watch
                  </FestivalButton>
                </div>-->

        <template v-if="$store.state.theme!=='bsf11'">
          <nav
            v-if="$store.state.settings.header_menus"
            class="mobile-nav py-4 mb-10 border-b-4 border-dotted border-black"
            :class="{'sub-nav-active': subNav, 'mobile-nav--festival': $store.state.theme === 'festival', 'mobile-nav--bsf11': $store.state.theme === 'bsf11'}"
          >
            <ul>
              <li
                v-for="(menuItem, key) in $store.state.settings.header_menus.main"
                :key="`menuItem${key}`"
                :class="{'active': subNav===menuItem.mega_nav}"
              >
                <template v-if="menuItem.mega_nav">
                  <a
                    v-if="subNav!==menuItem.mega_nav"
                    :href="menuItem.link.url|replaceSiteUrl"
                    @click.prevent="subNav=menuItem.mega_nav"
                  >
                    <span v-html="menuItem.link.title" />
                  </a>
                  <SiteLink v-if="subNav===menuItem.mega_nav" :to="menuItem.link.url|replaceSiteUrl">
                    <span v-html="menuItem.link.title" />
                  </SiteLink>
                  <ul v-if="subNav===menuItem.mega_nav&&getMegaNavById(menuItem.mega_nav)">
                    <li
                      v-for="(subMenuItem, subMenuItemKey) in getMegaNavById(menuItem.mega_nav).menu_items"
                      :key="`menu${key}subMenuItem${subMenuItemKey}`"
                    >
                      <SiteLink :to="subMenuItem.menu_item.url|replaceSiteUrl">
                        <span v-html="subMenuItem.menu_item.title" />
                      </SiteLink>
                    </li>
                  </ul>
                </template>
                <template v-if="!menuItem.mega_nav">
                  <SiteLink :to="menuItem.link.url|replaceSiteUrl">
                    <span v-html="menuItem.link.title" />
                  </SiteLink>
                </template>
              </li>
              <li>
                <SiteLink to="/search">
                  <span>Search</span>
                </SiteLink>
              </li>
            </ul>

            <!--          <button v-cursor-interact-alt class="search-toggle mt-8" @click.prevent="$store.commit('search/open')">
                        <SearchToggleIcon />
                        <span class="sr-only">Open Search Form</span>
                      </button>-->
          </nav>

          <template v-if="subNav">
            <MegaNavFeatureItems
              v-if="getMegaNavById(subNav)"
              key="subNavMegaNavItems"
              :mega-nav="getMegaNavById(subNav)"
            />
          </template>
          <template v-if="!subNav">
            <MegaNavFeatureItems v-if="getRandomMegaNav()" key="randomMegaNavItems" :mega-nav="getRandomMegaNav()" />
          </template>
        </template>

        <template v-if="$store.state.theme==='bsf11'">
          <nav
            v-if="$store.state.settings.header_menus"
            class="mobile-nav py-4 mb-10"
            :class="{'sub-nav-active': subNav, 'mobile-nav--festival': $store.state.theme === 'festival', 'mobile-nav--bsf11': $store.state.theme === 'bsf11'}"
          >
            <ul>
              <li
                v-for="(menuItem, key) in $store.state.settings.header_menus.festival"
                :key="`menuItem${key}`"
                :class="{'active': subNav===menuItem.mega_nav}"
              >
                <SiteLink :to="menuItem.link.url|replaceSiteUrl">
                  <span v-html="menuItem.link.title" />
                </SiteLink>
              </li>
              <li>
                <SiteLink to="https://festival.blackstarfest.org/passes">
                  <span v-if="$store.state.festival.loggedIn&&!$store.state.festival.loggedInGuest">My Account</span> <span v-else>Log-in</span>
                </SiteLink>
              </li>
            </ul>
          </nav>
        </template>
      </Container>
    </div>
  </div>
</template>

<script>
import MegaNavFeatureItems from '~/components/MegaNavFeatureItems'

export default {
  name: 'MobileNav',
  components: { MegaNavFeatureItems },
  data () {
    return {
      subNav: null
    }
  },
  watch: {
    '$nuxt.$route' () {
      this.$store.commit('mobileNav/close')
      this.$nextTick(() => {
        this.$store.commit('mobileNav/close')
      })
    }
  },
  methods: {
    getMegaNavById (id) {
      if (!this.$store.state.settings.mega_navs) {
        return false
      }

      const matches = this.$store.state.settings.mega_navs.filter((megaNav) => {
        return megaNav.id === id
      })

      if (!matches.length) {
        return false
      }

      return matches[0]
    },
    getRandomMegaNav () {
      if (!this.$store.state.settings.mega_navs) {
        return false
      }

      return this.$store.state.settings.mega_navs[Math.floor(Math.random() * this.$store.state.settings.mega_navs.length)]
    }
  }
}
</script>

<style>
nav.mobile-nav > ul > li {
  @apply text-4xl font-medium mb-2;
}

nav.mobile-nav.sub-nav-active {
  @apply text-gray;
}

nav.mobile-nav--festival.sub-nav-active {
  @apply text-white;
}

nav.mobile-nav.sub-nav-active .active {
  @apply text-black;
}

nav.mobile-nav ul li a {
  @apply py-2 inline-block;
}

nav.mobile-nav ul li a.nuxt-link-active {
  @apply text-blue font-serif_italic_alt;
}

nav.mobile-nav ul li ul li {
  @apply text-lg font-normal;
}

nav.mobile-nav ul li ul {
  @apply mb-5;
}

nav.mobile-nav--bsf11 > ul > li {
  @apply font-bsf11_sans text-6xl;
}

nav.mobile-nav--bsf11 > ul > li > ul > li {
  @apply font-sans font-medium text-lg;
}

nav.mobile-nav--bsf11 ul li a.nuxt-link-active {
  @apply font-bsf11_sans text-black;
}

nav.mobile-nav--bsf11 > ul > li > ul > li a.nuxt-link-active {
  @apply font-sans text-bsf11Purple;
}
</style>
