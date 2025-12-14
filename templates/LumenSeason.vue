<template>
  <div>
    <ManyLumensHero />
    <section class="bg-lumenOrange">
      <ScrollMarquee symbol="arrows-down" :word2="season.name" word1="Episodes" force-colour="black" />
    </section>
    <Space :md="true" />
    <FlexiblePostsCarousel :layout="{type: 'lumen-episode', 'season': season.id, 'colour': 'black'}" />
    <Space :md="true" />
    <ManyLumensNetworks />
  </div>
</template>

<script>
export default {
  name: 'LumenSeason',
  props: {
    season: {
      type: Object,
      required: true
    }
  }
}
</script>
