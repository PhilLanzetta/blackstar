<template>
  <article class="select-none">
    <SiteLink :to="post.link|replaceSiteUrl">
      <RoundedImage shape="rectangle">
        <span v-html="post.featured_image_rendered" />
      </RoundedImage>
    </SiteLink>
    <header class="mt-4">
      <SiteLink v-if="post.categories" :to="`/news/${post.categories[0].slug}`" class-names="block font-serif_italic mb-0.5">
        <span v-html="post.categories[0].name" />
      </SiteLink>
      <h1 class="secondary-heading mb-1" v-html="post.title.rendered" />
    </header>

    <div class="font-serif text-sm mt-4" v-html="post.excerpt.rendered" />

    <footer class="flex space-x-4 mt-8">
      <PillButton :to="post.link|replaceSiteUrl" :color-scheme="color" :force-scheme="forceScheme">
        Read More
      </PillButton>
    </footer>
  </article>
</template>

<script>
import ColourScheme from '~/mixins/ColourScheme'

export default {
  name: 'ListingPostLarge',
  mixins: [ColourScheme],
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
