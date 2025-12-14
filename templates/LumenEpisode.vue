<template>
  <article class="lumen-episode">
    <header class="lumen-episode__header bg-black text-white">
      <div
        v-if="post.acf.cover_image||post.acf.cover_video"
        class="aspect-w-10 aspect-h-9 lg:aspect-w-16 lg:aspect-h-7"
      >
        <span
          v-if="post.acf.cover_image"
          class="cover-image absolute z-0 top-0 left-0 w-full h-full"
          v-html="post.acf.cover_image"
        />
        <video
          v-if="post.acf.cover_video"
          class="absolute z-0 top-0 left-0 w-full h-full object-cover z-10"
          playsinline
          muted
          loop
          autoplay
        >
          <source type="video/mp4" :src="post.acf.cover_video">
        </video>
      </div>
      <Container>
        <div class="lumen-episode__header__title">
          <time>{{ post.date|formatDateAlt }}</time>
          <h1 class="feature-heading" v-html="post.acf.episode_name" />
          <h2 class="feature-heading" v-if="post.acf.guest" v-html="post.acf.guest" />
          <ul>
            <li>
              <CircleButton to="#" :force-scheme="true" color-scheme="white" :click-handler="toggleAudio">
                <span v-if="!playing">Listen Now</span><span v-if="playing">Pause</span>
              </CircleButton>
              <audio ref="audioTrack" data-not-lazy class="sr-only" preload><source type="audio/mp3" :src="post.acf.buzz_sprout.mp3_url"></audio>
            </li>
          </ul>
          <p v-if="post.acf.introduction" v-html="post.acf.introduction" />
        </div>
      </Container>
    </header>
    <section :class="`bg-${post.acf.colour}`">
      <ScrollMarquee symbol="arrows-down" word2="Listen" word1="Listen" force-colour="black" />
    </section>
    <section>
      <Container>
        <Space :lg="true" />
        <ClientOnly>
          <div v-cursor-hide v-html="post.acf.buzz_sprout.embed_code" />
        </ClientOnly>
        <Space :lg="true" />
      </Container>
    </section>
    <section v-if="post.acf.guest_bios&&post.acf.guest_bios.length" :class="`bg-${post.acf.colour}`">
      <ScrollMarquee symbol="arrows-down" word2="Bio" word1="Guest" force-colour="black" />
      <Space :md="true" />

      <div v-for="(guestBio, guestBioKey) in post.acf.guest_bios" :key="`guestBio${guestBioKey}`" class="relative">
        <Container>
          <div class="lumen-episode__guest-bio">
            <div class="lg:w-1/3 mb-5 lg:mb-0">
              <RoundedImage :dotted="true">
                <span v-html="guestBio.image" />
              </RoundedImage>
            </div>
            <div class="lg:w-2/3 lumen-episode__guest-bio__content" v-html="guestBio.content" />
            <p v-if="guestBio.link" class="block lg:hidden mt-10">
              <CircleButton
                :to="guestBio.link.url|replaceSiteUrl"
                color-scheme="black"
              >
                <span v-html="guestBio.link.title" />
              </CircleButton>
            </p>
          </div>
        </Container>
        <Space :lg="true" />
        <RawLink v-if="guestBio.link" v-cursor-hint="guestBio.link.title" :to="guestBio.link.url|replaceSiteUrl" class-names="hidden lg:block absolute top-0 left-0 w-full h-full z-10" />
      </div>
    </section>
    <section>
      <AccordionItem
        v-if="post.acf.credits"
        :id="`${post.id}Credits`"
        :key="`${post.id}Credits`"
        :colour="post.acf.colour"
        title="Credits"
        :index="0"
      >
        <div class="lumen-episode__accordion__content" v-html="post.acf.credits" />
      </AccordionItem>
      <AccordionItem
        v-if="post.acf.show_notes"
        :id="`${post.id}ShowNotes`"
        :key="`${post.id}ShowNotes`"
        :colour="post.acf.colour"
        title="Show Notes"
        :index="1"
      >
        <div class="lumen-episode__accordion__content" v-html="post.acf.show_notes" />
      </AccordionItem>
      <AccordionItem
        v-if="post.acf.transcript"
        :id="`${post.id}Transcript`"
        :key="`${post.id}Transcript`"
        :colour="post.acf.colour"
        title="Transcript"
        :index="2"
      >
        <div class="lumen-episode__accordion__content" v-html="post.acf.transcript" />
      </AccordionItem>
    </section>
    <ManyLumensNetworks />
    <section v-if="post.acf.related_episodes&&post.acf.related_episodes.length">
      <div class="relative">
        <Container>
          <div class="lg:flex relative z-10">
            <RelatedLumenEpisode
              v-for="episode in post.acf.related_episodes"
              :key="`relatedLumenEpisode${episode.id}`"
              :episode="episode"
            />
          </div>
        </Container>
        <div class="hidden lg:flex z-0 absolute top-0 left-0 w-full h-full">
          <div
            v-for="episode in post.acf.related_episodes"
            :key="`relatedLumenEpisodeBg${episode.id}`"
            class="w-full"
            :class="`bg-${episode.acf.colour}`"
          />
        </div>
      </div>
    </section>
  </article>
</template>

<script>
export default {
  name: 'LumenEpisode',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      playing: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.$refs.audioTrack) {
        if (this.$route.hash === '#listen' || this.$route.hash === '#play') {
          this.$refs.audioTrack.play().then(() => {
            this.playing = true
          }).catch(() => {
            //
          })
        }

        this.$refs.audioTrack.addEventListener('ended', this.notPlaying)
      }
    })
  },
  beforeDestroy () {
    if (this.$refs.audioTrack) {
      this.$refs.audioTrack.removeEventListener('ended', this.notPlaying)
    }
  },
  methods: {
    toggleAudio () {
      if (!this.$refs.audioTrack) {
        return
      }

      try {
        if (!this.playing) {
          this.$refs.audioTrack.play().then(() => {
            this.playing = true
          }).catch((e) => {
            this.playing = false
          })
        } else {
          this.$refs.audioTrack.pause()
          this.playing = false
        }
      } catch (e) {
        this.playing = false
      }
    },
    notPlaying () {
      this.playing = false
    }
  }
}
</script>

<style>
.lumen-episode__header__title {
  @apply py-20;
}

.lumen-episode__header ul {
  @apply flex space-x-4 list-none px-0 mx-0 py-5 my-5 border-b-4 border-dotted border-white text-white;
}

.lumen-episode__header ul li,
.lumen-episode__header time {
  @apply font-medium text-xl md:text-2xl lg:text-3xl xl:text-4xl;
}

.lumen-episode__header time {
  @apply mb-2 block;
}

.lumen-episode__header ul li::after {
  @apply inline-block rounded-full w-5 h-5 bg-purple ml-2;
  content: " ";
}

.lumen-episode__header ul li:last-child::after {
  @apply hidden;
}

.lumen-episode__header cite,
.lumen-episode__header p {
  @apply text-xl md:text-2xl lg:text-3xl xl:text-4xl not-italic block mt-10;
}

.lumen-episode__header cite a {
  @apply text-purple;
}

.lumen-episode__guest-bio {
  @apply lg:flex flex-row-reverse items-start justify-between;
}

.lumen-episode__guest-bio__content {
  @apply text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium lg:mr-20;
}

.lumen-episode__guest-bio__content strong {
  @apply block text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-4;
}

.lumen-episode__guest-bio__content strong em {
  @apply font-normal font-serif_italic_alt;
}

.accordion-item__inside .lumen-episode__accordion__content p {
  @apply font-light mb-8;
}
</style>
