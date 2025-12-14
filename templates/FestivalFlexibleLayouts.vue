<template>
  <div>
    <Festival23Sections v-if="post.acf.theme === 'bsf12'" :layouts="layouts" />
    <Festival24Sections v-else-if="post.acf.theme === 'bsf13' || post.acf.theme === 'bsf14'" :layouts="layouts" />
    <LegacyFestivalFlexibleLayouts v-else :layouts="layouts" :post="post" />
  </div>
</template>

<script>
import eventiveEverywhere from '~/mixins/eventiveEverywhere'
import hasFestivalTabs from '~/mixins/hasFestivalTabs'

export default {
  name: 'FestivalFlexibleLayouts',
  mixins: [eventiveEverywhere, hasFestivalTabs],
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    layouts () {
      if (this.post.type === 'page') {
        return this.post.acf.layouts
      }

      return this.post.acf.festival_layouts
    }
  },
  mounted () {
    this.$root.setLayout(this.post.acf.theme)

    this.$nextTick(() => {
      this.rebuildEventive()
    })
  },
  created () {
    this.$root.setLayout(this.post.acf.theme)
  }
}
</script>

<style scoped>

</style>
