<template>
  <div class="fixed w-full h-screen top-0 left-0 z-30 pointer-events-none flex justify-end items-center">
    <div class="max-w-3xl w-full relative flex justify-end flex-wrap">
      <button v-cursor-interact class="flex justify-center items-center text-center w-10 h-10 bg-purple rounded-full border border-black m-4 pointer-events-auto" @click.prevent="$store.commit('popup/close')">
        <CloseIcon /><span class="sr-only">Close</span>
      </button>
      <div class="w-full bg-purple rounded-3xl relative z-40 pointer-events-auto border border-black px-5 py-8">
        <DonatePopupForm v-if="$store.state.popup.type==='donate'" />
        <NewsletterSignup v-if="$store.state.popup.type==='newsletter'" success-alignment="text-center" :on-complete-callback="handleClose" />
      </div>
    </div>
  </div>
</template>

<script>
import CloseIcon from '~/assets/festival/close.svg?inline'

export default {
  name: 'Popup',
  components: { CloseIcon },
  methods: {
    handleClose () {
      setTimeout(() => {
        if (this.$store.state.popup.isOpen) {
          this.$store.commit('popup/close')
        }
      }, 3000)
    }
  }
}
</script>

<style scoped>
button svg {
  @apply block w-2/3 h-2/3 mx-auto;
}

</style>
