<template>
  <div class="py-2 px-6">
    <Festival23SideSearch :section-colour="sectionColour" />

    <Space />
    <Space />

    <Festival23H3 size="md" class="mb-4">
      Filter by
    </Festival23H3>

    <Festival23FilterGroup
      id="festival-award-filter"
      key="festival-award-filter"
      name="festival-awards"
      label="Award Nomination"
    />
    <Festival23FilterGroup
      id="festival-accessibility-filter"
      key="festival-accessibility-filter"
      name="accessibility"
      label="Accessibility Features"
    />
    <Festival23FilterGroup
      id="festival-premiere-filter"
      key="festival-premiere-filter"
      name="premiere-status"
      label="Premiere Status"
    />

    <Space />
    <Space />

    <Festival23Links v-if="post.acf.additional_links" :links="post.acf.additional_links" />
    <Space />
  </div>
</template>

<script>
import Festival23SectionColors from '~/mixins/festival23SectionColors'

export default {
  name: 'Festival23FilmGuideFilters',
  mixins: [Festival23SectionColors],
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
