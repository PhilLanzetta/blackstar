<template>
  <Container>
    <Space :md="true" />
    <CircleButton v-if="layout.link" :to="layout.link.url|replaceSiteUrl" :color-scheme="layout.colour">
      <span v-html="layout.link.title" />
    </CircleButton>
    <Space :sm="true" />
    <div v-if="layout.type !== 'custom' && layout.type !== 'manual' && items && items.length" class="lg:flex items-start justify-between space-y-10 lg:space-y-0 lg:space-x-20">
      <div v-for="item in items" :key="`featuredItem${(item.id ? item.id : item.ID)}`" class="lg:w-1/2">
        <ListingPostLarge v-if="item.type!=='program-event'" :post="item" :color-scheme="layout.colour" />
        <ListingArticleEvent v-if="item.type==='program-event'" :post="item" :color-scheme="layout.colour" :large="true" :square="false" />
      </div>
    </div>
    <div v-if="layout.type === 'manual'" class="lg:flex items-start justify-between space-y-10 lg:space-y-0 lg:space-x-20">
      <div v-for="item in layout.posts" :key="`featuredItem${(item.id ? item.id : item.ID)}`" class="lg:w-1/2">
        <ListingPostLarge v-if="item.type!=='program-event'" :post="item" :color-scheme="layout.colour" />
        <ListingArticleEvent v-if="item.type==='program-event'" :post="item" :color-scheme="layout.colour" :large="true" :square="false" />
      </div>
    </div>
    <div v-if="layout.type === 'custom'" class="lg:flex items-start justify-between space-y-10 lg:space-y-0 lg:space-x-20">
      <div v-for="(customItem, customItemKey) in layout.custom_posts" :key="`customItem${customItemKey}`" class="lg:w-1/2">
        <article class=" select-none">
          <SiteLink v-if="customItem.buttons&&customItem.buttons.length" :to="customItem.buttons[0].link.url|replaceSiteUrl">
            <RoundedImage shape="rectangle">
              <span v-html="customItem.image"></span>
            </RoundedImage>
          </SiteLink>
          <header class="mt-4">
            <h1 class="secondary-heading mb-1" v-html="customItem.title">
            </h1>
          </header>

          <p class="font-serif text-sm mt-4" v-html="customItem.short_description">
          </p>

          <footer class="flex space-x-4 mt-8" v-if="customItem.buttons&&customItem.buttons.length">
            <PillButton v-for="(button, buttonKey) in customItem.buttons" :key="`customItemButton${buttonKey}`" :to="button.link.url|replaceSiteUrl" :color-scheme="layout.colour">
              <span v-html="button.link.title"></span>
            </PillButton>
          </footer>
        </article>
      </div>
    </div>
    <Space :lg="true" />
  </Container>
</template>

<script>
import layout from '~/mixins/layout'
import livedata from '~/mixins/livedata'
import ListingArticleEvent from '~/components/layouts/partials/ListingArticleEvent'

export default {
  name: 'FeaturedPosts',
  components: { ListingArticleEvent },
  mixins: [layout, livedata],
  async fetch () {
    if (this.layout.type !== 'custom' && this.layout.type !== 'manual') {
      let filter = ''
      if (this.layout.type === 'program-event' && this.layout.program_event_type) {
        filter = `&program-type=${this.layout.program_event_type}`
      }
      if (this.layout.type === 'post' && this.layout.post_category) {
        filter = `&categories=${this.layout.post_category}`
      }
      this.items = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/${this.layout.type}?per_page=2&parent=0${filter}`)
    }
  }
}
</script>

<style scoped>

</style>
