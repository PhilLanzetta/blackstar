<template>
  <div>
    <Festival23SideSearch :section-colour="sectionColour" />

    <Space />
    <Space />

    <Festival23H3 size="sm" class="mb-2">
      Filter by
    </Festival23H3>

    <Festival23FilterGroup
      v-if="post.template!=='views/festival-virtual-guide.blade.php'"
      id="festival-venue-filter"
      key="festival-venue-filter"
      name="festival-venues"
      label="Venue"
    />
    <Festival23FilterGroup
      v-if="post.template!=='views/festival-event-guide.blade.php'"
      id="festival-award-filter"
      key="festival-award-filter"
      name="festival-awards"
      label="Award Nomination"
    />
    <Festival23FilterGroup
      v-if="post.template!=='views/festival-event-guide.blade.php'"
      id="festival-accessibility-filter"
      key="festival-accessibility-filter"
      name="accessibility"
      label="Accessibility Features"
    />
    <Festival23FilterGroup
      v-if="post.template!=='views/festival-event-guide.blade.php'"
      id="festival-premiere-filter"
      key="festival-premiere-filter"
      name="premiere-status"
      label="Premiere Status"
    />

    <Space />
    <Space />

    <Festival23FilterToggle
      v-if="post.template!=='views/festival-virtual-guide.blade.php'&&post.template!=='views/festival-event-guide.blade.php'"
      id="show-virtual-toggle"
      name="virtual"
      label="Also Show Virtual?"
      :alt="alt"
      :section-colour="sectionColour"
    />

    <Space />
    <template v-if=" post.acf.additional_links">
      <Space />

      <Festival23Links :links="post.acf.additional_links" />
      <Space />
    </template>
  </div>
</template>

<script>
import Festival23SectionColors from '~/mixins/festival23SectionColors'

export default {
  name: 'Festival23ScheduleFilters',
  mixins: [Festival23SectionColors],
  props: {
    post: {
      type: Object,
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
