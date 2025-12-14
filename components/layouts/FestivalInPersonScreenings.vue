<template>
  <section>
    <Container>
      <Space :md="true" />
      <div class="overflow-hidden">
        <div class="listing-grid">
          <div
            v-for="(screening, key) in screenings"
            :key="`screening${key}`"
            class="listing-grid__item"
          >
            <ListingFestivalEvent
              :screening-time="screening.time"
              :post="screening.event"
              :screening="true"
              :show-time="showTime"
            />
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>

<script>
export default {
  name: 'FestivalInPersonScreenings',
  props: {
    screenings: {
      type: Array,
      required: true
    },
    showTime: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
