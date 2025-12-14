<template>
  <div class="seen-feature-media">
    <Container>
      <div class="seen-feature-media__media">
        <div class="seen-feature-media__media__image" v-html="layout.image"></div>
        <div v-if="layout.video" class="seen-feature-media__media__video">
          <video muted autoplay playsinline loop>
            <source type="video/mp4" :src="layout.video" />
          </video>
        </div>
        <RawLink v-if="layout.link" v-cursor-hint="layout.link.title" :to="layout.link.url|replaceSiteUrl" class-names="hidden lg:block absolute top-0 left-0 w-full h-full z-30" />
      </div>
      <p v-if="layout.link" class="block lg:hidden mt-10">
        <CircleButton
          :to="layout.link.url|replaceSiteUrl"
          color-scheme="black"
        >
          <span v-html="layout.link.title" />
        </CircleButton>
      </p>
    </Container>
  </div>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'SeenFeatureMedia',
  mixins: [layout]
}
</script>

<style>
.seen-feature-media__media {
  @apply relative;
}

.seen-feature-media__media__image,
.seen-feature-media__media__video {
  @apply absolute top-0 left-0 w-full h-full;
}

.seen-feature-media__media__image {
  @apply z-10;
}

.seen-feature-media__media__video {
  @apply z-20;
}

.seen-feature-media__media img,
.seen-feature-media__media video {
  @apply block w-full h-full object-cover;
}

.seen-feature-media__media::before {
  @apply block;
  content: " ";
  padding-top: 56%;
}
</style>
