<template>
  <Container v-if="video" class="relative">
    <Space :lg="true" />
    <FestivalHeading v-if="$store.state.theme==='bsf11'" :butted="true">Trailer</FestivalHeading>
    <div :class="{'border-5 border-navy relative bg-black': $store.state.theme==='festival', 'border-4 lg:border-md 2xl:border-lg border-black rounded-3xl xl:rounded-4xl overflow-hidden': $store.state.theme==='bsf11'}" class="z-10">
      <VideoPlayer :video="video" :image="image" :title="title" />
    </div>
    <LazyRellaxShape v-if="$store.state.theme==='festival'" key="shape10" class="bottom-20 right-32 z-0 w-72">
      <ShapeTen />
    </LazyRellaxShape>
  </Container>
</template>

<script>
import layout from '~/mixins/layout'
import ShapeTen from '~/assets/festival/shape-10.svg?inline'

export default {
  name: 'FestivalEventTrailer',
  components: { ShapeTen },
  mixins: [layout],
  props: {
    coverImage: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    video () {
      if (this.layout.video && this.layout.video.length) {
        return this.layout.video[0]
      }

      if (this.layout.trailer) {
        return {
          type: 'embed',
          video_embed: this.layout.trailer
        }
      }

      return false
    },
    image () {
      if (this.layout.image) {
        return this.layout.image
      }

      return this.coverImage
    },
    title () {
      if (this.layout.title) {
        return this.layout.title
      }

      return 'Play trailer'
    }
  }
}
</script>

<style scoped>

</style>
