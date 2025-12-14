<template>
  <Festival23Box :class="{'-mb-0.5': active}" :bg="bg" :small="true" :outline="true" :bottom="false">
    <span class="relative z-20 -my-1.5">
      <SiteLink :to="to" :click-handler="clickHandler">
        <span class="px-8 pt-4 text-lg font-normal block leading-none block transition-all duration-300" :class="{'pb-10': active, 'pb-5': !active}"><slot /></span>
      </SiteLink>
    </span>
  </Festival23Box>
</template>

<script>
import festival23SectionColors from '~/mixins/festival23SectionColors'

export default {
  name: 'Festival23Tab',
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
    },
    active: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    bg () {
      if (this.active) {
        return `bg-${this.sectionColour}`
      }

      return 'bg-bsf12Bg'
    }
  }
}
</script>

<style scoped>
</style>
