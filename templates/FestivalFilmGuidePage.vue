<template>
  <div :class="($store.state.theme==='bsf14'&&$store.state.festival.tabSettings ? ` bg-${$store.state.festival.tabSettings.background}` : '')">
    <template v-if="post.acf.festival_year>=2024">
      <Festival24Section :section="{background: post.acf.background, layouts: [], style: 'full'}" :extra-padding="true" :rounded-top="(post.acf.festival_year===2025)">
        <Festival24FilmGuide v-if="post.acf.festival_year===2024" :post="post" :section-colour="post.acf.background" />
        <Festival25FilmGuide v-if="post.acf.festival_year===2025" :post="post" :section-colour="post.acf.background" />

      </Festival24Section>
      <Festival24Sections v-if="post.acf.layouts&&post.acf.layouts.length" class="relative z-10" :layouts="post.acf.layouts" />
    </template>
    <template v-if="post.acf.festival_year===2023">
      <Festival23Section :background="post.acf.background">
        <Festival23FilmGuide :post="post" :section-colour="post.acf.background" />
      </Festival23Section>
      <Festival23Sections v-if="post.acf.layouts&&post.acf.layouts.length" class="relative z-10" :layouts="post.acf.layouts" />
    </template>
  </div>
</template>

<script>
import hasFestivalTabs from '~/mixins/hasFestivalTabs'

export default {
  name: 'FestivalFilmGuidePage',
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
