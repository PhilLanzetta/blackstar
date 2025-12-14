<template>
  <section class="festival-media-spotlight relative z-10">
    <div v-if="$store.state.theme==='bsf11'&&layout.tabs&&layout.tabs.length&&layout.heading">
      <Container class="lg:-mb-5 2xl:-mb-10">
        <FestivalHeading background-class="bg-blue text-white">
          <span v-html="layout.heading" />
        </FestivalHeading>
      </Container>
      <hr
        class="block border-0 border-t-5 border-dotted border-bsf11Teal bg-transparent mb-10 2xl:mb-0"
      >
    </div>
    <Container class="relative">
      <FestivalHeading v-if="!(layout.tabs&&layout.tabs.length)&&layout.title" :butted="true" background-class="bg-blue text-white">
        <span v-html="layout.title" />
      </FestivalHeading>
      <div class="w-full" :class="{'lg:pt-10': $store.state.theme==='bsf11'&&!layout.heading}">
        <template v-if="layout.tabs&&layout.tabs.length">
          <div v-if="$store.state.theme==='festival'" class="lg:flex justify-start w-full">
            <FestivalActionHeading
              to="#"
              background-class="bg-blue text-white border-b-0"
              :full-width="true"
              :click-handler="() => {activeTab=0}"
              :hide-arrow="true"
              :block="true"
              :lg="true"
              width-class="w-full lg:w-auto"
            >
              <span :class="{'font-festival_sans': activeTab!==0}" v-html="layout.title" />
            </FestivalActionHeading>
            <FestivalActionHeading
              v-for="(tabButton, key) in layout.tabs"
              :key="`tab${key}`"
              to="#"
              :full-width="true"
              :background-class="`bg-${tabButton.tab_colour} ${(['pink', 'lime', 'beige'].includes(tabButton.tab_colour) ? 'text-navy' : 'text-white')} lg:-ml-border border-b-0`"
              :click-handler="() => {activeTab=(key+1)}"
              :hide-arrow="true"
              :block="true"
              :lg="true"
              width-class="w-full lg:w-auto"
            >
              <span :class="{'font-festival_sans': activeTab!==(key+1)}" v-html="tabButton.title" />
            </FestivalActionHeading>
            <div class="hidden lg:flex space-x-6 relative justify-self-end ml-auto mr-0 z-10 2xl:space-x-12 text-navy">
              <button ref="arrowPostsPrev" @click.prevent="prevTab">
                <FestivalPrevArrow />
              </button>
              <button ref="arrowPostsNext" @click.prevent="nextTab">
                <FestivalNextArrow />
              </button>
            </div>
          </div>
          <div v-if="$store.state.theme==='bsf11'" class="md:flex justify-start items-end flex-grow-1 md:ml-10 lg:ml-16">
            <button
              class="festival-spotlight-tab"
              :class="{'festival-spotlight-tab--active': activeTab===0}"
              @click.prevent="() => {activeTab=0}"
            >
              <span v-html="layout.title" />
            </button>
            <button
              v-for="(tabButton, key) in layout.tabs"
              :key="`tab${key}`"
              class="festival-spotlight-tab"
              :class="{'festival-spotlight-tab--active': activeTab===(key+1)}"
              @click.prevent="() => {activeTab=(key+1)}"
            >
              <span v-html="tabButton.title" />
            </button>
            <div class="flex absolute -top-10 right-4 md:top-auto md:right-auto md:relative justify-self-end ml-auto z-10 text-bsf11Yellow">
              <button ref="arrowPostsPrev" @click.prevent="prevTab">
                <FestivalPrevArrow />
              </button>
              <button ref="arrowPostsNext" @click.prevent="nextTab">
                <FestivalNextArrow />
              </button>
            </div>
          </div>
        </template>
        <div :key="`activeTab${activeTab}`" class="relative z-10" :class="{'border-5 border-navy bg-beige': $store.state.theme==='festival', 'rounded-3xl xl:rounded-4xl overflow-hidden bg-black': $store.state.theme==='bsf11', 'border-4 lg:border-md 2xl:border-lg border-black': $store.state.theme==='bsf11'&&layout.video}">
          <span class="motion-safe:transition-opacity duration-200" :class="{'opacity-0': videoPlaying}">
            <span v-if="$store.state.theme==='festival'" class="md:absolute w-full top-0 left-0 z-10 block">
              <FestivalSubHeading
                v-if="tab.subtitle&&!tab.subtitle_link"
                class="font-festival_sans_italic -mt-border -ml-border -mr-border"
              >
                <span v-html="tab.subtitle" />
              </FestivalSubHeading>
              <FestivalSubHeadingLink
                v-if="tab.subtitle&&tab.subtitle_link"
                :to="tab.subtitle_link.url|replaceSiteUrl"
                class="font-festival_sans_italic -mt-border -ml-border -mr-border"
              >
                <span v-html="tab.subtitle" />
              </FestivalSubHeadingLink>
            </span>
          </span>
          <div v-if="!tab.video">
            <div class="festival-media-spotlight__image" v-html="tab.image" />
          </div>
          <div v-if="layout.tabs&&layout.tabs.length&&$store.state.theme==='festival'" class="flex lg:hidden absolute top-20 md:top-5 right-5 space-x-6 justify-end z-30 2xl:space-x-12 text-white">
            <button ref="arrowPostsPrev" @click.prevent="prevTab">
              <FestivalPrevArrow />
            </button>
            <button ref="arrowPostsNext" @click.prevent="nextTab">
              <FestivalNextArrow />
            </button>
          </div>
          <VideoPlayer v-if="tab.video" :video="tab.video[0]" :image="tab.image" :playing-callback="playingCallback" />
          <span class="motion-safe:transition-opacity duration-200" :class="{'opacity-0': videoPlaying}">
            <span v-if="$store.state.theme==='festival'" class="block md:absolute bottom-0 right-0 -mr-border -ml-border -mb-border z-10">
              <FestivalSubHeading
                v-if="tab.footer_line==='credit'&&tab.credit"
                :long="true"
              >
                <span class="italised" v-html="tab.credit" />
              </FestivalSubHeading>
              <FestivalSubHeadingLink
                v-if="tab.footer_line==='action'&&tab.action"
                :to="tab.action.url|replaceSiteUrl"
                :long="true"
              >
                <span class="italised" v-html="tab.action.title" />
              </FestivalSubHeadingLink>
            </span>
            <span v-if="$store.state.theme==='bsf11'&&((tab.footer_line==='credit'&&tab.credit)||(tab.footer_line==='action'&&tab.action)||tab.subtitle)" class="festival-spotlight-tab__content">
              <h3 v-if="tab.subtitle&&!tab.subtitle_link" class="text-xl font-medium" v-html="tab.subtitle" />
              <span v-if="tab.footer_line==='credit'&&tab.credit" class="text-xl" v-html="tab.credit" />
              <span v-if="tab.footer_line==='action'&&tab.action||tab.subtitle&&tab.subtitle_link" class="flex space-x-4 mt-4"><FestivalButton v-if="tab.footer_line==='action'&&tab.action" :to="tab.action.url|replaceSiteUrl"><span v-html="tab.action.title" /></FestivalButton><FestivalButton v-if="tab.subtitle&&tab.subtitle_link" :to="tab.subtitle_link.url|replaceSiteUrl"><span v-html="tab.subtitle_link.title" /></FestivalButton></span>

            </span>
          </span>
          <RawLink v-if="tab.cursor_hint_action" v-cursor-hint="tab.cursor_hint_action.title" :to="tab.cursor_hint_action.url|replaceSiteUrl" class-names="absolute top-0 left-0 w-full h-full z-0 block">
            <span class="sr-only" v-html="tab.cursor_hint_action.title" />
          </RawLink>
        </div>
      </div>
      <LazyRellaxShape v-if="$store.state.theme==='festival'" key="shape10" class="hidden lg:block -top-20 right-24 z-0 w-60">
        <ShapeTen />
      </LazyRellaxShape>
    </Container>
    <LazyRellaxShape v-if="$store.state.theme==='bsf11'" key="shapeSquiggle" class="hidden lg:block -top-20 lg:top-20 right-0 z-0 w-full max-w-xl lg:max-w-4xl">
      <ShapeSquiggle />
    </LazyRellaxShape>
  </section>
</template>

<script>
import layout from '~/mixins/layout'
import ShapeTen from '~/assets/festival/shape-10.svg?inline'
import ShapeSquiggle from '~/assets/festival/11/shape-squiggle.svg?inline'
import FestivalSubHeadingLink from '~/components/global/FestivalSubHeadingLink'

export default {
  name: 'FestivalSpotlightMedia',
  components: { FestivalSubHeadingLink, ShapeTen, ShapeSquiggle },
  mixins: [layout],
  data () {
    return {
      videoPlaying: false,
      activeTab: 0
    }
  },
  computed: {
    totalTabs () {
      if (this.layout.tabs) {
        return this.layout.tabs.length
      }

      return 0
    },
    tab () {
      if (!this.activeTab) {
        return this.layout
      }

      return this.layout.tabs[(this.activeTab - 1)]
    }
  },
  methods: {
    playingCallback (playing) {
      this.videoPlaying = playing
    },
    nextTab () {
      if (this.activeTab < this.totalTabs) {
        this.activeTab++
        return
      }

      this.activeTab = 0
    },
    prevTab () {
      if (this.activeTab > 0) {
        this.activeTab--
        return
      }

      this.activeTab = this.totalTabs
    }
  }
}
</script>

<style>
.festival-media-spotlight__image {
  @apply block;
}

.festival-media-spotlight__image img {
  @apply block w-full h-auto;
}

.festival-spotlight-tab {
  @apply block border-4 border-black rounded-t-xl border-b-0 bg-white p-2 md:p-4 md:-ml-1 -mb-4  md:mb-0 font-bsf11_sans text-2xl transition-all duration-100 pb-6 md:pb-8 transform md:translate-y-4 w-full md:w-auto;
}

.festival-spotlight-tab--active {
  @apply bg-bsf11Yellow transform -translate-y-0;
}

.festival-spotlight-tab__content {
  @apply block bg-white border-4 lg:border-md 2xl:border-lg border-black p-5 lg:p-8 2xl:p-10 rounded-3xl xl:rounded-4xl rounded-t-none md:rounded-t-3xl lg:rounded-t-4xl md:-mt-20 z-10 relative pointer-events-auto;
}

</style>
