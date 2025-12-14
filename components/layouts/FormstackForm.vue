<template>
  <div v-cursor-hide class="bg-purple cursor-auto">
    <Space :md="true" />
    <Container>
      <ClientOnly>
        <iframe
          v-resize="{ log: false, checkOrigin: [$axiosConfig.cmsUrl] }"
          data-not-lazy
          :src="formUrl"
          frameborder="0"
          border="0"
          width="100%"
        />
      </ClientOnly>
    </Container>
    <Space :md="true" />
  </div>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'FormstackForm',
  mixins: [layout],
  data () {
    return {
      formstackForm: null
    }
  },
  computed: {
    formUrl () {
      let url = `${this.$axiosConfig.cmsUrl}/?formstack-viewer=${this.layout.form}`

      if (this.$route.query) {
        for (const key in this.$route.query) {
          url += `&${key}=${this.$route.query[key]}`
        }
      }

      return url
    }
  }
}
</script>

<style scoped>

</style>
