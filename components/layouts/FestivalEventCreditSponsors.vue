<template>
  <div v-if="additionalCredits">
    <hr v-if="$store.state.theme==='bsf11'" class="block border-0 border-t-lg border-dotted border-black bg-transparent mb-10 mt-1">
    <Container>
      <div v-for="(additionalCredit, key) in additionalCredits" :key="`additionalCredit${key}`"  :class="{'mb-8': key+1 < additionalCredits.length, 'flex flex-wrap items-center justify-start': $store.state.theme==='festival'}">
        <h3 :class="{'text-xl mr-6': $store.state.theme==='festival', 'text-3xl font-medium mb-4': $store.state.theme==='bsf11', 'text-2xl mb-8 font-normal': $store.state.theme==='bsf12'}">
          {{ additionalCredit.label }}
        </h3>
        <div v-if="additionalCredit.type==='sponsor'" class="flex flex-wrap">
          <div v-for="sponsor in additionalCredit.sponsors" :key="`sponsor${sponsor.ID}`" class="sponsor mr-6">
            <SiteLink :to="sponsor.acf.website" target="_blank">
              <span v-html="($store.state.theme==='festival'||alt ? sponsor.acf.logo_black : sponsor.acf.logo)" />
            </SiteLink>
          </div>
        </div>
        <template v-if="additionalCredit.type==='manual'">
          <SiteLink v-if="additionalCredit.link" :to="additionalCredit.link|replaceSiteUrl" target="_blank">
            <FestivalManualCredit :credit="additionalCredit" />
          </SiteLink>
          <FestivalManualCredit v-if="!additionalCredit.link" :credit="additionalCredit" />
        </template>
        <div v-if="additionalCredit.type==='manual_multiple'" class="flex flex-wrap items-center justify-start">
          <span v-for="(manualCredit, manualCreditKey) in additionalCredit.manual_credits" :key="`manualCredit${manualCreditKey}`" class="flex flex-wrap items-center mr-4">
            <SiteLink v-if="manualCredit.link" :to="manualCredit.link|replaceSiteUrl" target="_blank">
              <FestivalManualCredit :credit="manualCredit" />
            </SiteLink>
            <FestivalManualCredit v-if="!manualCredit.link" :credit="manualCredit" />
            <span v-if="additionalCredit.manual_credits.length>1&&(manualCreditKey+1)<additionalCredit.manual_credits.length" :class="{'font-festival_sans_light_italic': $store.state.theme==='festival'}"><span v-if="manualCreditKey+2<additionalCredit.manual_credits.length">,</span><span v-else class="ml-4"> &amp;</span></span>
          </span>
        </div>
      </div>
    </Container>
  </div>
</template>

<script>
export default {
  name: 'FestivalEventCreditSponsors',
  props: {
    additionalCredits: {
      type: Array,
      required: true
    },
    alt: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
