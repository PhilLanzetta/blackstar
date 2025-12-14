export default {
  computed: {
    film () {
      if (!this.post.acf.films) {
        return false
      }

      return this.post.acf.films[0]
    },
    coverImage () {
      if (this.post.acf.custom_cover_image) {
        return this.post.acf.custom_cover_image
      }

      if (this.post.acf.cover_image) {
        return this.post.acf.cover_image
      }

      return this.featuredImage
    },
    featuredImage () {
      if (this.post.acf.custom_featured_image) {
        return this.post.acf.custom_featured_image
      }

      return this.post.featured_image_rendered
    },
    featuredImageCarousel () {
      if (this.post.acf.custom_featured_image_carousel) {
        return this.post.acf.custom_featured_image_carousel
      }

      if (this.post.featured_image_rendered_carousel) {
        return this.post.featured_image_rendered_carousel
      }

      return this.featuredImage
    },
    title () {
      if (this.post.acf.custom_title) {
        return this.post.acf.custom_title
      }

      return this.post.title.rendered
    },
    content () {
      if (this.post.acf.custom_content) {
        return this.post.acf.custom_content
      }

      if (this.post.content.rendered && this.post.content.rendered !== '<p></p>\n') {
        return this.post.content.rendered
      }

      if (this.post.acf.virtual_event && this.post.acf.virtual_event.post_content) {
        return this.post.acf.virtual_event.post_content
      }

      if (this.post.excerpt.rendered) {
        return this.post.excerpt.rendered
      }

      if (this.post.acf.layout !== 'collection') {
        if (this.film && this.film.content.rendered && this.film.content.rendered !== '<p></p>\n') {
          return this.film.content.rendered
        }
      }

      return ''
    },
    excerpt () {
      if (this.post.acf.custom_excerpt) {
        return this.post.acf.custom_excerpt
      }

      return this.post.excerpt.rendered
    },
    itemScope () {
      if (this.post.tags && this.post.tags.length) {
        if (this.post.tags[0].slug !== 'parties') {
          return 'https://schema.org/ScreeningEvent'
        }
      }
      return 'https://schema.org/Event'
    }
  }
}
