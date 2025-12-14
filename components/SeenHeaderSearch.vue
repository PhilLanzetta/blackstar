<template>
  <div class="py-3 lg:py-6 border-t border-black relative z-30">
    <form class="max-w-lg mx-auto flex space-x-4 items-center" @submit.prevent="handleSearch">
      <input
        ref="searchInput"
        v-model="search"
        type="text"
        name="search"
        placeholder="Search"
        autocomplete="seensearch"
        class="flex-shrink py-2 px-4 w-full font-seen_serif_light text-xl lg:text-2xl focus:outline-none placeholder:text-black"
        v-cursor-interact
        @keyup="maybeHandleSearch"
      > <button class="flex-shrink-0 w-10 h-10 mr-3 ml-auto" type="submit" v-cursor-interact>
        <img src="~/assets/seen/search.svg" class="block w-full h-full" alt="">
        <span class="sr-only">Search</span>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SeenHeaderSearch',
  data () {
    return {
      search: null,
      searchTimeout: null
    }
  },
  beforeDestroy () {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.searchInput.focus()
    })
  },
  methods: {
    handleSearch () {
      if (!this.search) {
        return
      }

      this.$router.push(`/seen/read/?search=${this.search}`)
    },
    maybeHandleSearch () {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }

      this.searchTimeout = setTimeout(this.handleSearch, 1000)
    }
  }
}
</script>

<style scoped>

</style>
