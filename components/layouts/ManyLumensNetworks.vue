<template>
  <section v-if="settings" class="bg-black text-white">
    <Space :md="true" />
    <Container>
      <h2 class="text-xl md:text-2xl lg:text-3xl xl:text-4xl border-b-4 border-dotted block py-4 lg:py-6 mb-8 lg:mb-20 font-medium" v-html="settings.networks.heading" />
      <div class="flex flex-wrap -mx-4 lg:-mx-20">
        <div v-for="(network, networkKey) in settings.networks.networks" :key="`network${networkKey}`" class="w-1/2 px-4 mb-8 lg:w-1/4 lg:px-20 lg:mb-20">
          <SiteLink :to="network.link|replaceSiteUrl" class="sponsor-img__img">
            <span v-html="network.logo" />
            <span class="sr-only">{{ network.name }}</span>
          </SiteLink>
        </div>
      </div>
    </Container>
    <Space :md="true" />
  </section>
</template>

<script>
export default {
  name: 'ManyLumensNetworks',
  data () {
    return {
      settings: null
    }
  },
  async fetch () {
    this.settings = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/blackstar/v1/many-lumens-settings`)
  }
}
</script>

<style scoped>

</style>
