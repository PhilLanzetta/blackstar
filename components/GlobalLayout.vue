<template>
  <div>
    <a href="#main" class="sr-only focus:not-sr-only">Skip to content</a>
    <Cover v-if="$nuxt.$route.path==='/'&&!$store.state.cover.seen&&!$store.state.mobileNav.open&&$nuxt.$route.hash!=='#home'" />
    <div id="site-wrapper" class="w-full relative z-10" :class="{'is-touch': $store.state.touch, 'site-wrapper--bsf11': $store.state.theme==='bsf11'}">
      <div
        class="relative z-10 transition-colors duration-500  motion-reduce:transition-none"
        :class="{'bg-offWhite' : $store.state.theme === 'default', 'bg-pink' : $store.state.theme === 'festival', 'bg-bsf11Purple' : $store.state.theme === 'bsf11', 'bg-white' : $store.state.theme === 'seen'}"
      >
        <SiteHeader />
        <div
          id="main"
          class="relative z-10 content-wrapper transition-all duration-500 ease-linear transform-gpu motion-reduce:transform-none motion-reduce:transition-colors"
          :class="($store.state.background === 'white' ? 'bg-white' : `bg-${$store.state.background}`) + ($store.state.scrollSnap ? ' scroll-snap-start ' : '') + ($store.state.background === 'black' ? ' text-white ' : ' text-black ')"
          :style="($store.state.megaNav && $store.state.megaNavHeight ? `transform: translateY(${$store.state.megaNavHeight}px)` : '')"
        >
          <SeenTocTakeover v-if="showSeenTocTakeover" />
          <Nuxt keep-alive />
          <div v-if="$store.state.theme === 'seen'&&$store.state.seen.headerSearchOpen" class="fixed top-0 left-0 w-full h-full cursor-pointer bg-white z-20 opacity-30" @click.prevent="$store.commit('seen/closeHeaderSearch')"></div>
        </div>
      </div>
      <SiteFooter />
    </div>
    <ClientOnly>
      <CircleCursor />
      <LivePreviewNotice />
      <transition name="fade-in-down">
        <VideoModal v-if="$store.state.video" />
      </transition>
      <transition name="fade-in-down">
        <GalleryModal v-if="$store.state.gallery" />
      </transition>
      <transition name="fade-in-down">
        <FestivalTrailerModal v-if="$store.state.festival.trailer&&($store.state.theme==='festival'||$store.state.theme==='bsf11')" />
      </transition>
      <transition name="fade-in-down">
        <FestivalSearchModal v-if="$store.state.search.isOpen" />
      </transition>
      <transition name="fade-in-down">
        <Popup v-if="$store.state.popup.isOpen" />
      </transition>
    </ClientOnly>
  </div>
</template>

<script>
import seenToc from '~/mixins/seenToc'
import scrollToHash from '~/mixins/scrollToHash'
export default {
  name: 'GlobalLayout',
  mixins: [seenToc, scrollToHash],
  watch: {
    '$nuxt.$route' () {
      this.$store.commit('mobileNav/close')
      this.$store.commit('setMegaNav', null)
      this.$store.commit('cover/isNotVisible')

      this.$nextTick(() => {
        setTimeout(() => {
          this.$store.commit('mobileNav/close')
          this.$store.commit('setMegaNav', null)
          this.$store.commit('cursor/leaveAlt')
          this.$store.commit('cursor/hint', false)
          if (this.$store.state.theme === 'default') {
            this.$store.commit('setBackgroundColor', 'white')
          }
        }, 600)
      })
    }
  }
}
</script>

<style scoped>
.content-wrapper {
  will-change: transform, background-color;
}

.dynamic-color-styles {
  @apply border-white border-black border-teal border-purple bg-white bg-black bg-teal bg-purple text-white text-black text-teal text-purple hover:border-white hover:border-black hover:border-teal hover:border-purple hover:bg-white hover:bg-black hover:bg-teal hover:bg-purple hover:text-white hover:text-black hover:text-teal hover:text-purple sr-only bg-brightYellow border-brightYellow bg-dullYellow border-dullYellow bg-seenOrange bg-lumenBlue bg-lumenPink bg-lumenOrange border-seenOrange border-lumenBlue border-lumenPink border-lumenOrange bg-lumenYellow bg-lumenGreen;
}
</style>
