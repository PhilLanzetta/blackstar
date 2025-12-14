<template>
  <section v-if="settings" class="bg-purple py-20 text-xl lg:text-2xk xl:text-3xl font-medium">
    <Container>
      <div class="lg:flex lg:space-x-10 items-start">
        <div class="lg:w-7/12 md:flex md:space-x-10 items-start">
          <div class="md:w-1/2 mb-10 lg:mb-0">
            <h2>Address</h2>
            <p v-html="settings.contact_details.address"></p>
          </div>
          <div class="md:w-1/2">
            <h2>Get in touch</h2>

            <p v-if="settings.contact_details.phone"><span>{{settings.contact_details.phone}} Phone</span></p>
            <p v-if="settings.contact_details.fax"><span>{{settings.contact_details.fax}} Fax</span></p>
            <p v-if="settings.contact_details.email"><RawLink v-cursor-interact :to="`mailto:${settings.contact_details.email}`">{{settings.contact_details.email}}</RawLink></p>

            <SocialNav :justify-end="false" />

          </div>
        </div>
        <div class="hidden lg:block w-5/12">
          <h2>Newsletter</h2>
          <NewsletterSignup colour-scheme="black" />
        </div>
      </div>
    </Container>
  </section>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'ContactDetails',
  mixins: [layout],
  computed: {
    settings () {
      return this.$store.state.settings
    }
  }
}
</script>

<style scoped>
h2 {
  @apply font-serif_italic text-sm mb-4;
}
</style>
