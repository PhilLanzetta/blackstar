<template>
  <ul :class="{'filtered': activeTags.length}">
    <li :class="{'active': !activeTags.length}">
      <button :aria-checked="!activeTags.length" @click.prevent="() => setActiveTag(null)">
        All
      </button>
    </li>
    <li v-for="tag in tags" :key="`tag${tag.id}`" :class="{'active': activeTags.includes(tag.id.toString())}">
      <button
        :aria-checked="activeTags.includes(tag.id.toString())"
        @click.prevent="() => setActiveTag(tag)"
        v-html="tag.name"
      />
    </li>
  </ul>
</template>

<script>
import updateRouteQuery from '~/mixins/updateRouteQuery'

export default {
  name: 'Festival23ScheduleTagFilters',
  mixins: [updateRouteQuery],
  props: {
    eventTagsOnly: {
      type: Boolean,
      required: false,
      default: false
    },
    nonEventTagsOnly: {
      type: Boolean,
      required: false,
      default: true
    },
    filmGuide: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      tags: []
    }
  },
  async fetch () {
    const config = this.$axiosConfig.config

    if (this.$store.state.liveData && this.$store.state.liveDataNonce) {
      config.withCredentials = true
      config.headers = { 'X-WP-Nonce': this.$route.query.nonce }
    }

    try {
      const tags = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/eventive-tag?per_page=99&_year=2023`, config)
      if (tags) {
        this.tags = tags.filter((tag) => {
          let hideCondition = tag.hide_from_schedule
          if (this.filmGuide) {
            hideCondition = tag.hide_from_film_guide
          }

          if (this.eventTagsOnly) {
            if (this.$store.state.liveData && this.$store.state.liveDataNonce) {
              return tag.is_event_tag && !hideCondition
            }

            return tag.is_event_tag && !hideCondition && tag.count
          }

          if (this.nonEventTagsOnly) {
            if (this.$store.state.liveData && this.$store.state.liveDataNonce) {
              return !tag.is_event_tag && !hideCondition
            }

            return !tag.is_event_tag && !hideCondition && tag.count
          }

          if (this.$store.state.liveData && this.$store.state.liveDataNonce) {
            return !tag.hide_from_schedule
          }

          return !tag.hide_from_schedule && tag.count
        })
      }
    } catch (e) {
      // console.log(e)
    }
  },
  computed: {
    activeTags () {
      if (!this.$route.query) {
        return []
      }

      if (!this.$route.query['eventive-tag']) {
        return []
      }

      return this.$route.query['eventive-tag'].split(',')
    }
  },
  watch: {
    '$route.query' () {
      this.$nextTick(() => {
        this.$forceUpdate()
      })
    }
  },
  mounted () {
    if (typeof window !== 'undefined') {
      this.$nextTick(() => {
        this.$forceUpdate()
      })
    }
  },
  methods: {
    setActiveTag (tag) {
      if (!tag) {
        this.updateQueryVar('eventive-tag', null)
        this.activeTags = []
        return
      }
      let tags = this.activeTags
      if (tags.includes(tag.id.toString())) {
        tags = tags.filter((currentTag) => {
          return currentTag.toString() !== tag.id.toString()
        })
      } else {
        tags.push(tag.id)
      }
      this.updateQueryVar('eventive-tag', tags.join(','))
    }
  }
}
</script>

<style scoped>
ul {
  @apply flex flex-wrap -mt-1 -mx-2 xl:-mt-2 max-w-xl;
}

li {
  @apply px-2 py-1 xl:p-2 transition-opacity duration-200;
}

ul li {
  @apply opacity-50;
}

ul li.active {
  @apply opacity-100;
}
</style>
