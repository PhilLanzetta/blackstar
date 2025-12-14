<template>
  <div>
    <template v-if="$store.state.theme==='festival'">
      <section class="festival-hero-media" :class="(layout.contained ? `bg-${layout.background_colour}` : 'bg-navy') + (!layout.contained ? ' festival-hero-media--cover ' : '')">
        <div class="absolute top-0 left-0 w-full h-full z-10">
          <Container class="flex justify-start items-end h-full">
            <div>
              <FestivalHeading v-if="layout.pre_heading" :reduced="true" width-class="w-auto">
                <span class="text-lg font-festival_sans_italic" v-html="layout.pre_heading" />
              </FestivalHeading>
              <div v-if="layout.heading" class="text-xl lg:text-2xl xl:text-3xl px-5 py-3 xl:p-7 xl:pr-14 border-5 border-navy -mt-border" :class="(layout.heading_colour ? ` bg-${layout.heading_colour} ` + (['yellow', 'beige', 'lime'].includes(layout.heading_colour) ? ' text-navy ' : ' text-white ') : 'bg-blue text-white')">
                <h1
                  v-html="layout.heading"
                />
              </div>
            </div>
          </Container>
        </div>
        <div :class="(layout.contained ? ($store.state.theme==='festival' ? 'max-w-screen-3xl px-0 xl:px-8 mx-auto' : '') : 'festival-hero-media__aspect aspect-w-10 aspect-h-9 lg:aspect-w-16 lg:aspect-h-5 bg-black')">
          <video
            v-if="layout.video"
            ref="video"
            autoplay
            muted
            loop
            playsinline
          >
            <source
              v-for="(videoSource, key) in layout.video"
              :key="`heroMediaVideo${key}`"
              :type="videoSource.type"
              :src="videoSource.video"
            >
          </video>
          <span v-if="layout.image&&!layout.video" v-html="layout.image" />
          <div v-if="layout.video&&$store.state.theme==='bsf11'" class="h-64 w-full block bg-gradient-to-b from-transparent to-bsf11Purple absolute bottom-0 left-0 z-10" />
        </div>
        <RawLink v-if="layout.link" v-cursor-hint="layout.cursor_hint" class="takeover-link" :to="layout.link.url|replaceSiteUrl">
          <span class="sr-only">{{ layout.link.title }}</span>
        </RawLink>
      </section>
    </template>
    <template v-if="$store.state.theme==='bsf11'">
      <div class="relative festival-hero-2022">
        <Container class="relative">
          <Space :lg="true" />
          <div class="relative z-20">
            <h2 v-if="layout.pre_heading">
              <span v-html="layout.pre_heading" />
            </h2>
            <h1 v-if="layout.heading">
              <span v-html="layout.heading" />
            </h1>
          </div>
          <Space :md="true" />
          <LazyRellaxShape
            key="shapeFlower"
            class="block bottom-2/3 right-0 z-0 w-full max-w-xs"
          >
            <ShapeFlower />
          </LazyRellaxShape>
          <LazyRellaxShape
            key="shapeStarAlt"
            class="block -top-64 right-1/2 z-0 w-full max-w-sm"
          >
            <ShapeStarAlt />
          </LazyRellaxShape>

          <div class="festival-hero-2022__media">
            <video
              v-if="layout.video"
              ref="video"
              autoplay
              muted
              loop
              playsinline
            >
              <source
                v-for="(videoSource, key) in layout.video"
                :key="`heroMediaVideo${key}`"
                :type="videoSource.type"
                :src="videoSource.video"
              >
            </video>
            <span v-if="layout.image&&!layout.video" v-html="layout.image" />
            <RawLink v-if="layout.link" v-cursor-hint="layout.cursor_hint" class="takeover-link" :to="layout.link.url|replaceSiteUrl">
              <span class="sr-only">{{ layout.link.title }}</span>
            </RawLink>
          </div>
        </Container>
      </div>
    </template>
  </div>
</template>

<script>
import layout from '~/mixins/layout'
import ShapeFlower from '~/assets/festival/11/shape-flower.svg?inline'
import ShapeStarAlt from '~/assets/festival/11/shape-star-alt.svg?inline'

export default {
  name: 'FestivalHeroMedia',
  components: { ShapeFlower, ShapeStarAlt },
  mixins: [layout]
}
</script>

<style>
.festival-hero-media {
  @apply relative;
}

.festival-hero-media__aspect {
  @apply aspect-w-10 aspect-h-9 lg:aspect-w-16 lg:aspect-h-5;
}

.festival-hero-media img,
.festival-hero-media video {
  @apply w-full h-auto block;
}

.festival-hero-media--cover img,
.festival-hero-media--cover video {
  @apply absolute top-0 left-0 h-full object-cover;
}

.festival-hero-media--cover video {
  @apply z-10;
}

.festival-hero-2022 {
  @apply font-bsf11_sans leading-none;
}

.festival-hero-2022 h1 {
  @apply text-7xl lg:text-8xl;
}

.festival-hero-2022 h2 {
  @apply text-4xl lg:text-5xl;
}

.festival-hero-2022__media {
  @apply border-4 lg:border-md 2xl:border-lg border-black rounded-3xl xl:rounded-4xl overflow-hidden relative z-20;
}

.festival-hero-2022__media::before {
  @apply block;

  content: " ";
  padding-top: 56%;
}

.festival-hero-2022__media img,
.festival-hero-2022__media video {
  @apply absolute top-0 left-0 w-full h-full object-cover;
}

.festival-hero-2022__media video {
  @apply z-10;
}

</style>
