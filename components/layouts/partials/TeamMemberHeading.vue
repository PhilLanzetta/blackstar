<template>
  <div class="mt-2 py-4 text-base lg:text-xl xl:text-2xl">
    <span v-if="pronouns" class="block text-sm mb-1 font-serif_italic" v-html="pronouns"/>
    <span v-if="moderator" class="block text-sm mb-1 font-serif_italic_alt">Moderator</span>

    <span v-html="title"/> <span class="block" v-html="position"/>
  </div>
</template>

<script>
export default {
  name: 'TeamMemberHeading',
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
    moderator: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
