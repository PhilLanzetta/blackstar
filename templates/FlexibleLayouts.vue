<template>
  <div>
    <div
      v-for="(layout, key) in layouts"
      :key="`layout${key}`"
      :class="{'sticky-cta': layout.acf_fc_layout==='sticky_call_to_action'||layout.acf_fc_layout==='sticker'}"
    >
      <Space
        v-if="layout.acf_fc_layout==='space'"
        :lg="!layout.size||layout.size==='lg'"
        :md="layout.size==='md'"
        :sm="layout.size==='sm'"
      />
      <NegativeSpace
        v-if="layout.acf_fc_layout==='negative_space'"
        :lg="!layout.size||layout.size==='lg'"
        :md="layout.size==='md'"
        :sm="layout.size==='sm'"
      />
      <SpotlightHero v-if="layout.acf_fc_layout==='spotlight_hero'" :layout="layout" />
      <SpotlightTextImage v-if="layout.acf_fc_layout==='spotlight_text_image'" :layout="layout" />
      <SpotlightText v-if="layout.acf_fc_layout==='spotlight_text'" :layout="layout" />
      <FeatureText v-if="layout.acf_fc_layout==='feature_text'" :layout="layout" />
      <Content v-if="layout.acf_fc_layout==='content'" :layout="layout" />
      <TextTabs v-if="layout.acf_fc_layout==='text_tabs'" :layout="layout" />
      <TextColumns v-if="layout.acf_fc_layout==='text_columns'" :layout="layout" />
      <TextList v-if="layout.acf_fc_layout==='text_list'" :layout="layout" />
      <TextListAlt v-if="layout.acf_fc_layout==='text_list_alt'" :layout="layout" />
      <Marquee v-if="layout.acf_fc_layout==='marquee'" :layout="layout" />
      <Badge v-if="layout.acf_fc_layout==='badge'" :layout="layout" />
      <TeamListings v-if="layout.acf_fc_layout==='team_listings'" :layout="layout" :post="post" />
      <Opportunities v-if="layout.acf_fc_layout==='opportunities'" :layout="layout" />
      <ContactDetails v-if="layout.acf_fc_layout==='contact_details'" :layout="layout" />
      <FaqAccordion v-if="layout.acf_fc_layout==='faq_accordion'" :layout="layout" />
      <SponsorsRow v-if="layout.acf_fc_layout==='sponsors_row'" :layout="layout" />
      <HeadingTeal v-if="layout.acf_fc_layout==='heading_teal'" :layout="layout" />
      <SubHeading v-if="layout.acf_fc_layout==='sub_heading'" :layout="layout" />
      <ContentAlt v-if="layout.acf_fc_layout==='content_alt'" :layout="layout" />
      <div v-if="layout.acf_fc_layout==='anchor'" :id="layout.anchor_name" class="anchor" />
      <CollapsedSponsorRows v-if="layout.acf_fc_layout==='collapsed_sponsor_rows'" :layout="layout" />
      <ChildProgramEvents
        v-if="layout.acf_fc_layout==='child_program_events'&&post.type==='program-event'"
        :layout="layout"
        :post="post"
      />
      <EventDetails
        v-if="layout.acf_fc_layout==='event_details'&&post.type==='program-event'"
        :layout="layout"
        :post="post"
      />
      <Media v-if="layout.acf_fc_layout==='media'" :layout="layout" />
      <SponsorsCarousel v-if="layout.acf_fc_layout==='sponsors_carousel'" :layout="layout" />
      <FlexiblePostsCarousel v-if="layout.acf_fc_layout==='posts_carousel'" :layout="layout" />
      <FeaturedPosts v-if="layout.acf_fc_layout==='featured_posts'" :layout="layout" />
      <BackgroundChangeSection
        v-if="layout.acf_fc_layout==='background_colour_change'"
        :color="layout.background_colour"
      />
      <PressClippings v-if="layout.acf_fc_layout==='press_clippings'" :layout="layout" />
      <PostsGrid v-if="layout.acf_fc_layout==='posts_grid'" :layout="layout" :parent-link="post.link" />
      <ManyLumensNetworks v-if="layout.acf_fc_layout==='many_lumens_networks'" />
      <ManyLumensHero v-if="layout.acf_fc_layout==='many_lumens_hero'" />
      <FormstackForm v-if="layout.acf_fc_layout==='formstack_form'" :layout="layout" />
      <StickerLayout v-if="layout.acf_fc_layout==='sticker'" :layout="layout" />
      <ArchiveCarousel v-if="layout.acf_fc_layout==='archive_carousel'" :layout="layout" />
      <Container v-if="layout.acf_fc_layout==='gallery'">
        <GallerySlider :gallery="layout.gallery" :link="(layout.link ? layout.link : null)" />
      </Container>
      <ArchiveGalleries v-if="layout.acf_fc_layout==='archive_galleries'" :layout="layout" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'FlexibleLayouts',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    layouts () {
      return this.post.acf.layouts
    }
  },
  mounted () {
    this.$root.setLayout('default')

    if (this.post && this.post.type === 'program-event' && this.post.acf.redirect && window) {
      const sanitizedRedirect = this.$options.filters.replaceSiteUrl(this.post.acf.redirect)
      if (sanitizedRedirect.includes(':/')) {
        window.location = this.post.acf.redirect
        return
      }
      this.$router.push(sanitizedRedirect)
    }
  },
  created () {
    this.$root.setLayout('default')
  }
}
</script>

<style>

</style>
