<template>
  <div v-if="geoRestrictions||(post.accessibility&&post.accessibility.length)||post.acf.trigger_warning" :class="{'-mt-border': layout!=='default' && $store.state.theme==='festival'}">
    <Space v-if="$store.state.theme==='bsf11'" :md="true" />
    <div v-if="(post.accessibility||post.acf.trigger_warning)&&layout==='default'" class="flex flex-wrap items-start justify-start" :class="{'-ml-border -mb-border': layout==='default'&&$store.state.theme==='festival', 'text-navy text-lg -mr-border': $store.state.theme==='festival'}">
      <div v-for="accessTag in post.accessibility" :key="`accessTag${accessTag.id}`" class="access-tag" :class="`access-tag--${$store.state.theme}`">
        <template v-if="$store.state.theme==='festival'">
          <img v-if="accessTag.slug==='closed-captioning'" src="~/assets/festival/icon-cc.svg" class="w-10 h-10 block"><img v-if="accessTag.slug==='audio-described'" src="~/assets/festival/icon-ad.svg" class="w-10 h-10 block">
        </template><template v-if="$store.state.theme==='bsf11'">
          <img v-if="accessTag.slug==='closed-captioning'" src="~/assets/festival/11/icon-cc.svg" class="w-16 h-16 block"><img v-if="accessTag.slug==='audio-described'" src="~/assets/festival/11/icon-ad.svg" class="w-16 h-16 block">
        </template> <span v-html="accessTag.name" />
      </div>
      <div v-if="$store.state.theme==='bsf11'&&post.acf.trigger_warning" class="access-tag " :class="`access-tag--${$store.state.theme}`">
        <img src="~/assets/festival/11/icon-trigger.svg" class="w-16 h-16 block"> <span>Trigger Warning: <span v-html="post.acf.trigger_warning" /></span>
      </div>
    </div>
    <template v-if="$store.state.theme==='festival'">
      <div v-if="post.acf.trigger_warning" class="flex items-start">
        <p class="text-base lg:text-lg font-festival_sans_italic text-white border-5 border-navy py-1 px-6 bg-red max-w-4xl block -mr-border" :class="{'-ml-border': layout==='default', '-mb-border': post.accessibility}">
          <span class="font-festival_sans_light_italic">Trigger Warning:</span> <span v-html="post.acf.trigger_warning" />
        </p>
      </div>
    </template>
    <div v-if="geoRestrictions" class="flex items-start">
      <Space v-if="$store.state.theme==='bsf11'" :sm="true" />
      <p :class="{'-ml-border': layout==='default'&&$store.state.theme==='festival', '-mb-border': post.accessibility&&$store.state.theme==='festival', 'font-festival_sans text-navy border-5 border-navy py-1 px-6 bg-yellow max-w-4xl block -mr-border text-base lg:text-lg': $store.state.theme==='festival', 'text-2xl': $store.state.theme==='bsf11'}">
        <span :class="{'font-festival_sans_light_italic': $store.state.theme==='festival'}">This content can only be viewed in authorized regions:</span> <span>{{ geoRestrictions }}</span>
      </p>
    </div>
    <Space v-if="$store.state.theme==='bsf11'" :md="true" />
  </div>
</template>

<script>
export default {
  name: 'FestivalEventWarnings',
  props: {
    post: {
      type: Object,
      required: true
    },
    layout: {
      type: String,
      required: true
    },
    virtualPost: {
      type: Object,
      required: false,
      default: null
    }
  },
  computed: {
    postForRestrictions () {
      if (this.virtualPost) {
        return this.virtualPost
      }

      return this.post
    },
    geoRestrictions () {
      if (!this.postForRestrictions.geo_restrictions) {
        return false
      }

      if (!this.postForRestrictions.geo_restrictions.length) {
        return false
      }

      const names = this.postForRestrictions.geo_restrictions.map((restriction) => {
        return restriction.name
      })

      return names.join(', ') + '.'
    }
  }
}
</script>

<style scoped>

.access-tag {
  @apply flex items-center space-x-3  pr-10 mr-4 mb-4 ;
}

.access-tag--festival {
  @apply border-5 border-navy justify-start bg-white font-festival_sans_italic px-6 py-3  pr-14  border-l-0
}

.access-tag--festival:first-child {
  @apply border-l-5;
}

.access-tag--bsf11 {
  @apply font-bsf11_sans text-2xl;
}
</style>
