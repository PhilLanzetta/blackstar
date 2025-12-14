<template>
  <ClientOnly>
    <Festival23Modal :close-modal-callback="handleClose" :small="true">
      <Festival23Box bg="bg-bsf12bg">
        <div class="relative">
          <div class="px-6 py-2 relative z-50">
            <Festival23Prose>
              <span v-html="$store.state.festival.helpText" />
            </Festival23Prose>
          </div>
        </div>
      </Festival23Box>
    </Festival23Modal>
  </ClientOnly>
</template>

<script>
export default {
  name: 'Festival23HelpModal',
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
