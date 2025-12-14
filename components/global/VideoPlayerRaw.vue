<template>
  <ClientOnly>
    <div class="w-full h-full relative video-raw">
      <button v-if="!playing" v-cursor-hint="'Watch'" class="absolute top-0 left-0 z-20 w-full h-full" :class="{'video-raw__button': !customButton}" @click.prevent="playVideo">
        <span class="sr-only">Play</span>
        <slot v-if="customButton" />
      </button>
      <span v-if="!playing" class="cover-image absolute top-0 left-0 w-full h-full z-10" v-html="image" />
      <video
        v-if="video.type==='upload'"
        ref="video"
        class="w-full block h-full object-cover bg-black relative z-0"
        :autoplay="autoPlay"
        playsinline
        :controls="!autoPlay"
        :loop="autoPlay"
      >
        <source type="video/mp4" :src="video.video_file">
      </video>
      <template v-if="video.type==='embed'">
        <span ref="embed" v-cursor-hide class="block w-full h-full object-cover video-embed" v-html="video.video_embed" />
      </template>
    </div>
  </ClientOnly>
</template>

<script>
export default {
  name: 'VideoPlayerRaw',
  props: {
    image: {
      type: String,
      required: true
    },
    video: {
      type: Object,
      required: true
    },
    playingCallback: {
      type: Function,
      required: false,
      default: null
    },
    autoPlay: {
      type: Boolean,
      required: false,
      default: false
    },
    customButton: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      playing: false
    }
  },
  watch: {
    playing (to) {
      if (this.playingCallback) {
        this.playingCallback(to)
      }
    }
  },
  beforeDestroy () {
    if (this.$refs.video) {
      this.$refs.video.removeEventListener('ended', this.handleVideoEnd)
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.autoPlay) {
        this.playing = true
      }
    })
  },
  methods: {
    playVideo () {
      this.playing = true

      this.$nextTick(() => {
        if (this.$refs.video) {
          this.$refs.video.play()
          this.$refs.video.addEventListener('ended', this.handleVideoEnd)
        } else if (this.$refs.embed) {
          const iframe = this.$refs.embed.getElementsByTagName('iframe')
          if (iframe) {
            iframe[0].setAttribute('src', iframe[0].src + '&autoplay=1')
          }
        }
        this.$store.commit('cursor/leave')
      })
    },
    handleVideoEnd () {
      this.playing = false
    }
  }
}
</script>

<style>
.video-raw__button::before {
  @apply absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-20 block pointer-events-none opacity-100 transition-opacity duration-200;
  width: 118px;
  height: 107px;
  background: url('~/assets/play-icon.svg') no-repeat center center;
  background-size: 100% 100%;
  content: " ";
}

.video-raw .video-embed {
  @apply relative;
  padding-top: 56%;
  content: " ";
}

.video-raw .video-embed iframe {
  @apply absolute top-0 left-0 w-full h-full object-cover;
}

</style>
