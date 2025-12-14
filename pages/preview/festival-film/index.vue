<template>
  <div v-if="post">
    <Festival25SingleFilm v-if="parseInt(post.acf.festival_year)===2025" :post="post" />
    <Festival24SingleFilm v-if="parseInt(post.acf.festival_year)===2024" :post="post" />
    <Festival23SingleFilm v-if="parseInt(post.acf.festival_year)===2023" :post="post" />
  </div>
</template>

<script>
import seo from '~/mixins/seo'
import draft from '~/mixins/draft'

export default {
  name: 'PreviewFestivalFilm',
  mixins: [seo, draft],
  layout: 'bsf14',
  data () {
    return {
      post: null,
      endpoint: 'festival-film',
      endpointArgs: '&singular=1'
    }
  }
}
</script>
