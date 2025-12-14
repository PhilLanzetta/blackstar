import moment from 'moment-timezone'
import eventiveEverywhere from '~/mixins/eventiveEverywhere'
import livedata from '~/mixins/livedata'
import updateRouteQuery from '~/mixins/updateRouteQuery'

export default {
  mixins: [eventiveEverywhere, livedata, updateRouteQuery],
  props: {
    defaultView: {
      type: String,
      required: false,
      default: 'day'
    },
    mySchedule: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      days: [],
      activeDay: null,
      items: [],
      totalPages: 0,
      page: 1,
      loaded: false,
      filtered: false,
      venues: []
    }
  },
  watch: {
    '$route.query' (to, from) {
      this.$nextTick(() => {
        this.items = []
        this.page = 1
        this.$fetch()
      })
    },
    '$store.state.festival.saved' () {
      if (this.mySchedule) {
        this.$nextTick(() => {
          this.items = []
          this.$fetch()
        })
      }
    }/* ,
    '$store.state.festival.eventiveUser' () {
      if (!this.mySchedule) {
        this.$nextTick(() => {
          this.items = []
          this.page = 1
          this.$fetch()
        })
      }
    } */
  },
  async fetch () {
    const config = this.$axiosConfig.config
    this.loaded = false

    config.withCredentials = true

    if (this.$store.state.liveData && this.$store.state.liveDataNonce) {
      config.headers = { 'X-WP-Nonce': this.$route.query.nonce }
    }

    try {
      let myScheduleQueryString = ''
      let days = null
      if (this.mySchedule) {
        myScheduleQueryString += `_schedule-user=${this.$store.state.festival.eventiveUser.localUserId}&_schedule-nonce=${this.$store.state.festival.eventiveUser.nonce}`

        if (this.$route.query && this.$route.query._include) {
          myScheduleQueryString += `&_include=${this.$route.query._include}`
        }
        days = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/blackstar/v1/eventive-users/dates?${myScheduleQueryString}&_year=${this.festivalYear}`, config)
      } else {
        days = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/festival-dates?per_page=99&_year=${this.festivalYear}`, config)
      }

      if (this.mySchedule) {
        this.days = days
      } else {
        this.days = days.filter((day) => {
          if (this.$store.state.liveData) {
            return !day.hide_from_schedule
          }

          return !day.hide_from_schedule && day.count
        }).sort((a, b) => {
          return moment(a.acf.start_time).format('X') - moment(b.acf.start_time).format('X')
        })
      }

      if (!this.days.length) {
        this.items = []
        this.loaded = true
        this.totalPages = 1
        this.activeDay = null
        return
      }

      const now = moment().tz('America/New_York')
      const currentDay = this.days.find((day) => {
        const dayStart = moment(day.acf.end_time)
        return dayStart.isSame(now.toDate(), 'day')
      })

      if (currentDay) {
        this.activeDay = currentDay
      } else {
        this.activeDay = this.days[0]
      }

      this.filtered = false
      let queryString = ''
      let showVirtual = false
      const allowedFilters = ['eventive-tag', 'accessibility', 'festival-awards', 'premiere-status', 'festival-venues']

      if (this.$route.query) {
        if (this.$route.query.day) {
          const queriedDay = this.days.find((day) => {
            return parseInt(day.id) === parseInt(this.$route.query.day)
          })

          if (queriedDay) {
            this.activeDay = queriedDay
          }
        }

        if (this.activeView !== 'time') {
          allowedFilters.forEach((allowedFilter) => {
            if (this.$route.query[allowedFilter]) {
              const allowedFilterTerms = this.$route.query[allowedFilter].split(',').map((term) => {
                return parseInt(term)
              })
              queryString += `&${allowedFilter}=${allowedFilterTerms.join(',')}`
              this.filtered = true
            }
          })
        }

        if (this.$route.query._search && this.activeView !== 'time') {
          queryString += `&_search=${this.$route.query._search}`
          this.filtered = true
        }
      }

      if (this.post.template === 'views/festival-event-guide.blade.php') {
        if (!this.$route.query['eventive-tag']) {
          queryString += '&event-only=1'
        }
        this.filtered = true
      }

      if (this.post.template === 'views/festival-my-schedule.blade.php') {
        showVirtual = true
      }

      if (this.post.template === 'views/festival-virtual-guide.blade.php') {
        queryString += '&virtual_only=1'
      } else if (this.$route.query && this.$route.query.virtual) {
        if (this.activeView === 'time') {
          showVirtual = true
        } else {
          queryString += '&virtual_only=1'
        }
      } else if (!showVirtual) {
        queryString += '&in-person=1'
      }

      if (!this.filtered) {
        queryString += `&routes=1&festival-dates=${this.activeDay.id}`
        if (this.activeView === 'time') {
          queryString += '&time=1'
        }
      } else {
        if (this.$route.query && this.$route.query.page) {
          this.page = parseInt(this.$route.query.page)
        }

        queryString += `&per_page=9&page=${this.page}`
      }

      let endpoint = '/wp/v2/festival-event'
      if (this.mySchedule) {
        endpoint = '/blackstar/v1/my-schedule'
        queryString += `&${myScheduleQueryString}`
      }

      const response = await this.$axios.get(`${this.$axiosConfig.cmsUrl}/wp-json${endpoint}?_year=${this.festivalYear}&rich=1&not_hidden=1${queryString}`, config)
      if (response.status === 200) {
        this.items = this.items.concat(response.data)
        this.totalPages = parseInt(response.headers['x-wp-totalpages'])

        if (!this.filtered && !this.items.length && !this.mySchedule && !(this.$route.query && this.$route.query.day)) {
          this.nextScheduleDay()
        }

        if (this.activeView === 'time') {
          const response = await this.$axios.get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/festival-venues?per_page=99&_year=${this.festivalYear}`, config)
          if (response.status === 200) {
            this.venues = response.data
          }
        }

        this.loaded = true
      }
      this.rebuildEventive()
    } catch (e) {
      if (this.mySchedule) {
        this.$store.commit('festival/setLocalScheduleError', e.message)
      }
    }
  },
  computed: {
    activeDayIndex () {
      if (!this.days.length || !this.activeDay) {
        return false
      }

      return this.days.findIndex((day) => {
        return day.slug === this.activeDay.slug
      })
    },
    hasPastDays () {
      if (!this.days.length || !this.activeDay) {
        return false
      }

      return this.activeDayIndex > 0
    },
    hasUpcomingDays () {
      if (!this.days.length || !this.activeDay) {
        return false
      }

      return ((this.days.length - 1) > this.activeDayIndex)
    },
    activeView () {
      if (this.$route.query && this.$route.query.view) {
        if (this.post.template !== 'views/festival-event-guide.blade.php') {
          if (this.$route.query.view === 'time') {
            return 'time'
          }

          if (this.$route.query.view === 'az') {
            return 'az'
          }

          if (this.$route.query.view === 'day') {
            return 'day'
          }
        }
      }

      return this.defaultView
    },
    ready () {
      if (this.activeView === 'day' && !this.mySchedule) {
        return this.activeDay && this.loaded
      }

      return this.loaded
    },
    festivalYear () {
      if (this.post && this.post.acf.festival_year) {
        return this.post.acf.festival_year
      }

      return 2023
    }
  },
  methods: {
    prevScheduleDay () {
      if (!this.hasPastDays) {
        return
      }

      const prevDay = this.days[this.activeDayIndex - 1]
      this.updateQueryVar('day', prevDay.id)
    },
    nextScheduleDay () {
      if (!this.hasUpcomingDays) {
        return
      }

      const nextDay = this.days[this.activeDayIndex + 1]
      this.updateQueryVar('day', nextDay.id)
    },
    clearFilters () {
      const newQuery = []
      if (this.$route.query) {
        if (this.$route.query.day) {
          newQuery.day = this.$route.query.day
        }
        if (this.$route.query.view) {
          newQuery.view = this.$route.query.view
        }
      }

      this.page = 1

      this.$router.push({
        path: this.$route.path,
        query: newQuery
      })
    },
    loadMore () {
      this.page++
      this.$fetch()
    }
  },
  mounted () {
    if (typeof window !== 'undefined') {
      this.$nextTick(() => {
        this.items = []
        this.page = 1
        this.totalPages = 1
        this.$fetch()
      })
    }
  }
}
