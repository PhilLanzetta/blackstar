<template>
  <div :class="`bg-${episode.acf.colour}`" class="text-black related-episode lg:w-full p-10 lg:px-20 lg:pt-10 lg:pb-40 -mx-4 sm:-mx-8">
    <SpotlightSpinner
      class="mb-10"
      :text="episode.acf.season.name"
      :sm="true"
    />
    <div class="related-episode__copy" >
      <p><em v-html="`${episode.acf.episode_name} &ndash; ${episode.acf.guest}`"></em></p>
      <span  v-html="episode.acf.introduction"></span>
    </div>
    <p v-if="episode.link" class="mt-10">
      <CircleButton :to="(episode.link+'#listen')|replaceSiteUrl" color-scheme="black" :force-scheme="true">
        <span v-html="`Listen to ${episode.acf.episode_name}`" />
      </CircleButton>
    </p>
  </div>
</template>

<script>
export default {
  name: 'RelatedLumenEpisode',
  props: {
    episode: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
.related-episode__copy {
  @apply text-xl lg:text-2xl xl:text-3xl font-medium leading-tight text-left;
}

.related-episode__copy i,
.related-episode__copy em {
  @apply font-serif_italic_alt font-normal;
}
</style>
