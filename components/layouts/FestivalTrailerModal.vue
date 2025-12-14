<template>
  <div class="fixed top-0 left-0 w-full h-full z-30 overflow-y-scroll" :class="{'bg-black bg-opacity-50 z-50': $store.state.theme==='bsf12'}">
    <div class="w-full h-full flex items-center justify-center lg:p-6 overflow-hidden">
      <Container>
        <div class="lg:relative z-10 bg-black -mx-4 sm:-mx-8 md:-mx-0" :class="{'border-navy lg:border-5': $store.state.theme==='festival', 'lg:border-md 2xl:border-lg border-black lg:rounded-3xl xl:rounded-4xl overflow-hidden': $store.state.theme==='bsf11'}">
          <FestivalCloseButton :click-handler="closeModal" class="absolute top-0 right-0 z-20" :class="{'lg:-mr-border lg:-mt-border': $store.state.theme==='festival', 'mt-6 mr-6': $store.state.theme==='bsf11'}" />
          <div class="relative z-10">
            <div ref="embed" v-cursor-hide class="aspect-w-16 aspect-h-9" v-html="$store.state.festival.trailer" />
          </div>
        </div>
      </Container>
      <div class="absolute top-0 left-0 w-full h-full lg:opacity-80 z-0" :class="{'bg-navy lg:bg-black': $store.state.theme==='festival', 'bg-black': $store.state.theme==='bsf11'}" @click.prevent="closeModal" />
    </div>
  </div>
</template>

<script>
import hasFestivalTrailer from '~/mixins/hasFestivalTrailer'

export default {
  name: 'FestivalTrailerModal',
  mixins: [hasFestivalTrailer]

}
</script>

<style scoped>

</style>
