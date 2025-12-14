<template>
  <div>
    <Container>
      <div v-if="layout.type==='types'">
        <ul class="flex flex-wrap -mx-1">
          <li v-for="type in layout.types" :key="`type${type.term_id}`" class="p-1">
            <Festival23Button
              :inverse="!(activeType&&activeType.term_id===type.term_id)"
              :click-handler="() => { activeType=type }"
            >
              <span v-html="type.name" />
            </Festival23Button>
          </li>
        </ul>
        <ul v-if="activeType&&activeType.show_filters&&filters&&filters.length" class="flex flex-wrap -mx-1 my-4">
          <li
            v-for="filter in filters"
            :key="`filter${filter.id}`"
            class="p-1"
          >
            <Festival23HeaderNavItem
              :active="activeFilter&&activeFilter.id===filter.id"
              :click-handler="() => { toggleActiveFilter(filter) }"
            >
              {{ filter.name }}
            </Festival23HeaderNavItem>
          </li>
        </ul>
      </div>
      <div class="flex -mx-2 lg:-mx-4 flex-wrap">
        <div
          v-for="(bio, key) in bios"
          :key="`bio${bio.id}`"
          class="px-2 py-4 lg:p-4 w-1/2 lg:w-1/3 xl:w-1/4"
        >
          <Festival23Bio
            :team-member="bio"
            :index="key"
            :show-photo="true"
            :event-id="eventId"
            :active="teamMember&&teamMember.id===bio.id"
            :click-handler="(((bio.content&&bio.content.rendered)||bio.post_content)&&(!activeType||(activeType&&activeType.show_bios)) ? () => { setActiveBio(bio) } : null)"
          />
        </div>
      </div>

      <div v-if="items&&page<totalPages&&layout.type!=='curated'" class="flex mt-8 justify-center">
        <Festival23Button to="#" :click-handler="loadMore">
          Load More
        </Festival23Button>
      </div>
    </Container>
  </div>
</template>

<script>
import layout from '~/mixins/layout'
import livedata from '~/mixins/livedata'
import bios from '~/mixins/bios'

export default {
  name: 'Festival23Bios',
  mixins: [layout, livedata, bios],
  props: {
    defaultEventId: {
      type: Number,
      required: false,
      default: null
    }
  },
  data () {
    return {
      page: 1,
      totalPages: 1,
      items: [],
      activeType: (this.layout.type === 'types' ? this.layout.types[0] : null),
      filters: null,
      activeFilter: null
    }
  },
  async fetch () {
    let queryString = ''

    if (this.layout.type === 'collection') {
      queryString += `&bio-collection=${this.layout.collection}`
    }

    if (this.layout.type === 'types') {
      if (!this.activeType) {
        this.activeType = this.layout.types[0]
      }
      queryString += `&festival-team-type=${this.activeType.term_id}`

      if (this.activeFilter && this.activeType.show_filters) {
        queryString += `&festival-team-filter=${this.activeFilter.id}`
      }
    }

    if (parseInt(this.itemsPerPage) <= 100) {
      queryString += `&per_page=${this.itemsPerPage}&page=${this.page}`
    } else {
      queryString += '&routes=1'
    }

    const response = await this.$axios.get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/biography?order=asc&orderby=menu_order${queryString}`)
    this.items = this.items.concat(response.data)
    this.totalPages = parseInt(response.headers['x-wp-totalpages'])

    if (this.layout.type === 'types' && this.activeType && this.activeType.show_filters && !this.filters) {
      this.filters = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/festival-team-filter`)
    }
  },
  computed: {
    bios () {
      if (this.layout.type === 'curated') {
        return this.layout.bios
      }

      return this.items
    },
    eventId () {
      if (this.layout.type !== 'types' && this.layout.associated_event) {
        return this.layout.associated_event
      }

      return this.defaultEventId
    },
    itemsPerPage () {
      if (this.layout && this.layout.items_per_page) {
        return this.layout.items_per_page
      }

      return 8
    }
  },
  watch: {
    activeType () {
      this.filter()
    },
    activeFilter () {
      this.filter()
    }
  },
  methods: {
    loadMore () {
      this.page++
      this.$fetch()
    },
    filter () {
      this.$nextTick(() => {
        this.page = 1
        this.items = []
        this.$fetch()
      })
    },
    toggleActiveFilter (filter) {
      if (this.activeFilter && this.activeFilter.id === filter.id) {
        this.activeFilter = null
        return
      }

      this.activeFilter = filter
    },
    setActiveBio (bio) {
      this.teamMember = bio
      this.$store.commit('festival/setActiveBio', { bio: this.teamMember, eventId: this.eventId })
    }
  }
}
</script>

<style scoped>

</style>
