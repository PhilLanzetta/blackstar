<template>
  <Container>
    <div class="-mx-4 xl:-mx-4 3xl:-mx-6 flex flex-wrap items-center justify-start">
      <div v-for="sponsor in items" :key="`sponsor${sponsor.id}`" class="p-4 xl:p-5 3xl:p-6">
        <a
          v-cursor-interact
          :href="sponsor.acf.website"
          class="block w-20 md:w-28 lg:w-36 xl:w-48 3xl:w-52"
          target="_blank"
          rel="noreferrer"
          v-html="(sectionColour === 'black' ? sponsor.acf.logo : sponsor.acf.logo_black)"
        />
      </div>
    </div>
  </Container>
</template>

<script>
import layout from '~/mixins/layout'
import livedata from '~/mixins/livedata'
import festival23SponsorsAbstract from '~/mixins/festival23SponsorsAbstract'
import festival23SectionColors from '~/mixins/festival23SectionColors'

export default {
  name: 'Festival23Sponsors',
  mixins: [layout, livedata, festival23SponsorsAbstract, festival23SectionColors]
}
</script>

<style scoped>

</style>
