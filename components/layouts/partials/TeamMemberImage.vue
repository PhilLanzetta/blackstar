<template>
  <div class="org-team-member__image select-none" :class="{'org-team-member__image--lg': lg}">
    <span class="org-team-member__image__inside bg-gray"><span v-if="image"  v-html="image" /></span>
  </div>
</template>

<script>
export default {
  name: 'TeamMemberImage',
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
