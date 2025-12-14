<template>
  <div :class="{'mb-12': $store.state.theme==='festival', 'mb-4': $store.state.theme==='bsf11'}">
    <FestivalHeading v-if="$store.state.theme==='festival'" background-class="bg-yellow text-navy" class="-mt-border -ml-border -mr-border" width-class="max-w-full w-full">
      <span v-html="title" />
    </FestivalHeading>
    <h2 v-if="$store.state.theme==='bsf11'" class="festival-sponsor-collection-heading" :class="`festival-sponsor-collection-heading--${titleStyle}`" v-html="title"></h2>
    <div class="flex flex-wrap items-center" :class="{'mt-10 -m-4 justify-center lg:justify-start': $store.state.theme==='festival', '-mx-4 lg:-mx-6 justify-start': $store.state.theme==='bsf11'}">
      <div v-for="sponsor in items" :key="`sponsor${sponsor.id}`" class="px-4 lg:px-6 w-1/2 sm:w-auto" :class="{'mb-10': $store.state.theme==='festival', 'mb-5': $store.state.theme==='bsf11'}">
        <span class="sponsor">
          <a v-cursor-interact :href="sponsor.acf.website" rel="noreferrer" target="_blank" v-html="sponsor.acf.logo" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import livedata from '~/mixins/livedata'

export default {
  name: 'FestivalSponsorGridCollection',
  mixins: [livedata],
  props: {
    title: {
      type: String,
      required: true
    },
    titleStyle: {
      type: String,
      required: false,
      default: 'black'
    },
    collection: {
      type: Number,
      required: true
    }
  },
  async fetch () {
    this.items = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/sponsor?per_page=100&sponsor-collection=${this.collection}&orderby=menu_order&order=asc`)
  }
}
</script>

<style scoped>
.festival-sponsor-collection-heading {
  @apply font-bsf11_cursive text-5xl lg:text-6xl 2xl:text-7xl uppercase m-0;
}
.festival-sponsor-collection-heading--bsf11Teal {
  @apply text-bsf11Teal;
}

.festival-sponsor-collection-heading--bsf11Yellow {
  @apply text-bsf11Yellow;
}

.festival-sponsor-collection-heading--white {
  @apply text-white;
}

.festival-sponsor-collection-heading--black {
  @apply text-black;
}
</style>
