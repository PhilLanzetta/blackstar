export default {
  data () {
    return {
      items: []
    }
  },
  computed: {
    cards () {
      if (this.layout.type === 'curated') {
        return this.layout.cards
      }

      return this.items
    }
  },
  async fetch () {
    if (this.layout.type === 'curated') {
      return
    }
    try {
      let queryString = ''

      if (this.layout.type === 'news') {
        const posts = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/festival-post?${queryString}&rich=1&routes=1`)

        this.items = posts.map((post) => {
          const card = {}
          card.news_post = post
          card.type = 'festival-post'
          return card
        })
      } else {
        if (this.layout.type === 'upcoming' || this.layout.type === 'highlights' || this.layout.type === 'tagged' || this.layout.type === 'venue' || this.layout.type === 'dates') {
          let year = 2023
          if (this.year) {
            year = this.year
          }
          queryString += `&upcoming=1&_year=${year}`
        }

        if (this.layout.type === 'today') {
          queryString += '&today=1'
        }

        if (this.layout.type === 'highlights') {
          queryString += '&highlights=1'
        }

        if (this.layout.type === 'tagged') {
          queryString += `&eventive-tag=${this.layout.tags.join(',')}`
        }

        if (this.layout.type === 'venue') {
          queryString += `&festival-venues=${this.layout.venue}`
        }

        if (this.layout.type === 'dated') {
          queryString += `&festival-dates=${this.layout.dates.join(',')}`
        }

        const festivalEvents = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/festival-event?${queryString}&rich=1&routes=1`)

        this.items = festivalEvents.map((festivalEvent) => {
          const card = {}
          card.event = festivalEvent
          card.type = 'festival-event'
          return card
        })
      }
    } catch (e) {
      // console.log(e)
    }
  }
}
