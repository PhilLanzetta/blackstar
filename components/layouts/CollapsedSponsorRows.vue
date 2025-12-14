<template>
  <div>
    <div
      v-for="(section, sectionKey) in layout.sections"
      :key="sectionKey"
      :class="{'hidden': sectionKey!==0&&!expanded}"
    >
      <Container>
        <div class="flex justify-between items-center">
          <div :class="`text-${section.colour}`" class="ml-52">
            <Spinner :text="section.label" />
          </div>
          <CircleButton v-if="sectionKey===0" to="#" :click-handler="toggle">
            <span>{{ toggleLabel }}</span>&nbsp;<span v-html="layout.toggle_label" />
          </CircleButton>
        </div>
      </Container>
      <NegativeSpace :md="true" />
      <SponsorsRow
        v-for="(sponsorRow, sponsorRowKey) in section.sponsor_rows"
        :key="sponsorRowKey"
        :layout="sponsorRow"
      />
    </div>
  </div>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'CollapsedSponsorRows',
  mixins: [layout],
  data () {
    return {
      expanded: false
    }
  },
  computed: {
    toggleLabel () {
      if (this.expanded) {
        return 'Hide'
      }

      return 'Show'
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

</style>
