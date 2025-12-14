<template>
  <Festival24Modal v-if="teamMember" ref="teamMemberModal" :close-modal-callback="closeBio" :colour="modalColour">
    <Festival24Box ref="teamMemberBioExpanded" :key="`teamMemberExpanded${teamMember.ID}`" :class="`bg-${modalColour}`">
      <div class="sm:flex flex-wrap flex-row-reverse justify-between">
        <div class="sm:w-5/12 md:w-4/12">
          <div>
            <Festival24BioImage :lg="true" :image="(teamMember.featured_image_rendered_large ? teamMember.featured_image_rendered_large : null)" />
            <BioSocialProfiles v-if="teamMember.acf.social_profiles" :social-profiles="teamMember.acf.social_profiles" />
          </div>
        </div>
        <div class="sm:w-6/12 md:w-7/12 md:px-4">
          <Festival23BioHeading :title="teamMember.title.rendered" :pronouns="teamMember.acf.pronouns" :moderator="moderator" :position="position" :large="true" />
          <Space />
          <Festival24Prose v-html="(teamMember.post_content ? teamMember.post_content : teamMember.content.rendered)" />
        </div>
      </div>
    </Festival24Box>
  </Festival24Modal>
</template>

<script>
import bio from '~/mixins/bio'

export default {
  name: 'Festival24BioModal',
  mixins: [bio],
  props: {
    teamMember: {
      type: Object,
      required: true
    },
    closeBio: {
      type: Function,
      required: true
    },
    eventId: {
      type: Number,
      required: false,
      default: null
    },
    modalColour: {
      type: String,
      required: false,
      default: 'beige'
    }
  },
  watch: {
    '$nuxt.$route' () {
      this.$nextTick(() => {
        this.closeBio()
      })
    }
  }
}
</script>

<style>

</style>
