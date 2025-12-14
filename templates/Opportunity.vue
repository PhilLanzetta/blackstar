<template>
  <div v-if="post">
    <Post :post="post" type="opportunity"/>
    <div class="bg-black">
      <ScrollMarquee symbol="arrows-down-right" word2="Opportunities" word1="More" force-colour="white"/>
    </div>
    <Space class="hidden lg:block" :md="true"/>
    <Opportunities :layout="{hide_badge: true}"/>
  </div>
</template>
<script>

import Post from '~/templates/Post'
export default {
  name: 'Opportunity',
  components: { Post },
  props: {
    post: {
      type: Object,
      required: false,
      default: null
    }
  }
}
</script>
