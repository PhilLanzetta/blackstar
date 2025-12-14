<template>
  <div v-if="$store.state.gallery" class="fixed top-0 left-0 bg-black bg-opacity-75 w-full h-full z-30">
    <div class="flex w-full h-full items-center justify-center">
      <div class="w-full">
        <button v-cursor-interact class="absolute z-10 top-0 right-0 flex justify-center items-center text-center w-10 h-10 bg-purple rounded-full border border-black m-4 pointer-events-auto" @click.prevent="closeModal">
          <CloseIcon /><span class="sr-only">Close</span>
        </button>

        <div v-if="!currentItem.video&&!currentItem.video_embed" class="gallery-modal-media">
          <div v-html="currentItem.image_sizes.large" />
        </div>
        <Container v-if="currentItem.video||currentItem.video_embed">
          <VideoPlayerRaw :video="{ type: (currentItem.video_embed ? 'embed' : 'upload'), video_embed: currentItem.video_embed, video_file: currentItem.video }" :image="currentItem.image" :auto-play="true" />
        </Container>
      </div>
      <div class="disabled-gray absolute text-purple right-0 bottom-0 p-5 z-30">
        <button v-cursor-interact :class="{'swiper-button-disabled': currentIndex===0}" @click.prevent="previousItem">
          <PrevArrow />
        </button>
        <button v-cursor-interact :class="{'swiper-button-disabled': currentIndex===($store.state.gallery.gallery.length-1)}" @click.prevent="nextItem">
          <NextArrow />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CloseIcon from '~/assets/festival/close.svg?inline'
import modal from '~/mixins/modal'

export default {
  name: 'GalleryModal',
  components: { CloseIcon },
  mixins: [modal],
  data () {
    return {
      currentIndex: this.$store.state.gallery.currentIndex
    }
  },
  computed: {
    currentItem () {
      if (!this.$store.state.gallery) {
        return null
      }

      return this.$store.state.gallery.gallery[this.currentIndex]
    }
  },
  methods: {
    closeModal () {
      this.$store.commit('setGallery', null)
    },
    previousItem () {
      if (this.currentIndex === 0) {
        return
      }

      this.currentIndex--
    },
    nextItem () {
      if (this.currentIndex === (this.$store.state.gallery.gallery.length - 1)) {
        return
      }

      this.currentIndex++
    }
  }
}
</script>

<style>
.gallery-modal-media img {
  @apply block w-full h-full object-contain absolute top-0 left-0 w-screen h-screen z-0 pointer-events-none;
}
</style>
