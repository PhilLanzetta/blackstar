<template>
  <div class="relative last:pb-96 rounded-section pt-12 lg:pt-16">
    <Festival24Section class="pt-12 lg:pt-16" :section="{background: post.acf.background, gradient_style: post.acf.gradient_style, layouts: [], style: 'contained'}" :extra-padding="true">
        <div class="container max-w-screen-2xl mx-auto px-4 sm:px-8" :class="{'pb-20': initialPage<=1}">
          <Festival24Heading :layout="{heading: (post.acf.custom_title ? post.acf.custom_title : post.title.rendered)}" />
          <p v-if="post.content.rendered&&initialPage<=1" class="pt-2 lg:w-1/2 text-lg" v-html="post.content.rendered" />
        </div>
        <article v-if="featured" class="lg:grid lg:grid-cols-12 featured-gap p-6 rounded-3xl" :class="($store.state.theme === 'bsf13' ? 'border' : innerBackground)">
          <div class="rounded-3xl col-span-12 lg:col-span-5 flex flex-col justify-between">
            <div class="lg:hidden h-full rounded-xl overflow-hidden" :class="{'border': $store.state.theme === 'bsf13'}">
              <div class=" [&>img]:object-cover aspect-w-16 aspect-h-10 [&>img]:h-full [&>img]:w-full object-cover" v-html="featured.featured_image_rendered" />
            </div>
            <div class="pt-6 lg:pt-0">
              <p v-if="featured.acf.type" class="pb-1">
                {{ featured.acf.type }}
              </p>
              <h2 class="text-3xl font-normal pb-4">
                <SiteLink :to="featured.permalink|replaceSiteUrl">
                  <span v-html="featured.title.rendered" />
                </SiteLink>
              </h2>
              <p v-if="featured.date&&featured.acf.show_date" class="font-medium text-base">
                {{ featured.date|formatDateAltShort }}
              </p>
              <div class="flex flex-wrap pt-6 lg:pt-8">
                <div class="w-full pb-8">
                  <p v-if="featured.excerpt.rendered" class="text-lg" v-html="featured.excerpt.rendered" />
                </div>
              </div>
            </div>
            <div class="flex justify-start">
              <Festival24Button :to="featured.permalink|replaceSiteUrl" :target="(featured.acf.redirect_to ? '_blank' : '_self')">
                Read more
              </Festival24Button>
            </div>
          </div>
          <div class="hidden lg:block h-full col-span-7 rounded-xl overflow-hidden relative" :class="{'border': $store.state.theme === 'bsf13', 'bg-black': $store.state.theme === 'bsf14'}">
            <div class="lg:h-full [&>img]:object-cover aspect-w-16 aspect-h-10 [&>img]:h-full [&>img]:w-full object-cover" v-html="featured.featured_image_rendered" />
            <SiteLink :to="featured.permalink|replaceSiteUrl" class-names="block absolute top-0 left-0 w-full h-full">
              <span class="sr-only">Read more</span>
            </SiteLink>
          </div>
        </article>
        <Space />
        <Space />
        <Space />
    <template v-if="news&&news.length">
      <div class="grid-layout">
        <article v-for="item in news" :key="`post${item.id}`" class="relative flex flex-wrap flex-col border-inherit rounded-3xl w-full p-6" :class="($store.state.theme === 'bsf13' ? 'border' : innerBackground)">
          <div class="rounded-xl overflow-hidden [&>img]:object-cover aspect-w-16 aspect-h-10 !h-min w-full" :class="{'border': $store.state.theme === 'bsf13', 'bg-black': $store.state.theme === 'bsf14'}">
            <SiteLink :to="item.permalink|replaceSiteUrl" class-names="block w-full h-full cover-images">
              <span class="[&>img]:h-full [&>img]:w-full [&>img]:object-cover" v-html="item.featured_image_rendered" />
            </SiteLink>
          </div>
          <div class="pt-6">
            <p v-if="item.acf.type" class="pb-1">
              {{ item.acf.type }}
            </p>
            <SiteLink :to="item.permalink|replaceSiteUrl">
              <h2 class="text-3xl font-normal" v-html="item.title.rendered" />
            </SiteLink>
            <p v-if="item.date&&post.acf.show_date" class="font-medium pt-2">
              {{ item.date|formatDateAltShort }}
            </p>
            <p class="pb-4 pt-6" v-html="item.excerpt.rendered" />
          </div>
          <Festival24Button class="mt-auto" :to="item.permalink|replaceSiteUrl" :target="(item.acf.redirect_to ? '_blank' : '_self')">
            Read more
          </Festival24Button>
        </article>
      </div>
      <div v-if="page<totalPages" class="w-full flex justify-center load-more">
        <Festival24Button v-if="page<totalPages" :click-handler="loadMore" modifier="solid" class="flex-shrink-0">
          {{ loadMoreLabel }}
        </Festival24Button>
      </div>
      <div v-if="totalPages>1" class="sr-only">
        <a v-if="page>2" :href="`/festival/news/page/${page-1}`">Previous Page</a>
        <a v-if="totalPages>page" :href="`/festival/news/page/${page+1}`">Next Page</a>
      </div>
    </template>
    <template v-else>
      <p>Sorry, no news found.</p>
      <Space />
      <p>
        <Festival24Button to="/festival/news/">
          View all news
        </Festival24Button>
      </p>
    </template>
    <Space />
    <Space />
    <Space />
    </Festival24Section>

  </div>
</template>

<script>
import hasFestivalTabs from '~/mixins/hasFestivalTabs'
import livedata from '~/mixins/livedata'

export default {
  name: 'FestivalNewsArchivePage',
  mixins: [hasFestivalTabs, livedata],
  props: {
    post: {
      type: Object,
      required: true
    },
    initialPage: {
      type: Number,
      required: false,
      default: 1
    }
  },
  data () {
    return {
      page: this.initialPage,
      total: 0,
      totalPages: 1
    }
  },
  async fetch () {
    try {
      const response = await this.$axios.get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/festival-post?per_page=7&page=${this.page}&orderby=featured&year=2025`)
      this.items = this.items.concat(response.data)
      this.totalPages = parseInt(response.headers['x-wp-totalpages'])
      this.total = parseInt(response.headers['x-wp-total'])
    } catch (e) {
      // console.log(e)
    }
  },
  computed: {
    loadMoreLabel () {
      if (this.$fetchState.pending) {
        return 'One moment'
      }

      return 'Load More'
    },
    featured () {
      if (!this.items.length || this.initialPage > 1) {
        return false
      }

      return this.items[0]
    },
    news () {
      const allItems = [...this.items]
      if (this.initialPage > 1) {
        return allItems
      }
      allItems.shift()
      return allItems
    },
    innerBackground () {
      if (this.post.acf.inner_background) {
        if (this.post.acf.inner_gradient_style && this.post.acf.inner_gradient_style !== 'none') {
          if (this.post.acf.inner_gradient_style === 'top') {
            return `bg-gradient-to-b from-${this.post.acf.inner_background.replace('Tint', '')}Tint to-${this.post.acf.inner_background.replace('Tint', '')}`
          }

          return `bg-gradient-to-t from-${this.post.acf.inner_background.replace('Tint', '')}Tint to-${this.post.acf.inner_background.replace('Tint', '')}`
        }

        return `bg-${this.post.acf.inner_background}`
      }
      return ''
    }
  },
  methods: {
    loadMore () {
      if (this.$fetchState.pending) {
        return
      }

      this.page++
      this.$fetch()
    }
  }
}
</script>

<style scoped>
.grid-layout {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-10 lg:gap-y-12
}

.featured-gap {
  @apply gap-16
}

.load-more {
  @apply pt-11 pb-0 lg:pt-20 lg:pb-16
}
</style>
