<template>
  <form class="relative group" @submit.prevent="handleSearch">
    <input
      v-model="searchQuery"
      class="border-b border-inherit bg-transparent text-inherit placeholder-inherit w-full block py-3 pr-20 font-medium focus:outline-none rounded-none focus:border focus:px-4"
      type="text"
      name="_search"
      placeholder="Search for..."
      @keyup="maybeHandleSearch"
    >
    <button class="block absolute top-1/2 right-0 transform -translate-y-1/2 group-focus-within:right-4" type="submit">
      <svg class="w-6 h-6 block">
        <use xlink:href="#icon-search" />
      </svg><span class="sr-only">Search</span>
    </button>
  </form>
</template>

<script>
import updateRouteQuery from '~/mixins/updateRouteQuery'

export default {
  name: 'Festival24FilterSearch',
  mixins: [updateRouteQuery],
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
