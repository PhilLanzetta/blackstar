<template>
  <div class="flex flex-wrap -mx-4">
    <div v-for="(bio, key) in bios" :key="`directors-spotlight-${bio.id}`" class="w-full sm:w-1/2 xl:w-1/3 p-4">
      <Festival23Bio
        :index="key"
        :team-member="bio"
        :event-id="eventId"
        :show-photo="true"
        :short="true"
        :show-email="false"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'Festival23DirectorsSpotlight',
  props: {
    bios: {
      type: Array,
      required: true
    },
    eventId: {
      type: Number,
      required: false,
      default: null
    }
  }
}
</script>

<style scoped>

</style>
