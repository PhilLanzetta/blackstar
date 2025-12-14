<template>
  <Festival23Modal :close-modal-callback="closeModal">
    <Festival23BoxMask>
      <div ref="embed" v-cursor-hide class="aspect-w-16 aspect-h-9 bg-black" v-html="$store.state.festival.trailer" />
    </Festival23BoxMask>
  </Festival23Modal>
</template>

<script>
import hasFestivalTrailer from '~/mixins/hasFestivalTrailer'

export default {
  name: 'Festival23TrailerModal',
  mixins: [hasFestivalTrailer]
}
</script>

<style scoped>

</style>
