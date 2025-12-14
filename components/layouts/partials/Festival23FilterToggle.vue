<template>
  <div>
    <Festival23H3 class="mb-2">
      {{ label }}
    </Festival23H3>

    <div class="flex">
      <Festival23Box :bg="`bg-${(alt ? 'bsf12Bg' : sectionColour)}`" :x-small="true" :inverse="alt">
        <label class="absolute top-0 left-0 w-full h-full z-40 cursor-pointer" :for="id">
          <span class="sr-only">Toggle</span>
        </label>
        <div class="absolute top-0 left-0 w-1/2 h-full flex items-stretch z-20 transform transition-transform duration-200" :class="{'translate-x-full': !active}">
          <Festival23Box class="w-full" :x-small="true" bg="bg-black" :inverse="alt" />
        </div>
        <div class="flex text-base w-40 py-2 relative z-30">
          <span class="w-1/2 text-center" :class="{'text-white': active&&!alt, 'text-black': alt&&!active}">
            Yes
          </span>
          <span class="w-1/2 text-center" :class="{'text-white': !active&&!alt, 'text-black': alt&&active}">
            No
          </span>
        </div>
      </Festival23Box>
    </div>
    <input :id="id" v-model="active" class="sr-only" type="checkbox" :name="name">
  </div>
</template>

<script>
import updateRouteQuery from '~/mixins/updateRouteQuery'
import festival23SectionColors from '~/mixins/festival23SectionColors'

export default {
  name: 'Festival23FilterToggle',
  mixins: [updateRouteQuery, festival23SectionColors],
  props: {
    label: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    alt: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      active: (this.$route.query && this.$route.query[this.name])
    }
  },
  watch: {
    active (to) {
      this.updateQueryVar(this.name, to)
    }
  }
}
</script>

<style scoped>

</style>
