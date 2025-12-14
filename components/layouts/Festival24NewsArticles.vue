<template>
  <div class="space-y-8 lg:space-y-0 lg:flex lg:space-x-16">
    <Festival24NewsArticle v-for="(newsArticle, key) in layout.news_articles" :key="`newsArticle${key}`" class="lg:w-1/2" :news-article="newsArticle.news_article" />
  </div>
</template>

<script>
export default {
  name: 'Festival24NewsArticles',
  props: {
    layout: {
      type: Object,
      required: true
    }
  }
}
</script>
