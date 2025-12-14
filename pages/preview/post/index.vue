<template>
  <Post v-if="post" :post="post" />
</template>

<script>
import seo from '~/mixins/seo'
import draft from '~/mixins/draft'
import Post from '~/templates/Post'

export default {
  name: 'PreviewPost',
  layout: 'default',
  components: { Post },
  mixins: [seo, draft],
  data () {
    return {
      post: null,
      endpoint: 'posts'
    }
  }
}
</script>
