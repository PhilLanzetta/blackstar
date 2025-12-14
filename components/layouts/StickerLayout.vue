<template>
  <ClientOnly>
    <div
      v-show="shouldShow"
      class="pointer-events-none sticky top-0 flex justify-end right-0 transform -translate-y-64 -mt-32 z-40 pr-5 w-full overflow-hidden"
    >
      <RawLink v-cursor-interact :to="linkUrl|replaceSiteUrl" :click-handler="clickHandler">
        <span
          :class="`bg-${layout.colour} ` + (layout.colour === 'teal' ? 'text-white' : 'text-black')"
          class="w-24 h-24 text-sm lg:w-32 lg:h-32 rounded-full flex items-center justify-center text-center font-medium lg:text-lg p-5 pointer-events-auto transform rotate-12 translate-x-10 transition-transform duration-200 hover:rotate-0 hover:translate-x-0 border border-black leading-none"
        >
          <span v-html="layout.label" />
        </span>
      </RawLink>
    </div>
  </ClientOnly>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'StickerLayout',
  mixins: [layout],
  computed: {
    shouldShow () {
      if (this.layout.type === 'link' || this.layout.type === 'download') {
        return true
      }

      return !this.$store.state.popup.isOpen
    },
    linkUrl () {
      if (this.layout.type === 'link') {
        return this.layout.link.url
      }

      if (this.layout.type === 'download') {
        return this.layout.file
      }
      return '#'
    },
    clickHandler () {
      if (this.layout.type !== 'link' && this.layout.type !== 'download') {
        return this.handlePopups
      }

      return null
    }
  },
  mounted () {
    if (this.layout.type === 'link' || this.layout.type === 'download') {
      return
    }

    if (this.layout.open_on_load) {
      this.handlePopups()
    }
  },
  methods: {
    handlePopups () {
      this.$store.commit('popup/open', this.layout.type)
    }
  }
}
</script>

<style scoped>

</style>
