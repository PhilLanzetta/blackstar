<template>
  <article class="seen-article">
    <header
      v-if="post.acf.cover.style==='a'||post.acf.cover.style==='b'"
      class="seen-article__header-l"
      :class="`seen-article__header-l--${post.acf.cover.style}`"
    >
      <div class="seen-article__header-l__media-wrapper">
        <SeenCoverMedia :cover="post.acf.cover"/>
      </div>
      <div class="seen-article__header-l__content-wrapper" :style="coverCustomStyles">
        <Container>
          <SeenCoverContent
            :cover="post.acf.cover"
            :title="post.title.rendered"
            :authors="post.author"
            :issue="post.issue"
            :categories="post.categories"
          />
        </Container>
      </div>
    </header>
    <header
      v-if="post.acf.cover.style==='c'||post.acf.cover.style==='d'"
      class="seen-article__header-p"
      :class="`seen-article__header-p--${post.acf.cover.style}`"
      :style="coverCustomStyles"
    >
      <Container>
        <div class="seen-article__header-p__inside">
          <div class="seen-article__header-p__media-wrapper">
            <SeenCoverMedia :cover="post.acf.cover" :cover-image="false"/>
          </div>
          <div class="seen-article__header-p__content-wrapper" :style="coverCustomStyles">
            <SeenCoverContent
              :cover="post.acf.cover"
              :title="post.title.rendered"
              :authors="post.author"
              :issue="post.issue"
              :categories="post.categories"
            />
          </div>
        </div>
      </Container>
    </header>

    <Container>
      <div v-if="post.acf.cover.caption" class="seen-article__header_caption">
        <p v-html="post.acf.cover.caption"/>
      </div>
    </Container>

    <template v-if="post.acf.introduction">
      <Space :md="true"/>
      <div class="seen-article__introduction" v-html="post.acf.introduction"/>
    </template>
    <div class="relative">
      <aside ref="shareBar">
        <Container>
          <nav class="seen-article-side-nav">
            <ul>
              <li>
                Share
              </li>
              <li>
                <a v-cursor-interact :href="twitterShareLink" target="_blank">
                  X (Twitter)
                </a>
              </li>
              <li>
                <a v-cursor-interact :href="facebookShareLink" target="_blank" @click.prevent="facebookShare">
                  Facebook
                </a>
              </li>
              <li>
                <a :href="post.link|replaceSiteUrl" target="_blank">
                  Page link
                </a>
              </li>
            </ul>
          </nav>
        </Container>
      </aside>
      <div class="hidden lg:block" :style="`margin-top: -${sideBarOffset}px`">
        &nbsp;
      </div>
      <div v-if="post.acf.layouts&&post.acf.layouts.length">
        <section v-for="(layout, layoutKey) in post.acf.layouts" :key="`seenArticleLayout${layoutKey}`">
          <Space :md="true" />
          <SeenContent v-if="layout.acf_fc_layout==='content'" :layout="layout"/>
          <SeenFullWidthMedia v-if="layout.acf_fc_layout==='full_width_media'" :layout="layout"/>
          <SeenContainedMedia v-if="layout.acf_fc_layout==='contained_media'" :layout="layout"/>
          <SeenMediaTwoColumns v-if="layout.acf_fc_layout==='media_two_columns'" :layout="layout"/>
          <SeenFootnotes  v-if="layout.acf_fc_layout==='footnotes'" :layout="layout" />
        </section>
        <Space :lg="true"/>
      </div>
      <Container v-if="post.author">
        <div v-for="author in post.author" :key="`authorBio${author.term_id}`" class="seen-article__author-bio">
          <div v-if="author.image" class="seen-article__author-bio__image" v-html="author.image"/>
          <p>Bio</p>
          <h2 v-html="author.name"/>

          <p v-html="author.description"/>

          <p class="flex justify-center"><SiteLink class="underline underline-offset-1" :to="`/seen/author/${author.slug}`">More from {{ author.name }}</SiteLink></p>
        </div>
      </Container>
    </div>
    <footer>
      <Container v-if="post.acf.related_articles&&post.acf.related_articles.length">
        <div id="related"></div>
        <Space :lg="true"/>
        <div class="lg:flex justify-between">
          <nav class="seen-article-side-nav">
            <ul>
              <li>
                Related
              </li>
              <li v-if="post.issue">
                <SiteLink :to="`/seen/read/${post.issue.slug}`">
                  More from <span v-html="post.issue.name"></span>
                </SiteLink>
              </li>
              <li v-if="post.categories&&post.categories.length">
                <SiteLink :to="`/seen/category/${post.categories[0].slug}`">
                  More  <span v-html="post.categories[0].name"></span>
                </SiteLink>
              </li>
              <template v-if="post.author&&post.author.length">
                <li v-for="author in post.author" :key="`related${author.id}`">
                  <SiteLink :to="`/seen/author/${author.slug}`">
                    More from <span v-html="author.name"></span>
                  </SiteLink>
                </li>
              </template>
            </ul>
          </nav>
          <div class="lg:flex lg:space-x-20 lg:w-9/12">
            <ListingSeenArticle
              v-for="relatedArticle in post.acf.related_articles"
              :key="`relatedArticle${relatedArticle.id}`"
              class="mb-10 lg:mb-0"
              :article="relatedArticle"
            />
          </div>
        </div>
      </Container>
      <Space :lg="true"/>
    </footer>
    <SeenFooter/>
  </article>
</template>

<script>
import ListingSeenArticle from '~/components/layouts/partials/ListingSeenArticle'

export default {
  name: 'SeenArticle',
  components: {
    ListingSeenArticle
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      sideBarOffset: 0
    }
  },
  computed: {
    coverCustomStyles () {
      return (this.post.acf.cover.background_colour ? ` background-color: ${this.post.acf.cover.background_colour}; ` : '') + (this.post.acf.cover.foreground_colour ? ` color: ${this.post.acf.cover.foreground_colour}; ` : '')
    },
    twitterShareLink () {
      return `https://twitter.com/intent/tweet?text=Read ${this.post.title.rendered} at ${this.$axiosConfig.siteUrl}${this.$options.filters.replaceSiteUrl(this.post.link)}`
    },
    facebookShareLink () {
      return `https://www.facebook.com/sharer/sharer.php?u=${this.$axiosConfig.siteUrl}${this.$options.filters.replaceSiteUrl(this.post.link)}`
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.$refs.shareBar) {
        this.sideBarOffset = this.$refs.shareBar.offsetHeight
      }
    })
  },
  methods: {
    facebookShare () {
      const left = (screen.width / 2) - (600 / 2)
      const top = (screen.height / 2) - (300 / 2)
      return window.open(this.facebookShareLink, 'Share on Facebook', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + 600 + ', height=' + 300 + ', top=' + top + ', left=' + left)
    }
  }
}
</script>

<style>
@import "~/assets/css/seen.css";

.seen-article__header-l {
  @apply flex flex-col border-b border-black;
}

.seen-article__header-l--b {
  @apply flex-col-reverse;
}

.seen-article__header-l__media-wrapper {
  @apply relative;
}

.seen-article__header-l__media-wrapper::before {
  @apply block;
  padding-top: 40%;
  content: " ";
}

.seen-article__header-l__content-wrapper {
  @apply bg-seenOrange relative z-10 text-center;
}

.seen-article__header-p {
  @apply relative bg-seenOrange border-b border-black;
}

.seen-article__header-p__inside {
  @apply flex flex-col-reverse md:flex-row items-center justify-between;
}

.seen-article__header-p__media-wrapper {
  @apply relative md:w-1/2 -mx-4 sm:-mx-8 md:mx-0 flex-shrink-0;
}

.seen-article__header-p__media-wrapper img {
  @apply block w-full h-auto;
}

.seen-article__header-p--d .seen-article__header-p__inside {
  @apply md:flex-row-reverse;
}

.seen-article__header-p__media-wrapper::before {
  @apply hidden;
}

.seen-article__header-p__content-wrapper {
  @apply relative z-0 h-auto bg-seenOrange md:w-1/2 flex-shrink-0;
}

.seen-article__header-p__content-wrapper .container {
  @apply h-auto md:flex items-center justify-end;
}

.seen-article__header-p__content-wrapper .seen-article__header-content {
  @apply w-full mx-0 py-8 md:py-16 md:pl-16 text-center;
}

.seen-article__header-p--d .seen-article__header-p__content-wrapper .seen-article__header-content {
  @apply text-left pl-0 md:pr-16;
}

.seen-article__introduction {
  @apply px-4 max-w-6xl mx-auto font-seen_serif_light font-light text-xl lg:text-2xl xl:text-3xl text-center leading-snug;
}

.seen-article__introduction strong,
.seen-article__introduction b {
  @apply font-seen_serif;
}

.seen-article__introduction em,
.seen-article__introduction i {
  @apply font-seen_serif_light_italic;
}

.seen-article__introduction strong em,
.seen-article__introduction strong i,
.seen-article__introduction b em,
.seen-article__introduction b i {
  @apply font-seen_serif_italic;
}

.seen-article figcaption {
  @apply px-2 py-4 md:px-8 lg:px-20 lg:py-6 text-sm font-sans font-light;
}

.seen-article .container figcaption {
  @apply px-0;
}

.seen-article aside {
  @apply hidden lg:block sticky top-0 pt-40 z-0 text-black pointer-events-none;
}

.seen-article-side-nav {
  @apply w-44 py-6 pt-20 font-seen_serif_light text-lg pointer-events-auto;
}

.seen-article-side-nav a {
  @apply underline;
}

.seen-article__author-bio {
  @apply max-w-md mx-auto text-center text-base lg:text-lg font-light pb-10 my-10;
}

.seen-article__author-bio p,
.seen-article__author-bio h2 {
  @apply px-8;
}

.seen-article__author-bio h2 {
  @apply text-xl lg:text-2xl xl:text-3xl font-seen_serif_light_italic;
}

.seen-article__author-bio p {
  @apply mt-8;
}

.seen-article__author-bio__image {
  @apply mb-4;
}

.seen-article__author-bio__image img {
  @apply block w-full h-auto;
}

.seen-article .sep {
  @apply inline-block w-2 h-2 rounded-full bg-black mb-0.5 mx-1;
}

.seen-article__header_caption {
  @apply w-full py-2 text-sm text-black;
}

.seen-article__header__caption p {
  @apply m-0;
}
</style>
