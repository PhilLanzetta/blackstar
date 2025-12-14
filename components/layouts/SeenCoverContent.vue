<template>
  <div class="seen-article__header-content">
    <p>
      <span v-if="issue"><SiteLink :to="`/seen/read/${issue.slug}`"><span v-html="issue.name" /></SiteLink> <span class="sep" :style="customTextColour" /> <SiteLink
        :to="`/seen/read/${issue.slug}`"
      ><span v-html="issue.description" /></SiteLink></span>
      <span v-if="categories&&categories.length"><span
        v-for="category in categories"
        :key="`category${category.term_id}`"
      ><span class="sep" :style="customTextColour" /> <SiteLink  :to="`/seen/category/${category.slug}`"><span v-html="category.name" /></SiteLink></span></span>
    </p>

    <h1 v-html="(cover.override_title ? cover.override_title : title)" />
    <h2 v-if="cover.subtitle" v-html="cover.subtitle" />

    <cite v-if="cover.override_credits" v-html="cover.override_credits" />
    <cite v-if="!cover.override_credits&&authors&&authors.length">by <span
      v-for="(author, authorKey) in authors"
      :key="`author${author.term_id}`"
    ><SiteLink :to="`/seen/author/${author.slug}`"><span v-html="author.name" /></SiteLink> <span v-if="authors.length > 1 && author.length!==(authorKey+1)" class="sep" :style="customTextColour" /></span></cite>
  </div>
</template>

<script>
export default {
  name: 'SeenCoverContent',
  props: {
    cover: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    issue: {
      type: Object,
      required: false,
      default: null
    },
    authors: {
      type: Array,
      required: false,
      default: null
    },
    categories: {
      type: Array,
      required: false,
      default: null
    }
  },
  computed: {
    customTextColour () {
      return (this.cover.foreground_colour ? ` background-color: ${this.cover.foreground_colour}; ` : '')
    }
  }
}
</script>

<style>
.seen-article__header-content {
  @apply max-w-4xl py-10 lg:py-20 mx-auto;
}

.seen-article__header-content h1,
.seen-article__header-content h2 {
  @apply text-4xl lg:text-6xl xl:text-7xl leading-none my-8 lg:my-16;
}

.seen-article__header-content h1 {
  @apply font-seen_serif_italic font-normal;
}

.seen-article__header-content h2 {
  @apply font-seen_serif_light font-light -mt-4 md:-mt-8 lg:-mt-14;
}

.seen-article__header-content cite {
  @apply font-light not-italic text-lg;
}

.seen-article__header-content p {
  @apply font-seen_serif_light font-light text-lg;
}

</style>
