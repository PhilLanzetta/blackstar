<template>
  <div>
    <section v-for="(layout, layoutKey) in layouts" :key="`layout${layoutKey}`">
      <SeenFeatureMedia v-if="layout.acf_fc_layout==='feature_media'" :layout="layout" />
      <SeenFeaturedText v-if="layout.acf_fc_layout==='feature_text'" :layout="layout" />
      <SeenSpotlightContained v-if="layout.acf_fc_layout==='spotlight_contained'" :layout="layout" />
      <SeenSpotlight v-if="layout.acf_fc_layout==='spotlight'" :layout="layout" />
      <SeenFeaturedArticles v-if="layout.acf_fc_layout==='articles'" :layout="layout" />
      <SeenArticleListing v-if="layout.acf_fc_layout==='article_listing'" :layout="layout" />
      <SeenList v-if="layout.acf_fc_layout==='list'" :layout="layout" />
      <SeenAccordion v-if="layout.acf_fc_layout==='accordion'" :layout="layout" />
      <SeenIssueCredits v-if="layout.acf_fc_layout==='issue_credits'" :layout="layout" />
      <SeenStockists v-if="layout.acf_fc_layout==='stockists'" :layout="layout" />
      <SeenContact v-if="layout.acf_fc_layout==='contact_details'" :layout="layout" />
      <SeenNewsletterSignupLayout v-if="layout.acf_fc_layout==='newsletter_signup'" :layout="layout" />
      <Space v-if="layout.acf_fc_layout==='space'" :lg="!layout.size||layout.size==='lg'" :md="layout.size==='md'" :sm="layout.size==='sm'" />
      <div v-if="layout.acf_fc_layout==='anchor'" :id="layout.anchor_name" class="anchor" />
    </section>
    <SeenFooter v-if="post.slug!=='about'&&!hasNewsletterLayout" />
  </div>
</template>

<script>
import SeenFeaturedText from '~/components/layouts/SeenFeaturedText'
import SeenSpotlightContained from '~/components/layouts/SeenSpotlightContained'
import SeenFeaturedArticles from '~/components/layouts/SeenFeaturedArticles'
import SeenList from '~/components/layouts/SeenList'
import SeenAccordion from '~/components/layouts/SeenAccordion'
import SeenIssueCredits from '~/components/layouts/SeenIssueCredits'
import SeenStockists from '~/components/layouts/SeenStockists'
import SeenContact from '~/components/layouts/SeenContact'
import SeenNewsletterSignupLayout from '~/components/layouts/SeenNewsletterSignup.vue'
export default {
  name: 'SeenFlexibleLayouts',
  components: { SeenNewsletterSignupLayout, SeenContact, SeenStockists, SeenIssueCredits, SeenAccordion, SeenList, SeenFeaturedArticles, SeenSpotlightContained, SeenFeaturedText },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    layouts () {
      return this.post.acf.layouts
    },
    hasNewsletterLayout () {
      return this.layouts.filter((layout) => { return layout.acf_fc_layout === 'newsletter_signup' }).length > 0
    }
  }
}
</script>

<style>
@import "~/assets/css/seen.css";

</style>
