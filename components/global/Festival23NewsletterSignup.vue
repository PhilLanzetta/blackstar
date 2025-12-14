<template>
  <div>
    <h3 class="hidden lg:block font-normal mb-6">
      Sign-up for BlackStar News
    </h3>
    <p v-if="success" class="mt-6 text-base">
      Thank you for signing up for updates from BlackStar!
    </p>
    <form v-if="!success" class="w-full max-w-sm" @submit.prevent="submitNewsletter">
      <Festival23Box bg="bg-black" :outline="true" :inverse="true" :small="true">
        <input
          id="newsletter-email"
          v-model="email"
          type="email"
          required="true"
          placeholder="Email here..."
          class="lg:absolute top-0 left-0 w-full block lg:h-full z-20 bg-transparent px-2 py-2 lg:px-3 lg:py-3 2xl:px-3 2xl:py-4 focus:outline-none"
        ><span class="hidden w-96 h-9 lg:block" />
        <span class="block absolute top-0 right-0 h-full z-30">
          <Festival23Button :click-handler="submitNewsletter" :inverse="true" :large="true" class="h-full">
            <span v-show="!busy">Sign up</span> <span v-show="busy">One moment</span>
          </Festival23Button>
        </span>
      </Festival23Box>
    </form>
  </div>
</template>

<script>
import handleNewsletterSignup from '~/mixins/handleNewsletterSignup'

export default {
  name: 'Festival23NewsletterSignup',
  mixins: [handleNewsletterSignup]
}
</script>

<style scoped>

</style>
