<template>
  <section class="festival-text-spotlight" :class="`festival-text-spotlight--${$store.state.theme}`">
    <Container>
      <div class="relative">
        <FestivalHeading v-if="layout.title" :butted="true" background-class="bg-blue text-white">
          {{ layout.title }}
        </FestivalHeading>
        <div class="festival-text-spotlight__inside">
          <FestivalSubHeading v-if="layout.subtitle&&$store.state.theme==='festival'" class="-mt-border -ml-border -mr-border">
            <span class="font-festival_sans_italic">{{ layout.subtitle }}</span>
          </FestivalSubHeading>
          <h2 v-if="layout.subtitle&&$store.state.theme==='bsf11'" v-html="layout.subtitle"></h2>
          <div class="festival-text-spotlight__inside__content">
            <CursorInteractInside><FestivalProse><div v-html="layout.content" /></FestivalProse></CursorInteractInside>
          </div>
          <FestivalSubHeadingLink
            v-if="layout.action&&$store.state.theme==='festival'"
            class="-mb-border -ml-border -mr-border justify-end"
            :to="layout.action.url|replaceSiteUrl"
          >
            {{ layout.action.title }}
          </FestivalSubHeadingLink>
          <div v-if="layout.action&&$store.state.theme==='bsf11'" class="flex items-start flex-wrap justify-start mt-8">
            <FestivalButton :to="layout.action.url|replaceSiteUrl" class="mr-4">
              <span v-html="layout.action.title" />
            </FestivalButton>
          </div>
        </div>
        <LazyRellaxShape v-if="$store.state.theme==='festival'" key="shape3" class="-top-2/3 left-5 z-0 w-1/3 xl:w-60">
          <ShapeThree />
        </LazyRellaxShape>
      </div>
    </Container>
  </section>
</template>

<script>
import layout from '~/mixins/layout'
import ShapeThree from '~/assets/festival/shape-3.svg?inline'
import FestivalSubHeadingLink from '~/components/global/FestivalSubHeadingLink'

export default {
  name: 'FestivalSpotlightText',
  components: { FestivalSubHeadingLink, ShapeThree },
  mixins: [layout]
}
</script>

<style>
.festival-text-spotlight__inside {
  @apply relative z-10;
}

.festival-text-spotlight__inside__content {
  @apply relative;
}

.festival-text-spotlight--festival .festival-text-spotlight__inside {
  @apply border-5 border-navy bg-beige;
}

.festival-text-spotlight--festival .festival-text-spotlight__inside__content {
  @apply px-6 py-14 max-w-4xl mx-auto;
}

.festival-text-spotlight--bsf11 .festival-text-spotlight__inside {
  @apply border-4 lg:border-md 2xl:border-lg border-black rounded-3xl xl:rounded-4xl bg-bsf11Yellow font-medium font-sans text-2xl px-5 py-8 xl:p-20;
}

.festival-text-spotlight--bsf11 .festival-text-spotlight__inside h2 {
  @apply font-bsf11_sans text-4xl lg:text-5xl 2xl:text-6xl mb-8;
}
</style>
