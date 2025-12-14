<template>
  <Festival24Box :id="`team-member-${teamMember.id}`" :class="{'h-full flex flex-col': !alt, 'sm:flex sm:gap-x-4': alt}" :background="background" :gradient-style="gradientStyle">
    <div class="relative" :class="{'sm:w-1/3': alt}">
      <Festival24BioImage v-if="showPhoto" :image="(teamMember.featured_image_rendered ? teamMember.featured_image_rendered : null)" :lg="!short" />
      <button v-if="clickHandler" class="absolute top-0 left-0 w-full h-full z-20" @click.prevent="clickHandler">
        <span class="sr-only">Read more</span>
      </button>
    </div>
    <div :class="{'sm:w-2/3': alt}">
      <div class="team-member__details" :class="{'sm:-my-4': alt}">
        <Festival23BioHeading :title="teamMember.title.rendered" :moderator="moderator" :pronouns="null" :position="position" />
        <Festival24Prose v-if="short" class="mt-4" :small="true" v-html="teamMember.acf.short_bio" />
        <BioSocialProfiles v-if="teamMember.acf.social_profiles&&alt" :social-profiles="teamMember.acf.social_profiles" />
      </div>
      <div v-if="clickHandler||(showEmail&&teamMember.acf.email_address)" class="mt-auto mb-0 pt-4 flex flex-wrap">
        <Festival24Button v-if="clickHandler" to="#" :click-handler="clickHandler">
          <span>Read more</span>
        </Festival24Button>
        <Festival24Button v-if="teamMember.acf.email_address&&showEmail&&!clickHandler" :to="`mailto:${teamMember.acf.email_address}`">
          <span>Email me</span>
        </Festival24Button>
      </div>
    </div>
  </Festival24Box>
</template>

<script>
import bio from '~/mixins/bio'

export default {
  name: 'Festival24Bio',
  mixins: [bio],
  props: {
    teamMember: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    showPhoto: {
      type: Boolean,
      required: false,
      default: false
    },
    showEmail: {
      type: Boolean,
      required: false,
      default: true
    },
    clickHandler: {
      type: Function,
      required: false,
      default: null
    },
    eventId: {
      type: Number,
      required: false,
      default: null
    },
    active: {
      type: Boolean,
      required: false,
      default: false
    },
    short: {
      type: Boolean,
      required: false,
      default: false
    },
    alt: {
      type: Boolean,
      required: false,
      default: false
    },
    background: {
      type: String,
      required: false,
      default: null
    },
    gradientStyle: {
      type: String,
      required: false,
      default: null
    }
  },
  methods: {
    handleClick () {
      this.clickHandler(this.bio)
    }
  }
}
</script>

<style scoped>

</style>
