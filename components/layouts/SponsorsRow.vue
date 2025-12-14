<template>
  <section>
    <Container>
      <div
        class="pt-6 pb-10 lg:pb-20 border-t-2 border-dotted border-black"
        :class="{'lg:flex lg:space-x-4 justify-between items-start': (!layout.description_position || layout.description_position === 'side')}"
      >
        <div v-if="layout.description_position!=='below'" class="mb-8 font-serif_italic" :class="{'lg:w-5/12': (!layout.description_position || layout.description_position === 'side')}">
          <p v-html="layout.description" />
        </div>
        <div :class="{'lg:w-7/12': (!layout.description_position || layout.description_position === 'side')}">
          <div class="-mx-4 lg:-mx-8">
            <div class="flex flex-wrap items-center justify-start">
              <div v-for="(sponsor, key) in layout.sponsors" :key="`sponsor${key}`" class="w-1/2 px-4 md:w-1/3 xl:w-1/4 lg:px-8 pb-4 flex justify-center">
                <template v-if="sponsor.type==='sponsor'">
                  <SiteLink :to="sponsor.sponsor.acf.website" class="sponsor-img__img">
                    <span v-html="sponsor.sponsor.acf.logo_black" />
                  </SiteLink>
                </template>
                <template v-if="sponsor.type!=='sponsor'">
                  <SiteLink v-if="sponsor.manual_sponsor.link" :to="sponsor.manual_sponsor.link.url" class="sponsor-img__img">
                    <span v-html="sponsor.manual_sponsor.logo" />
                  </SiteLink>
                  <span v-if="!sponsor.manual_sponsor.link" class="sponsor-img__img" v-html="sponsor.manual_sponsor.logo" />
                </template>
              </div>
            </div>
          </div>
        </div>
        <div v-if="layout.description_position==='below'" class="mb-8 lg:mb-0 lg:w-5/12 font-serif_italic">
          <p v-html="layout.description" />
        </div>
      </div>
    </Container>
  </section>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'SponsorsRow',
  mixins: [layout]
}
</script>

<style scoped>

</style>
