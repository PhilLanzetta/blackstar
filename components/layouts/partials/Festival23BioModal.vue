<template>
  <Festival23Modal v-if="teamMember" ref="teamMemberModal" :close-modal-callback="closeBio">
    <Festival23Box ref="teamMemberBioExpanded" :key="`teamMemberExpanded${teamMember.ID}`" bg="bg-bsf12bg">
      <div class="lg:flex flex-wrap justify-between px-8 pt-3 pb-8">
        <div class="lg:w-7/12 lg:px-4">
          <Festival23BioHeading :title="teamMember.title.rendered" :pronouns="teamMember.acf.pronouns" :moderator="moderator" :position="position" :large="true" />
          <Space />
          <Festival23Prose v-html="(teamMember.post_content ? teamMember.post_content : teamMember.content.rendered)" />
        </div>
        <div class="lg:w-4/12">
          <div>
            <Festival23BioImage :lg="true" :image="(teamMember.featured_image_rendered_large ? teamMember.featured_image_rendered_large : null)" />
            <BioSocialProfiles v-if="teamMember.acf.social_profiles" :social-profiles="teamMember.acf.social_profiles" />
          </div>
        </div>
      </div>
    </Festival23Box>
  </Festival23Modal>
</template>

<script>
import bio from '~/mixins/bio'

export default {
  name: 'Festival23BioModal',
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
