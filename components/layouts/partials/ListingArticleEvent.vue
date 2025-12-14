<template>
  <article class="select-none" :class="{'max-w-sm': !large}">
    <SiteLink :to="(post.acf.redirect ? post.acf.redirect : post.link)|replaceSiteUrl">
      <Sticker v-for="sticker in post.stickers" :key="sticker.term_id" :label="sticker.name" :color-scheme="colorScheme" />
      <RoundedImage :shape="(square ? 'square' : 'rectangle')">
        <span v-html="post.featured_image_rendered" />
      </RoundedImage>
    </SiteLink>
    <header class="mt-4">
      <SiteLink v-for="programType in post.program_types" :key="`programType${programType.term_id}`" :to="`/events/${programType.slug}`" class="block font-serif_italic mb-0.5">
        <span v-html="programType.name" />
      </SiteLink>
      <h1 class="secondary-heading mb-1" v-html="post.title.rendered" />
      <time v-if="post.acf.listing_date_format==='start_date_time'||post.acf.listing_date_format==='full'" class="block text-xl">
        {{ post.acf.start_time|formatDate }} <span v-if="post.acf.listing_date_format==='full'">&ndash; {{ post.acf.end_time|formatDate }}</span> {{ post.acf.timezone_abv }}
      </time>
      <time v-if="!(post.acf.listing_date_format==='start_date_time'||post.acf.listing_date_format==='full')" class="block text-xl">
        {{ post.acf.start_time|formatDateAlt }} <span v-if="post.acf.listing_date_format==='start_end_date'">&ndash; {{ post.acf.end_time|formatDateAlt }}</span> {{ post.acf.timezone_abv }}
      </time>
    </header>

    <p class="font-serif text-sm mt-4" v-html="post.acf.custom_excerpt" />

    <footer class="flex space-x-4 mt-8 swiper-no-swiping">
      <PillButton :to="(post.acf.redirect ? post.acf.redirect : post.link)|replaceSiteUrl" :color-scheme="colorScheme" :force-scheme="forceScheme">
        Read More
      </PillButton>
      <PillButton v-if="post.acf.additional_listing_button" :to="post.acf.additional_listing_button.url|replaceSiteUrl" :color-scheme="colorScheme" :force-scheme="forceScheme" :outline="true">
        <span v-html="post.acf.additional_listing_button.title" />
      </PillButton>
    </footer>
  </article>
</template>

<script>
import ColourScheme from '~/mixins/ColourScheme'

export default {
  name: 'ListingArticleEvent',
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
    square: {
      type: Boolean,
      required: false,
      default: true
    }
  }
}
</script>

<style scoped>

</style>
