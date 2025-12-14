<template>
  <Opportunity v-if="post" :post="post" />
</template>

<script>
import seo from '~/mixins/seo'
import draft from '~/mixins/draft'
import Opportunity from '~/templates/Opportunity'

export default {
  name: 'PreviewOpportunity',
  layout: 'default',
  components: { Opportunity },
  mixins: [seo, draft],
  data () {
    return {
      post: null,
      endpoint: 'opportunity'
    }
  }
}
</script>
