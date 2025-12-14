<template>
  <div class="text-sm" :class="{'flex space-x-2 items-stretch': inline, 'space-y-2': !inline}">
    <Festival23SquareButton v-if="awards&&awards.length" :to="`/festival/schedule?festival-awards=${awards[0].term_id}&view=az`" :section-colour="sectionColour">
      Award Nominee
    </Festival23SquareButton>
    <div v-if="showPremiereStatus">
      <Festival23SquareButton :to="`/festival/schedule?premiere-status=${card.event.premiere[0].term_id}&view=az`" :section-colour="sectionColour">
        <span v-html="card.event.premiere[0].name" /> Premiere
      </Festival23SquareButton>
    </div>
  </div>
</template>

<script>
import festival23SectionColors from '~/mixins/festival23SectionColors'

export default {
  name: 'Festival23RichCardHighlights',
  mixins: [festival23SectionColors],
  props: {
    card: {
      type: Object,
      required: true,
      default: null
    },
    inline: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    awards () {
      if (this.card.type === 'festival-event') {
        if (this.card.event.awards && this.card.event.awards.length) {
          return this.card.event.awards
        }

        return false
      }

      if (this.card.type === 'festival-film') {
        if (this.card.film.awards && this.card.film.awards.length) {
          return this.card.film.awards
        }

        return false
      }

      return false
    },
    showPremiereStatus () {
      if (this.card.type !== 'festival-event') {
        return false
      }

      if (!this.card.event) {
        return false
      }

      if (!this.card.event.premiere) {
        return false
      }

      if (!this.card.event.premiere.length) {
        return false
      }

      if (!this.card.event.acf.films) {
        return false
      }

      return this.card.event.acf.films < 2
    }
  }
}
</script>

<style scoped>

</style>
