<template>
  <ClientOnly>
    <Festival23Button
      v-show="watchLive"
      :to="(post.acf.facebook_livestream_url ? post.acf.facebook_livestream_url : '#')"
      :inverse="alt"
    >
      <span v-html="watchLiveLabel" />
    </Festival23Button>
  </ClientOnly>
</template>

<script>
import canWatchLive from '~/mixins/canWatchLive'

export default {
  name: 'Festival23WatchLiveButton',
  mixins: [canWatchLive],
  props: {
    alt: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
