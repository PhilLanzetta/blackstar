<template>
  <div class="relative last:pb-96 rounded-section" :class="{'pt-12 lg:pt-16': $store.state.theme==='bsf14'&&!hasHeroLayout}">
    <Festival24Section
      v-for="(section, key) in layouts"
      :key="`festival24Section${key}`"
      :section="section"
      :extra-padding="((layouts[key+1]&&layouts[key+1].background !== section.background))||(key+1)===layouts.length"
      :class="{ 'bg-transparent': section?.layouts?.some(layout => layout.inversed) }"
    >
      <div v-for="(layout, layoutKey) in section.layouts" :key="`layout24Section${key}Layout${layoutKey}`">
        <Festival24Heading v-if="layout.acf_fc_layout==='heading'" :layout="layout" />
        <Festival24SecondaryHeading v-if="layout.acf_fc_layout==='secondary_heading'" :layout="layout" />
        <Festival24Content v-if="layout.acf_fc_layout==='content'" :layout="layout" />
        <Space v-if="layout.acf_fc_layout==='space'" :sm="true" />
        <div v-if="layout.acf_fc_layout==='anchor'" :id="layout.anchor_name" />
        <Festival24Explainers v-if="layout.acf_fc_layout==='explainers'" :layout="layout" />
        <Festival24SpotlightCarousel v-if="layout.acf_fc_layout==='spotlight_carousel'" :layout="layout" :background="section.background" />
        <Festival24Buttons v-if="layout.acf_fc_layout==='buttons'" :buttons="layout.buttons" />
        <Festival24Cards v-if="layout.acf_fc_layout==='cards'" :layout="layout" />
        <Festival24Spotlights v-if="layout.acf_fc_layout==='spotlight_ctas'" :layout="layout" />
        <Festival24SponsorsCarousel v-if="layout.acf_fc_layout==='sponsors_carousel'" :layout="layout" :section-colour="section.background" />
        <Festival23Sponsors v-if="layout.acf_fc_layout==='sponsors'" :layout="layout" :section-colour="section.background" />
        <Festival24RichCardGrid v-if="layout.acf_fc_layout==='rich_card_carousel'" :layout="layout" />
        <Festival24LandscapeRichCardCarousel v-if="layout.acf_fc_layout==='landscape_rich_card_carousel'" :layout="layout" :section-colour="section.background" />
        <Festival24Passes v-if="layout.acf_fc_layout==='passes'" :layout="layout" :section-colour="section.background" />
        <Festival24Accordion v-if="layout.acf_fc_layout==='faq_accordion'" :layout="layout" />
        <Festival24CustomAccordion v-if="layout.acf_fc_layout==='accordion'" :layout="layout" />
        <Festival24Bios v-if="layout.acf_fc_layout==='bios'" :layout="layout" :default-event-id="eventId" />
        <Festival24Map v-if="layout.acf_fc_layout==='map'" :layout="layout" />
        <Festival24Media v-if="layout.acf_fc_layout==='media'" :layout="layout" />
        <Festival24MediaHero v-if="layout.acf_fc_layout==='media_hero'" :layout="layout" :section-colour="section.background" />
        <Festival24MediaCarousel v-if="layout.acf_fc_layout==='media_carousel'" :layout="layout" />
        <Festival24VideoCover v-if="layout.acf_fc_layout==='video_cover'" :layout="layout" />
        <Festival24Hero v-if="layout.acf_fc_layout==='hero'" :layout="layout" />
        <Festival24LatestNews v-if="layout.acf_fc_layout==='latest_news'" :layout="layout" />
      </div>
    </Festival24Section>
  </div>
</template>

<script>
export default {
  name: 'Festival24Sections',
  props: {
    layouts: {
      type: Array,
      required: true
    },
    eventId: {
      type: Number,
      required: false,
      default: null
    }
  },
  computed: {
    hasHeroLayout () {
      if (this.$store.state.festival.tabs && this.$store.state.festival.tabs.length) {
        return true
      }

      return (this.layouts.filter((section) => {
        return section.layouts.filter((layout) => { return layout.acf_fc_layout === 'hero' }).length
      }).length > 0)
    }
  }
}
</script>

<style>
.rounded-section section:first-child {
  @apply pt-20 sm:pt-24 lg:pt-27 2xl:pt-30;
}
.rounded-section section:last-child {
  @apply -mb-12 pb-24 xl:pb-28 2xl:pb-32;
}
</style>
