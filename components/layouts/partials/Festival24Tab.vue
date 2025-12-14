<template>
  <SiteLink :to="to" :click-handler="clickHandler">
    <span class="rounded-t-3xl px-5 py-5 transition-all duration-200 block" :class="`${($store.state.theme==='bsf13' ? ' border-t border-black border-x  ' : '')}  bg-${background}` + (active ? ' -mb-1 pb-12' : '')">
      <span class="px-4 block transition-all duration-300 text-2xl"><slot /></span>
    </span>
  </SiteLink>
</template>

<script>

export default {
  name: 'Festival24Tab',
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
    },
    background: {
      type: String,
      required: false,
      default: 'beige'
    }
  }
}
</script>

<style scoped>
</style>
