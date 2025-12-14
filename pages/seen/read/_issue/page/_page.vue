<template>
  <div>
    <Container>
      <Space :md="true" />
      <SeenArticleListing :layout="{type: 'issue', issue: issue.id, show_issue_filter: true, show_categories: true}" :initial-page="parseInt($route.params.page)" />
      <Space :lg="true" />
    </Container>
  </div>
</template>

<script>

import seo from '~/mixins/seo'

export default {
  name: 'SeenIssuePage',
  mixins: [seo],
  layout: 'seen',
  async asyncData ({ $axiosConfig, $axios, params, payload, error, store }) {
    if (payload && payload.settings) {
      store.commit('setSettings', payload.settings)
    }

    try {
      let issue = false
      if (payload && payload.post) {
        issue = payload.post
      }

      if (!issue) {
        const issues = await $axios.$get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/seen-issue?slug=${params.issue}`, $axiosConfig.config)
        if (!(issues && issues.length)) {
          error({
            statusCode: 404,
            message: 'Page not found'
          })
        }

        issue = issues[0]
      }

      const posts = await $axios.$get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/seen-article?per_page=6&page=${params.page}&seen-issue=${issue.id}`, $axiosConfig.config)

      if (!(posts && posts.length)) {
        error({
          statusCode: 404,
          message: 'Page not found'
        })
      }

      return { issue }
    } catch (e) {
      error({
        statusCode: 404,
        message: 'Page not found'
      })
    }
  },
  data () {
    return {
      appendSeoTitle: ` - Page ${this.$route.params.page}`
    }
  },
  computed: {
    category () {
      return this.issue
    }
  }
}
</script>

<style scoped>

</style>
