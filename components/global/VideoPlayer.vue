<template>
  <ClientOnly>
    <div class="festival-media-spotlight__video bg-black overflow-hidden relative z-0">
      <transition name="fade-in-down">
        <div class="absolute top-0 left-0 z-10 w-full max-w-80 -ml-border -mt-border">
          <FestivalHeading v-if="title&&!playing" background-class="bg-lime text-navy">
            <span class="text-xl font-festival_sans_italic" v-html="title" />
          </FestivalHeading>
        </div>
      </transition>
      <video v-if="video.type==='uploaded'" ref="video" class="w-full block h-auto bg-black relative z-0" playsinline>
        <source v-for="(videoSource, key) in video.video_sources" :key="`videoSource${key}`" :type="videoSource.type" :src="videoSource.video">
      </video>
      <template v-if="video.type==='embed'">
        <span ref="embed" v-cursor-hide class="block w-full h-auto aspect-w-16 aspect-h-9" v-html="video.video_embed" />
      </template>
      <div class="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
        <VideoPlayButton :image="image" :playing="playing" :play-video="playVideo" />
      </div>
    </div>
  </ClientOnly>
</template>

<script>
export default {
  name: 'VideoPlayer',
  props: {
    video: {
      type: Object,
      required: true
    },
    image: {
      type: String,
      required: false,
      default: null
    },
    title: {
      type: String,
      required: false,
      default: null
    },
    playingCallback: {
      type: Function,
      required: false,
      default: null
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
  methods: {
    playVideo () {
      this.playing = true

      this.$nextTick(() => {
        if (this.$refs.video) {
          this.$refs.video.play().then(() => {
            this.$refs.video.addEventListener('ended', this.handleVideoEnd)
          })
        } else if (this.$refs.embed) {
          const iframe = this.$refs.embed.getElementsByTagName('iframe')
          if (iframe) {
            iframe[0].setAttribute('src', iframe[0].src + '&autoplay=1')
          }
        }
      })
    },
    handleVideoEnd () {
      this.playing = false
    }
  }
}
</script>

<style scoped>

</style>
