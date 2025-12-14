<template>
  <Container>
    <div class="border-t-2 border-dotted border-black flex-wrap flex items-start py-8" :class="{'justify-end': layout.collapsable, 'justify-between': !layout.collapsable}">
      <h2 v-if="!layout.collapsable" class="font-serif_italic w-full lg:w-2/12" v-html="layout.heading" />

      <div v-if="layout.collapsable" class="w-full flex justify-between items-center mb-8">
        <h2 class="font-serif_italic w-2/12" v-html="layout.heading" />
        <CircleButton to="#" :click-handler="toggle">
          <span>{{ toggleLabel }}</span>
        </CircleButton>
      </div>

      <ul id="" class="w-full lg:w-9/12 flex flex-wrap justify-start items-start lg:-mx-8" :class="{'collapsed': !expanded, 'collapsable': layout.collapsable}">
        <li :class="columnWidthClass" class="text-list-column" v-html="layout.column_1" />
        <li v-if="layout.column_2" :class="columnWidthClass" class="text-list-column" v-html="layout.column_2" />
        <li v-if="layout.column_3" :class="columnWidthClass" class="text-list-column" v-html="layout.column_3" />
      </ul>
    </div>
  </Container>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'TextListAlt',
  mixins: [layout],
  data () {
    return {
      expanded: this.layout.collabsable && this.layout.collapsed
    }
  },
  computed: {
    columnWidthClass () {
      if (this.layout.column_3) {
        return 'w-1/2 lg:w-1/3'
      }
      return 'w-1/2'
    },
    toggleLabel () {
      if (this.expanded) {
        return 'Hide'
      }

      return 'Show All'
    }
  },
  methods: {
    toggle () {
      this.expanded = !this.expanded
    }
  }
}
</script>

<style scoped>
.collapsable {
  @apply relative overflow-hidden;
}

.collapsable::after {
  @apply block absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-white pointer-events-none z-10 opacity-0 transform translate-y-full transition-all duration-200;
  content: " ";
}

.collapsed.collapsable {
  @apply h-64;
}

.collapsed.collapsable::after {
  @apply opacity-100 translate-y-0;
}

.text-list-column {
  @apply pr-2 lg:px-4 mb-8 text-sm md:text-base lg:text-lg font-medium;
}
</style>
