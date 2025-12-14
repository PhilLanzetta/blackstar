<template>
  <section class="festival-media-spotlight">
    <Container>
      <div class="block lg:flex items-end" :class="{'justify-start': $store.state.theme==='festival', 'justify-between': $store.state.theme==='bsf11'}">
        <FestivalHeading
          v-if="layout.title"
          :class="{'-mb-border': $store.state.theme==='festival'}"
          background-class="bg-blue text-white"
          width-class="w-full max-w-xl"
          :reduced="$store.state.theme==='festival'"
          :butted="$store.state.theme==='bsf11'"
        >
          <span :class="{'font-festival_sans_italic': $store.state.theme==='festival'}">{{ layout.title }}</span>
        </FestivalHeading>
        <span v-if="$store.state.theme==='festival'" class="block">
          <FestivalActionHeading
            v-for="(action, key) in layout.action"
            :key="`action${key}`"
            class="lg:-ml-border -mb-border"
            background-class="bg-pink text-navy"
            width-class="w-full"
            :to="action.link.url|replaceSiteUrl"
          >
            <span class=" font-festival_sans">{{ action.label }}</span>
          </FestivalActionHeading>
        </span>
        <span v-if="$store.state.theme==='bsf11'" class="flex space-x-4 mb-4 mt-auto mr-12">
          <FestivalButton
            v-for="(action, key) in layout.action"
            :key="`action${key}`"
            :to="action.link.url|replaceSiteUrl"
            :alt="true"
          ><span v-html="action.label" /></FestivalButton>
        </span>
      </div>
      <div class="relative" :class="{'border-5 border-navy bg-beige': $store.state.theme==='festival', 'rounded-3xl xl:rounded-4xl overflow-hidden bg-black border-4 lg:border-md 2xl:border-lg border-black': $store.state.theme==='bsf11'}">
        <span class="md:absolute w-full top-0 left-0 z-10 block">
          <FestivalSubHeading
            v-if="layout.subtitle&&$store.state.theme==='festival'"
            class="font-festival_sans_italic -mt-border -ml-border -mr-border"
            :long="true"
          >
            <span v-html="layout.subtitle" />
          </FestivalSubHeading>
        </span>
        <ClientOnly>
          <swiper ref="swiper" :options="swiperOptions">
            <swiper-slide v-for="(image, key) in layout.images" :key="`imageSlide${key}`">
              <div class="aspect-w-10 aspect-h-9 lg:aspect-w-16 lg:aspect-h-9">
                <div class="festival-media-spotlight__image-cover" v-html="image" />
              </div>
            </swiper-slide>
          </swiper>
          <template v-if="$store.state.theme==='festival'">
            <button v-show="$refs.swiper&&$refs.swiper.swiperInstance&&$refs.swiper.swiperInstance.activeIndex>0" ref="prevEl" v-cursor-hint="'Previous'" class="block absolute top-0 left-0 w-1/4 h-full z-20" @click.prevent="prevImage">
              <span class="sr-only">Previous Image</span>
            </button>
            <button v-show="$refs.swiper&&$refs.swiper.swiperInstance&&$refs.swiper.swiperInstance.activeIndex<(layout.images.length-1)" ref="nextEl" v-cursor-hint="'Next'" class="block absolute top-0 right-0 w-1/4 h-full  z-20" @click.prevent="nextImage">
              <span class="sr-only">Next Image</span>
            </button>
          </template>

          <div v-if="$store.state.theme==='bsf11'">
            <button v-show="$refs.swiper&&$refs.swiper.swiperInstance&&$refs.swiper.swiperInstance.activeIndex>0" ref="prevEl" class="text-bsf11Yellow block absolute top-1/2 transform -translate-y-1/2 left-0 z-30" @click.prevent="prevImage">
              <FestivalPrevArrow />
            </button>
            <button v-show="$refs.swiper&&$refs.swiper.swiperInstance&&$refs.swiper.swiperInstance.activeIndex<(layout.images.length-1)" ref="nextEl" class="text-bsf11Yellow block  absolute top-1/2 transform -translate-y-1/2 right-0 z-30" @click.prevent="nextImage">
              <FestivalNextArrow />
            </button>
          </div>
        </ClientOnly>

        <span class="md:absolute w-full bottom-0 left-0 z-10 block">
          <FestivalSubHeading
            v-if="layout.footer_line&&$store.state.theme==='festival'"
            class="justify-end -mr-border -ml-border -mb-border"
            :long="true"
          >
            <span class="italised" v-html="layout.footer_line" />
          </FestivalSubHeading>
        </span>
        <span v-if="$store.state.theme==='bsf11'&&(layout.footer_line||layout.subtitle)" class="block bg-white border-4 lg:border-md 2xl:border-lg border-black p-10 rounded-3xl xl:rounded-4xl -mt-20 -mx-2 -mb-2 z-10 relative pointer-events-auto">
          <h3 v-if="layout.subtitle" class="text-xl font-medium" v-html="layout.subtitle" />
          <span v-if="layout.footer_line" class="text-xl" v-html="layout.footer_line" />
        </span>
      </div>
    </Container>
  </section>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'FestivalSpotlightImageSlider',
  mixins: [layout],
  data () {
    return {
      checker: null
    }
  },
  computed: {
    swiperOptions () {
      return {
        slidesPerView: 1
      }
    }

  },
  watch: {
    '$refs.swiper.swiperInstance.activeIndex' () {
      this.$forceUpdate()
    }
  },
  mounted () {
    this.checker = setInterval(() => {
      if (this.$refs.swiper && this.$refs.swiper.swiperInstance) {
        this.$forceUpdate()
        clearInterval(this.checker)
        this.checker = null
      }
    }, 100)
  },
  beforeDestroy () {
    if (this.checker) {
      clearInterval(this.checker)
    }
  },
  methods: {
    nextImage () {
      this.$refs.swiper.swiperInstance.slideNext(300)
      this.$forceUpdate()
      this.$nextTick(() => {
        if (this.$refs.swiper.swiperInstance.activeIndex === (this.layout.images.length - 1)) {
          this.$store.commit('cursor/hint', null)
        }
      })
    },
    prevImage () {
      this.$refs.swiper.swiperInstance.slidePrev(300)
      this.$forceUpdate()
      this.$nextTick(() => {
        if (this.$refs.swiper.swiperInstance.activeIndex === 0) {
          this.$store.commit('cursor/hint', null)
        }
      })
    }
  }
}
</script>

<style>
.festival-media-spotlight__subtitle {
  @apply -ml-border;
}

.festival-media-spotlight__action {
  @apply -mr-border;
}

.festival-media-spotlight__image-cover {
  @apply block w-full h-full absolute top-0 left-0;
}

.festival-media-spotlight__image-cover img {
  @apply block w-full h-full object-cover;
}

</style>
