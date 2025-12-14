<script>
import updateRouteQuery from '~/mixins/updateRouteQuery'

export default {
  name: 'Festival24VirtualToggle',
  mixins: [updateRouteQuery],
  props: {
    alt: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    virtual () {
      return (this.$route.query && this.$route.query.virtual)
    }
  },
  methods: {
    toggleVirtual () {
      if (this.$route.query && this.$route.query.virtual) {
        this.updateQueryVar('virtual', null)
      } else {
        this.updateQueryVar('virtual', 1)
      }
    }
  }
}
</script>

<template>
  <button class="flex space-x-4 items-center leading-none" @click.prevent="toggleVirtual">
    <span :class="{'opacity-50': virtual}">In-Person</span><span class="flex w-20 h-10 rounded-3xl items-center" :class="{'border border-black ': $store.state.theme==='bsf13', 'bg-[#B8A9F9]': alt&&$store.state.theme==='bsf13', 'bg-bsf14pinkTint': $store.state.theme==='bsf14'&&alt, 'bg-[#E7E1DA]': !alt&&$store.state.theme==='bsf13', 'bg-bsf14pink': !alt&&$store.state.theme==='bsf14'}"><span class="w-8 h-8  rounded-full block transform transition-transform duration-200" :class="{'border border-black ': $store.state.theme==='bsf13', 'translate-x-0.5': !virtual, 'translate-x-11': virtual, 'bg-bsf13purple': alt&&$store.state.theme==='bsf13', 'bg-bsf14pink': alt&&$store.state.theme==='bsf14', 'bg-beige': !alt&&$store.state.theme==='bsf13', 'bg-bsf14pinkTint': !alt&&$store.state.theme==='bsf14'}" /></span><span :class="{'opacity-50': !virtual}">Virtual</span>
  </button>
</template>

<style scoped>

</style>
