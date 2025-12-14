<template>
  <div class="team-member__image select-none" :class="{'team-member__image--lg': lg}">
    <span class="team-member__image__inside"><span v-if="image" class="team-member__image__inside__clip" v-html="image" /><span v-if="!image" class="team-member__image__inside__clip"><img
      v-if="$store.state.theme==='festival'"
      src="~/assets/festival/default-image.png"
      alt=""
    ><img
      v-if="$store.state.theme==='bsf11'"
      src="~/assets/festival/11/default-image.png"
      alt=""
    ></span></span>
  </div>
</template>

<script>
export default {
  name: 'FestivalTeamMemberImage',
  props: {
    image: {
      type: String,
      required: false,
      default: null
    },
    lg: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
