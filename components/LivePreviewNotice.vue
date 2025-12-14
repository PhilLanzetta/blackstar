<template>
  <div
    v-if="$store.state.liveData||$store.state.liveDataError"
    class="live-preview-notice"
    :class="{'live-preview-notice--error': $store.state.liveDataError}"
  >
    <span v-if="$store.state.liveData">LIVE PREVIEW</span><span
      v-else
    >PREVIEW ERROR</span>
  </div>
</template>

<script>
export default {
  name: 'LivePreviewNotice'
}
</script>

<style scoped>
.live-preview-notice {
  @apply fixed z-50 bottom-12 right-3 bg-lime text-black font-medium uppercase rounded-2xl px-4 py-2 leading-none;
}

.live-preview-notice--error {
  @apply bg-red text-white;
}
</style>
