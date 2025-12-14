<template>
  <section :class="`bg-${layout.background_colour}`">
    <ScrollMarquee :symbol="layout.symbol" :word2="layout.word_2" :word1="layout.word_1" :force-colour="layout.foreground_colour" />
  </section>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'Marquee',
  mixins: [layout]
}
</script>

<style scoped>

</style>
