<template>
  <div :class="{'text-xl': large}">
    <Festival23H2 :size="(large ? 'xl' : 'sm')" class="mt-4" v-html="title" />
    <h3 v-if="pronouns" v-html="pronouns" /><h3 v-if="moderator">
      Moderator
    </h3><h4 v-html="position" />
  </div>
</template>

<script>
export default {
  name: 'Festival23BioHeading',
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
    },
    large: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
