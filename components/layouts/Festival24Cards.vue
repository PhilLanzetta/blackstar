<template>
  <div class="" :class="{'md:grid md:grid-cols-2 md:gap-8 xl:gap-16': layout.grid_layout==='one_two', 'flex flex-wrap items-stretch justify-center -mx-4 sm:-mx-8 -my-12 lg:-my-6': layout.grid_layout!=='one_two'}">
    <div
      v-for="(card, key) in layout.cards"
      :key="`card${key}`"
      class="flex items-stretch py-11 lg:py-6"
      :class="cssClasses(card, key)"
    >
      <Festival24Card class=" max-w-screen-sm mx-auto md:max-w-none" :card="card" />
    </div>
  </div>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'Festival24Cards',
  mixins: [layout],
  methods: {
    cssClasses (card, key) {
      const classes = []

      if (this.layout.grid_layout === 'two_up') {
        classes.push('w-full md:w-1/2')
      }

      if (this.layout.grid_layout === 'three_up') {
        classes.push('w-full md:w-1/2 md:pb-10  lg:w-1/3')
      }

      if (this.layout.grid_layout === 'three_up' && this.layout.cards.length > 3) {
        classes.push('lg:py-4')
      }

      if (this.layout.grid_layout === 'three_up' && this.layout.cards.length <= 3) {
        classes.push('lg:py-0')
      }

      if (this.layout.grid_layout === 'one_two' && key === 0) {
        classes.push('row-span-2')
      }

      if (this.layout.grid_layout !== 'one_two') {
        classes.push('px-4 sm:px-8')
      }

      if (card.gradient_style && card.gradient_style !== 'none') {
        if (card.gradient_style === 'top') {
          classes.push(`bg-gradient-to-b from-${card.background.replace('Tint', '')}Tint to-${card.background.replace('Tint', '')}`)
        } else {
          classes.push(`bg-gradient-to-t from-${card.background.replace('Tint', '')}Tint to-${card.background.replace('Tint', '')}`)
        }
      } else {
        classes.push(`bg-${card.background}`)
      }

      return classes
    }
  }
}
</script>

<style scoped>

</style>
