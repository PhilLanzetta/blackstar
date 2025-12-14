<template>
  <Festival23Modal :md="true" :close-modal-callback="closeModal">
    <Festival23FullRichCard :card="{type: 'festival-event', event: $store.state.festival.activeEvent}" :section-colour="bgColour" />
  </Festival23Modal>
</template>

<script>
import eventiveEverywhere from '~/mixins/eventiveEverywhere'

export default {
  name: 'Festival23ActiveEventModal',
  mixins: [eventiveEverywhere],
  computed: {
    bgColour () {
      if (this.$store.state.festival.activeEvent) {
        if (this.$store.state.festival.activeEvent.acf.is_virtual) {
          return 'bsf12yellow'
        }
      }

      return 'bsf12blue'
    }
  },
  methods: {
    closeModal () {
      this.$store.commit('festival/setActiveEvent', null)
    }
  }
}
</script>

<style scoped>

</style>
