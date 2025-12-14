<template>
  <div class="flex flex-wrap gap-y-1">
    <span v-for="(button, key) in buttons" :key="`button${key}`" class="gap-x-2 gap-y-1">
      <Festival24Button :to="button.button.url|replaceSiteUrl" :target="button.button.target" :active="button.active" :back-arrow="(!!button.back_arrow)">
        <span v-html="button.button.title" />
      </Festival24Button>
    </span>
    <slot />
  </div>
</template>

<style>

</style>
<script>
export default {
  name: 'Festival24Buttons',
  props: {
    buttons: {
      type: Array,
      required: true
    }
  }
}
</script>
