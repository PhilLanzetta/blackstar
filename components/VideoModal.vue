<template>
  <div class="fixed top-0 left-0 bg-black bg-opacity-75 w-full h-full z-50">
    <div class="flex w-full h-full items-center justify-center">
      <Container>
        <button v-cursor-interact class="absolute top-0 right-0 flex justify-center items-center text-center w-10 h-10 bg-purple rounded-full border border-black m-4 pointer-events-auto" @click.prevent="closeModal">
          <CloseIcon /><span class="sr-only">Close</span>
        </button>
        <VideoPlayerRaw :video="$store.state.video" :image="$store.state.video.image" :auto-play="true" />
      </Container>
    </div>
  </div>
</template>

<script>
import CloseIcon from '~/assets/festival/close.svg?inline'
import modal from '~/mixins/modal'

export default {
  name: 'VideoModal',
  components: { CloseIcon },
  mixins: [modal],
  methods: {
    closeModal () {
      this.$store.commit('setVideo', null)
    }
  }
}
</script>

<style scoped>

</style>
