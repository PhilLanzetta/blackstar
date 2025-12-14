export default {
  computed: {
    isEvent () {
      if (this.card.type === 'festival-event') {
        if (this.card.event) {
          return true
        }
      }

      return false
    },
    cardMainLink () {
      if (this.card.type === 'festival-event') {
        if (this.card.event.acf.suppressed) {
          return `/festival/events/suppressed?event=${(this.card.event.slug ? this.card.event.slug : this.card.event.post_name)}`
        }
        return this.card.event.link
      }

      if (this.card.type === 'festival-film') {
        return this.card.film.link
      }

      if (this.card.type === 'festival-post') {
        return this.card.news_post.link
      }

      return false
    }
  }
}
