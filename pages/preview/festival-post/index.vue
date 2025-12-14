<template>
  <SingleFestivalPostTemplate v-if="post" :post="post" />
</template>

<script>
import seo from '~/mixins/seo'
import draft from '~/mixins/draft'

export default {
  name: 'PreviewFestivalPost',
  mixins: [seo, draft],
  layout: 'bsf14',
  data () {
    return {
      post: null,
      endpoint: 'festival-post',
      endpointArgs: '&singular=1'
    }
  }
}
</script>
