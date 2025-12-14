<template>
  <div v-if="settings">
    <template v-if="success">
      <p
        class="secondary-heading"
        :class="{'text-center': alt, 'text-right': !alt}"
        v-html="settings.newsletter_signup.confirmation_text"
      />
      <p v-if="alt" class="flex items-center justify-center my-4">
        <PillButton :outline="true" colour-scheme="black" force-scheme="true" to="/seen/">
          Back to Home
        </PillButton>
      </p>
    </template>
    <form v-if="!success" class="w-full" @submit.prevent="submitNewsletter">
      <label
        for="newsletter-email"
        class="text-xl xl:text-3xl font-seen_serif_light"
        v-html="settings.newsletter_signup.signup_text"
      />
      <div class="flex space-x-4 mt-5 lg:mt-10 items-center">
        <input
          id="newsletter-email"
          v-model="email"
          v-cursor-interact-alt
          type="email"
          required="true"
          placeholder="email"
          class="py-1.5 w-full flex-shrink-1 bg-transparent text-base border-b border-black focus:outline-none rounded-none"
          :class="(error ? 'border-red' : `border-black`) + ` text-black placeholder-black`"
        >
        <button
          v-cursor-interact
          class="w-32 border-b border-black focus:outline-none py-1.5"
          @click.prevent="submitNewsletter"
        >
          Sign up
        </button>
      </div>
    </form>
    <Space :md="true" />
  </div>
</template>

<script>

export default {
  name: 'SeenNewsletterSignup',
  props: {
    alt: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      email: null,
      busy: false,
      error: false,
      success: false
    }
  },
  computed: {
    settings () {
      if (this.$store.state.settings && this.$store.state.settings.seen) {
        return this.$store.state.settings.seen
      }

      return false
    }
  },
  methods: {
    submitNewsletter () {
      if (this.busy) {
        return
      }
      this.busy = true
      try {
        this.$axios.post(`${this.$axiosConfig.cmsUrl}/wp-json/blackstar/v1/newsletter-subscribe?seen=1`, {
          email: this.email,
          _key: 'Uo3MeZitz.KFNZu'
        }).then((response) => {
          // console.log(response.data)
          this.busy = false
          this.success = true
        }).catch((response) => {
          this.error = true
          this.busy = false
        })
      } catch (e) {
        this.busy = false
        this.error = true
      }
    }
  }
}
</script>

<style scoped>

</style>
