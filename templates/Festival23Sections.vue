<template>
  <div>
    <Festival23Section v-for="(section, key) in layouts" :key="`festival23Section${key}`" :background="section.background">
      <div v-for="(layout, layoutKey) in section.layouts" :key="`layout23Section${key}Layout${layoutKey}`">
        <Festival23Heading v-if="layout.acf_fc_layout==='heading'" :layout="layout" size="xl" />
        <Festival23Content v-if="layout.acf_fc_layout==='content'" :layout="layout" />
        <Space v-if="layout.acf_fc_layout==='space'" :sm="true" />
        <div v-if="layout.acf_fc_layout==='anchor'" :id="layout.anchor_name" />
        <Festival23Explainers v-if="layout.acf_fc_layout==='explainers'" :layout="layout" />
        <Festival23SpotlightCarousel v-if="layout.acf_fc_layout==='spotlight_carousel'" :layout="layout" />
        <Container v-if="layout.acf_fc_layout==='buttons'">
          <Festival23Buttons :buttons="layout.buttons" />
        </Container>
        <Festival23Cards v-if="layout.acf_fc_layout==='cards'" :layout="layout" :section-colour="section.background" />
        <Festival23Spotlights v-if="layout.acf_fc_layout==='spotlight_ctas'" :layout="layout" />
        <Festival23SponsorsCarousel v-if="layout.acf_fc_layout==='sponsors_carousel'" :layout="layout" :section-colour="section.background" />
        <Festival23Sponsors v-if="layout.acf_fc_layout==='sponsors'" :layout="layout" :section-colour="section.background" />
        <Festival23RichCardCarousel v-if="layout.acf_fc_layout==='rich_card_carousel'" :layout="layout" :section-colour="section.background" />
        <Festival23LandscapeRichCardCarousel v-if="layout.acf_fc_layout==='landscape_rich_card_carousel'" :layout="layout" :section-colour="section.background" />
        <Festival23Passes v-if="layout.acf_fc_layout==='passes'" :layout="layout" :section-colour="section.background" />
        <Festival23FaqAccordion v-if="layout.acf_fc_layout==='faq_accordion'" :layout="layout" />
        <Festival23Accordion v-if="layout.acf_fc_layout==='accordion'" :layout="layout" />
        <Festival23Bios v-if="layout.acf_fc_layout==='bios'" :layout="layout" :default-event-id="eventId" />
        <Festival23Map v-if="layout.acf_fc_layout==='map'" :layout="layout" />
        <Festival23Media v-if="layout.acf_fc_layout==='media'" :layout="layout" />
        <Festival23MediaHero v-if="layout.acf_fc_layout==='media_hero'" :layout="layout" />
        <Festival23MediaCarousel v-if="layout.acf_fc_layout==='media_carousel'" :layout="layout" />
        <Festival23VideoCover v-if="layout.acf_fc_layout==='video_cover'" :layout="layout" />
      </div>
    </Festival23Section>
  </div>
</template>

<script>
import forceBsf12Layout from '~/mixins/forceBsf12Layout'

export default {
  name: 'Festival23Sections',
  mixins: [forceBsf12Layout],
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
  }
}
</script>
