<template>
  <div>
    <section class="bg-purple">
      <ScrollMarquee symbol="arrows-down" word2="Events" word1="What's On" force-colour="black" />
    </section>
    <Container>
      <div v-if="filters&&filters.length" class="flex flex-wrap pt-10 mb-10 lg:mb-0">
        <CircleButton
          :class="(activeFilter !== null ? `opacity-30 mr-10 mb-10` : 'mr-10 mb-10')"
          to="/news"
          color-scheme="black"
          :force-scheme="true"
        >
          <span>All Events</span>
        </CircleButton>
        <CircleButton
          v-for="filter in filters"
          :key="`filter${filter.id}`"
          :class="(activeFilter && activeFilter.id !== filter.id ? `opacity-30 mr-10 mb-10` : 'mr-10 mb-10')"
          :to="`/events/${filter.slug}`"
          color-scheme="black"
          :force-scheme="true"
        >
          <span v-html="filter.name" />
        </CircleButton>
      </div>

      <div class="post-grid">
        <div v-for="post in posts" :key="`post${post.id}`" class="post-grid__item">
          <ListingPost :large="true" :post="post" color-scheme="black" />
        </div>
      </div>

      <div class="flex justify-center py-20 text-black">
        <site-link v-if="totalPages>currentPage" v-cursor-interact :to="`/events/${(activeFilter ? `${activeFilter.slug}/` : '')}page/${currentPage+1}`">
          <Spinner text="Next Page" />
        </site-link>
      </div>
    </Container>
    <Space />
    <Space />
  </div>
</template>

<script>
export default {
  name: 'EventsArchive',
  props: {
    posts: {
      type: Array,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    activeFilter: {
      type: Object,
      required: false,
      default: null
    }
  },
  data () {
    return {
      filters: []
    }
  },
  async fetch () {
    this.filters = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/program-type?routes=1&hide_empty=true`)
  }
}
</script>

<style scoped>
.post-grid {
  @apply flex flex-wrap md:-mx-10;
}

.post-grid__item {
  @apply w-full md:w-1/2 lg:w-1/3 md:p-10 mb-10 md:mb-0;
}
</style>
