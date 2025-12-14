<template>
  <Container>
    <div v-if="$store.state.theme==='festival'" class="flex flex-wrap justify-start">
      <FestivalActionHeading v-for="(action, key) in layout.call_to_actions" :key="`action${key}`" :to="action.link.url|replaceSiteUrl" class="mr-4" background-class="bg-yellow">
        <span v-html="action.link.title" />
      </FestivalActionHeading>
    </div>
    <div v-if="$store.state.theme==='bsf11'" class="flex flex-wrap justify-start">
      <FestivalButton v-for="(action, key) in layout.call_to_actions" :key="`action${key}`" :to="action.link.url|replaceSiteUrl" class="mr-4" background-class="bg-yellow">
        <span v-html="action.link.title" />
      </FestivalButton>
    </div>
  </Container>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'FestivalCallToActions',
  mixins: [layout]
}
</script>

<style scoped>

</style>
