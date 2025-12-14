<template>
  <div
    class="cover-image w-full h-full overflow-hidden"
    :class="{'rounded-xl': border&&size!=='hero-card', 'border border-black': $store.state.theme==='bsf13'&&border&&size!=='hero-card', 'rounded-3xl': border&&size==='hero-card'}"
  >
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
  name: 'Festival24RichCardMedia',
  props: {
    card: {
      type: Object,
      required: true
    },
    size: {
      type: String,
      required: false,
      default: 'card'
    },
    border: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  computed: {
    image () {
      if (this.card.type === 'festival-event') {
        if (this.card.event.acf.custom_featured_image) {
          if (typeof this.card.event.acf.custom_featured_image === 'object') {
            return this.card.event.acf.custom_featured_image[this.size]
          }

          return this.card.event.acf.custom_featured_image
        }

        if (typeof this.card.event.featured_image_rendered === 'object') {
          return this.card.event.featured_image_rendered[this.size]
        }

        return this.card.event.featured_image_rendered
      }

      if (this.card.type === 'festival-film') {
        if (typeof this.card.film.featured_image_rendered === 'object') {
          return this.card.film.featured_image_rendered[this.size]
        }

        return this.card.film.featured_image_rendered
      }

      if (this.card.type === 'festival-post') {
        return this.card.news_post.featured_image_rendered
      }

      return this.card.custom.image[this.size]
    },
    video () {
      if (this.card.type === 'custom' && this.card.custom.video) {
        return this.card.custom.video
      }

      return false
    }
  }
}
</script>

<style>
</style>
