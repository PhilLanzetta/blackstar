<template>
  <ul class="film-details space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 2xl:gap-8 md:grid-flow-col-dense md:grid-rows-4">
    <li v-if="film.acf.year">
      <span class="block font-medium">Year</span> <span v-html="film.acf.year" />
    </li>
    <li v-if="film.acf.runtime">
      <span class="block font-medium">Runtime</span> <span v-html="film.acf.runtime" /> minutes
    </li>
    <li v-if="film.acf.country">
      <span class="block font-medium">Country</span> <span v-html="film.acf.country" />
    </li>
    <li v-if="film.acf.language">
      <span class="block font-medium">Language</span> <span v-html="film.acf.language" />
    </li>
    <li v-for="(credit, creditKey) in credits" :key="`credit${creditKey}`">
      <span class="block font-medium">{{ credit.type }}</span> <span v-html="credit.name" />
    </li>
    <li v-if="film.acf.premiere">
      <span class="block font-medium">Premiere</span> <span v-html="film.acf.premiere" />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Festival24EventFilmDetails',
  props: {
    film: {
      type: Object,
      required: true
    }
  },
  computed: {
    credits () {
      if (this.film && this.film.acf.credits) {
        return this.film.acf.credits
      }

      return []
    }
  }
}
</script>

<style scoped>
.film-details {
  @apply mt-4;
}

.film-details li {
  @apply mb-1;
}
</style>
