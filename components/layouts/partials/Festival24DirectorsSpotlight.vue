<template>
  <div class="space-y-4">
    <div v-for="(bio, key) in bios" :key="`directors-spotlight-${bio.id}`">
      <Festival24Bio
        :index="key"
        :team-member="bio"
        :event-id="eventId"
        :show-photo="true"
        :short="true"
        :show-email="false"
        :alt="true"
        :background="background"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'Festival24DirectorsSpotlight',
  props: {
    bios: {
      type: Array,
      required: true
    },
    eventId: {
      type: Number,
      required: false,
      default: null
    },
    background: {
      type: String,
      required: false,
      default: null
    },
    gradientStyle: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<style scoped>

</style>
