<template>
  <div>
    <cite
      v-if="!credit.logo"
      class="text-xl"
      :class="{'font-festival_sans_light_italic': $store.state.theme==='festival', 'not-italic': $store.state.theme!=='festival'}"
      v-html="(credit.credit ? credit.credit : credit.name)"
    />
    <div v-if="credit.logo" class="flex flex-wrap justify-start">
      <div class="sponsor-img sponsor-img--small">
        <span>
          <span class="sponsor-img__img" v-html="credit.logo" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FestivalManualCredit',
  props: {
    credit: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
