<template>
  <Festival23Buttons v-if="buttons&&buttons.length" class="lg:mt-6 swiper-no-swiping" :buttons="buttons">
    <Festival23BuyButton v-if="card.type==='festival-event'" :post="card.event" class="mr-2 my-1" /><div class="mr-2 my-1 flex items-center flex-wrap leading-none">
      <Festival23SaveButton v-if="card.type==='festival-event'&&showSaveButton" :event="card.event" />
      <Festival23Button v-if="card.type==='festival-film'&&card.film.acf.trailer" to="#" :click-handler="showFilmTrailer">
        View Trailer
      </Festival23Button>
    </div>
  </Festival23Buttons>
</template>

<script>
import hasRichCardLinks from '~/mixins/hasRichCardLinks'

export default {
  name: 'Festival23RichCardButtons',
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
      if (this.card.type === 'festival-event' || this.card.type === 'festival-film') {
        return [{ button: { url: this.cardMainLink, title: 'Read more' } }]
      }

      return this.card.custom.buttons
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
