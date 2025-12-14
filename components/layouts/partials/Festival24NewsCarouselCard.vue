<template>
  <article class="h-full relative flex flex-wrap flex-col border-inherit border rounded-3xl w-full p-6 lg:p-8 mb-0.5">
    <div class="rounded-xl overflow-hidden [&>img]:object-cover aspect-w-16 aspect-h-10 !h-min w-full [&>img]:h-full [&>img]:w-full border object-cover">
      <SiteLink :to="card.link|replaceSiteUrl"><span v-html="card.featured_image_rendered" ></span></SiteLink>
    </div>

    <div class="py-4">
      <p v-if="card.acf.type" class="pb-1 lg:pb-2 font-medium">{{card.acf.type}}</p>
      <SiteLink :to="card.link|replaceSiteUrl">
      <h2 class="text-2xl lg:text-3xl font-normal">{{ card.title.rendered }}</h2>
      </SiteLink>
      <p v-if="card.date" class="font-medium pt-2">{{ card.date|formatDateAltShort }}</p>
    </div>
    <Festival24Button class="mt-auto" :to="card.link|replaceSiteUrl">
      Read more
    </Festival24Button>
  </article>
</template>

<script>
export default {
  name: 'Festival24NewsCarouselCard',
  props: {
    card: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
