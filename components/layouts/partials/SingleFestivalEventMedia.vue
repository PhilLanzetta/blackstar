<template>
  <div class="single-festival-event__media relative z-20" :class="{'aspect-w-10 aspect-h-9 lg:aspect-w-16 lg:aspect-h-5': $store.state.theme==='festival'}">
    <video
      v-if="post.acf.custom_cover_video"
      ref="video"
      class="absolute top-0 left-0 z-10 w-full block h-full object-cover"
      autoplay
      muted
      loop
      playsinline
    >
      <source
        v-for="(videoSource, key) in post.acf.custom_cover_video"
        :key="`coverVideoSource${key}`"
        :type="videoSource.type"
        :src="videoSource.video"
      >
    </video>
    <span v-if="coverImage" class="block" v-html="coverImage" /><span
      v-if="!coverImage"
    ><img
      v-if="$store.state.theme==='festival'"
      src="~/assets/festival/default-image.png"
      alt=""
    ><img
      v-if="$store.state.theme==='bsf11'"
      src="~/assets/festival/11/default-image-lg.png"
      alt=""
    ></span>
    <div v-if="post.acf.cover_image_content" class="rounded-3xl lg:rounded-4xl border-4 lg:border-md 2xl:border-lg -mb-border-4 -left-border-4 -right-border-4 lg:-mb-border-md lg:-left-border-md lg:-right-border-md 2xl:-mb-border-lg 2xl:-left-border-lg 2xl:-right-border-lg -mt-border-4 lg:-mt-border-md 2xl:-mt-border-lg border-black bg-white p-6 absolute bottom-0 text-lg xl:text-xl">
      <h2 class="font-bold" v-html="post.acf.cover_image_content.heading" /><p v-html="post.acf.cover_image_content.description" />
    </div>
  </div>
</template>

<script>
import eventiveOverrides from '~/mixins/eventiveOverrides'

export default {
  name: 'SingleFestivalEventMedia',
  mixins: [eventiveOverrides],
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
