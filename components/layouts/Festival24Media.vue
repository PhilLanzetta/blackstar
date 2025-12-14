<template>
  <Festival24Box class="overflow-hidden" :background="(layout.background ? layout.background : null)" :gradient-style="(layout.gradient_style ? layout.gradient_style : null)">
    <figure v-if="layout.media" class="w-full rounded-xl overflow-hidden" :class="{'border border-black': $store.state.theme==='bsf13'}">
      <span class="[&>img]:object-cover block relative z-0 aspect-w-1 aspect-h-1 lg:aspect-w-16 lg:aspect-h-9" :class="{'aspect-w-10 aspect-h-8': layout.media.format==='square', 'aspect-w-6 aspect-h-10': layout.media.format==='portrait', 'aspect-w-16 aspect-h-10': layout.media.format==='landscape'}" v-html="layout.media.image" />
      <video
        v-if="layout.media.video"
        class="bg-black absolute top-0 left-0 w-full h-full object-cover z-10"
        autoplay
        muted
        loop
        playsinline
      >
        <source type="video/mp4" :src="layout.media.video">
      </video>
    </figure>
  </Festival24Box>
</template>

<style>

</style>
<script>
export default {
  name: 'Festival24Media',
  props: {
    layout: {
      type: Object,
      required: true
    }
  }
}
</script>
