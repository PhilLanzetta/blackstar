<template>
  <div class="fixed top-0 left-0 w-full h-full z-30 overflow-auto pt-20 pb-10" :class="{'bg-black bg-opacity-50 z-50': $store.state.theme==='bsf12'}">
    <div class="w-full min-h-full flex items-center justify-center px-2 lg:p-6 ">
      <div class="mx-auto relative z-10 w-full" :class="{'max-w-lg': small, 'max-w-screen-lg': md, 'max-w-screen-xl': !md&&!small}">
        <button class="absolute z-20 -top-2 right-2 lg:right-0 w-10 h-10 transform -translate-y-full" @click.prevent="closeModal">
          <svg class="block w-full h-full">
            <use xlink:href="#icon-close-box" />
          </svg>
          <span class="sr-only">Close</span>
        </button>
        <slot />
      </div>
      <div class="absolute top-0 left-0 w-full h-full lg:opacity-80 z-0" :class="{'bg-navy lg:bg-black': $store.state.theme==='festival', 'bg-black': $store.state.theme==='bsf11'}" @click.prevent="closeModal" />
    </div>
  </div>
</template>

<script>
import modal from '~/mixins/modal'

export default {
  name: 'Festival23Modal',
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
