<template>
  <Festival23BoxMask :class="{'lg': lg}">
    <div class="aspect-w-10 aspect-h-10">
      <span v-if="image" v-html="image" class="cover-image" /><span v-if="!image" class="cover-image"><img src="~/assets/blackstar-b-square.svg" alt=""></span>
    </div>
  </Festival23BoxMask>
</template>

<script>
export default {
  name: 'Festival23BioImage',
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
