<template>
  <ClientOnly>
    <Festival24Modal :close-modal-callback="handleClose" :small="true" :colour="($store.state.theme === 'bsf14' ? 'bsf14pinkTint' : 'bsf13purple')">
      <Festival24Box class="relative " :class="{'bg-bsf13purple': $store.state.theme === 'bsf13', 'bg-bsf14pinkTint': $store.state.theme === 'bsf14'}">
        <div class="px-6 py-2 relative z-50">
          <Festival24SecondaryHeading v-if="$store.state.festival.downloads.heading" :layout="{heading: $store.state.festival.downloads.heading}" />
          <Space />
          <ul class="space-y-3">
            <li v-for="(download, downloadKey) in $store.state.festival.downloads.downloads" :key="`download${downloadKey}`"><a :href="download.link.url" target="_blank" class="flex space-x-4 leading-none items-center"><span>{{ download.link.title }}</span> <Festival24Icon class="flex-shrink-0" icon="download-small" :small="true" /></a></li>
          </ul>
        </div>
      </Festival24Box>
    </Festival24Modal>
  </ClientOnly>
</template>

<script>
export default {
  name: 'Festival24DownloadsModal',
  watch: {
    '$nuxt.$route' () {
      this.$nextTick(() => {
        this.handleClose()
      })
    }
  },
  methods: {
    handleClose () {
      this.$store.commit('festival/setDownloads', null)
    }
  }
}
</script>

<style scoped>

</style>
