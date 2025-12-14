<template>
  <Container>
    <div class="md:flex flex-wrap space-y-6 md:space-y-0 md:-mx-5 xl:-mx-10 2xl:-mx-16">
      <div v-for="(explainer, key) in layout.explainer" :key="`explainer${key}`" class="explainer">
        <div class="explainer__inside">
          <svg class="block w-24 h-24 md:w-32 md:h-32 md:mb-6 flex-shrink-0">
            <use :xlink:href="`#icon-tab-${key+1}`" />
          </svg>
          <div>
            <Festival23H3 class="mb-4 mt-0" size="lg" v-html="explainer.heading" />
            <Festival23Prose class="md:pr-4 my-4">
              <p v-if="explainer.description" v-html="explainer.description" />
            </Festival23Prose>
          </div>
        </div>
        <div class="mt-auto mb-0 w-full align-self-start">
          <Festival23Buttons v-if="explainer.buttons&&explainer.buttons.length" class="mt-4" :buttons="explainer.buttons" />
        </div>
      </div>
    </div>
  </Container>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'Festival23Explainers',
  mixins: [layout]
}
</script>

<style scoped>
.explainer {
  @apply block md:flex flex-wrap items-stretch flex-row-reverse md:flex-row md:w-1/3 md:px-5 xl:px-10 2xl:px-16;
}

.explainer__inside {
  @apply flex md:block items-stretch flex-row-reverse;
}

.explainer:nth-child(even) .explainer__inside {
  @apply flex-row;
}

.explainer:last-child .explainer__inside {
  @apply items-end;
}
</style>
