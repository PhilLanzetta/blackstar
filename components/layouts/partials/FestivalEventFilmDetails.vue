<template>
  <ul class="film-details">
    <li v-if="film.acf.year">
      <span>Year:</span> <span v-html="film.acf.year" />
    </li>
    <li v-if="film.acf.runtime">
      <span>Runtime:</span> <span v-html="film.acf.runtime" /> minutes
    </li>
    <li v-if="film.acf.country">
      <span>Country:</span> <span v-html="film.acf.country" />
    </li>
    <li v-if="film.acf.language">
      <span>Language:</span> <span v-html="film.acf.language" />
    </li>
    <li v-for="(credit, creditKey) in credits" :key="`credit${creditKey}`">
      <span>{{ credit.type }}:</span> <span v-html="credit.name" />
    </li>
    <li v-if="film.acf.premiere">
      <span>Premiere:</span> <span v-html="film.acf.premiere" />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'FestivalEventFilmDetails',
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
