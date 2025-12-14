<template>
  <div class="rounded-xl overflow-hidden aspect-w-10 aspect-h-10" :class="{'border border-black': $store.state.theme==='bsf13'}">
    <span v-if="image" v-html="image" class="cover-image" /><span v-if="!image" class="cover-image"><img src="~/assets/blackstar-b-square.svg" alt=""></span>
  </div>
</template>

<script>
export default {
  name: 'Festival24BioImage',
  props: {
    image: {
      type: String,
      required: false,
      default: null
    },
    lg: {
      type: Boolean,
      required: false,
      default: true
    }
  }
}
</script>

<style scoped>

</style>
