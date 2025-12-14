<template>
  <span class="play-button-wrapper">
    <button v-cursor-interact class="pointer-events-auto play-button absolute flex items-center justify-center top-0 left-0 w-full h-full z-10 border-0 transition-transform duration-500 motion-reduce:transition-none" :class="{'motion-safe:transform translate-y-full motion-reduce:hidden': playing}" @click.prevent="playVideo">
      <span class="play-icon motion-safe:animate-bounce"><PlayIcon v-if="$store.state.theme==='festival'" /><PlayIcon11 v-if="$store.state.theme==='bsf11'" /><span class="sr-only">Play</span></span>
    </button>
    <span v-if="image&&!playing" v-html="image" />
  </span>
</template>

<script>
import PlayIcon from '~/assets/festival/play.svg?inline=true'
import PlayIcon11 from '~/assets/festival/11/play.svg?inline=true'

export default {
  name: 'VideoPlayButton',
  components: { PlayIcon, PlayIcon11 },
  props: {
    playVideo: {
      type: Function,
      required: true
    },
    image: {
      type: String,
      required: false,
      default: null
    },
    playing: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style >
.play-button-wrapper img {
@apply block w-full h-full object-cover;
}

.play-button .play-icon {
  @apply block w-16 h-16 xl:w-32 xl:h-32 relative z-10;
}

.play-button .play-icon svg {
  @apply block w-full h-full;
}
</style>
