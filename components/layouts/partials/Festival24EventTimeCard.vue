<template>
  <div class="py-1 pl-3 rounded-xl" :class="`${($store.state.theme==='bsf13' ? ' border ' + (!item.acf.films || (item.acf.films < 1) ? 'bg-bsf13green' : 'bg-bsf13orange') : (!item.acf.films || (item.acf.films < 1) ? 'bg-bsf14orangeTint' : 'bg-bsf14yellow'))}`">
    <div
      :style="`transform: translateX(${left}px)`"
      class="transition-transform duration-100 delay-100 w-full"
      :class="{'overflow-hidden': !item.acf.is_virtual}"
    >
      <div class="px-2 py-0.5 text-sm flex items-center w-full max-w-lg flex-grow-0 justify-between sticky left-0">
        <div class="py-1 pr-2 whitespace-nowrap">
          <ul class="flex items-center space-x-1">
            <li v-if="item.acf.event_type" v-html="`${item.acf.event_type},`" />
            <li v-if="!item.acf.event_type&&item.tags&&item.tags.length" class="display flex flex-wrap space-x-1">
              <span
                v-for="tag in item.tags"
                :key="`eventTagKey${tag.id}`"
              >
                {{ tag.name }},&nbsp;
              </span>
            </li>
            <li>{{ item.acf.event_duration }}</li>
            <li class="pl-2">
              <Festival24RichCardType :card="{type: 'event', event: item}" />
            </li>
          </ul>

          <h3
            class="font-normal text-xl"
            v-html="(item.acf.custom_title ? item.acf.custom_title : item.title.rendered)"
          />
        </div>
      </div>
    </div>
    <button
      v-if="clickHandler"
      class="absolute top-0 left-0 w-full h-full z-20"
      @click.prevent="() => { clickHandler(item) }"
    >
      <span class="sr-only">Read more</span>
    </button>
  </div>
</template>

<script>

export default {
  name: 'Festival24EventTimeCard',
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

</style>
