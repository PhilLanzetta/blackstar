<template>
  <ul :class="{'bsf14-filter-buttons': $store.state.theme==='bsf14'}">
    <li :class="{'active': !viewFilters.length}">
      <button :aria-checked="!viewFilters.length" @click.prevent="() => setViewFilters(null)">
        All
      </button>
    </li>
    <li :class="{'active': viewFilters.length&&viewFilters.includes('saved')}">
      <button :aria-checked="viewFilters.length&&viewFilters.includes('saved')" @click.prevent="() => setViewFilters('saved')">
        Saved Events
      </button>
    </li>
    <li :class="{'active': viewFilters.length&&viewFilters.includes('purchased')}">
      <button v-if="$store.state.festival.loggedIn&&!$store.state.festival.loggedInGuest" :aria-checked="viewFilters.length&&viewFilters.includes('purchased')" @click.prevent="() => setViewFilters('purchased')">
        My Tickets
      </button>
      <button v-else @click.prevent="handleLogin">
        My Tickets
      </button>
    </li>
  </ul>
</template>

<script>
import updateRouteQuery from '~/mixins/updateRouteQuery'

export default {
  name: 'Festival23MyScheduleViewFilters',
  mixins: [updateRouteQuery],
  data () {
    return {
      viewFilters: []
    }
  },
  mounted () {
    if (this.$route.query && this.$route.query._include) {
      this.viewFilters = []
      this.$route.query._include.split(',').forEach((filter) => {
        if (filter === 'saved' || filter === 'purchased') {
          this.viewFilters.push(filter)
        }
      })
    }
  },
  methods: {
    setViewFilters (newFilter) {
      if (!newFilter) {
        this.viewFilters = []
        this.updateQueryVar('_include', null)
        return
      }
      this.viewFilters = []
      if (this.viewFilters.includes(newFilter)) {
        this.viewFilters = this.viewFilters.filter((filter) => {
          return filter !== newFilter
        })
      } else {
        this.viewFilters.push(newFilter)
      }
      this.updateQueryVar('_include', this.viewFilters.join(','))
    },
    handleLogin () {
      this.$store.commit('festival/openLogin')
    }
  }
}
</script>

<style scoped>
ul {
  @apply flex flex-wrap -mx-2 max-w-lg;
}

li {
  @apply p-2 transition-opacity duration-200;
}

ul li {
  @apply opacity-50;
}

ul li.active {
  @apply opacity-100;
}

.bsf14-filter-buttons button {
  @apply bg-bsf14cherryTint py-2 px-4 rounded-full;
}
</style>
