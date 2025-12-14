<template>
  <LumenEpisode v-if="post" :post="post" />
</template>

<script>
import seo from '~/mixins/seo'
import draft from '~/mixins/draft'
import LumenEpisode from '~/templates/LumenEpisode'

export default {
  name: 'PreviewPost',
  layout: 'default',
  components: { LumenEpisode },
  mixins: [seo, draft],
  data () {
    return {
      post: null,
      endpoint: 'lumen-episode'
    }
  }
}
</script>
