<template>
  <div class="lg:w-2/3">
    <div v-if="megaNav.featured_items.type && megaNav.featured_items.type !== 'custom' && megaNav.featured_items.type !== 'manual' && items && items.length" class="meganav__items__grid">
      <div v-for="item in items" :key="`featuredItem${(item.id ? item.id : item.ID)}`" class="meganav__items__grid__item">
        <ListingPostLarge v-if="item.type!=='program-event'" :post="item" :color-scheme="colorScheme" :force-scheme="true" />
        <ListingArticleEvent
          v-if="item.type==='program-event'"
          :post="item"
          :color-scheme="colorScheme"
          :force-scheme="true"
          :large="true"
          :square="false"
        />
      </div>
    </div>
    <div v-if="megaNav.featured_items.type && megaNav.featured_items.type === 'manual'" class="meganav__items__grid">
      <div v-for="item in megaNav.featured_items.posts" :key="`featuredItem${(item.id ? item.id : item.ID)}`" class="meganav__items__grid__item">
        <ListingPostLarge v-if="item.type!=='program-event'" :post="item" :color-scheme="colorScheme" :force-scheme="true" />
        <ListingArticleEvent
          v-if="item.type==='program-event'"
          :post="item"
          :color-scheme="colorScheme"
          :force-scheme="true"
          :large="true"
          :square="false"
        />
      </div>
    </div>
    <div v-if="megaNav.featured_items.type&&megaNav.featured_items.type === 'custom'" class="meganav__items__grid">
      <div v-for="(customItem, customItemKey) in megaNav.featured_items.custom_posts" :key="`customItem${customItemKey}`" class="meganav__items__grid__item">
        <ListingCustom :custom-item="customItem" :color-scheme="colorScheme" :force-scheme="true" :square="false" :large="true" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MegaNavFeatureItems',
  props: {
    megaNav: {
      type: Object,
      required: true
    },
    loadCallback: {
      type: Function,
      required: false,
      default: null
    }
  },
  data () {
    return {
      items: null,
      busy: false
    }
  },
  computed: {
    colorScheme () {
      if (this.$store.state.theme === 'bsf11') {
        return 'bsf11Purple'
      }

      return 'purple'
    }
  },
  mounted () {
    this.loadItems()
  },
  methods: {
    loadItems () {
      if (this.megaNav.featured_items.type && this.megaNav.featured_items.type !== 'custom' && this.megaNav.featured_items.type !== 'manual') {
        if (this.busy) {
          return
        }

        this.busy = true
        let filter = ''
        if (this.megaNav.featured_items.type === 'program-event' && this.megaNav.featured_items.program_event_type) {
          filter = `&program-type=${this.megaNav.featured_items.program_event_type}`
        }
        if (this.megaNav.featured_items.type === 'post' && this.megaNav.featured_items.post_category) {
          filter = `&category=${this.megaNav.featured_items.post_category}`
        }
        this.$axios.get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/${this.megaNav.featured_items.type}?per_page=2&parent=0${filter}`).then((response) => {
          this.items = response.data
          this.busy = false
          this.$nextTick(() => {
            if (this.loadCallback) {
              this.loadCallback()
            }
          })
        })
      }
    }
  }
}
</script>

<style>
.meganav__items__grid {
  @apply lg:flex items-start justify-between lg:space-x-20 w-full;
}

.meganav__items__grid__item {
  @apply mb-8 lg:mb-0 lg:w-1/2 text-xs 2xl:text-base;
}

.meganav__items__grid__item .secondary-heading {
  @apply text-lg 2xl:text-xl leading-tight;
}

.meganav__items__grid__item p {
  @apply hidden 2xl:block;
}

.meganav__items__grid__item .rounded-image {
  @apply max-w-xs xl:max-w-sm 2xl:max-w-md;
}
</style>
