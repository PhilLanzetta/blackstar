<template>
  <div>
    <p v-if="success" class="secondary-heading" :class="`${successAlignment}`">
      Thank you for signing up for updates from BlackStar!
    </p>
    <form v-if="!success" class="w-full" @submit.prevent="submitNewsletter">
      <label for="newsletter-email" class="secondary-heading">Sign-up for BlackStar News,<br> our monthly
        newsletter</label>
      <div class="sm:flex sm:space-x-4 mt-4 lg:mt-8 items-center">
        <input
          id="newsletter-email"
          v-model="email"
          v-cursor-interact-alt
          type="email"
          required="true"
          placeholder="email"
          class="focus:outline-none bg-transparent rounded-3xl border-dotted border-4 px-8 py-1.5 w-full text-base"
          :class="(error ? 'border-red' : `border-${colorScheme}`) + ` text-${colorScheme} placeholder-${colorScheme}`"
        >
        <PillButton to="#" :click-handler="submitNewsletter" :color-scheme="colorScheme" :hover-color="colorScheme" class="w-36 h-full mt-4 sm:m-0 block sm:w-1/3">
          <span v-show="!busy">Sign up</span>        <span v-show="busy">One moment</span>
        </PillButton>
      </div>
    </form>
  </div>
</template>

<script>
import ColourScheme from '~/mixins/ColourScheme'
import handleNewsletterSignup from '~/mixins/handleNewsletterSignup'

export default {
  name: 'NewsletterSignup',
  mixins: [ColourScheme, handleNewsletterSignup],
  props: {
    successAlignment: {
      type: String,
      required: false,
      default: 'text-right'
    }
  }
}
</script>

<style scoped>

</style>
