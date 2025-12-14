<template>
  <div class="flex space-x-2 pointer-events-auto">
    <button v-for="(page, key) in pages" :key="`swiperPag${key}`" @click.prevent="() => { goToPage(key) }">
      <svg v-if="activePage===key">
        <use xlink:href="#icon-pag-bullet-solid" />
      </svg>
      <svg v-else class="block w-4 h-4">
        <use xlink:href="#icon-pag-bullet" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Festival23Pagination',
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
svg {
  @apply block w-3 h-3 md:w-4 md:h-4;
}
</style>
