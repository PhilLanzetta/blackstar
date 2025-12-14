<template>
  <section>
    <!-- Legacy tickets and passes layout removed -->
  </section>
</template>

<script>
/* import livedata from '~/mixins/livedata'
import ShapeFive from '~/assets/festival/shape-5.svg?inline'
import ShapeAsterix1 from '~/assets/festival/11/shape-asterix-1.svg?inline' */

export default {
  name: 'FestivalTickets'/* , */
  /* components: { ShapeFive, ShapeAsterix1 },
  mixins: [livedata],
  data () {
    return {
      settings: null
    }
  },
  async fetch () {
    const response = await this.$axios.get(`${this.$axiosConfig.cmsUrl}/wp-json/blackstar/v1/festival-settings`)
    this.settings = response.data
  },
  methods: {
    openEventive (pass) {
      const eventiveBuyButton = this.$refs.cards.querySelector(`#passCard${pass} .eventive-button button`)
      if (eventiveBuyButton) {
        eventiveBuyButton.click()
      } else {
        window.location = `https://festival.blackstarfest.org/passes/buy/${this.settings.tickets_passes[pass].eventive_pass_bucket_code}`
      }
    }
  } */
}
</script>

<style scoped>
/*.pass-card {
  @apply block w-1/2 px-0.5 mb-0.5 lg:px-4 lg:mb-4;
}

.pass-card__inside {
  @apply p-5 xl:px-10 xl:py-16 2xl:px-20 2xl:py-28 h-full border-4 lg:border-md 2xl:border-lg border-black rounded-3xl lg:rounded-4xl flex flex-wrap;
}

.pass-card--festival .pass-card__inside {
  @apply rounded-none bg-beige text-navy border-5 border-navy;
}*/
</style>
