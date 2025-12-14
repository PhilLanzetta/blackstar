<template>
  <div v-if="post">
    <div class="bg-black">
      <SiteLink to="/archive">
        <ScrollMarquee symbol="arrows-down-right" word2="Archive" :word1="post.acf.year.name" force-colour="white" />
      </SiteLink>
    </div>
    <div v-if="post">
      <Gallery v-if="post.acf.type==='gallery'" :post="post.acf.gallery" />
      <Page v-else :post="post" />
    </div>
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
import live from '~/mixins/live'
import Page from '~/templates/Page'
import redirects from '~/mixins/redirects'

export default {
  name: 'ArchiveItemPage',
  components: { Page },
  mixins: [seo, live, redirects],
  layout: 'default',
  async asyncData ({ $axiosConfig, $axios, params, payload, error, store }) {
    if (payload && payload.settings) {
      store.commit('setSettings', payload.settings)
    }

    if (payload && payload.post) {
      return { deployedObject: payload.post }
    }

    const posts = await $axios.$get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/archive-item?slug=${params.slug}&per_page=1&single=1&archive_year=${params.year}`, $axiosConfig.config)

    if (posts && posts.length) {
      return { deployedObject: posts[0] }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data () {
    return {
      endpoint: 'archive-item',
      endpointArgs: `&single=1&archive_year=${this.$route.params.year}`
    }
  },
  head () {
    if (this.post && this.post.acf.type === 'link') {
      return {
        title: 'Page has moved',
        meta: [
          {
            'http-equiv': 'refresh',
            content: `0;${this.$options.filters.replaceSiteUrl(this.post.acf.link.url)}`
          }
        ]
      }
    }

    if (this.post && this.post.acf.type === 'event') {
      return {
        title: 'Page has moved',
        meta: [
          {
            'http-equiv': 'refresh',
            content: `0;${this.$options.filters.replaceSiteUrl(this.post.acf.event.link)}`
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.back {
  @apply font-medium text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl pt-4 pb-8 mt-0 block;
}

.back__arrow {
  @apply font-light text-2xl lg:text-4xl xl:text-6xl;
}
</style>
