<template>
  <ClientOnly>
    <swiper ref="swiper" :options="swiperOptions" @slideChangeTransitionEnd="onSwipe">
      <slot />
    </swiper>
  </ClientOnly>
</template>

<script>

export default {
  name: 'PostsCarousel',
  inheritAttrs: true,
  props: {
    afterSwipeCallback: {
      type: Function,
      required: false,
      default: null
    },
    triggerUpdate: {
      type: Number,
      required: false,
      default: null
    },
    arrowNext: {
      type: String,
      required: false,
      default: null
    },
    arrowPrevious: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    swiperOptions () {
      let options = {
        slidesPerView: 1.1,
        spaceBetween: 15,
        breakpoints: {
          375: {
            slidesPerView: 1.25,
            spaceBetween: 20
          },
          680: {
            slidesPerView: 2,
            spaceBetween: 30
          },
          900: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 40
          },
          1536: {
            slidesPerView: 4,
            spaceBetween: 60
          },
          1920: {
            slidesPerView: 4,
            spaceBetween: 80
          }
        }
      }

      if (this.$store.state.theme === 'bsf11') {
        options = {
          slidesPerView: 1.1,
          spaceBetween: 10,
          autoHeight: true,
          breakpoints: {
            375: {
              slidesPerView: 1.25,
              spaceBetween: 10
            },
            680: {
              slidesPerView: 1.5,
              spaceBetween: 10
            },
            900: {
              slidesPerView: 2,
              spaceBetween: 10
            },
            1280: {
              slidesPerView: 2.5,
              spaceBetween: 10
            },
            1536: {
              slidesPerView: 2.5,
              spaceBetween: 10
            },
            1920: {
              slidesPerView: 3,
              spaceBetween: 10
            }
          }
        }
      }

      if (this.arrowNext && this.arrowPrevious) {
        options.navigation = {
          nextEl: this.$props.arrowNext,
          prevEl: this.$props.arrowPrevious
        }
      }

      return options
    }
  },
  watch: {
    triggerUpdate (to) {
      if (to) {
        if (this.$refs.swiper && this.$refs.swiper.swiperInstance) {
          this.$refs.swiper.swiperInstance.update()
        }
      }
    }
  },
  methods: {
    onSwipe () {
      if (!this.afterSwipeCallback) {
        return
      }

      if (this.$refs.swiper && this.$refs.swiper.swiperInstance) {
        this.afterSwipeCallback(this.$refs.swiper.swiperInstance)
      }
    }
  }
}
</script>

<style scoped>
.swiper-container {
  overflow: visible;
}

.festival-arrows {
  @apply justify-end w-full -mt-20;
}
.active-arrow {
  @apply block w-16 md:w-28 xl:w-32 2xl:w-40;
}

.inactive-arrow {
  @apply hidden w-8 md:w-14 xl:w-16 2xl:w-20;
}

.active-arrow svg,
.inactive-arrow svg {
  @apply block max-w-full h-auto;
}

.swiper-button-disabled {
  @apply pointer-events-none;
}

.swiper-button-disabled .active-arrow {
  @apply hidden;
}

.swiper-button-disabled .inactive-arrow {
  @apply block;
}

.festival-arrow {
  @apply w-16 2xl:w-10;
}
</style>
