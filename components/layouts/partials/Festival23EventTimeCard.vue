<template>
  <Festival23Box :x-small="true" :bg="(active ? 'bg-black' : `bg-${sectionColour}`)" :hover-bg="true" :hover-bg-alt="true" class="time-box">
    <div :style="`transform: translateX(${left}px)`" class="transition-transform duration-100 delay-100 overflow-hidden w-full">
      <div class="px-2 py-0.5 text-sm flex items-center w-full max-w-lg flex-grow-0 justify-between">
        <div class="py-1 pr-2 whitespace-nowrap">
          <h3 class="font-normal " :class="(active ? 'bg-black' : `bg-${sectionColour}`)" v-html="(item.acf.custom_title ? item.acf.custom_title : item.title.rendered)" />
        </div>
        <div class="flex flex-wrap flex-shrink-0 py-1 pr-2">
          <div v-if="item.acf.is_virtual" class="border-2 border-black p-1.5 leading-none text-xs mr-2 my-0.5" :class="(item.acf.is_virtual ? 'bg-bsf11Yellow text-black' : `bg-${sectionColour} text-black`)">
            Virtual
          </div> <Festival23SaveButton class="my-0.5 relative z-30" :use-tooltip="false" :event="item" />
        </div>
      </div>
    </div>
    <button v-if="clickHandler" class="absolute top-0 left-0 w-full h-full z-20" @click.prevent="() => { clickHandler(item) }">
      <span class="sr-only">Read more</span>
    </button>
  </Festival23Box>
</template>

<script>
import festival23SectionColors from '~/mixins/festival23SectionColors'

export default {
  name: 'Festival23EventTimeCard',
  mixins: [festival23SectionColors],
  props: {
    item: {
      type: Object,
      required: true
    },
    clickHandler: {
      type: Function,
      required: false,
      default: null
    },
    active: {
      type: Boolean,
      required: false,
      default: false
    },
    left: {
      type: Number,
      required: false,
      default: 0
    }
  }
}
</script>

<style scoped>
.time-box:hover h3 {
  @apply bg-black;
}
</style>
