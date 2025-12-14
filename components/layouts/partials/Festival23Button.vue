<template>
  <Festival23Box
    :bg="bg"
    :small="large"
    :x-small="!large"
    :hover-bg="true"
    :inverse="inverse"
    class="hover:text-black"
    :class="{'text-black': inverse, 'text-white': !inverse}"
  >
    <span class="relative z-20" :class="{'-my-1.5': !large, '-my-3': large}">
      <SiteLink :to="to" :click-handler="clickHandler">
        <span class="px-4 2xl:px-5 text-base font-normal block leading-none" :class="{'py-4': !large, 'py-5 2xl:py-5': large}"><slot /></span>
      </SiteLink>
    </span>
  </Festival23Box>
</template>

<script>
export default {
  name: 'Festival23Button',
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
    inverse: {
      type: Boolean,
      required: false,
      default: false
    },
    large: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    bg () {
      if (this.inverse) {
        return 'bg-white'
      }

      return 'bg-black'
    }
  }
}
</script>

<style scoped>
</style>
