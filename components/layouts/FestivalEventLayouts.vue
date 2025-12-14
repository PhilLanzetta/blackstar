<template>
  <div>
    <section v-for="(layout, key) in layouts" :key="`layout${key}`">
      <FestivalEventTrailer v-if="layout.acf_fc_layout==='trailer'&&eventLayout==='default'" :layout="layout" :cover-image="coverImage" />
      <FestivalEventBios v-if="layout.acf_fc_layout==='bios'" :layout="layout" :event-id="eventId" />
    </section>
  </div>
</template>

<script>
export default {
  name: 'FestivalEventLayouts',
  props: {
    layouts: {
      type: Array,
      required: true
    },
    eventLayout: {
      type: String,
      required: true
    },
    eventId: {
      type: Number,
      required: false,
      default: null
    },
    coverImage: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<style scoped>

</style>
