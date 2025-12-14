<template>
  <Festival24Modal :close-modal-callback="closeModal" :colour="colour">
    <Festival24FullRichCard :card="{type: 'festival-event', event: $store.state.festival.activeEvent}" :class="`bg-${colour}`" />
  </Festival24Modal>
</template>

<script>
import eventiveEverywhere from '~/mixins/eventiveEverywhere'

export default {
  name: 'Festival24ActiveEventModal',
  mixins: [eventiveEverywhere],
  computed: {
    colour () {
      const activeEvent = this.$store.state.festival.activeEvent

      if (this.$store.theme === 'bsf13') {
        return (activeEvent.acf.films ? 'bsf13orange' : 'bsf13green')
      }

      return (activeEvent.acf.films ? 'bsf14yellow' : 'bsf14orangeTint')
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
