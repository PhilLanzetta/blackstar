<template>
  <div class="seen-listing-article " :class="{'seen-listing-article--full': full}">
    <div  v-if="article.featured_image_rendered" class="seen-listing-article__image"><RawLink v-if="cursorHint!==''" :to="article.link|replaceSiteUrl" v-cursor-hint="cursorHint">
      <span v-html="article.featured_image_rendered"></span>
    </RawLink><SiteLink v-else :to="article.link|replaceSiteUrl">
      <span v-html="article.featured_image_rendered"></span>
    </SiteLink>
    </div>
    <p v-if="article.categories&&article.categories.length">
      <span v-for="(category, relatedCategoryKey) in article.categories" :key="`articleCategory${category.term_id}`"><SiteLink :to="`/seen/category/${category.slug}`"><span v-html="category.name" /></SiteLink><span v-if="article.categories.length > 1 && article.categories.length!==(relatedCategoryKey+1)" class="sep" /></span>
    </p>
    <p v-if="article.pre_title" v-html="article.pre_title"></p>
    <h2>
      <SiteLink :to="article.link|replaceSiteUrl">
        <span v-html="article.title.rendered"></span>
      </SiteLink>
    </h2>
    <cite v-if="article.author&&article.author.length">
      by <span v-for="(articleAuthor, relatedAuthorKey) in article.author" :key="`articleAuthor${articleAuthor.term_id}`"><SiteLink :to="`/seen/author/${articleAuthor.slug}`"><span v-html="articleAuthor.name" /></SiteLink><span v-if="article.author.length > 1 && article.author.length!==(relatedAuthorKey+1)" class="sep" /></span>
    </cite>
    <cite v-if="article.sub_title" v-html="article.sub_title">
    </cite>
  </div>
</template>

<script>
export default {
  name: 'ListingSeenArticle',
  props: {
    article: {
      type: Object,
      required: true
    },
    full: {
      type: Boolean,
      required: false,
      default: false
    },
    cursorHint: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style>

.seen-listing-article {
  @apply lg:w-1/2 text-lg mb-8 lg:mb-0;
}

.seen-listing-article--full {
  @apply w-full;
}

.seen-listing-article h2 {
  @apply text-2xl xl:text-3xl font-seen_serif_light font-light pr-5 xl:pr-20 mt-2;
}

.seen-listing-article__image {
  @apply mb-2 lg:mb-8;
}

.seen-listing-article__image img {
  @apply block w-full h-auto;
}

.seen-listing-article--full .seen-listing-article__image {
  @apply relative;
}

.seen-listing-article--full .seen-listing-article__image::before {
  @apply block;
  content: " ";
  padding-top: 56%;
}

.seen-listing-article--full .seen-listing-article__image img {
  @apply absolute h-full top-0 left-0 object-cover;
}

.seen-listing-article p {
  @apply font-seen_serif_light_italic font-light xl:text-xl;
}

.seen-listing-article cite {
  @apply not-italic font-light mt-2 block;
}

.seen-listing-article .sep {
  @apply inline-block w-2 h-2 rounded-full bg-black mb-0.5 mx-1;
}
</style>
