<template>
  <div class="flex space-x-2 pointer-events-auto">
    <button v-for="(page, key) in pages" :key="`swiperPag${key}`" class="rounded-full border border-black p-0.5 lg:p-1" @click.prevent="() => { goToPage(key) }">
      <div class="selected-item" :class="{'active': activePage===key}">
        <span class="sr-only">Page {{ (key+1) }}</span>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Festival24Pagination',
  props: {
    totalPages: {
      type: Number,
      required: false,
      default: 1
    },
    goToPage: {
      type: Function,
      required: true
    },
    activePage: {
      type: Number,
      required: false,
      default: 1
    }
  },
  computed: {
    pages () {
      let count = 0
      const pages = []
      while (this.totalPages > count) {
        count++
        pages.push('page')
      }

      return pages
    }
  }
}
</script>

<style scoped>
.selected-item {
  @apply block w-2 h-2 md:w-3 md:h-3 lg:w-5 lg:h-5 bg-transparent rounded-full;
}

.active {
  @apply bg-black;
}
</style>
