<template>
  <div v-if="items&&items.length">
    <Space v-if="!alt" />
    <Space v-if="!alt" />
    <Festival23H3 v-if="!alt" size="md">
      {{ heading }}
    </Festival23H3>
    <div v-for="item in items" :key="`${item.id}`">
      <Space />
      <div v-if="alt" class="border-t-2 border-inherit">
        <Space />
        <Festival23H3 size="lg">
          <span v-html="item.title.rendered" />
        </Festival23H3>
        <Festival23EventInstance :event-instance="item" :alt="true" />
      </div>
      <Festival23RichCard v-else :card="{'type': 'festival-event', 'event': item}" :section-colour="sectionColour" />
    </div>
    <Space v-if="alt" />
  </div>
</template>

<script>
import Festival23SectionColors from '~/mixins/festival23SectionColors'

export default {
  name: 'Festival23UpNextListings',
  mixins: [Festival23SectionColors],
  props: {
    heading: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    alt: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
