<template>
  <ClientOnly>
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3  md:gap-8 xl:gap-16">
      <div
        v-for="(card, key) in cards"
        :key="`card${key}`"
      >
        <Festival24RichCard class="w-full" :card="card" :background="(layout.background ? layout.background : null)" :gradient-style="(layout.gradient_style ? layout.gradient_style : null)" />
      </div>
    </div>
  </ClientOnly>
</template>

<script>
import layout from '~/mixins/layout'
import livedata from '~/mixins/livedata'
import eventiveEverywhere from '~/mixins/eventiveEverywhere'
import festivalRichCards from '~/mixins/festivalRichCards'

export default {
  name: 'Festival24RichCardGrid',
  mixins: [layout, livedata, festivalRichCards, eventiveEverywhere],
  data () {
    return {
      year: 2024
    }
  }
}
</script>

<style scoped>

</style>
