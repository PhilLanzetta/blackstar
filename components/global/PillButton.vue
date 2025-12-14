<template>
  <RawLink v-cursor-interact :to="to" :click-handler="clickHandler" :class-names="'pill-link flex justify-center items-center text-center rounded-3xl px-4 py-2 text-sm sm:text-base font-medium border fade-colours ' + (outline ? ` border-${color} text-${textColorOutline} hover:bg-${color} hover:text-${textColor} ` : ` bg-${color} border-transparent text-${textColor} hover:border-${color} hover:bg-transparent hover:text-${textColorOutline} `)">
    <span class="max-w-full" :class="{'xl:w-28': !autoWidth}">
      <slot />
    </span>
  </RawLink>
</template>

<script>
import ColourScheme from '~/mixins/ColourScheme'

export default {
  name: 'PillButton',
  mixins: [ColourScheme],
  props: {
    to: {
      type: String,
      required: true
    },
    clickHandler: {
      type: Function,
      required: false,
      default: null
    },
    outline: {
      type: Boolean,
      required: false,
      default: false
    },
    hoverColor: {
      type: String,
      required: false,
      default: ''
    },
    autoWidth: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    textColorOutline () {
      if (this.hoverColor) {
        return this.hoverColor
      }

      if (this.forceScheme) {
        return this.colorScheme
      }

      if (['black', 'teal'].includes(this.colorScheme) && this.$store.state.background !== 'white') {
        return 'white'
      }

      return 'black'
    }
  }
}
</script>

<style scoped>

</style>
