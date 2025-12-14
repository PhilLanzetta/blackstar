<template>
  <FestivalArrow direction="left">
    <FestivalArrowLeft v-if="$store.state.theme==='festival'" /><FestivalArrowLeft11 v-if="$store.state.theme==='bsf11'" /> <span class="sr-only">
      Previous
    </span>
  </FestivalArrow>
</template>

<script>
import FestivalArrowLeft from '~/assets/festival/arrow-left.svg?inline'
import FestivalArrowLeft11 from '~/assets/festival/11/arrow-left.svg?inline'

export default {
  name: 'FestivalPrevArrow',
  components: { FestivalArrowLeft, FestivalArrowLeft11 }
}
</script>

<style scoped>

</style>
