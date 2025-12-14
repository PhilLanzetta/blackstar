<template>
  <div v-if="teamMember" ref="teamMemberModal" class="bio" :class="bioClasses" :style="(offset ? `transform: translateY(-${offset}px)` : '')">
    <FestivalCloseButton :click-handler="closeBio" class=" absolute lg:-mt-border lg:-mr-border z-10" :class="{'top-0 right-0 hidden lg:block': $store.state.theme==='festival', 'top-10 right-10 block': $store.state.theme==='bsf11'}" :alt="$store.state.theme==='bsf11'" :border-class="(altStyle ? 'border-5 border-lime' : 'border-5 border-navy')" />
    <div ref="teamMemberBioExpanded" :key="`teamMemberExpanded${teamMember.ID}`" class="team-member team-member--alt team-member--alt-style lg:flex justify-start p-6" :class="`team-member--${$store.state.theme}`">
      <div v-if="$store.state.theme==='festival'" class="lg:w-5/12 relative">
        <FestivalTeamMemberImage :lg="true" :image="(teamMember.featured_image_rendered_large ? teamMember.featured_image_rendered_large : null)" :alt="!altStyle" :alt-style="!altStyle" />
      </div>

      <div :class="{'lg:w-5/12': $store.state.theme==='festival'}">
        <div :class="{'lg:mt-36': $store.state.theme==='festival'}">
          <FestivalTeamMemberHeading :title="teamMember.title.rendered" :pronouns="teamMember.acf.pronouns" :moderator="moderator" :position="position" :alt-style="!altStyle" />
          <BioSocialProfiles v-if="teamMember.acf.social_profiles" :social-profiles="teamMember.acf.social_profiles" />
          <CursorInteractInside>
            <div class="bio__content" v-html="(teamMember.post_content ? teamMember.post_content : teamMember.content.rendered)" />
          </CursorInteractInside>

          <p class="block mt-2 lg:hidden relative z-20">
            <FestivalButton to="#" :click-handler="closeBio">
              Close
            </FestivalButton>
          </p>
        </div>
      </div>
      <button v-if="previousBio&&$store.state.theme==='festival'" v-cursor-hint="'Previous'" class="block absolute top-0 left-0 w-1/4 h-full" @click.prevent="setActiveBio(previousBio)">
        <span class="sr-only">Previous</span>
      </button>
      <button v-if="nextBio&&$store.state.theme==='festival'" v-cursor-hint="'Next'" class="block absolute top-0 right-0 w-1/4 h-full" @click.prevent="setActiveBio(nextBio)">
        <span class="sr-only">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
import bio from '~/mixins/bio'

export default {
  name: 'FestivalTeamMemberExpanded',
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
      required: false,
      default: null
    },
    altStyle: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      offset: 0
    }
  },
  computed: {
    bioClasses () {
      const classes = []

      classes.push(`bio--${this.$store.state.theme}`)

      if (this.teamMemberIndex % 2 === 1) {
        classes.push('bio--white')
      }

      if (this.teamMemberIndex % 3 === 1) {
        classes.push('bio--teal')
      }

      return classes.join(' ')
    }
  },
  watch: {
    teamMember (to) {
      if (to) {
        this.getHeight()
      }
    }
  },
  mounted () {
    this.getHeight()
  },
  methods: {
    getHeight () {
      this.$nextTick(() => {
        if (this.setHeight) {
          this.setHeight(this.$refs.teamMemberBioExpanded.offsetHeight)
          this.$refs.teamMemberModal.scrollIntoView({ behavior: 'smooth' })
          if (this.$store.state.cursor.hint === 'Next' && !this.nextBio) {
            this.$store.commit('cursor/hint', false)
          }
          if (this.$store.state.cursor.hint === 'Previous' && !this.previousBio) {
            this.$store.commit('cursor/hint', false)
          }
        } else {
          const $teamMember = document.getElementById(`team-member-${this.teamMember.id}`)
          if ($teamMember) {
            this.offset = $teamMember.querySelector('.team-member__details').offsetHeight
          }
        }
      })
    }
  }
}
</script>

<style>

.bio {
  @apply fixed lg:absolute top-0 left-0 w-full h-full z-40 overflow-hidden;
}

.bio .social-nav a {
  @apply block h-auto hover:text-yellow;
}

.bio__content {
  @apply py-8;
}

.bio__content p {
  @apply mb-4;
}

.bio--festival {
  @apply bg-blue;
}

.bio--festival .bio__content {
  @apply font-light lg:pt-8 lg:pb-20;
}

.bio--festival .bio__content a {
  @apply font-festival_sans_italic font-normal;

}

.bio--bsf11 {
  @apply top-auto left-0 z-50 md:absolute bg-bsf11Yellow rounded-3xl xl:rounded-4xl border-4 lg:border-md 2xl:border-lg border-black text-black h-auto -mt-6;
}

.bio--bsf11.bio--white {
  @apply bg-white;
}

.bio--bsf11.bio--teal {
  @apply bg-bsf11Teal;
}

.bio--bsf11 .bio__content {
  @apply text-xl font-medium;
}

.bio--bsf11 .bio__content a {
  @apply text-bsf11Purple underline;
}

</style>
