<template>
  <article class="festival-event festival-film" :class="`festival-event--${$store.state.theme} festival-film--${$store.state.theme}`">
    <div class="festival-event__inside">
      <span class="aspect-cover-img">
        <span v-if="film.featured_image_rendered" v-html="film.featured_image_rendered" /><span
          v-if="!film.featured_image_rendered"
        ><img
          v-if="$store.state.theme==='festival'"
          src="~/assets/festival/default-image.png"
          alt=""
        ><img
          v-if="$store.state.theme==='bsf11'"
          src="~/assets/festival/11/default-image.png"
          alt=""
        ></span>
      </span>
      <span v-if="film.stickers&&film.stickers.length" class="festival-event__badge">{{ post.stickers[0].name }}</span>
      <header>
        <span v-if="film.tags" class="display flex flex-wrap space-x-2">
          <span
            v-for="tag in film.tags"
            :key="`film${film.slug}tag${tag.term_id}`"
            class="tag"
          >
            {{ tag.name }}
          </span>
        </span>
        <h1 class="mb-1" itemprop="name" v-html="film.post_title" />
      </header>
    </div>

    <div class="festival-event__inside__content">
      <span itemprop="description" v-if="film.post_content" v-html="film.post_content" />

      <FestivalEventFilmDetails :film="film" />

      <span v-if="film.accessibility&&film.accessibility.length" class="flex space-x-4 mt-4">
        <span v-for="accessTag in film.accessibility" :key="`accessTag${accessTag.term_id}`" class="block">
          <template v-if="$store.state.theme==='festival'">
            <img v-if="accessTag.slug==='closed-captioning'" src="~/assets/festival/icon-cc.svg" class="w-10 h-10 block"><img v-if="accessTag.slug==='audio-described'" src="~/assets/festival/icon-ad.svg" class="w-10 h-10 block"><span class="sr-only" v-html="accessTag.name" />
          </template>
          <template v-if="$store.state.theme==='bsf11'">
            <img v-if="accessTag.slug==='closed-captioning'" src="~/assets/festival/11/icon-cc.svg" class="w-10 h-10 block"><img v-if="accessTag.slug==='audio-described'" src="~/assets/festival/11/icon-ad.svg" class="w-10 h-10 block"><span class="sr-only" v-html="accessTag.name" />
          </template>
        </span>
      </span>
    </div>

    <footer>
      <p v-if="film.acf.trailer" class="mt-6">
        <FestivalButton to="#" :click-handler="viewTrailer">
          View Trailer
        </FestivalButton>
      </p>
    </footer>
  </article>
</template>

<script>
export default {
  name: 'ListingFestivalFilm',
  props: {
    film: {
      type: Object,
      required: true
    }
  },
  methods: {
    viewTrailer () {
      this.$store.commit('festival/trailer', this.film.acf.trailer)
    }
  }
}
</script>

<style >
.festival-film .film-details li {
  @apply mb-1;
}

.festival-film--festival .film-details li span:first-child {
  @apply font-festival_sans_light_italic font-normal text-pink;
}

.festival-film--festival .film-details {
  @apply mt-4 text-sm font-light;
}
</style>
