<template>
  <div v-if="items&&items.length" class="rounded-3xl w-full p-6 lg:p-8" :class="($store.state.theme === 'bsf13' ? 'border' : backgroundStyle)">
    <div class="flex justify-between">
      <Festival24Heading :layout="{heading: layout.heading}" />
      <Festival24Button class="hidden lg:block" to="/festival/news">
        <span v-html="layout.view_all_button_label" />
      </Festival24Button>
    </div>
    <div class="hidden lg:grid lg:grid-cols-2">
      <div>
        <article v-for="(post, index) in items" class="py-7 last:pb-0 border-b last:border-b-0" :Key="`newsPost${post.id}`" @mouseover="updateHoveredIndex(index)">
          <SiteLink :to="post.permalink|replaceSiteUrl">
            <h2 class="text-3xl leading-10 font-normal pb-4" v-html="post.title.rendered" />
          </SiteLink>
          <SiteLink class="underline text-lg font-normal decoration-[0.5px] underline-offset-2" :to="post.permalink|replaceSiteUrl">
            Read More
          </SiteLink>
        </article>
      </div>
      <div class="relative">
        <div v-for="(post, idx) in items" :key="`newsPost${post.id}`" class="lg:pl-12 top-0 absolute w-full h-full" :class="hoveredArticleIndex === idx ? 'z-10' : ''">
          <SiteLink :to="post.permalink | replaceSiteUrl">
            <div class="[&>img]:rounded-3xl [&>img]:object-cover aspect-w-16 aspect-h-10 [&>img]:h-full [&>img]:w-full  h-full w-full object-cover transition-all duration-300" :class="`${($store.state.theme==='bsf13' ? ' [&>img]:border ' : '')} ${(hoveredArticleIndex === idx ? 'opacity-100' : 'opacity-0')}`" v-html="post.featured_image_rendered" />
          </SiteLink>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap lg:hidden">
      <SiteLink class="w-full pt-8 pb-4" :to="items[0]?.permalink|replaceSiteUrl">
        <div class="[&>img]:rounded-xl [&>img]:border-black [&>img]:object-cover aspect-w-16 aspect-h-10 [&>img]:h-full [&>img]:w-full h-full w-full object-cover" :class="{'[&>img]:border': $store.state.theme==='bsf13'}" v-html="items[0]?.featured_image_rendered" />
      </SiteLink>
      <div class="lg:pr-14">
        <article class="py-4">
          <SiteLink :to="items[0]?.permalink|replaceSiteUrl">
            <h2 class="text-2xl underline font-normal pb-4" v-html="items[0]?.title.rendered" />
          </SiteLink>
        </article>
      </div>
    </div>
    <Festival24Button class="lg:hidden" to="/festival/news">
      <span v-html="layout.view_all_button_label" />
    </Festival24Button>
  </div>
</template>

<script>
import layout from '~/mixins/layout'
import livedata from '~/mixins/livedata'

export default {
  name: 'Festival24LatestNews',
  mixins: [layout, livedata],
  data () {
    return {
      hoveredArticleIndex: 0
    }
  },
  async fetch () {
    const response = await this.$axios.get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/festival-post?per_page=${this.layout.items}&orderby=sticky&year=2025`)
    this.items = this.items.concat(response.data)
  },
  methods: {
    updateHoveredIndex (index) {
      this.hoveredArticleIndex = index
    }
  },
  computed: {
    backgroundStyle () {
      if (this.layout.background) {
        if (this.layout.gradient_style && this.layout.gradient_style !== 'none') {
          if (this.layout.gradient_style === 'top') {
            return `bg-gradient-to-b from-${this.layout.background.replace('Tint', '')}Tint to-${this.layout.background.replace('Tint', '')}`
          }

          return `bg-gradient-to-t from-${this.layout.background.replace('Tint', '')}Tint to-${this.layout.background.replace('Tint', '')}`
        }

        return `bg-${this.background}`
      }

      return ''
    }
  }
}
</script>

<style scoped>

</style>
