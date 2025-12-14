<template>
  <ClientOnly>
    <Festival24Modal :close-modal-callback="handleClose" :small="true" colour="beige">
      <Festival24Box class="bg-beige">
        <div class="relative">
          <div class="px-6 py-2 relative z-50">
            <Festival24SecondaryHeading :layout="{heading: ' Tickets sold on external site' }" />
            <Space />
            <Festival24Prose>
              <p>Tickets for <span v-html="post.title.rendered" /> <span v-if="post.venue">at <span v-html="post.venue.name" /></span> are sold via a third party site. Shortly after purchasing, tickets will also appear in your BlackStar Film Festival account. Click the button below to continue.</p>
            </Festival24Prose>
            <Space />
            <div class="flex">
              <Festival24Button :to="post.acf.external_tickets_url" target="_blank">
                Buy Tickets
              </Festival24Button>
            </div>
          </div>
        </div>
      </Festival24Box>
    </Festival24Modal>
  </ClientOnly>
</template>

<script>
export default {
  name: 'Festival24ExternalTicketsNotice',
  computed: {
    post () {
      return this.$store.state.festival.externalTicketsNotice
    }
  },
  watch: {
    '$nuxt.$route' () {
      this.$nextTick(() => {
        this.handleClose()
      })
    }
  },
  methods: {
    handleClose () {
      this.$store.commit('festival/closeExternalTicketsNotice', null)
    }
  }
}
</script>

<style scoped>

</style>
