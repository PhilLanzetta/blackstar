<template>
  <Page v-if="post" :post="post" />
</template>

<script>
import seo from '~/mixins/seo'
import draft from '~/mixins/draft'

export default {
  name: 'PreviewPage',
  layout: 'default',
  mixins: [seo, draft],
  data () {
    return {
      post: null,
      endpoint: 'pages'
    }
  }
}
</script>
