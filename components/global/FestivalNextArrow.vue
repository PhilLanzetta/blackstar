<template>
  <FestivalArrow direction="right">
    <FestivalArrowRight v-if="$store.state.theme==='festival'" /><FestivalArrowRight11 v-if="$store.state.theme==='bsf11'" /><span class="sr-only">
      Next
    </span>
  </FestivalArrow>
</template>

<script>
import FestivalArrowRight from '~/assets/festival/arrow-right.svg?inline'
import FestivalArrowRight11 from '~/assets/festival/11/arrow-right.svg?inline'

export default {
  name: 'FestivalNextArrow',
  components: { FestivalArrowRight, FestivalArrowRight11 }
}
</script>

<style scoped>

</style>
