<template>
  <Festival23Box :bg="`bg-${sectionColour}`" :outline="true">
    <div class="px-4 pt-3 pb-0 2xl:px-6 2xl:py-4 flex flex-wrap h-full">
      <div class="pb-20 w-full">
        <Festival23H3 size="md" v-html="card.heading" />
        <Festival23Prose class="my-4 block xl:pr-10 2xl:pr-16" v-html="card.content" />
      </div>
      <div class="flex justify-between items-end w-full mt-auto mb-0">
        <Festival23Buttons v-if="card.buttons&&card.buttons.length" :buttons="card.buttons" />
        <Festival23Icon v-if="card.icon&&card.icon!=='none'" :icon="card.icon" :large="true" />
      </div>
    </div>
  </Festival23Box>
</template>

<script>
import festival23SectionColors from '~/mixins/festival23SectionColors'

export default {
  name: 'Festival23Card',
  mixins: [festival23SectionColors],
  props: {
    card: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
