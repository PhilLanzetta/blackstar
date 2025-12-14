<template>
  <Container>
    <div class="lg:flex lg:space-x-20">
      <div v-for="(article, articleKey) in layout.articles" :key="articleKey" class="w-full mb-10 lg:mb-0">
        <ListingSeenArticle :full="true" :article="fillArticle(article)" :cursor-hint="(article.show_cursor_hint ? article.cursor_hint : '')" />
      </div>
    </div>
  </Container>
</template>

<script>
import ListingSeenArticle from '~/components/layouts/partials/ListingSeenArticle'
import layout from '~/mixins/layout'
export default {
  name: 'SeenFeaturedArticles',
  components: { ListingSeenArticle },
  mixins: [layout],
  methods: {
    fillArticle (article) {
      if (article.type === 'article') {
        return article.article
      }

      return {
        title: {
          rendered: article.title
        },
        link: article.link.url,
        featured_image_rendered: article.image,
        pre_title: article.pre_title,
        sub_title: article.Sub_title
      }
    }
  }
}
</script>

<style scoped>

</style>
