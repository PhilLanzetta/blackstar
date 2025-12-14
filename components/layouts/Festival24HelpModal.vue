<template>
  <ClientOnly>
    <Festival24Modal :close-modal-callback="handleClose" :small="true">
      <Festival24Box class="relative bg-beige">
        <div class="px-6 py-2 relative z-50">
          <Festival24Prose>
            <span v-html="$store.state.festival.helpText" />
          </Festival24Prose>
        </div>
      </Festival24Box>
    </Festival24Modal>
  </ClientOnly>
</template>

<script>
export default {
  name: 'Festival24HelpModal',
  watch: {
    '$nuxt.$route' () {
      this.$nextTick(() => {
        this.handleClose()
      })
    }
  },
  methods: {
    handleClose () {
      this.$store.commit('festival/setHelpText', null)
    }
  }
}
</script>

<style scoped>

</style>
