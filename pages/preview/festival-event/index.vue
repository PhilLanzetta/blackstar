<template>
  <div v-if="post">
    <Festival24SingleEvent v-if="parseInt(post.acf.festival_year)===2024" :post="post" />
    <Festival23SingleEvent v-else-if="parseInt(post.acf.festival_year)===2023" :post="post" />
    <Festival25SingleEvent v-else-if="parseInt(post.acf.festival_year)===2025" :post="post" />
    <SingleFestivalEvent v-else :post="post" />
  </div>
</template>

<script>
import seo from '~/mixins/seo'
import draft from '~/mixins/draft'

export default {
  name: 'PreviewFestivalEvent',
  mixins: [seo, draft],
  layout: 'bsf14',
  data () {
    return {
      post: null,
      endpoint: 'festival-event',
      endpointArgs: '&singular=1'
    }
  }
}
</script>
