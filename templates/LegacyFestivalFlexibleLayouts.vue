<template>
  <div v-if="layouts" :class="{'font-festival_sans': $store.state.theme==='festival', 'font-medium bg-bsf11Purple': $store.state.theme==='bsf11'}">
    <template v-if="post.content&&post.content.rendered&&post.type==='page'">
      <Space :lg="true" />
      <Container>
        <FestivalProse>
          <span v-html="post.content.rendered" />
        </FestivalProse>
      </Container>
      <Space :lg="true" />
    </template>
    <div v-for="(layout, key) in layouts" :key="`layout${key}`" :class="{'sticky-cta': layout.acf_fc_layout==='sticky_call_to_action'}">
      <LazyFestivalStickyCta v-if="layout.acf_fc_layout==='sticky_call_to_action'" :line1="layout.line_1" :line2="(layout.line_2 ? layout.line_2 : null)" :link="layout.link" :style-name="layout.style" />
    </div>
    <div class="overflow-hidden">
      <div v-for="(layout, key) in layouts" :key="`layout${key}`" :class="{'sticky-cta': layout.acf_fc_layout==='sticky_call_to_action'}">
        <FestivalHeroMedia v-if="layout.acf_fc_layout==='hero_media'" :layout="layout" />
        <FestivalHeroText v-if="layout.acf_fc_layout==='hero_text'" :layout="layout" />
        <FestivalTextTabs v-if="layout.acf_fc_layout==='text_tabs'" :layout="layout" />
        <FestivalTickets v-if="layout.acf_fc_layout==='tickets_passes'" />
        <Space v-if="layout.acf_fc_layout==='space'" :lg="!layout.space||layout.space==='lg'" :md="layout.space==='md'" :sm="layout.space==='sm'" />
        <LazyFestivalScheduleCarousel v-if="layout.acf_fc_layout==='schedule_carousel'" :layout="layout" />
        <LazyFestivalTeamListings v-if="layout.acf_fc_layout==='team_listings'" :layout="layout" />
        <FestivalSponsorsCarousel v-if="layout.acf_fc_layout==='sponsors_carousel'" :layout="layout" />
        <FestivalSpotlightText v-if="layout.acf_fc_layout==='spotlight_text'" :layout="layout" />
        <FestivalSpotlightMedia v-if="layout.acf_fc_layout==='spotlight_media'" :layout="layout" />
        <FestivalSpotlightImageSlider v-if="layout.acf_fc_layout==='spotlight_image_slider'" :layout="layout" />
        <FestivalFaqAccordion v-if="layout.acf_fc_layout==='faq_accordion'" :layout="layout" />
        <FestivalSchedule v-if="layout.acf_fc_layout==='schedule'" :layout="layout" />
        <FestivalFilmGuide v-if="layout.acf_fc_layout==='film_guide'" :layout="layout" />
        <LazyFestivalEventBios v-if="layout.acf_fc_layout==='bios'" :layout="layout" :event-id="(layout.event ? layout.event : null)" />
        <FestivalVenuesHotels v-if="layout.acf_fc_layout==='venues_hotels'" :layout="layout" />
        <FestivalVenuesCarousel v-if="layout.acf_fc_layout==='venues_carousel'" :layout="layout" />
        <LazyFestivalMap v-if="layout.acf_fc_layout==='map'" :layout="layout" />
        <FestivalContent v-if="layout.acf_fc_layout==='content'" :layout="layout" />
        <div v-if="layout.acf_fc_layout==='anchor'" :id="layout.anchor_name" class="anchor" />
        <FestivalCallToActions v-if="layout.acf_fc_layout==='call_to_actions'" :layout="layout" />
        <FestivalSponsorsGrid v-if="layout.acf_fc_layout==='sponsors_grid'" :layout="layout" />
        <FestivalEventCreditSponsors v-if="layout.acf_fc_layout==='additional_credits'" :additional-credits="[layout]" />
        <FestivalListingArticles v-if="layout.acf_fc_layout==='manual_listing_articles'" :layout="layout" />
        <FestivalAnimation v-if="layout.acf_fc_layout==='animation'" :layout="layout" />
        <div v-if="key===(layouts.length-1)&&(layout.acf_fc_layout==='team_listings'||layout.acf_fc_layout==='bios')" class="overflow-hidden">
          <div class="h-96" />
          <div class="h-96" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LegacyFestivalFlexibleLayouts',
  props: {
    layouts: {
      type: Array,
      required: true
    },
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
