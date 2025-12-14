<template>
  <section>
    <template v-if="$store.state.theme!=='bsf12'">
      <Space :lg="true" />
      <FestivalSchedule :layout="{title: `${tag.name} Events`, filter_events: true, filter_by_venue: [], filter_by_date: [], filter_by_tag: [tag.id]}" :all="true" />
      <Space :lg="true" />
    </template>
    <template v-if="$store.state.theme==='bsf12'">
      <Festival23Section background="bsf12blue">
        <Container>
          <Festival23H2 size="xl">
            Events tagged <span v-html="tag.name" />
          </Festival23H2>
        </Container>
        <Space :md="true" />
        <Festival23RichCardCarousel :layout="{type: 'tagged', tags: [tag.id]}" section-colour="bsf12blue" />
        <Space :lg="true" />
        <Space :lg="true" />
      </Festival23Section>
    </template>
  </section>
</template>

<script>
export default {
  name: 'SingleFestivalTag',
  props: {
    tag: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
