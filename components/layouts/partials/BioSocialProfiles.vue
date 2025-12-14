<template>
  <nav class="social-nav mt-8">
    <ul class="flex space-x-6 items-center justify-start">
      <li v-if="socialProfiles.instagram">
        <a v-cursor-interact-alt :href="socialProfiles.instagram" target="_blank" class="w-6 lg:w-8"><IconInstragram /><span
          class="sr-only"
        >Instagram</span></a>
      </li>
      <li v-if="socialProfiles.twitter">
        <a v-cursor-interact-alt :href="socialProfiles.twitter" target="_blank" class="w-6 lg:w-8"><IconTwitter /><span class="sr-only">Twitter</span></a>
      </li>
      <li v-if="socialProfiles.linkedin">
        <a v-cursor-interact-alt :href="socialProfiles.linkedin" target="_blank" class="w-5 lg:w-6"><IconLinkedIn /><span
          class="sr-only"
        >LinkedIn</span></a>
      </li>
      <li v-if="socialProfiles.facebook">
        <a v-cursor-interact-alt :href="socialProfiles.facebook" target="_blank" class="w-3 lg:w-3.5"><IconFacebook /><span
          class="sr-only"
        >Facebook</span></a>
      </li>
      <li v-if="socialProfiles.youtube">
        <a v-cursor-interact-alt :href="socialProfiles.youtube" target="_blank" class="w-5 lg:w-9"><IconYoutube /><span
          class="sr-only"
        >YouTube</span></a>
      </li>
      <li v-if="socialProfiles.website">
        <a v-cursor-interact-alt :href="socialProfiles.website" target="_blank" class="w-5 lg:w-6"><IconLink /><span
          class="sr-only"
        >Website</span></a>
      </li>
    </ul>
  </nav>
</template>

<script>
import IconInstragram from '~/assets/icon-instagram.svg?inline'
import IconTwitter from '~/assets/icon-twitter.svg?inline'
import IconFacebook from '~/assets/icon-facebook.svg?inline'
import IconYoutube from '~/assets/icon-youtube.svg?inline'
import IconLinkedIn from '~/assets/icon-linkedin.svg?inline'
import IconLink from '~/assets/icon-link.svg?inline'

export default {
  name: 'BioSocialProfiles',
  components: {
    IconInstragram,
    IconTwitter,
    IconFacebook,
    IconYoutube,
    IconLinkedIn,
    IconLink
  },
  props: {
    socialProfiles: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
.social-nav a {
  @apply block;
}

.social-nav svg {
  @apply block w-full h-auto;
}
</style>
