<template>
  <Festival24Buttons v-if="buttons&&buttons.length" class="swiper-no-swiping flex items-end  gap-x-2 gap-y-1 justify-between sm:justify-start" :buttons="buttons">
    <Festival24BuyButton v-if="card.type==='festival-event'" :post="card.event"  /><div v-if="(card.type==='festival-event'&&showSaveButton)||(card.type==='festival-film'&&card.film.acf.trailer)" class="flex items-center flex-wrap leading-none gap-x-2 gap-y-1">
      <Festival24SaveButton v-if="card.type==='festival-event'&&showSaveButton" :event="card.event" :large="true" />
      <Festival24Button v-if="card.type==='festival-film'&&card.film.acf.trailer" to="#" :click-handler="showFilmTrailer">
        Watch Trailer
      </Festival24Button>
    </div>
  </Festival24Buttons>
</template>

<script>
import hasRichCardLinks from '~/mixins/hasRichCardLinks'

export default {
  name: 'Festival24RichCardButtons',
  mixins: [hasRichCardLinks],
  props: {
    card: {
      type: Object,
      required: true
    },
    showSaveButton: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  computed: {
    buttons () {
      if (this.card.type === 'festival-event' || this.card.type === 'festival-film' || this.card.type === 'festival-post') {
        return [{ button: { url: this.cardMainLink, title: 'Read more' } }]
      }

      if (this.card.custom) {
        return this.card.custom.buttons
      }

      return []
    }
  },
  methods: {
    showFilmTrailer () {
      this.$store.commit('festival/trailer', this.card.film.acf.trailer)
    }
  }
}
</script>

<style scoped>
</style>
