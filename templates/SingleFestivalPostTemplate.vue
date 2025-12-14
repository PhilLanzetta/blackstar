<script>
export default {
  name: 'SingleFestivalPostTemplate',
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <article class="relative last:pb-96 rounded-section">
    <header class="relative">
      <Festival24Section class="rounded-none lg:rounded-b-4xl relative z-10" :section="{background: post.acf.background, gradient_style: post.acf.gradient_style, layouts: [], style: 'contained'}" :extra-padding="true">
        <div class="w-full py-8 grid lg:grid-cols-2">
          <Festival24Button class="group w-max" :back-arrow="true" to="/festival/news">
            <span class="pt-0.5 font-normal">Back to News</span>
          </Festival24Button>
        </div>
        <div class="flex flex-wrap lg:flex-nowrap justify-between pt-2 pb-8 lg:pb-0">
          <div>
            <p v-if="post.acf.type" class="text-lg pb-2">
              {{ post.acf.type }}
            </p>
            <h2 class="w-full leading-bsf13alt lg:w-8/12 text-5xl lg:text-6xl 2xl:text-7xl font-serif_bold uppercase" v-html="post.title.rendered" />
          </div>
          <div class="grid py-4 lg:pt-0 lg:pb-0 space-y-5">
            <div>
              <p v-if="post.date&&post.acf.show_date" class="text-lg lg:text-right whitespace-nowrap">
                {{ post.date|formatDateAlt }}
              </p>
              <p class="text-lg whitespace-nowrap lg:text-right" v-html="post.acf.location_text" />
            </div>
            <div class="flex flex-wrap flex-col lg:items-end lg: justify-end">
              <SiteLink v-for="item in post.acf.buttons" :key="`${item.button.title}`" :to="item.button.link">
                <span class="text-lg underline whitespace-nowrap">{{ item.button.title }}</span>
              </SiteLink>
            </div>
          </div>
        </div>
        <div class="lg:hidden mb-4 border rounded-3xl overflow-hidden [&>img]:object-cover aspect-w-16 aspect-h-10" v-html="post.featured_image_rendered" />
      </Festival24Section>
      <div class="desktop-news-cover cover-image" v-html="post.featured_image_rendered" />
    </header>
    <Festival24Section :section="{background: '', layouts: [], style: 'contained'}">
      <div class="mx-auto max-w-screen-md">
        <div id="trigger-sticky" />
        <Festival24Prose>
          <span class="text-2xl lg:text-3xl last:[&>p]:mb-0 [&>p>img]:w-full lg:[&>p>img]:rounded-4xl [&>p>img]:rounded-3xl" v-html="post.excerpt.rendered" />
        </Festival24Prose>
        <Space />
        <Festival24Prose>
          <span class="last:[&>p]:!mb-0 [&>p>img]:w-full lg:[&>p>img]:rounded-4xl [&>p>img]:rounded-3xl [&>p>img]:my-10" v-html="post.content.rendered" />
        </Festival24Prose>
      </div>
    </Festival24Section>

    <Festival24Sections v-if="post.acf.layouts.length" class="!pt-0" :layouts="post.acf.layouts" />

    <Festival24Section v-if="post.acf.related_posts" class="last-section overflow-hidden" :section="{background: 'bsf13orange', layouts: [], style: 'contained'}" :extra-padding="true">
      <FestivalNewsCarousel :posts="post.acf.related_posts" />
    </Festival24Section>
    <template v-if="!post.acf.related_posts">
      <Space />
      <Space />
      <Space />
    </template>
  </article>
</template>

<style>
.last-section {
  @apply -mb-12 !pb-24 xl:!pb-28 2xl:!pb-32
}

.desktop-news-cover {
  @apply hidden relative z-0 overflow-hidden lg:block -mt-12 aspect-w-16 aspect-h-6;
}
</style>
