<template>
  <span @mouseenter="$store.commit('cursor/enter')" @mouseleave="$store.commit('cursor/leave')">
    <slot />
  </span>
</template>

<script>
export default {
  name: 'CursorInteract'
}
</script>

<style scoped>

</style>
