<template>
  <div class="relative" :class="{'-my-6 md:-my-10 lg:-my-12 xl:-my-16 2xl:-my-20': $store.state.theme==='bsf13', '-mb-12 sm:-my-12 2xl:-my-16': $store.state.theme==='bsf14'}" :style="dynamicStyles">
    <div :class="{'hidden lg:block': layout.mobile_image, 'max-w-screen-2xl mx-auto': layout.contained}">
      <div class="[&>img]:w-full" v-html="layout.image" />
      <video
        v-if="layout.video"
        class="bg-black absolute top-0 left-0 w-full h-full object-cover"
        autoplay
        muted
        loop
        playsinline
      >
        <source type="video/mp4" :src="layout.video">
      </video>
    </div>
    <div :class="{'block lg:hidden': layout.mobile_image}">
      <div class="[&>img]:w-full" v-html="layout.mobile_image" />
      <video
        v-if="layout.mobile_video"
        class="bg-black absolute top-0 left-0 w-full h-full object-cover"
        autoplay
        muted
        loop
        playsinline
      >
        <source type="video/mp4" :src="layout.mobile_video">
      </video>
    </div>
  </div>
</template>

<style scoped>
</style>
<script>
export default {
  name: 'Festival24Hero',
  props: {
    layout: {
      type: Object,
      required: true
    }
  },
  computed: {
    dynamicStyles () {
      if (this.layout.background_color) {
        return `background-color: ${this.layout.background_color}`
      }
      return ''
    }
  }
}
</script>
