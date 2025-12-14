<template>
  <Gallery v-if="post" :post="post"/>
</template>

<script>
import seo from '~/mixins/seo'
import draft from '~/mixins/draft'

export default {
  name: 'PreviewGallery',
  mixins: [seo, draft],
  layout: 'default',
  data () {
    return {
      post: null,
      endpoint: 'gallery',
      endpointArgs: '&single=1&archive_year='
    }
  }
}
</script>
