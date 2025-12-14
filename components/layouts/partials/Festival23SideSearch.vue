<template>
  <form @submit.prevent="handleSearch">
    <div class="flex space-x-2 w-full justify-between">
      <Festival23Box :x-small="true" class="w-full" :bg="`bg-${sectionColour}`">
        <input
          v-model="searchQuery"
          class="absolute top-0 left-0 px-4 py-1 block w-full h-full z-10 bg-transparent text-black placeholder-black"
          type="text"
          name="_search"
          placeholder="Search here..."
          @keyup="maybeHandleSearch"
        >
      </Festival23Box>
      <button class="flex-shrink-0" type="submit">
        <svg class="w-12 h-12 block">
          <use xlink:href="#icon-search-boxed" />
        </svg><span class="sr-only">Search</span>
      </button>
    </div>
  </form>
</template>

<script>
import updateRouteQuery from '~/mixins/updateRouteQuery'
import festival23SectionColors from '~/mixins/festival23SectionColors'

export default {
  name: 'Festival23SideSearch',
  mixins: [updateRouteQuery, festival23SectionColors],
  data () {
    return {
      searchQuery: null,
      timeout: null
    }
  },
  watch: {
    '$route.query' (to) {
      if (to) {
        this.$nextTick(() => {
          this.setValueFromQuery()
        })
      }
    }
  },
  beforeDestroy () {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.setValueFromQuery()
    })
  },
  methods: {
    handleSearch () {
      this.updateQueryVar('_search', this.searchQuery)
    },
    maybeHandleSearch () {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }

      this.timeout = setTimeout(this.handleSearch, 3000)
    },
    setValueFromQuery () {
      if (!this.$route.query) {
        this.searchQuery = null

        return
      }
      if (this.$route.query._search) {
        this.searchQuery = this.$route.query._search
      } else {
        this.searchQuery = null
      }
    }
  }
}
</script>

<style scoped>

</style>
