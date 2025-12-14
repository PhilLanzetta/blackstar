<template>
  <div>
    <Festival23Section :background="post.acf.background">
      <Festival23Schedule :section-colour="post.acf.background" :post="post" />
    </Festival23Section>
    <Festival23Sections v-if="post.acf.layouts&&post.acf.layouts.length" class="relative z-10" :layouts="post.acf.layouts" />
  </div>
</template>

<script>
import hasFestivalTabs from '~/mixins/hasFestivalTabs'
import forceBsf12Layout from '~/mixins/forceBsf12Layout'

export default {
  name: 'FestivalVirtualGuidePage',
  mixins: [hasFestivalTabs, forceBsf12Layout],
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
