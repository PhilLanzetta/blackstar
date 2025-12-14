<template>
  <ClientOnly>
    <Festival24Button
      v-show="watchLive"
      :to="(post.acf.facebook_livestream_url ? post.acf.facebook_livestream_url : '#')"
      :inverse="alt"
      :modifier="modifier"
    >
      <span v-html="watchLiveLabel" />
    </Festival24Button>
  </ClientOnly>
</template>

<script>
import canWatchLive from '~/mixins/canWatchLive'

export default {
  name: 'Festival24WatchLiveButton',
  mixins: [canWatchLive],
  props: {
    alt: {
      type: Boolean,
      required: false,
      default: false
    },
    modifier: {
      type: String,
      required: false,
      modifier: 'default'
    }
  }
}
</script>

<style scoped>

</style>
