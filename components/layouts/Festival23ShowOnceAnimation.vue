<template>
  <ClientOnly>
    <div>
      <div v-if="canShow" class="sticky top-0 z-0 h-screen bg-bsf12Bg relative hidden lg:block">
        <Festival23Animation />
        <span class="absolute bottom-5 left-1/2 transform -translate-x-1/2"><svg class="block w-10 h-10 motion-safe:animate-bounce"><use xlink:href="#icon-arrow-down-solid" /></svg></span>
        <button class="absolute z-20 block top-0 left-0 w-full h-full" @click.prevent="scrollToContent">
          <span class="sr-only">Scroll Down</span>
        </button>
      </div>
    </div>
  </ClientOnly>
</template>

<script>
export default {
  name: 'Festival23ShowOnceAnimation',
  data () {
    return {
      canShow: false
    }
  },
  mounted () {
    if (typeof window !== 'undefined') {
      const cookie = this.$cookies.get('bsf23-intro', { fromRes: true })
      if (!cookie) {
        this.canShow = true
        this.$cookies.set('bsf23-intro', true, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        })
      }
    }
  },
  methods: {
    scrollToContent () {
      document.getElementById('site-header').scrollIntoView()
    }
  }
}
</script>

<style scoped>

</style>
