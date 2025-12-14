<template>
  <span @mouseenter="$store.commit('cursor/enterAlt')" @mouseleave="$store.commit('cursor/leaveAlt')">
    <slot />
  </span>
</template>

<script>
export default {
  name: 'CursorInteractAlt'
}
</script>

<style scoped>

</style>
