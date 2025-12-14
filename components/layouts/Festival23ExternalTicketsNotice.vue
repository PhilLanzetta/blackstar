<template>
  <ClientOnly>
    <Festival23Modal :close-modal-callback="handleClose" :small="true">
      <Festival23Box bg="bg-bsf12blue">
        <div class="relative">
          <div class="px-6 py-2 relative z-50">
            <Festival23H2 size="lg">
              <template v-if="post.acf&&post.acf.eventive_id==='64b9a0f7db3d9a0ce9616e11'">
                RSVP via External Site
              </template>
              <template v-else>
                Tickets sold on external site
              </template>
            </Festival23H2>
            <Space />
            <Festival23Prose>
              <template v-if="post.acf&&post.acf.eventive_id==='64aed67ea6be810041e8b75f'">
                <p>Tickets to First Friday! at the Barnes are sold via the Barnes Foundation website. Use code blackstarmember for a discounted price on individual tickets.</p>
                <p>All access passholders are not required to buy a ticket or register (you are just asked to show your pass at the door for entry).</p>
                <p>Click the button below to continue.</p>
              </template>
              <template v-else-if="post.acf&&post.acf.eventive_id==='64b9a0f7db3d9a0ce9616e11'">
                <p>This event is hosted by our friends at American Documentary, Black Public Media, ITVS, and WORLD.</p>
                <p>Use the link below to RSVP via Eventbrite.</p>
              </template>
              <template v-else>
                <p>Tickets for <span v-html="post.title.rendered" /> <span v-if="post.venue">at <span v-html="post.venue.name" /></span> are sold directly on the Kimmel Cultural Campus site. Shortly after purchasing, tickets will also appear in your BlackStar Film Festival account. Click the button below to continue.</p>

                <p><small>NOTE: All Access pass holders receive complimentary entry to this screening with their pass. Please arrive at the theatre at least 15 minutes before showtime to secure your seat.</small></p>
              </template>
            </Festival23Prose>
            <Space />
            <div class="flex">
              <Festival23Button :to="post.acf.external_tickets_url">
                <span class="flex space-x-1 items-baseline"><span v-if="post.acf&&post.acf.eventive_id==='64b9a0f7db3d9a0ce9616e11'">RSVP</span><span v-else>Buy Tickets</span> <span><svg class="block w-3 h-2"><use xlink:href="#icon-ext" /></svg></span></span>
              </Festival23Button>
            </div>
          </div>
        </div>
      </Festival23Box>
    </Festival23Modal>
  </ClientOnly>
</template>

<script>
export default {
  name: 'Festival23ExternalTicketsNotice',
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
