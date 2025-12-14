<template>
  <figure>
    <span class="cover-image z-0" v-html="((index === 0 || ((index+1) % 4 === 0)) ? item.image_sizes.contained : item.image_sizes.half)" />
    <figcaption v-if="item.description" v-html="item.description" />
    <template v-if="item.video||item.video_embed">
      <button v-cursor-hint="'Watch'" class="absolute top-0 left-0 z-20 w-full h-full video-raw__button" @click.prevent="triggerGalleryModal">
        <span class="sr-only">Play</span>
      </button>
    </template>

    <template v-if="!(item.video||item.video_embed)">
      <button v-cursor-hint="'View'" class="absolute top-0 left-0 z-20 w-full h-full" @click.prevent="triggerGalleryModal">
        <span class="sr-only">View Image Larger</span>
      </button>
    </template>
  </figure>
</template>

<script>
export default {
  name: 'GalleryItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    handleGalleryModal: {
      type: Function,
      required: true
    }
  },
  methods: {
    triggerGalleryModal () {
      this.handleGalleryModal(this.index)
    }
  }
}
</script>

<style scoped>
.video-raw__button::before {
  @apply absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-20 block pointer-events-none opacity-100 transition-opacity duration-200;
  width: 118px;
  height: 107px;
  background: url('~/assets/play-icon.svg') no-repeat center center;
  background-size: 100% 100%;
  content: " ";
}
</style>
