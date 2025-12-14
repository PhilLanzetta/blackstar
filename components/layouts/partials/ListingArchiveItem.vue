<template>
  <article class="select-none" :class="{'max-w-sm': !large}">
    <SiteLink :to="primaryLink|replaceSiteUrl" :click-handler="clickHandler">
      <RoundedImage>
        <span v-html="image" />
      </RoundedImage>
    </SiteLink>

    <header class="mt-4">
      <h1 class="secondary-heading mb-1" v-html="title" />
      <time class="block text-xl">
        {{ post.acf.year.name }}
      </time>
    </header>

    <p v-if="excerpt" class="font-serif text-sm mt-4" v-html="excerpt" />

    <footer class="flex space-x-4 mt-8">
      <PillButton :to="primaryLink|replaceSiteUrl" :click-handler="clickHandler" :color-scheme="color" :force-scheme="forceScheme">
        <span v-html="primaryLinkLabel" />
      </PillButton>
      <PillButton v-if="post.acf.additional_button" :to="post.acf.additional_button.url|replaceSiteUrl" :color-scheme="colorScheme" :outline="true">
        <span v-html="post.acf.additional_button.title" />
      </PillButton>
    </footer>
  </article>
</template>

<script>
import ColourScheme from '~/mixins/ColourScheme'

export default {
  name: 'ListingArchiveItem',
  mixins: [ColourScheme],
  props: {
    post: {
      type: Object,
      required: true
    },
    large: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    image () {
      if (this.post.acf.type === 'event' && !this.post.acf.featured_image) {
        return this.post.acf.event.featured_image_rendered
      }

      return this.post.acf.featured_image
    },
    title () {
      return this.post.title.rendered
    },
    excerpt () {
      if (this.post.acf.type === 'event' && !this.post.acf.excerpt) {
        return this.post.acf.event.acf.custom_excerpt
      }

      return this.post.acf.excerpt
    },
    primaryLink () {
      if (this.post.acf.type === 'event') {
        return this.post.acf.event.link
      }

      if (this.post.acf.type === 'link') {
        return this.post.acf.link.url
      }

      return this.post.link
    },
    primaryLinkLabel () {
      if (this.post.acf.type === 'link') {
        return this.post.acf.link.title
      }

      if (this.post.acf.type === 'video' || this.post.acf.type === 'video_embed') {
        return 'Watch'
      }

      return 'Read More'
    },
    clickHandler () {
      if (this.post.acf.type === 'video' || this.post.acf.type === 'video_embed') {
        return this.handleVideoModal
      }

      return null
    }
  },
  methods: {
    handleVideoModal () {
      this.$store.commit('setVideo', { image: this.image, type: (this.post.acf.type === 'video_embed' ? 'embed' : 'upload'), video_embed: this.post.acf.video_embed, video_file: this.post.acf.video })
    }
  }
}
</script>

<style scoped>

</style>
