<template>
  <div v-if="teamMember" ref="teamMemberModal" class="org-bio fixed lg:absolute top-0 left-0 w-full h-auto z-40 bg-teal overflow-hidden">
    <CloseButton :click-handler="closeBio" class="hidden lg:block absolute top-20 right-0 lg:-mt-border lg:-mr-border z-10" />
    <Container>
      <div ref="teamMemberBioExpanded" :key="`teamMemberExpanded${teamMember.ID}`" class="text-white lg:flex justify-between items-end lg:space-x-32 py-8 lg:pb-20 lg:pt-40">
        <div class="lg:w-6/12 relative">
          <TeamMemberImage :lg="true" :image="(teamMember.featured_image_rendered_large ? teamMember.featured_image_rendered_large : null)" />
        </div>

        <div class="lg:w-6/12">
          <div class="lg:mt-36">
            <TeamMemberHeading :title="teamMember.title.rendered" :pronouns="teamMember.acf.pronouns" :position="position" :moderator="moderator" />
            <BioSocialProfiles v-if="teamMember.acf.social_profiles" :social-profiles="teamMember.acf.social_profiles" />
            <CursorInteractInside>
              <div class="font-medium xl:text-xl org-bio__content" v-html="(teamMember.post_content ? teamMember.post_content : teamMember.content.rendered)" />
            </CursorInteractInside>

            <p class="block mt-8 lg:hidden relative z-20">
              <PillButton to="#" :click-handler="closeBio">
                <span>Close</span>
              </PillButton>
            </p>
          </div>
        </div>
      </div>
    </Container>
    <button v-if="previousBio" v-cursor-hint="'Previous'" class="block absolute top-0 left-0 w-1/4 h-full" @click.prevent="setActiveBio(previousBio)">
      <span class="sr-only">Previous</span>
    </button>
    <button v-if="nextBio" v-cursor-hint="'Next'" class="block absolute top-0 right-0 w-1/4 h-full" @click.prevent="setActiveBio(nextBio)">
      <span class="sr-only">Next</span>
    </button>
  </div>
</template>

<script>
import bio from '~/mixins/bio'

export default {
  name: 'TeamMemberExpanded',
  mixins: [bio],
  props: {
    teamMember: {
      type: Object,
      required: true
    },
    teamMemberIndex: {
      type: Number,
      required: true
    },
    nextBio: {
      type: Object,
      required: false,
      default: null
    },
    previousBio: {
      type: Object,
      required: false,
      default: null
    },
    setActiveBio: {
      type: Function,
      required: true
    },
    closeBio: {
      type: Function,
      required: true
    },
    setHeight: {
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
    teamMember (to) {
      if (to) {
        this.scrollIntoView()
      }
    }
  },
  mounted () {
    this.scrollIntoView()
  },
  methods: {
    scrollIntoView () {
      this.$nextTick(() => {
        this.setHeight(this.$refs.teamMemberBioExpanded.offsetHeight)

        this.$refs.teamMemberModal.scrollIntoView({ behavior: 'smooth' })
        if (this.$store.state.cursor.hint === 'Next' && !this.nextBio) {
          this.$store.commit('cursor/hint', false)
        }
        if (this.$store.state.cursor.hint === 'Previous' && !this.previousBio) {
          this.$store.commit('cursor/hint', false)
        }
      })
    }
  }
}
</script>

<style>
.org-bio .org-bio__content p {
  @apply mb-4;
}

</style>
