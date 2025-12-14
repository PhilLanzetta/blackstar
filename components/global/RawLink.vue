<template>
  <span>
    <button v-if="clickHandler&&to==='#'" :class="classNames" @click.prevent="clickHandler">
      <slot />
    </button>
    <a v-if="clickHandler&&to!=='#'" :href="to" :class="classNames" @click.prevent="clickHandler">
      <slot />
    </a>
    <nuxt-link v-if="!native&&!clickHandler" :class="classNames" :to="to">
      <slot />
    </nuxt-link>
    <a v-if="native&&!clickHandler" :class="classNames" :href="to" target="_blank" rel="noreferrer">
      <slot />
    </a>
  </span>
</template>

<script>
export default {
  name: 'RawLink',
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
    classNames: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    native () {
      if (this.clickHandler) {
        return false
      }

      if (!this.to) {
        return false
      }

      const sanitizedLink = this.$options.filters.replaceSiteUrl(this.to)
      return (sanitizedLink.includes('mailto:') || sanitizedLink.includes('http:') || sanitizedLink.includes('https:'))
    }
  }
}
</script>

<style scoped>

</style>
