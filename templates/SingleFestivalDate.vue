<template>
  <section>
    <template v-if="$store.state.theme!=='bsf12'">
      <Space :lg="true" />
      <FestivalSchedule :layout="{title: `Events on ${dateTag.name}`, filter_events: true, filter_by_venue: [], filter_by_date: [dateTag.id], filter_by_tag: []}" :all="true" />
      <Space :lg="true" />
    </template>
    <template v-if="$store.state.theme==='bsf12'">
      <Festival23Section background="bsf12blue">
        <Container>
          <Festival23H2 size="xl">
            Events on <span v-html="dateTag.name" />
          </Festival23H2>
        </Container>
        <Space :md="true" />
        <Festival23RichCardCarousel :layout="{type: 'dated', dates: [dateTag.id]}" section-colour="bsf12blue" />
        <Space :lg="true" />
        <Space :lg="true" />
      </Festival23Section>
    </template>
  </section>
</template>

<script>
export default {
  name: 'SingleFestivalDate',
  props: {
    dateTag: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
