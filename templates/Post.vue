<template>
  <article class="blog-article">
    <header class="blog-article__header bg-black text-white">
      <div class="relative" v-if="post.acf.cover_image||post.acf.cover_video">
        <div
          class="blog-article__header__cover"
          :class="(post.acf.mobile_cover_image ? 'blog-article__header__cover--mobile-image' : '')"
        >
          <span
            v-if="post.acf.cover_image"
            class="cover-image absolute z-0 top-0 left-0 w-full h-full"
            :class="(post.acf.mobile_cover_image ? 'hidden md:block' : 'block')"
            v-html="post.acf.cover_image"
          />
          <span
            v-if="post.acf.mobile_cover_image"
            class="block md:hidden w-full h-auto"
            v-html="post.acf.mobile_cover_image"
          />
          <video
            v-if="post.acf.cover_video"
            class="absolute z-0 top-0 left-0 w-full h-full object-cover z-10"
            playsinline
            muted
            loop
            autoplay
          >
            <source type="video/mp4" :src="post.acf.cover_video">
          </video>
        </div>
        <div v-if="post.acf.cover_caption" class="absolute bottom-0 left-0 w-full bg-black text-white text-right py-2 px-4 text-sm" v-html="post.acf.cover_caption" />
      </div>

      <Container>
        <div class="blog-article__header__title">
          <SiteLink v-if="type!=='opportunity'" class="blog-article__header__back" to="/news">
            <span class="flex items-baseline space-x-4 leading-none"><span
              class="blog-article__header__back__arrow"
            >&larr;&larr;</span> <span>Back to News</span></span>
          </SiteLink>
          <SiteLink v-if="type==='opportunity'" class="blog-article__header__back" to="/about/#opportunities">
            <span class="flex items-baseline space-x-4 leading-none"><span
              class="blog-article__header__back__arrow"
            >&larr;&larr;</span> <span>Back to Opportunities</span></span>
          </SiteLink>
          <h1 class="feature-heading mt-4" v-html="post.title.rendered" />
          <ul v-if="type!=='opportunity'">
            <li v-for="category in post.categories" :key="`category${category.term_id}`">
              <SiteLink :to="`/news/${category.slug}`">
                <span v-html="category.name" />
              </SiteLink>
            </li>
            <li>{{ post.date|formatDateAlt }}</li>
            <li v-if="type==='press'&&post.acf.location" v-html="post.acf.location" />
          </ul>

          <ul v-if="type==='opportunity'&&post.opportunity_types">
            <li v-for="opportunityType in post.opportunity_types" :key="`opportunityType${opportunityType.term_id}`">
              <span v-html="opportunityType.name" />
            </li>
          </ul>
          <cite v-if="(post.author||post.acf.guest_author)&&type!=='press'">By
            <span v-if="post.acf.guest_author" v-html="post.acf.guest_author" />
            <SiteLink v-if="!post.acf.guest_author" :to="post.author.url|replaceSiteUrl"><span v-html="post.author.name" /></SiteLink>
          </cite>
          <p v-if="type==='press'&&post.acf.introduction" v-html="post.acf.introduction" />

          <div class="flex mt-8"  v-if="post.acf&&post.acf.pdf"><PillButton :auto-width="true" :to="post.acf.pdf|replaceSiteUrl" color-scheme="white" :force-scheme="true" :outline="true">
            <span>Download PDF</span>
          </PillButton></div>
        </div>
      </Container>
    </header>
    <Container>
      <CursorInteractInside>
        <div class="blog-article__content" v-html="post.content.rendered" />
      </CursorInteractInside>
    </Container>
    <footer class="blog-article__footer">
      <div v-if="post.tags&&post.tags.length" class="blog-article__footer__inside">
        <Container>
          <ul>
            <li v-for="tag in post.tags" :key="`tag${tag.term_id}`">
              <SiteLink :to="`/news/tagged/${tag.slug}`">
                {{ tag.name }}
              </SiteLink>
            </li>
          </ul>
        </Container>
      </div>
      <div v-if="post.acf.related_posts&&post.acf.related_posts.length" class="bg-black text-white overflow-hidden" :class="{'border-b-5 border-white': !(post.acf.spotlights&&post.acf.spotlights.length)}">
        <ScrollMarquee symbol="arrows-down-right" word2="Related" word1="Related" force-colour="white" />
        <Container>
          <div class="py-10 pb-20">
            <div class="flex space-x-4 justify-end disabled-gray">
              <button :id="`previous-${uniqueId}`" ref="prevArrow">
                <PrevArrow />
              </button>
              <button :id="`next-${uniqueId}`" ref="nextArrow">
                <NextArrow />
              </button>
            </div>
            <Space />
            <ClientOnly>
              <PostsCarousel key="relatedPostsCarousel" :arrow-next="`#next-${uniqueId}`" :arrow-previous="`#previous-${uniqueId}`">
                <swiper-slide v-for="relatedPost in post.acf.related_posts" :key="`relatedPost${relatedPost.id}`">
                  <ListingPost :post="relatedPost" color-scheme="white" :force-scheme="true" />
                </swiper-slide>
              </PostsCarousel>
            </ClientOnly>
          </div>
        </Container>
      </div>
      <div v-if="post.acf.spotlights&&post.acf.spotlights.length">
        <SpotlightText :layout="{columns: post.acf.spotlights}" />
      </div>
    </footer>
  </article>
</template>

<script>
export default {
  name: 'Post',
  props: {
    post: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    uniqueId () {
      return this._uid
    }
  }
}
</script>

<style>

.blog-article__header__cover {
  @apply relative;
}

.blog-article__header__cover::before {
  @apply block;

  content: " ";
  padding-top: 100%;
}

@media only screen and (min-width: 768px) {
  .blog-article__header__cover::before {
    padding-top: 35%;
  }
}

.blog-article__header__cover--mobile-image::before {
  @apply hidden;
}

@media only screen and (min-width: 768px) {
  .blog-article__header__cover--mobile-image::before {
    @apply block;
  }
}

.blog-article__header__title {
  @apply py-10;
}

.blog-article__header__back {
  @apply font-medium text-purple text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-4 block;
}

.blog-article__header__back__arrow {
  @apply font-light text-2xl lg:text-4xl xl:text-6xl;
}

.blog-article__header ul {
  @apply flex space-x-4 list-none px-0 mx-0 py-5 my-5 border-t-4 border-b-4 border-dotted border-white;
}

.blog-article__header ul li {
  @apply font-medium text-xl md:text-2xl lg:text-3xl xl:text-4xl;
}

.blog-article__header ul li a {
  @apply font-serif_italic_alt font-normal;
}

.blog-article__header ul li::after {
  @apply inline-block rounded-full w-5 h-5 bg-purple ml-2;
  content: " ";
}

.blog-article__header ul li:last-child::after {
  @apply hidden;
}

.blog-article__header cite,
.blog-article__header p {
  @apply text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium not-italic block mt-10;
}

.blog-article__header cite a {
  @apply text-purple;
}

.blog-article__content {
  @apply lg:text-xl max-w-6xl mx-auto py-10;
}

.blog-article__content strong {
  @apply font-medium;
}

.blog-article__content p {
  @apply mb-5;
}

.blog-article__content h1 {
  @apply text-3xl md:text-5xl lg:text-6xl xl:text-7xl mb-10;
}

.blog-article__content h2 {
  @apply text-2xl lg:text-4xl xl:text-5xl mb-10;
}

.blog-article__content h3 {
  @apply text-xl lg:text-3xl mb-5;
}

.blog-article__content h4 {
  @apply text-lg md:text-xl lg:text-2xl xl:text-3xl mb-5 font-serif_italic_alt;
}

.blog-article__content h5 {
  @apply text-base md:text-lg lg:text-xl xl:text-2xl mb-5 font-normal;
}

.blog-article__content h6 {
  @apply lg:text-xl font-serif_italic font-normal mb-5;
}

.blog-article__content blockquote {
  @apply my-10 pl-10 text-lg lg:text-2xl border-l-4 border-dotted;
}

.blog-article__content blockquote strong {
  @apply block text-right font-normal mt-5;
}

.blog-article__content a {
  @apply text-purple font-medium;
}

.blog-article__content img {
  @apply max-w-full;
}

.blog-article__content figure,
.blog-article__content .wp-video,
.blog-article__content .poster-video,
.blog-article__content .iframe-wrapper {
  @apply my-20 max-w-full;
}

.blog-article__content figure img,
.blog-article__content .wp-video video,
.blog-article__content .poster-video img,
.blog-article__content .poster-video video{
  @apply w-full h-auto block max-w-10xl mx-auto float-none;
}

.blog-article__content figure.alignnone,
.blog-article__content .wp-video,
.blog-article__content .poster-video,
.blog-article__content .iframe-wrapper {
  @apply relative left-1/2 right-1/2;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw !important;
}

.blog-article__content .iframe-wrapper__inside {
  @apply max-w-10xl mx-auto relative;
}

.blog-article__content .iframe-wrapper__inside::before {
  @apply block w-full;
  padding-top: 56%;
  content: " ";
}

.blog-article__content figcaption {
  @apply font-serif text-xs p-2 max-w-10xl mx-auto;
}

.blog-article__content .alignright {
  @apply float-right p-5 w-1/2;
}

.blog-article__content .alignleft {
  @apply float-left p-5 w-1/2;
}

.poster-video__inside {
  @apply relative max-w-10xl mx-auto aspect-w-16 aspect-h-7 overflow-hidden;
}

.poster-video__inside::before {
  @apply absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-20 block pointer-events-none opacity-100 transition-opacity duration-200;
  width: 118px;
  height: 107px;
  background: url('~/assets/play-icon.svg') no-repeat center center;
  background-size: 100% 100%;
  content: " ";
}

.poster-video__inside.playing::before {
  @apply opacity-0;
}

.poster-video img {
  @apply absolute top-0 left-0 w-full h-full z-10 p-0 block object-cover transition-transform duration-300;
  padding: 0 !important;
  height: 100% !important;
  max-width: 100% !important;
}

.poster-video__inside.playing img {
  @apply transform translate-y-full;
}

.poster-video video,
.poster-video .wp-video,
.blog-article__content .iframe-wrapper iframe {
  @apply absolute top-0 left-0 block w-full h-full z-0 object-cover mx-0 right-0 m-0;
  width: 100% !important;
  height: 100% !important;
}

.blog-article__content .iframe-wrapper iframe {
  @apply pointer-events-none;
}

.blog-article__content .iframe-wrapper.playing iframe {
  @apply pointer-events-auto;
}

.blog-article__footer__inside {
  @apply py-5 my-10 border-t-4 border-b-4 border-dotted;
}

.blog-article__footer__inside ul {
  @apply list-none flex space-x-4 font-serif_italic text-sm;
}
</style>
