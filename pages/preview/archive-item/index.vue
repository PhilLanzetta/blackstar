<template>
  <div v-if="post">
    <div class="bg-black">
      <SiteLink to="/archive">
        <ScrollMarquee symbol="arrows-down-right" word2="Archive" :word1="post.acf.year.name" force-colour="white" />
      </SiteLink>
    </div>
    <Page :post="post" />
    <div class="bg-teal">
      <Container>
        <SiteLink class="back" to="/archive">
          <span class="flex items-baseline space-x-4 leading-none"><span
            class="back__arrow"
          >&larr;&larr;</span> <span>Back to Archive</span></span>
        </SiteLink>
      </Container>
    </div>
  </div>
</template>

<script>
import seo from '~/mixins/seo'
import draft from '~/mixins/draft'

export default {
  name: 'PreviewArchiveItem',
  mixins: [seo, draft],
  layout: 'default',
  data () {
    return {
      post: null,
      endpoint: 'archive-item'
    }
  },
  computed: {
    endpointArgs () {
      if (this.post) {
        return `&single=1&archive_year=${this.post.acf.year.slug}`
      }
      return '&single=1'
    }
  }
}
</script>
