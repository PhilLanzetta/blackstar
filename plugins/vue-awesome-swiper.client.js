import Vue from 'vue'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
// import custom style
import 'swiper/css/swiper.css'

import { Swiper as SwiperClass, Navigation, Autoplay, EffectFlip, EffectFade } from 'swiper/js/swiper.esm'
SwiperClass.use([Navigation, Autoplay, EffectFlip, EffectFade])

Vue.use(getAwesomeSwiper(SwiperClass))
