<template>
  <Festival23RichCard :card="card" :section-colour="sectionColour" />
</template>

<script>
import festival23SectionColors from '~/mixins/festival23SectionColors'

export default {
  name: 'Festival23SearchResult',
  mixins: [festival23SectionColors],
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    card () {
      let postType = 'Page'

      if (this.post.type === 'festival-venue') {
        postType = 'Venue'
      }

      if (this.post.type === 'festival-event') {
        return {
          type: 'festival-event',
          event: this.post
        }
      }

      if (this.post.type === 'festival-film') {
        return {
          type: 'festival-film',
          film: this.post
        }
      }

      return {
        type: 'custom',
        custom:
          {
            heading: this.post.title.rendered,
            description: (this.post.excerpt ? this.post.excerpt.rendered : ''),
            pre_heading: postType,
            image: (this.post.featured_image_rendered ? this.post.featured_image_rendered : {}),
            buttons: [
              {
                button: {
                  url: this.post.link,
                  title: 'Read more'
                }
              }
            ]
          }
      }
    }
  }
}
</script>

<style scoped>

</style>
