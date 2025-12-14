<template>
  <div v-if="!settings.image" class="bg-bsf13green z-10 relative rounded-t-4xl border border-b-0 -mb-12">
    <Container class="flex pt-10 lg:pt-16 pb-12 lg:pb-20">
      <div>
        <h3 class="text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-serif_bold leading-none uppercase">
          {{settings.signup_text}}
        </h3>
        <div class="flex flex-wrap lg:flex-nowrap justify-between py-10 space-x-3">
          <div class="lg:w-1/2 place-self-end">
            <p v-if="success" class="text-base">{{settings.confirmation_text}}</p>
            <form v-if="!success" class="flex justify-between w-full space-x-2 items-end" @submit.prevent="submitNewsletter">
              <div class="w-full pr-7">
                <input
                  id="newsletter-email"
                  v-model="email"
                  type="email"
                  required="true"
                  placeholder="Email here..."
                  class="w-full block z-20 placeholder-black leading-10 bg-transparent text-lg focus:outline-none border-b pr-5 rounded-none"
                >
              </div>
              <Festival24Button :click-handler="submitNewsletter" modifier="default" class="flex-shrink-0">
                <span v-show="!busy">Sign up</span> <span v-show="busy">One moment</span>
              </Festival24Button>
            </form>
          </div>
          <div class="lg:w-1/2 flex justify-end items-end pt-10 sm:pt-0">
            <SocialNav class="xs:hidden" :justify-end="false" :small="true" :margin-top="false" />
            <SocialNav class="hidden xs:block" :justify-end="false" :small="false" :margin-top="false" />
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>

<script>
import handleNewsletterSignup from '~/mixins/handleNewsletterSignup'

export default {
  name: 'Festival24NewsletterSignupTwo',
  mixins: [handleNewsletterSignup]
}
</script>

<style scoped>

</style>
