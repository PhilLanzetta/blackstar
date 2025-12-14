<template>
  <div>
    <FestivalHeading
      v-if="$store.state.theme==='festival'"
      class="text-left"
      width-class="w-full"
      :border-class="(altStyle ? 'border-navy' : 'border-lime')"
      :background-class="(altStyle ? 'bg-yellow text-navy' : 'bg-navy')"
      :reduced="true"
    >
      <span class="text-base lg:text-xl xl:text-2xl" v-html="title" /><span v-if="pronouns" class="block text-base font-light" v-html="pronouns" /><span v-if="moderator" class="block text-base font-normal">Moderator</span><span class="block font-festival_sans_light_italic text-sm lg:text-base xl:text-xl" v-html="position" />
    </FestivalHeading>
    <div v-if="$store.state.theme==='bsf11'" class="team-member__details__inside">
      <h2  v-html="title" ></h2>
      <h3 v-if="pronouns"  v-html="pronouns" /><h3 v-if="moderator">Moderator</h3><h4 v-html="position" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FestivalTeamMemberHeading',
  props: {
    title: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: false,
      default: null
    },
    pronouns: {
      type: String,
      required: false,
      default: null
    },
    altStyle: {
      type: Boolean,
      required: false,
      default: false
    },
    moderator: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>
.team-member__details__inside h2, .team-member__details__inside h4 {
  @apply font-bsf11_sans text-4xl;
}
.team-member__details__inside h3 {
  @apply font-bsf11_cursive text-2xl;
}
</style>
