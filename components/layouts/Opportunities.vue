<template>
  <section>
    <Container>
      <div v-if="!layout.hide_badge">
        <NegativeSpace :lg="true" />
        <h1
          class="flex rounded-full text-sm w-28 h-28 lg:w-52 lg:h-52 bg-purple text-center justify-center items-center text-white transform rotate-12 lg:text-lg font-medium"
        >
          <span class="p-4">Opportunities</span>
        </h1>
        <NegativeSpace class="hidden lg:block" :lg="true" />
      </div>
      <div class="pb-20">
        <div v-if="types&&types.length">
          <div class="lg:flex lg:space-x-10 mt-10 lg:mt-0 lg:mb-20">
            <div class="hidden lg:block w-1/4">
              &nbsp;
            </div>
            <div class="lg:w-3/4 flex space-x-10">
              <Button
                v-for="type in types"
                :key="type.id"
                v-cursor-interact
                class="flex items-center justify-start flex-wrap sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl font-medium circle-button text-purple"
                :class="(activeType===type.id ? 'opacity-100' : 'opacity-50')"
                @click.prevent="activeType=type.id"
              >
                <span
                  class="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full block mr-2 sm:mr-4 transition-transform duration-100 bg-purple"
                />
                {{ type.name }}
              </Button>
            </div>
          </div>
        </div>
        <div v-if="items&&items.length">
          <div
            v-for="item in items"
            :key="item.id"
            class="border-t-2 border-dotted border-black py-4 my-10 lg:space-x-20 lg:flex"
          >
            <h2 class="lg:w-1/4 text-xl mb-2 lg:mb-0 lg:text-3xl font-medium max-w-xs" v-html="item.title.rendered" />
            <div class="lg:w-3/4 flex space-x-5 lg:space-x-20">
              <h3 class="font-medium text-base lg:text-lg text-purple">
                {{ getType(item['opportunity-type'][0]).description }}
              </h3>
              <div>
                <div class="font-serif text-xs lg:text-sm" v-html="item.acf.short_description" />
                <div v-if="item.acf.show_read_more||item.acf.download_pdf" class="flex my-4 space-x-4 w-full">
                  <PillButton v-if="item.acf.show_read_more" :to="`/opportunities/${item.slug}`" color-scheme="black">
                    Read More
                  </PillButton>
                  <PillButton v-if="item.acf.download_pdf" :to="item.acf.download_pdf" color-scheme="black">
                    Download
                    PDF
                  </PillButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="!(items&&items.length)&&!busy"
          class="border-t-2 border-dotted border-black py-4 my-10 lg:space-x-20 lg:flex justify-end"
        >
          <div class="lg:w-3/4 flex space-x-20">
            <div v-if="settings" class="font-serif text-sm" v-html="settings.no_opportunities_message" />
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>

<script>
import layout from '~/mixins/layout'
import livedata from '~/mixins/livedata'

export default {
  name: 'Opportunities',
  mixins: [layout, livedata],
  data () {
    return {
      types: [],
      activeType: false,
      busy: false
    }
  },
  async fetch () {
    this.busy = true

    try {
      if (!this.types.length) {
        this.types = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/opportunity-type`)
        if (this.types.length) {
          this.activeType = this.types[0].id
        }
      }
      const response = await this.$axios.get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/opportunity?per_page=20&page=1&order=asc&orderby=menu_order` + (this.activeType ? `&opportunity-type=${this.activeType}` : ''))
      this.items = response.data

      this.busy = false
    } catch (e) {
      this.busy = false
    }
  },
  computed: {
    settings () {
      return this.$store.state.settings
    }
  },
  watch: {
    activeType () {
      this.$nextTick(() => {
        this.$fetch()
      })
    }
  },
  methods: {
    loadMore () {
      this.page++
      this.$fetch()
    },
    getType (id) {
      return this.types.find((type) => {
        return type.id === id
      })
    }
  }
}
</script>

<style scoped>

</style>
