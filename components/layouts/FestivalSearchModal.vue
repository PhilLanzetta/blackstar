<template>
  <div class="fixed top-0 left-0 w-full h-full z-30 overflow-y-scroll">
    <div class="w-full h-full flex items-center justify-center lg:p-6 overflow-hidden font-festival_sans">
      <FestivalCloseButton :click-handler="closeModal" class="absolute top-0 right-0  lg:-mr-border lg:-mt-border  z-20" />
      <div class="relative w-full z-10 px-5 py-20">
        <form role="search" class="flex max-w-lg mx-auto" action="/festival/schedule" method="get" @submit.prevent="handleSearch">
          <input
            ref="searchInput"
            v-model="keyword"
            class="w-full rounded-none border-5 border-navy focus:outline-none px-5 py-2 text-lg"
            placeholder="Keywords..."
            type="text"
            required
            name="search"
          >
          <FestivalButton class="flex-shrink-0 -ml-border" to="#" :click-handler="handleSearch">
            <span class="text-lg">Search</span>
          </FestivalButton>
        </form>
      </div>
      <div class="absolute top-0 left-0 w-full h-full bg-navy lg:bg-black lg:opacity-80 z-0" @click.prevent="closeModal" />
    </div>
  </div>
</template>

<script>
import modal from '~/mixins/modal'

export default {
  name: 'FestivalSearchModal',
  mixins: [modal],
  data () {
    return {
      keyword: (this.$route.query && this.$route.query.search ? this.$route.query.search : '')
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.searchInput.focus()
    })
  },
  methods: {
    closeModal () {
      this.$store.commit('search/close')
    },
    handleSearch () {
      this.$router.push(`/festival/schedule?search=${this.keyword}`)
      this.$store.commit('search/close')
    }
  }
}
</script>

<style scoped>

</style>
