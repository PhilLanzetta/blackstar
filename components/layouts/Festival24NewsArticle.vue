<template>
  <article class="text-lg  lg:text-xl">
    <div class="[&>img]:object-cover aspect-w-16 aspect-h-10 border rounded-xl overflow-hidden" v-html="newsArticle.image" />
    <h1 class="mt-6 text-2xl font-medium mb-0" v-html="newsArticle.title" />
    <h2 class="mt-0" v-if="newsArticle.subtitle_date" v-html="newsArticle.subtitle_date" />
    <p class="my-3" v-if="newsArticle.excerpt" v-html="newsArticle.excerpt" />
    <Festival24Button v-if="newsArticle.button" :to="newsArticle.button.url|replaceSiteUrl" :target="newsArticle.button.target"><span v-html="newsArticle.button.title" /></Festival24Button>
  </article>
</template>

<style>

</style>
<script>
export default {
  name: 'Festival24NewsArticle',
  props: {
    newsArticle: {
      type: Object,
      required: true
    }
  }
}
</script>
