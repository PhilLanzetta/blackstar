<template>
  <div :id="`team-member-${teamMember.id}`" class="team-member" :class="teamMemberClasses">
    <div>
      <FestivalTeamMemberImage v-if="showPhoto" :image="(teamMember.featured_image_rendered ? teamMember.featured_image_rendered : null)" />
      <div class="team-member__details">
        <FestivalTeamMemberHeading :alt-style="altStyle" :title="teamMember.title.rendered" :moderator="moderator" :pronouns="null" :position="position" />
        <button v-if="clickHandler&&$store.state.theme==='festival'" v-cursor-hint="'Read More'" class="w-full h-full absolute top-0 left-0 block" @click.prevent="handleClick">
          <span class="sr-only">Read more about {{ teamMember.title.rendered }}</span>
        </button>
        <div v-if="$store.state.theme==='bsf11'" class="flex space-x-4 mt-4">
          <FestivalButton v-if="clickHandler" to="#" :click-handler="clickHandler">
            <span>Read more</span>
          </FestivalButton>
          <FestivalButton v-if="teamMember.acf.email_address&&showEmail&&!clickHandler" :to="`mailto:${teamMember.acf.email_address}`">
            <span>Email me</span>
          </FestivalButton>
        </div>
      </div>
    </div>
    <FestivalActionHeading
      v-if="teamMember.acf.email_address&&showEmail&&$store.state.theme==='festival'"
      :to="`mailto:${teamMember.acf.email_address}`"
      :butted="true"
      border-class="border-lime"
      background-class="bg-navy"
      :reduced="true"
    >
      Email me
    </FestivalActionHeading>
  </div>
</template>

<script>
import bio from '~/mixins/bio'

export default {
  name: 'FestivalTeamMember',
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
    alt: {
      type: Boolean,
      required: false,
      default: false
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
    altStyle: {
      type: Boolean,
      required: false,
      default: false
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
    }
  },
  computed: {
    teamMemberClasses () {
      const classes = []

      classes.push(`team-member--${this.$store.state.theme}`)
      classes.push(`team-member--${this.index}`)

      if (this.alt) {
        classes.push('team-member--alt')
      }

      if (this.altStyle) {
        classes.push('team-member--alt-style')
      }

      if (this.active) {
        classes.push('team-member--active')
      }

      if (this.index % 2 === 1) {
        classes.push('team-member--white')
      }

      if (this.index % 3 === 1) {
        classes.push('team-member--teal')
      }

      return classes.join(' ')
    }
  },
  methods: {
    handleClick () {
      this.clickHandler(this.teamMember)
    }
  }
}
</script>

<style>
.team-member {
  @apply text-white my-6;
}

.team-member__image {
  @apply relative block w-72 h-72 -ml-5 transition-transform transform -rotate-45 pointer-events-none motion-reduce:transition-none;
}

.team-member__image--lg {
  @apply w-96 h-96 lg:w-full lg:h-auto -ml-12;
}

.team-member--bsf11 {
  @apply text-black;
}

.team-member--bsf11 .team-member__image {
  @apply w-60 h-60 mx-auto rotate-0 rounded-full overflow-hidden;
}

.team-member--festival .team-member__image::before {
  @apply block w-full h-full top-0 left-0 bg-lime absolute z-20 pointer-events-none;
  clip-path: ellipse(29% 40% at 50% 50%);
  content: " ";
}

.team-member--festival .team-member--alt-style .team-member__image::before {
  @apply bg-navy;
}

.team-member__image__inside {
  @apply block relative z-30;
}

.team-member--festival .team-member__image__inside {
  @apply border-5 border-transparent;
}

.team-member__image__inside__clip  {
  @apply block relative;
}

.team-member--festival .team-member__image__inside__clip {
  clip-path: ellipse(29% 40% at 50% 50%);
}

.team-member__image__inside__clip img {
  @apply block w-full h-full object-cover;
}

.team-member--festival .team-member__image__inside__clip img {
  @apply transform rotate-45 transition-transform motion-reduce:transition-none duration-1000;
}

.team-member--festival .team-member--alt .team-member__image {
  @apply rotate-45;
}

.team-member--festival .team-member--alt .team-member__image__inside__clip img {
  @apply -rotate-45;
}

.team-member--festival.team-member:hover .team-member__image {
  @apply rotate-45;
}

.team-member--festival.team-member:hover .team-member__image__inside__clip img {
  @apply -rotate-45;
}

.team-member--festival.team-member--alt:hover .team-member__image {
  @apply -rotate-45;
}

.team-member--festival.team-member--alt:hover .team-member__image__inside__clip img {
  @apply rotate-45;
}

.team-member--bsf11 .team-member__details {
  @apply rounded-3xl xl:rounded-4xl border-5 py-8 pt-12 px-4 border-black text-black -mt-6 bg-white;
}

.team-member--bsf11 .team-member__details {
  @apply bg-bsf11Yellow;
}

.team-member--bsf11.team-member--white .team-member__details {
  @apply bg-white;
}

.team-member--bsf11.team-member--teal .team-member__details {
  @apply bg-bsf11Teal;
}

.team-member--festival {
  @apply relative;
}

.team-member--festival > div {
  @apply relative;
}

.team-member--active .team-member__image {
  @apply relative z-40;
}

</style>
