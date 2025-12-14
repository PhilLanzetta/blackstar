<template>
  <div v-if="settings.image" class="relative -my-12 z-10 lg:rounded-t-4xl lg:overflow-hidden" :class="{'lg:border lg:border-b-0': $store.state.theme==='bsf13'}">
    <Festival24Section :section="{background: ($store.state.theme === 'bsf13' ? 'bsf13green' : 'bsf14cherry'), gradient_style: ($store.state.theme === 'bsf13' ? null : 'top'), layouts: [], style: 'contained'}" :extra-padding="true">
      <div class="lg:grid pb-16 lg:pb-20 2xl:pb-12 lg:grid-cols-12 lg:gap-x-12">
        <div class="grid p-5 lg:p-7 rounded-3xl col-span-12 lg:col-span-5" :class="{'border': $store.state.theme==='bsf13', 'bg-black text-white': $store.state.theme==='bsf14'}">
          <h3 class="text-4xl sm:text-5xl -tracking-bsf13 lg:text-6xl 2xl:text-7xl !leading-bsf13 uppercase" :class="{'font-serif_bold': $store.state.theme==='bsf13', 'font-bsf14_cursive': $store.state.theme==='bsf14'}">
            {{ settings.signup_text }}
          </h3>
          <div class="flex flex-wrap pt-10 sm:pr-10 lg:pr-11">
            <div class="w-full">
              <p v-if="success" class="text-base">
                {{ settings.confirmation_text }}
              </p>
              <form v-if="!success" class="flex justify-between w-full space-x-2 items-end" @submit.prevent="submitNewsletter">
                <div class="w-full pr-4 lg:pr-7">
                  <input
                    id="newsletter-email"
                    v-model="email"
                    type="email"
                    required="true"
                    placeholder="Email here..."
                    class="w-full block z-20 leading-10 bg-transparent text-lg focus:outline-none border-b pr-5 rounded-none"
                    :class="{'placeholder-black': $store.state.theme==='bsf13', 'placeholder-white': $store.state.theme==='bsf14'}"
                  >
                </div>
                <Festival24Button :click-handler="submitNewsletter" :modifier="($store.state.theme==='bsf13' ? 'default' : 'inverse-solid')" class="flex-shrink-0">
                  <span v-show="!busy">Sign up</span> <span v-show="busy">One moment</span>
                </Festival24Button>
              </form>
            </div>
            <div class="flex justify-end items-end pt-10">
              <SocialNav class="sm:hidden" :justify-end="false" :small="true" :margin-top="false" />
              <SocialNav class="hidden sm:block" :justify-end="false" :small="false" :margin-top="false" />
            </div>
          </div>
        </div>
        <div class="hidden lg:block h-full col-span-7 [&>img]:rounded-3xl [&>img]:h-full [&>img]:w-full [&>img]:object-cover [&>img]:max-h-96" :class="{'[&>img]:border': $store.state.theme==='bsf13'}" v-html="settings.image" />
      </div>
    </Festival24Section>
  </div>
</template>

<script>
import handleNewsletterSignup from '~/mixins/handleNewsletterSignup'

export default {
  name: 'Festival24NewsletterSignup',
  mixins: [handleNewsletterSignup]
}
</script>

<style scoped>
</style>
