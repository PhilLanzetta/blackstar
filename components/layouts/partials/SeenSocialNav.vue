<template>
  <nav v-if="settings" class="social-nav">
    <ul class="flex space-x-6 items-center justify-start" :class="{'md:justify-end': justifyEnd, 'mt-8': marginTop} ">
      <li v-if="settings.instagram_url">
        <a v-cursor-interact-alt :href="settings.instagram_url" rel="noreferrer" target="_blank" :class="{'w-8': !small, 'w-6': small}"><IconInstragram /><span
          class="sr-only"
        >Instagram</span></a>
      </li>
      <li v-if="settings.twitter_url">
        <a v-cursor-interact-alt :href="settings.twitter_url" target="_blank" :class="{'w-8': !small, 'w-6': small}" rel="noreferrer"><IconTwitter /><span class="sr-only">X (formerly Twitter)</span></a>
      </li>
      <li v-if="settings.facebook_url">
        <a v-cursor-interact-alt :href="settings.facebook_url" target="_blank" :class="{'w-3.5': !small, 'w-2.5': small}" rel="noreferrer"><IconFacebook /><span
          class="sr-only"
        >Facebook</span></a>
      </li>
      <li v-if="settings.youtube_url">
        <a v-cursor-interact-alt :href="settings.youtube_url" target="_blank" :class="{'w-10': !small, 'w-8': small}" rel="noreferrer"><IconYoutube /><span
          class="sr-only"
        >YouTube</span></a>
      </li>
    </ul>
  </nav>
</template>

<script>
import IconInstragram from '~/assets/icon-instagram.svg?inline'
import IconTwitter from '~/assets/icon-twitter.svg?inline'
import IconFacebook from '~/assets/icon-facebook.svg?inline'
import IconYoutube from '~/assets/icon-youtube.svg?inline'

export default {
  name: 'SeenSocialNav',
  components: { IconInstragram, IconTwitter, IconFacebook, IconYoutube },
  props: {
    justifyEnd: {
      type: Boolean,
      required: false,
      default: true
    },
    marginTop: {
      type: Boolean,
      required: false,
      default: true
    },
    small: {
      type: Boolean,
      required: false,
      default: false
    },
    settings: {
      type: Object,
      required: false,
      default: null
    }
  }

}
</script>

<style scoped>
.social-nav a {
  @apply block h-auto;
}

.social-nav a svg {
  @apply block w-full h-auto;
}
</style>
