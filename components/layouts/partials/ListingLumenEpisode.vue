<template>
  <article class="select-none" :class="{'max-w-sm': !large}">
    <SiteLink :to="post.link|replaceSiteUrl">
      <RoundedImage>
        <span v-html="post.featured_image_rendered" />
      </RoundedImage>
    </SiteLink>
    <header class="mt-4">
      <SiteLink :to="`/manylumens/${post.acf.season.slug}`" class="block font-serif_italic mb-0.5">
        <span v-html="post.acf.season.name" />
      </SiteLink>
      <h1 class="secondary-heading mb-1" v-html="post.title.rendered" />
    </header>

    <p class="font-serif text-sm mt-4" v-html="post.acf.introduction" />

    <footer class="flex space-x-4 mt-8 swiper-no-swiping">
      <PillButton :to="post.link|replaceSiteUrl" :color-scheme="color">
        Read More
      </PillButton>
      <PillButton :to="(post.link + '#play')|replaceSiteUrl" :color-scheme="color" :outline="true">
        Listen
      </PillButton>
    </footer>
  </article>
</template>

<script>
import ColourScheme from '~/mixins/ColourScheme'

export default {
  name: 'ListingLumenEpisode',
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
  }
}
</script>

<style scoped>

</style>
