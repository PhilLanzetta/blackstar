<template>
  <article>
    <FestivalFlexibleLayouts :post="venue" />
    <section v-if="venue.acf.hide_events!==true&&(venue.count>0||($store.state.liveData))" class="overflow-hidden">
      <Container v-if="$store.state.theme==='bsf11'">
        <Space :lg="true" />
        <h1 class="text-5xl xl:text-8xl font-bsf11_sans relative z-20">
          <span class="block text-5xl">Events at</span>
          <span v-html="venue.name" />
        </h1>
      </Container>
      <template v-if="$store.state.theme==='festival'">
        <Space :lg="true" />
        <FestivalSchedule
          keep-alive
          :layout="{title: ($store.state.theme==='festival' ? `Events at ${venue.name}` : ''), filter_events: true, filter_by_venue: [venue.id], festival_year: venue.acf.year, filter_by_date: [], filter_by_tag: []}"
          :all="true"
        />
        <Space :lg="true" />
      </template>
      <template v-if="$store.state.theme==='bsf12'">
        <Festival23Section background="bsf12yellow">
          <Container>
            <Festival23H2 size="xl">
              Events at <span v-html="venue.name" />
            </Festival23H2>
          </Container>
          <Space :md="true" />
          <Festival23RichCardCarousel :layout="{type: 'venue', venue: venue.id}" section-colour="bsf12yellow" />
        </Festival23Section>
      </template>
      <template v-if="$store.state.theme==='bsf13'">
        <Festival24Section :section="{background: 'beige', layouts: [], style: 'full'}" :extra-padding="true">
          <div class="border-b border-black">
            <Container>
              <Space />
              <p>
                <Festival24Button :back-arrow="true" to="/festival-2024/schedule/">
                  Back to schedule
                </Festival24Button>
              </p>
              <Space />
              <Space />
              <Festival24Heading :layout="{heading: `Events at ${venue.name}`}" />
              <Space />
              <Space />
            </Container>
          </div>
          <Space />
          <Space />
          <Festival24RichCardGrid :layout="{type: 'venue', venue: venue.id}" />
          <Space />
          <Space />
          <Space />
        </Festival24Section>
      </template>
      <template v-if="$store.state.theme==='bsf14'">
        <Festival24Section :section="{background: 'offWhite', layouts: [], style: 'full'}" :extra-padding="true">
          <div>
            <Container>
              <Space />
              <p>
                <Festival24Button :back-arrow="true" to="/festival/schedule/">
                  Back to schedule
                </Festival24Button>
              </p>
              <Space />
              <Space />
              <Festival24Heading :layout="{heading: `Events at ${venue.name}`}" />
              <Space />
              <Space />
            </Container>
          </div>
          <Space />
          <Space />
          <Festival24RichCardGrid :layout="{type: 'venue', venue: venue.id}" background="bsf14Pink" />
          <Space />
          <Space />
          <Space />
        </Festival24Section>
      </template>
    </section>
  </article>
</template>

<script>

export default {
  name: 'SingleFestivalVenue',
  props: {
    venue: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
