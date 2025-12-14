<template>
  <div class="fixed top-0 left-0 w-full h-full z-40 overflow-auto pt-40 lg:pt-48 pb-10" :class="{'bg-black/30 backdrop-blur-2xl': $store.state.theme==='bsf14'}">
    <div class="w-full min-h-full flex items-center justify-center px-2 lg:p-6 ">
      <div class="mx-auto relative z-10 w-full" :class="{'max-w-lg': small, 'max-w-screen-lg': md, 'max-w-screen-xl': !md&&!small}">
        <button class="absolute z-20 -top-1 lg:-top-10 right-2 lg:right-0 w-10 h-10 lg:w-12 lg:h-12 transform -translate-y-full rounded-full  flex items-center justify-center" :class="`bg-${colour}` + ($store.state.theme==='bsf13' ? ' border-black border ': '')" @click.prevent="closeModal">
          <svg class="block w-7 h-7 lg:w-9 lg:h-9" width="39" height="40" viewBox="0 0 39 40" fill="none"><path d="M28.6378 29.546L9.5459 10.4541" stroke="black" stroke-width="2" stroke-miterlimit="10"/><path d="M28.6378 10.4541L9.5459 29.546" stroke="black" stroke-width="2" stroke-miterlimit="10"/></svg>
          <span class="sr-only">Close</span>
        </button>
        <slot />
      </div>
      <div class="fixed top-0 left-0 w-full h-full opacity-80 z-0" :class="{'bg-navy lg:bg-black': $store.state.theme==='festival', 'bg-black': $store.state.theme==='bsf11'|| $store.state.theme==='bsf13'}" @click.prevent="closeModal" />
    </div>
  </div>
</template>

<script>
import modal from '~/mixins/modal'

export default {
  name: 'Festival24Modal',
  mixins: [modal],
  props: {
    closeModalCallback: {
      type: Function,
      required: true
    },
    small: {
      type: Boolean,
      required: false,
      default: false
    },
    md: {
      type: Boolean,
      required: false,
      default: false
    },
    colour: {
      type: String,
      required: false,
      default: 'beige'
    }
  },
  methods: {
    closeModal () {
      this.closeModalCallback()
    }
  }
}
</script>

<style scoped>

</style>
