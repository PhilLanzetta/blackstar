<script>
export default {
  name: 'Festival24RichCardType',
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  computed: {
    isEvent () {
      if (!this.card.event) {
        return false
      }

      return !this.card.event.acf.films || (this.card.event.acf.films < 1)
    },
    isFilm () {
      if (!this.card.event) {
        return false
      }

      return !this.isEvent
    },
    isVirtualFilm () {
      if (!this.isFilm) {
        return false
      }

      return this.card.event.acf.is_virtual
    }
  }
}
</script>

<template>
 <span
   v-if="isEvent||isFilm"
   class="px-2 py-1 text-sm border border-black rounded-md mb-2 inline-block"
   :class="{'bg-bsf13orange': isFilm&&!isVirtualFilm&&$store.state.theme==='bsf13','bg-bsf14yellow': isFilm&&!isVirtualFilm&&$store.state.theme==='bsf14', 'bg-black text-white': isVirtualFilm, 'bg-bsf13green': isEvent&&$store.state.theme==='bsf13', 'bg-bsf14orangeTint': isEvent&&$store.state.theme==='bsf14'}"
 ><span v-if="isFilm"><span v-if="isVirtualFilm">Virtual </span>Film</span><span v-else>Event</span></span>
</template>

<style scoped>

</style>
