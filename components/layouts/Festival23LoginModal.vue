<template>
  <ClientOnly>
    <Festival23Modal :close-modal-callback="handleClose" :small="true">
      <Festival23Box bg="bg-bsf12bg">
        <div class="relative">
          <div class="px-6 py-2 relative z-50">
            <iframe src="/eventive-login" frameborder="0" class="border-0 w-full h-[460px] overflow-hidden" scrolling="no" />
          </div>
          <Festival23Loader :absolute="true" />
        </div>
      </Festival23Box>
    </Festival23Modal>
  </ClientOnly>
</template>

<script>
export default {
  name: 'Festival23LoginModal',
  data () {
    return {
      loginPoll: null
    }
  },
  watch: {
    '$nuxt.$route' () {
      this.$nextTick(() => {
        this.handleClose()
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (typeof window !== 'undefined') {
        this.loginPoll = window.setInterval(this.checkLogin, 1000)
      }
    })
  },
  beforeDestroy () {
    if (this.loginPoll) {
      window.clearInterval(this.loginPoll)
    }
  },
  methods: {
    handleClose () {
      this.$store.commit('festival/closeLogin')
    },
    checkLogin () {
      try {
        if (this.$cookies.get('eventive-token', { fromRes: true })) {
          window.clearInterval(this.loginPoll)
          window.location.reload()
        }
      } catch (e) {
        // console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
