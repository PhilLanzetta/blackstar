<template>
  <div>
    <template v-if="$store.state.theme==='festival'">
      <FestivalActionHeading
        v-show="watchLive"
        :to="(post.acf.facebook_livestream_url ? post.acf.facebook_livestream_url : '#')"
        background-class="bg-facebook text-white border-t-0 lg:border-t-5 lg:-ml-border"
        width-class="max-w-full w-full lg:w-80"
        :full-width="true"
        aria-live="polite"
      >
        <span class="text-base md:text-lg font-festival_sans font-normal">Watch on Facebook</span>
      </FestivalActionHeading>
    </template>
    <template v-if="$store.state.theme==='bsf11'">
      <FestivalButton v-show="watchLive" :to="(post.acf.facebook_livestream_url ? post.acf.facebook_livestream_url : '#')" :alt="true">
        <span v-html="watchLiveLabel" />
      </FestivalButton>
    </template>
  </div>
</template>

<script>
import canWatchLive from '~/mixins/canWatchLive'

export default {
  name: 'FestivalWatchLiveButton',
  mixins: [canWatchLive]
}
</script>

<style scoped>

</style>
