<template>
  <span class="toc-article">
    <h3 v-html="article.seen_article.post_title" />
    <p v-if="article.seen_article.authors.length">
      by <span
        v-for="(author, authorKey) in article.seen_article.authors"
        :key="`author${author.term_id}`"
      ><span v-html="author.name" /> <span v-if="article.seen_article.authors.length > 1 && article.seen_article.authors.length!==(authorKey+1)">&bull; </span></span>
    </p>
  </span>
</template>

<script>
export default {
  name: 'SeenTocTakeoverArticle',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
