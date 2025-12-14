<template>
  <div class="md:grid md:grid-cols-3 md:gap-8 xl:gap-12 space-y-6 md:space-y-0">
    <Festival24Box v-for="(explainer, key) in layout.explainer" :background="(explainer.background ? explainer.background : null)" :gradient-style="(explainer.gradient_style ? explainer.gradient_style : null)" :key="`explainer${key}`" class="explainer">
      <div class="explainer__inside">
        <div v-if="explainer.icon" class="max-w-[75px] xl:max-w-[100px] mb-2 lg:mb-10 flex-shrink-0 w-full pt-2 pr-4" v-html="explainer.icon" />
        <div>
          <Festival24SecondaryHeading :layout="{heading: explainer.heading}" />
          <Festival24Prose class="md:pr-4 my-4">
            <p v-if="explainer.description" v-html="explainer.description" />
          </Festival24Prose>
        </div>
      </div>
      <div class="mt-auto mb-0 w-full align-self-start">
        <Festival24Buttons v-if="explainer.buttons&&explainer.buttons.length" class="mt-4" :buttons="explainer.buttons" />
      </div>
    </Festival24Box>
  </div>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'Festival24Explainers',
  mixins: [layout]
}
</script>

<style scoped>
.explainer {
  @apply block md:flex flex-wrap items-stretch flex-row-reverse md:flex-row;
}

</style>
