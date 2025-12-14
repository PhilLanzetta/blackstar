export default {
  data () {
    return {
      totalPages: 1,
      totalSlides: 1,
      activePage: 0,
      swiperOverrideOptions: { slidesPerView: 1 }
    }
  },
  computed: {
    swiperOptions () {
      const options = {
        navigation: {
          nextEl: `#next-${this.uniqueId}`,
          prevEl: `#prev-${this.uniqueId}`
        },
        on: {
          init: () => {
            this.$nextTick(() => {
              if (this.$refs.swiper && this.$refs.swiper.swiperInstance && this.$refs.swiper.swiperInstance.snapGrid) {
                this.totalPages = this.$refs.swiper.swiperInstance.snapGrid.length
              }
            })
          },
          snapIndexChange: () => {
            if (this.$refs.swiper && this.$refs.swiper.swiperInstance) {
              this.activePage = this.$refs.swiper.swiperInstance.snapIndex
              if (this.$refs.swiper.swiperInstance.snapGrid) {
                this.totalPages = this.$refs.swiper.swiperInstance.snapGrid.length
              }
            }
          }
        }
      }

      return { ...options, ...this.swiperOverrideOptions }
    },
    uniqueId () {
      return this._uid
    }
  },
  methods: {
    handleChangePage (slide) {
      this.$refs.swiper.swiperInstance.slideTo(slide, 1000)
    }
  }
}
