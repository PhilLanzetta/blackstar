<template>
  <RawLink :click-handler="clickHandler" :to="to" :class-names="`${textColor} bg-black inline-block p-2 leading-none`">
    <slot />
  </RawLink>
</template>

<script>
import festival23SectionColors from '~/mixins/festival23SectionColors'

export default {
  name: 'Festival23SquareButton',
  mixins: [festival23SectionColors],
  props: {
    to: {
      type: String,
      required: false,
      default: ''
    },
    clickHandler: {
      type: Function,
      required: false,
      default: null
    }
  },
  computed: {
    textColor () {
      if (this.sectionColour === 'bsf12blue') {
        return 'text-bsf12blue'
      }

      if (this.sectionColour === 'bsf12green') {
        return 'text-bsf12green'
      }

      if (this.sectionColour === 'bsf12yellow') {
        return 'text-bsf12yellow'
      }

      return 'text-white'
    }
  }
}
</script>

<style scoped>

</style>
