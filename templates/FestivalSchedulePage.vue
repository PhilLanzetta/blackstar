<template>
  <div :class="($store.state.theme==='bsf14'&&$store.state.festival.tabSettings ? ` bg-${$store.state.festival.tabSettings.background}` : '')">
    <template v-if="post&&post.acf.festival_year>=2024">
      <Festival24Section :section="{background: post.acf.background, layouts: [], style: 'full'}" :extra-padding="true" :rounded-top="(post.acf.festival_year===2025)">
        <div v-if="post.acf.festival_year===2024">
          <Festival24ScheduleByTime v-if="$route.query && $route.query.view && $route.query.view === 'time'" :post="post" />
          <Festival24Schedule v-else :post="post" :show-time-view="true" />
        </div>
        <div v-if="post.acf.festival_year===2025">
          <Festival25ScheduleByTime v-if="$route.query && $route.query.view && $route.query.view === 'time'" :post="post" />
          <Festival25Schedule v-else :post="post" :show-time-view="true" />
        </div>
      </Festival24Section>
      <Festival24Sections v-if="post.acf.layouts&&post.acf.layouts.length" class="relative z-10" :layouts="post.acf.layouts" />
    </template>
    <div v-if="post&&post.acf.festival_year===2023">
      <Festival23Section :background="post.acf.background">
        <Festival23ScheduleByTime v-if="$route.query && $route.query.view && $route.query.view === 'time'" :post="post" :section-colour="post.acf.background" />
        <Festival23Schedule v-else :section-colour="post.acf.background" :post="post" :show-time-view="true" />
      </Festival23Section>
      <Festival23Sections v-if="post.acf.layouts&&post.acf.layouts.length" class="relative z-10" :layouts="post.acf.layouts" />
    </div>
  </div>
</template>

<script>
import hasFestivalTabs from '~/mixins/hasFestivalTabs'

export default {
  name: 'FestivalSchedulePage',
  mixins: [hasFestivalTabs],
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  head () {
    return {
      link: [
        {
          rel: 'canonical',
          href: process.env.BASE_URL + this.$options.filters.replaceSiteUrl(this.post.link)
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
