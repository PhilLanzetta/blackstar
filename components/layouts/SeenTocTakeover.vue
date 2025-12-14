<template>
  <ClientOnly>
    <div :style="`background-color: ${$store.state.settings.seen.toc_takeover.background_colour};`">
      <div class=" text-black text-center text-lg font-medium py-2.5 relative z-20"  :style="`background-color: ${$store.state.settings.seen.toc_takeover.background_colour};`">
        <Container class="relative">
          <span :class="{'opacity-0': $store.state.seen.tocTakeoverOpen}">{{ $store.state.settings.seen.toc_takeover.issue_name }}</span>
          <span class="block absolute top-1/2 right-4 sm:right-8 transform -translate-y-1/2">
            <span class="seen-burger" :class="{'seen-burger--active': $store.state.seen.tocTakeoverOpen}"><span /><span /></span>
            <span
              v-if="$store.state.seen.tocTakeoverOpen"
              class="sr-only"
            >Close '{{ settings.issue_name }}' Takeover</span><span
              v-if="!$store.state.seen.tocTakeoverOpen"
              class="sr-only"
            >Open '{{ settings.issue_name }}' Takeover</span>
            <button v-if="$store.state.seen.tocTakeoverOpen" class="absolute top-0 left-0 w-full h-full z-20" @click.prevent="closeModal"><span class="sr-only" /></button>
          </span>
        </Container>
        <button
          v-if="!$store.state.seen.tocTakeoverOpen"
          v-cursor-interact
          class="absolute top-0 left-0 w-full h-full"
          @click.prevent="toggleModal"
        >
          <span class="sr-only">{{ $store.state.settings.seen.toc_takeover.issue_name }}</span>
        </button>
      </div>
      <Transition name="slide-down">
        <div
          v-if="$store.state.seen.tocTakeoverOpen"
          class=" relative text-black z-10"
          :style="`background-color: ${$store.state.settings.seen.toc_takeover.background_colour};`"
        >
          <Container class="relative">
            <div
              v-cursor-hint="settings.issue_name"
              class="cursor-pointer w-full h-auto bg-black relative aspect-w-16 aspect-h-9"
              role="button"
              @click.prevent="expand"
            >
              <video
                v-if="settings.cover_video"
                class="bg-black z-10"
                autoplay
                playsinline
                muted
                loop
                data-not-lazy
                @click.prevent="expand"
              >
                <source type="video/mp4" :src="settings.cover_video">
              </video>
              <div v-html="settings.poster_image" class="z-0 cover-image"></div>
            </div>
            <Transition name="fade">
              <div v-if="expanded" class="absolute top-0 left-0 w-full h-full  z-20"  :style="`background-color: ${$store.state.settings.seen.toc_takeover.background_colour};`">
                <div class="relative h-full">
                  <span class="shadow-image" v-html="settings.cover_image" />
                  <RawLink v-cursor-hint="'Order Now'" :to="settings.order_link|replaceSiteUrl" class-names="absolute top-0 left-0 w-full h-full block">
                    <span class="sr-only">{{ settings.order_label }}</span>
                  </RawLink>
                </div>
              </div>
            </Transition>
          </Container>
          <div v-if="!expanded" class="flex justify-center text-black py-10">
            <button v-cursor-interact class="font-sans font-normal text-xl md:text-2xl lg:text-3xl 2xl:text-4xl hover:underline underline-offset-4 p-3 z-20" @click.prevent="expand">
              {{ settings.issue_title }}
            </button>
          </div>
          <Transition name="fade-in-down">
            <div v-if="expanded">
              <Container>
                <nav
                  id="seen-toc"
                  ref="toc"
                  class="seen-toc"
                  :aria-label="`${settings.issue_name} Table of Contents`"
                >
                  <ul>
                    <li
                      v-for="(article, key) in settings.toc"
                      :key="`toc${key}`"
                      @click="closeModal"
                    >
                      <SiteLink
                        v-if="article.seen_article.post_status==='publish'"
                        :to="article.seen_article.permalink|replaceSiteUrl"
                      >
                        <SeenTocTakeoverArticle :article="article" />
                      </SiteLink>
                      <SeenTocTakeoverArticle v-if="article.seen_article.post_status!=='publish'" :article="article" />
                    </li>
                    <li class="pt-10">
                      <SiteLink :to="settings.order_link|replaceSiteUrl" class-names="font-sans font-normal text-xl md:text-2xl lg:text-3xl 2xl:text-4xl hover:underline underline-offset-4 p-3 text-black">
                        {{ settings.order_label }}
                      </SiteLink>
                    </li>
                  </ul>
                </nav>
              </Container>
            </div>
          </Transition>
        </div>
      </Transition>
    </div>
  </ClientOnly>
</template>

<script>

export default {
  name: 'SeenTocTakeover',
  data () {
    return {
      hoverMode: false,
      hoverModeIn: false,
      hoverImage: null,
      previousHoverImage: null,
      timeout: null,
      expanded: false
    }
  },
  computed: {
    settings () {
      return this.$store.state.settings.seen.toc_takeover
    }
  },
  watch: {
    '$route' () {
      if (this.$store.state.seen.tocTakeoverOpen) {
        this.closeModal()
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.maybeOpenOnLaunch()
    })
  },
  methods: {
    maybeOpenOnLaunch () {
      const cookie = this.$cookies.get('seen-toc', { fromRes: true })

      if (!(this.$route.path === '/seen' || this.$route.path === '/seen/')) {
        if (cookie && cookie === this.settings.issue_name) {
          return
        }
      }

      this.$store.commit('seen/openTocTakeover')
      this.$cookies.set('seen-toc', this.settings.issue_name, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
    },
    toggleModal () {
      if (this.$store.state.seen.tocTakeoverOpen) {
        this.closeModal()
        return
      }

      this.$store.commit('seen/openTocTakeover', null)
    },
    expand () {
      this.expanded = true

      this.$nextTick(() => {
        if (this.$refs.toc) {
          window.scrollTo({ top: ((this.$refs.toc.getBoundingClientRect().top + window.scrollY) - document.getElementById('site-header').offsetHeight), behavior: 'smooth' })
        }
      })
    },
    closeModal () {
      this.$store.commit('seen/closeTocTakeover', null)
    }
  }
}
</script>

<style>
.seen-toc {
  @apply text-center pt-8 lg:pt-0 pb-8 lg:pb-12 2xl:pb-16;
}

.seen-toc li {
  @apply block;
}

.seen-toc li .toc-article {
  @apply block py-8 lg:py-12 2xl:py-16 text-black;
}

.seen-toc h3 {
  @apply font-seen_serif_italic text-2xl leading-[1.1] sm:text-3xl sm:leading-[1.1] md:text-4xl md:leading-[1.1] lg:text-5xl lg:leading-[1.1] 2xl:text-6xl 2xl:leading-[1.1] font-normal pb-1 max-w-4xl mx-auto;
}

.seen-toc a:hover h3 {
  @apply underline underline-offset-8 decoration-2;
}

.seen-toc p {
  @apply text-base md:text-xl lg:text-2xl 2xl:text-3xl font-light;
}

.seen-burger {
  @apply relative w-6 h-6 block;
}

.seen-burger span {
  @apply absolute top-1/2 left-0 h-0.5 bg-black block w-full transform rotate-90 -translate-y-1/2 transition-transform duration-200;
}

.seen-burger span:last-child {
  @apply rotate-0;
}

.seen-burger--active span {
  @apply rotate-180;
}
</style>
