<template>
  <div v-if="filters.length">
    <button class="text-base flex w-full justify-between items-center border-b-2 border-inherit py-3 space-x-4" @click.prevent="expanded=!expanded">
      <span><span class="sr-only">Toggle </span><span v-html="label" /><span class="sr-only"> Filters</span></span>  <svg class="w-6 h-5 block transform transition-transform duration-300" :class="{'rotate-180': expanded}">
        <use xlink:href="#icon-arrow-down" />
      </svg>
    </button>
    <ul v-if="expanded" class="py-4 border-b-2 border-inherit mb-4" :class="{'has-active-filters': activeFilters.length}">
      <li v-for="filter in filters" :key="`filter${filter.id}`" class="my-0.5" :class="{'active': activeFilters.includes(filter.id.toString())}">
        <label :for="`${name}${filter.id}`" class="flex items-center justify-between py-0.5 hover:opacity-80 cursor-pointer"><span v-if="activeFilters.includes(filter.id.toString())" class="sr-only">Remove </span><span v-else class="sr-only">Add </span><span class="mr-2 filter-name" v-html="filter.name" /> <svg v-if="activeFilters.includes(filter.id.toString())" class="w-3 h-3 block">
          <use xlink:href="#icon-close" />
        </svg></label> <input
          :id="`${name}${filter.id}`"
          class="sr-only"
          type="checkbox"
          :name="`${name}[]`"
          :checked="activeFilters.includes(filter.id.toString())"
          :value="filter.id"
          @change="() => setActiveFilter(filter)"
        >
      </li>
    </ul>
  </div>
</template>

<script>
import updateRouteQuery from '~/mixins/updateRouteQuery'

export default {
  name: 'Festival23FilterGroup',
  mixins: [updateRouteQuery],
  props: {
    label: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      filters: [],
      expanded: false
    }
  },
  async fetch () {
    const config = this.$axiosConfig.config

    if (this.$store.state.liveData && this.$store.state.liveDataNonce) {
      config.withCredentials = true
      config.headers = { 'X-WP-Nonce': this.$route.query.nonce }
    }

    try {
      const filters = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/${this.name}?per_page=99&_year=2023`, config)
      if (filters) {
        this.filters = filters.filter((filter) => {
          if (this.$store.state.liveData && this.$store.state.liveDataNonce) {
            return !filter.hide_from_schedule
          }

          return !filter.hide_from_schedule && filter.count
        })
      }
    } catch (e) {
      // console.log(e)
    }
  },
  computed: {
    activeFilters () {
      if (!this.$route.query) {
        return []
      }

      if (!this.$route.query[this.name]) {
        return []
      }

      return this.$route.query[this.name].split(',')
    }
  },
  watch: {
    '$route.query' (to) {
      this.$nextTick(() => {
        if (this.activeFilters.length) {
          this.expanded = true
        } else {
          this.expanded = false
        }
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.activeFilters.length) {
        this.expanded = true
      } else {
        this.expanded = false
      }
    })
  },
  methods: {
    setActiveFilter (filter) {
      let filters = this.activeFilters
      if (filters.includes(filter.id.toString())) {
        filters = filters.filter((currentFilter) => {
          return currentFilter.toString() !== filter.id.toString()
        })
      } else {
        filters.push(filter.id)
      }
      this.updateQueryVar(this.name, filters.join(','))
    }
  }
}
</script>

<style scoped>
li {
  @apply transition-opacity duration-300;
}

.has-active-filters li {
  @apply opacity-60;
}

.has-active-filters li.active {
  @apply opacity-100;
}

li label:hover .filter-name {
  @apply underline;
}
</style>
