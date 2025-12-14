<template>
  <article class="festival-event" :class="`festival-event--${$store.state.theme}`">
    <div class="festival-event__inside">
      <RawLink v-cursor-hint="'View'" :to="article.link.url|replaceSiteUrl">
        <span v-if="article.image" class="aspect-cover-img" v-html="(carousel ? article.image_carousel : article.image)" />
        <span v-if="!article.image" class="aspect-cover-img"><img
          v-if="$store.state.theme==='festival'"
          src="~/assets/festival/default-image.png"
          alt=""
        ><img
          v-if="$store.state.theme==='bsf11'"
          src="~/assets/festival/11/default-image.png"
          alt=""
        ></span>
        <span v-if="article.sticker" class="absolute top-5 right-5 rounded-full bg-blue text-center flex items-center w-20 h-20 block text-white text-xs p-1">{{ article.sticker }}</span>
        <span class="sr-only">View {{ article.title }}</span>
      </RawLink>
      <header>
        <span v-if="article.pre_title" class="tag" v-html="article.pre_title" />
        <h1 class="mb-1" itemprop="name" v-html="article.title" />
        <h2 v-if="article.sub_title" v-html="article.sub_title" />
      </header>
    </div>
    <span v-if="article.excerpt" class="festival-event__inside__content" itemprop="description" v-html="article.excerpt" />

    <footer class="flex space-x-2 mt-6 swiper-no-swiping">
      <FestivalButton :to="article.link.url|replaceSiteUrl">
        Read More
      </FestivalButton>
      <FestivalButton v-if="article.call_to_action_button" :alt="true" :to="article.call_to_action_button.url|replaceSiteUrl">
        <span v-html="article.call_to_action_button.title" />
      </FestivalButton>
    </footer>
  </article>
</template>

<script>
export default {
  name: 'ListingFestivalManual',
  props: {
    article: {
      type: Object,
      required: true
    },
    carousel: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>
@import "~/assets/css/components/festival-event.css";
</style>
