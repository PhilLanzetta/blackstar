<template>
  <article class="select-none" :class="{'max-w-sm': !large}">
    <SiteLink :to="post.link|replaceSiteUrl">
      <RoundedImage>
        <span v-html="post.featured_image_rendered" />
      </RoundedImage>
    </SiteLink>
    <header class="mt-4">
      <span v-if="showType" class="block font-serif_italic mb-0.5">{{ niceType }}</span>
      <SiteLink v-if="post.categories&&post.categories.length" :to="`/news/${post.categories[0].slug}`" class-names="block font-serif_italic mb-0.5">
        <span v-html="post.categories[0].name" />
      </SiteLink>
      <h1 class="secondary-heading mb-1" v-html="post.title.rendered" />
      <time v-if="post.type==='post'" class="block text-xl">
        {{ post.date|formatDateAlt }}
      </time>
    </header>

    <div v-if="post.excerpt" class="font-serif text-sm mt-4" v-html="post.excerpt.rendered" />

    <footer class="flex space-x-4 mt-8 swiper-no-swiping">
      <PillButton :to="post.link|replaceSiteUrl" :color-scheme="color" :force-scheme="forceScheme">
        Read More
      </PillButton>
      <PillButton v-if="post.acf&&post.acf.pdf" :to="post.acf.pdf|replaceSiteUrl" :color-scheme="color" :force-scheme="forceScheme" :outline="true">
        Download PDF
      </PillButton>
    </footer>
  </article>
</template>

<script>
import ColourScheme from '~/mixins/ColourScheme'

export default {
  name: 'ListingPost',
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
    },
    showType: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    niceType () {
      const type = (this.post.type ? this.post.type : this.post.post_type)

      if (type === 'festival-event') {
        return 'Festival'
      }

      if (type === 'seen-article') {
        return 'Seen'
      }

      if (type === 'archive-item') {
        return 'Archive'
      }

      if (type === 'gallery') {
        return 'Gallery'
      }

      if (type === 'opportunity') {
        return 'Opportunity'
      }

      if (type === 'page') {
        return 'Page'
      }

      return type
    }
  }
}
</script>

<style scoped>

</style>
