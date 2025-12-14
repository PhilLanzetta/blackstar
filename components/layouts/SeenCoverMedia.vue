<template>
  <div class="seen-article__header-media" :class="{'cover-image': coverImage}">
    <span :class="(cover.mobile_image ? 'hidden md:block' : '')" v-html="cover.image" />
    <span v-if="cover.mobile_image" :class="(cover.mobile_image ? 'block md:hidden' : '')" v-html="cover.mobile_image" />

    <div v-if="cover.video">
      <video
        v-if="cover.video"
        class="object-cover w-full h-full top-0 left-0 absolute z-10"
        playsinline
        autoplay
        loop
        muted
      >
        <source type="video/mp4" :src="cover.video">
      </video>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SeenCoverMedia',
  props: {
    cover: {
      type: Object,
      required: true
    },
    coverImage: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>

<style scoped>

</style>
