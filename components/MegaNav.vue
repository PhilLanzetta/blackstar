<template>
  <div v-if="open" ref="nav" class="mega-nav py-10 transition-all transform delay-300 duration-300 ease-in-out z-0 absolute top-full left-0 w-full motion-reduce:transition-none" :class="{'-translate-y-full': !active&&!$store.state.cover.visible, 'translate-y-full': !active&&$store.state.cover.visible, 'translate-y-0': active, 'opacity-0': !active, 'opacity-100': active, 'bg-offWhite' : $store.state.theme === 'default'||$store.state.theme === 'bsf13', 'bg-pink' : $store.state.theme === 'festival', 'bg-bsf11Teal' : $store.state.theme === 'bsf11'}">
    <div class="container max-w-screen-2xl mx-auto px-4 sm:px-8">
      <div class="flex justify-between transition-opacity delay-500 duration-500 motion-reduce:transition-none motion-reduce:opacity-100" :class="{'opacity-0': !active, 'opacity-100': active}">
        <nav class="w-full max-w-xs flex-shrink-0">
          <ul class="space-y-3">
            <li v-for="(menuItem, key) in megaNav.menu_items" :key="`megaNav${megaNav.id}MenuItem${key}`">
              <SiteLink :to="menuItem.menu_item.url|replaceSiteUrl">
                <span class="link" v-html="menuItem.menu_item.title" />
              </SiteLink>
            </li>
          </ul>
        </nav>
        <transition name="fade-in-down">
          <MegaNavFeatureItems v-if="open" :mega-nav="megaNav" :load-callback="loadCallback" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MegaNav',
  props: {
    megaNav: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      active: false
    }
  },
  computed: {
    open () {
      return this.$store.state.megaNav === this.megaNav.id
    }
  },
  watch: {
    open (to) {
      if (to) {
        this.$nextTick(() => {
          if (this.$refs.nav) {
            this.$store.commit('setMegaNavHeight', this.$refs.nav.offsetHeight)
            this.active = true
          }
        })
      } else {
        this.$store.commit('setMegaNavHeight', 0)
        this.active = false
      }
    },
    '$nuxt.$route' () {
      this.$store.commit('setMegaNav', null)
    }
  },
  methods: {
    loadCallback () {
      if (this.$refs.nav) {
        this.$store.commit('setMegaNavHeight', this.$refs.nav.offsetHeight)
      }
    }
  }
}
</script>

<style scoped>
.mega-nav {
  will-change: tranform, opacity;
}
.link:hover {
  @apply font-serif_italic;
}
</style>
