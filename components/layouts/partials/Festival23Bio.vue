<template>
  <div :id="`team-member-${teamMember.id}`">
    <div>
      <div class="relative">
        <Festival23BioImage v-if="showPhoto" :image="(teamMember.featured_image_rendered ? teamMember.featured_image_rendered : null)" />
        <button v-if="clickHandler" class="absolute top-0 left-0 w-full h-full z-20" @click.prevent="clickHandler">
          <span class="sr-only">Read more</span>
        </button>
      </div>
      <div class="team-member__details">
        <Festival23BioHeading :title="teamMember.title.rendered" :moderator="moderator" :pronouns="null" :position="position" />
        <div v-if="short" class="mt-4 text-sm" v-html="teamMember.acf.short_bio" />
        <div class="mt-4 flex flex=-wrap">
          <Festival23Button v-if="clickHandler" to="#" :click-handler="clickHandler">
            <span>Read more</span>
          </Festival23Button>
          <Festival23Button v-if="teamMember.acf.email_address&&showEmail&&!clickHandler" :to="`mailto:${teamMember.acf.email_address}`">
            <span>Email me</span>
          </Festival23Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bio from '~/mixins/bio'

export default {
  name: 'Festival23Bio',
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
