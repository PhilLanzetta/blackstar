<template>
  <Container>
    <SeenHeadingSmall :heading="layout.heading" />
    <div class="-mt-4">
      <SeenAccordionItem
        v-for="(item, key) in visibleIssues"
        :id="key"
        :key="`item${key}`"
        :title="item.name"
        :index="(key+1)"
      >
        <div class="sm:flex sm:space-x-5 lg:pace-x-20 items-start justify-between">
          <div class="sm:w-1/2 lg:w-1/3">
            <h3 class="font-seen_serif underline underline-offset-4 mb-2 text-lg lg:text-2xl" v-html="item.acf.guest_editors.heading"></h3>
            <ul class="lg:flex flex-wrap -mx-8">
              <li v-for="(editor, editorKey) in item.acf.guest_editors.editors" :key="`item${key}Editor${editorKey}`">
                <strong v-html="editor.name"></strong> <span v-if="editor.role" v-html="editor.role"></span>
              </li>
            </ul>
          </div>
          <div class="sm:w-1/2 lg:w-7/12">
            <h3 class="font-seen_serif underline underline-offset-4 mb-2 text-lg lg:text-2xl" v-html="item.acf.contributors.heading"></h3>
            <div v-html="item.acf.contributors.contributors"></div>
          </div>
        </div>
      </SeenAccordionItem>
    </div>
  </Container>
</template>

<script>
import livedata from '~/mixins/livedata'
import layout from '~/mixins/layout'

export default {
  name: 'SeenIssueCredits',
  mixins: [livedata, layout],
  async fetch () {
    this.items = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/seen-issue?routes=1`)
  },
  computed: {
    visibleIssues () {
      return this.items.filter((item) => {
        return item.acf.show_in_about
      })
    }
  }
}
</script>

<style scoped>
ul li {
  @apply text-lg font-seen_serif_light_italic px-8 mb-8 w-1/2;
}

ul li strong {
  @apply font-seen_serif_light block;
}
</style>
