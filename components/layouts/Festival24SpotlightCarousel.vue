<template>
  <ClientOnly>
    <div :class="{'bg-transparent': inversed}">
      <div class="relative">
        <Container>
          <div class="lg:flex items-stretch min-h-[350px] flex-row-reverse">
            <div class="lg:w-3/5">
              <div class="lg:pl-16 lg:h-full mb-6 lg:my-0">
                <div
                  class="relative cover-image w-full h-full rounded-3xl overflow-hidden slider-image"
                  :class="{'block absolute lg:absolute lg:-top-28 xl:-top-30 2xl:-top-32 lg:left-0 lg:rounded-none lg:border-none lg:-bottom-12 xl:-bottom-16  2xl:-bottom-20 lg:h-auto': inversed, 'border-black border': $store.state.theme === 'bsf13', 'bg-black': $store.state.theme === 'bsf14'}"
                >
                  <swiper
                    ref="secondarySwiper"
                    :options="imageSwiperOptions"
                    class="h-full"
                    @slideChange="onSlideChangeReverse"
                  >
                    <swiper-slide v-for="(card, key) in cards" :key="`imageSlider${key}`" class="h-full">
                      <Festival24RichCardMedia :card="card" size="hero-card" :border="false" />
                    </swiper-slide>
                  </swiper>
                </div>
              </div>
            </div>
            <div class="lg:w-2/5">
              <div
                class="relative lg:rounded-3xl h-full z-10"
                :class="`${(gradientStyle ? gradientStyle : `lg:bg-${displayBackground}`)} ${($store.state.theme === 'bsf13' ? ' lg:border-inherit lg:border ' : ' ')}`"
              >
                <swiper ref="swiper" :options="swiperOptions" @slideChange="onSlideChange">
                  <swiper-slide v-for="(card, key) in cards" :key="`contentSlider${key}`">
                    <div class="lg:p-8">
                      <span class="lg:hidden"><Space /><Space /><Space /><Space /><Space />
                        <!-- Space for pagination --></span>
                      <Festival24RichCardContent :card="card" size="xl" />
                      <Space />
                      <Festival24RichCardButtons :card="card" />
                      <span class="hidden lg:block"><Space /><Space /><Space /><Space /><Space />
                        <!-- Space for pagination --></span>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
            </div>
          </div>
        </Container>
        <div class="absolute top-0 lg:top-auto lg:bottom-0 left-0 w-full z-20 pointer-events-none">
          <Container>
            <div class="slider-image" />
            <div class="lg:w-2/5">
              <div class="flex justify-between items-center space-x-4 mt-5 lg:p-8">
                <Festival24SwiperButton :id="`prev-${uniqueId}`" />
                <div>
                  <Festival24Pagination
                    :go-to-page="handleChangePage"
                    :total-pages="totalPages"
                    :active-page="activePage"
                  />
                </div>
                <Festival24SwiperButton :id="`next-${uniqueId}`" type="next" />
              </div>
            </div>
          </Container>
        </div>
      </div>
      <!-- <div class="3xl:absolute bottom-0 left-0 w-full z-20 pointer-events-none mt-4 lg:mt-0"> -->
    </div>
  </ClientOnly>
</template>

<script>
import layout from '~/mixins/layout'
import livedata from '~/mixins/livedata'
import festivalSwiper from '~/mixins/festivalSwiper'
import eventiveEverywhere from '~/mixins/eventiveEverywhere'
import festivalRichCards from '~/mixins/festivalRichCards'

export default {
  name: 'Festival24SpotlightCarousel',
  mixins: [layout, livedata, festivalRichCards, festivalSwiper, eventiveEverywhere],
  props: {
    background: {
      type: String,
      required: false,
      default: 'bsf13orange'
    }
  },
  data () {
    return {
      swiperOverrideOptions: {
        autoHeight: false,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        infinite: true
      },
      imageSwiperOptions: {
        autoHeight: false,
        slidesPerView: 1
      },
      currentCardInversed: false
    }
  },
  computed: {
    displayBackground () {
      if (this.layout.background) {
        return this.layout.background
      }

      return this.background
    },
    gradientStyle () {
      if (this.layout.gradient_style && this.layout.gradient_style !== 'none') {
        if (this.layout.gradient_style === 'top') {
          return `lg:bg-gradient-to-b from-${this.displayBackground.replace('Tint', '')}Tint to-${this.displayBackground.replace('Tint', '')}`
        }

        return `lg:bg-gradient-to-t from-${this.displayBackground.replace('Tint', '')}Tint to-${this.displayBackground.replace('Tint', '')}`
      }

      return false
    },
    inversed () {
      if (this.currentCardInversed) {
        return true
      }

      return this.layout.inversed
    }
  },
  mounted () {
    if (this.layout.cards && this.layout.cards.length) {
      this.currentCardInversed = this.layout.cards[0].inverse
    }
  },
  methods: {
    onSlideChange () {
      const currentCard = this.cards[this.$refs.swiper.swiperInstance.snapIndex]
      this.currentCardInversed = (currentCard && currentCard.inverse)

      if (this.$refs.secondarySwiper) {
        this.$refs.secondarySwiper.swiperInstance.slideTo(this.$refs.swiper.swiperInstance.snapIndex)
      }

      this.$forceUpdate()

      if (this.layout.inversed) {
        if (this.$refs.backgroundSwiper) {
          this.$refs.backgroundSwiper.swiperInstance.slideTo(this.$refs.swiper.swiperInstance.snapIndex)
        }
      }
    },
    onSlideChangeReverse () {
      if (!this.$refs.swiper) {
        return
      }
      this.$forceUpdate()

      this.$refs.swiper.swiperInstance.slideTo(this.$refs.secondarySwiper.swiperInstance.snapIndex)
    },
    onBackgroundSlideChange () {
      if (!this.$refs.swiper) {
        return
      }

      this.$refs.swiper.swiperInstance.slideTo(this.$refs.backgroundSwiper.swiperInstance.snapIndex)
    }
  }
}
</script>

<style scoped>
.swiper-button-disabled {
  @apply text-black;
}

.slider-image::before {
  padding-top: 100%;
  content: " ";
  display: block;

  @apply lg:hidden;
}

.slider-image > div {
  @apply absolute top-0 left-0 w-full h-full lg:relative;
}

</style>
