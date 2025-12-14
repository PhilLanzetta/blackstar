<template>
  <article class="gallery">
    <header class="gallery__header bg-black text-white">
      <div class="relative">
        <Container>
          <div class="gallery__header__title">
            <SiteLink v-if="post.acf.back_link" class="gallery__header__back" :to="post.acf.back_link.url|replaceSiteUrl">
              <span class="flex items-baseline space-x-4 leading-none"><span
                class="gallery__header__back__arrow"
              >&larr;&larr;</span> <span v-html="post.acf.back_link.title" /></span>
            </SiteLink>
            <h1 class="feature-heading mt-4" v-html="post.title.rendered" />
          </div>
        </Container>
      </div>
      <div class="bg-teal">
        <SiteLink to="/archive">
          <ScrollMarquee symbol="arrows-down-right" word2="Gallery" word1="View" force-colour="white" />
        </SiteLink>
      </div>
    </header>
    <Container>
      <div class="overflow-hidden">
        <div class="gallery-grid mt-4">
          <div v-for="(item, index) in post.acf.items" :key="`item${index}`" class="gallery-grid__item">
            <GalleryItem :item="item" :index="index" :handle-gallery-modal="handleGalleryModal" />
          </div>
        </div>
        <Space :lg="true" />
      </div>
    </Container>
  </article>
</template>
<script>

export default {
  name: 'Gallery',
  props: {
    post: {
      type: Object,
      required: false,
      default: null
    }
  },
  methods: {
    handleGalleryModal (index) {
      this.$store.commit('setGallery', { currentIndex: index, gallery: this.post.acf.items })
    }
  }
}
</script>

<style>
.gallery__header__title {
  @apply py-10;
}

.gallery__header__back {
  @apply font-medium text-teal text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-4 block;
}

.gallery__header__back__arrow {
  @apply font-light text-2xl lg:text-4xl xl:text-6xl;
}

.gallery-grid {
  @apply flex flex-wrap -mx-4;
}

.gallery-grid__item {
  @apply  px-4 my-4 w-1/2 relative;
}

.gallery-grid__item:first-child,
.gallery-grid__item:nth-child(3n+1) {
  @apply w-full;
}

.gallery-grid__item figure {
  @apply block w-full h-auto rounded-2xl sm:rounded-3xl lg:rounded-4xl overflow-hidden relative;
}

.gallery-grid__item figure::before {
  @apply block;

  content: " ";
  padding-top: 100%;
}

.gallery-grid__item:first-child figure::before,
.gallery-grid__item:nth-child(3n+1)  figure::before {
  padding-top: 56%;
}

.gallery-grid__item figure figcaption {
  @apply absolute top-0 left-0 w-full h-full bg-black text-white p-5 lg:text-xl lg:p-10 xl:text-3xl xl:p-20 z-10 overflow-auto transform -translate-y-full motion-reduce:transition-transform duration-200;
}

.gallery-grid__item figure:hover figcaption {
  @apply transform translate-y-0;
}
</style>
