<template>
  <Container>
    <div class="flex flex-wrap items-stretch justify-center -mx-4 space-y-10 md:space-y-0">
      <div v-for="(card, key) in layout.cards" :key="`card${key}`" class="px-4 flex items-stretch" :class="{'w-full md:w-1/2': layout.grid_layout==='two_up', 'w-full md:w-1/2 md:pb-10  lg:w-1/3': layout.grid_layout==='three_up', 'lg:py-4': (layout.grid_layout==='three_up'&&layout.cards.length>3), 'lg:py-0': (layout.grid_layout==='three_up'&&layout.cards.length<=3)}">
        <Festival23Card :card="card" :section-colour="sectionColour" />
      </div>
    </div>
  </Container>
</template>

<script>
import layout from '~/mixins/layout'
import festival23SectionColors from '~/mixins/festival23SectionColors'

export default {
  name: 'Festival23Cards',
  mixins: [layout, festival23SectionColors]
}
</script>

<style scoped>

</style>
