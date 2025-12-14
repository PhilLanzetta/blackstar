<template>
  <Festival24Modal :close-modal-callback="closeModal" :colour="($store.state.theme === 'bsf14' ? 'bsf14yellowTint' : 'bsf13orange')">
    <Festival24Box :class="`bg-${($store.state.theme === 'bsf14' ? 'bsf14yellowTint' : 'bsf13orange')}`">
      <div ref="embed" v-cursor-hide class="aspect-w-16 aspect-h-9 bg-black rounded-xl overflow-hidden border border-black" v-html="$store.state.festival.trailer" />
    </Festival24Box>
  </Festival24Modal>
</template>

<script>
import hasFestivalTrailer from '~/mixins/hasFestivalTrailer'

export default {
  name: 'Festival24TrailerModal',
  mixins: [hasFestivalTrailer]
}
</script>

<style scoped>

</style>
