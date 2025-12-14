<template>
  <SeenArticle v-if="post" :post="post" />
</template>

<script>
import seo from '~/mixins/seo'
import draft from '~/mixins/draft'
import SeenArticle from '~/templates/SeenArticle'

export default {
  name: 'PreviewSeenArticle',
  layout: 'seen',
  components: { SeenArticle },
  mixins: [seo, draft],
  data () {
    return {
      post: null,
      endpoint: 'seen-article'
    }
  }
}
</script>
