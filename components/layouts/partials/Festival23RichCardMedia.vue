<template>
  <div class="w-full h-full cover-image bg-black">
    <span v-if="image" v-html="image" />
    <img v-else src="~/assets/festival/12/fallback-image.jpg" alt="Audience at a BlackStar Festival event">
    <video
      v-if="video"
      class="absolute z-20 w-full h-full top-0 left-0 bg-black object-cover"
      autoplay
      muted
      loop
      playsinline
    >
      <source :src="video" type="video/mp4">
    </video>
  </div>
</template>

<script>
export default {
  name: 'Festival23RichCardMedia',
  props: {
    card: {
      type: Object,
      required: true
    },
    size: {
      type: String,
      required: false,
      default: 'card'
    }
  },
  computed: {
    image () {
      if (this.card.type === 'festival-event') {
        return (this.card.event.acf.custom_featured_image ? this.card.event.acf.custom_featured_image[this.size] : this.card.event.featured_image_rendered[this.size])
      }

      if (this.card.type === 'festival-film') {
        return this.card.film.featured_image_rendered[this.size]
      }

      return this.card.custom.image[this.size]
    },
    video () {
      if (this.card.type === 'festival-event') {
        return false
      }

      if (this.card.type === 'festival-film') {
        return false
      }

      return this.card.custom.video
    }
  }
}
</script>

<style>
</style>
