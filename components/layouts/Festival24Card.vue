<template>
  <div class="w-full relative z-10 flex items-stretch" @mouseenter="active=true" @mouseleave="active=false">
    <Festival24Box class="w-full" :background="(card.inner_background ? card.inner_background : null)" :gradient-style="(card.inner_gradient_style ? card.inner_gradient_style : null)">
      <figure v-if="card.image||card.video" class="relative rounded-xl overflow-hidden aspect-w-16 aspect-h-10" :class="{'border border-black': $store.state.theme==='bsf13'}">
        <div v-if="card.image" class="cover-image" v-html="card.image" />
        <video
          v-if="card.video"
          class="absolute top-0 left-0 w-full h-full object-cover bg-black z-10"
          autoplay
          playsinline
          loop
          muted
        >
          <source type="video/mp4" :src="card.video">
        </video>
      </figure>
      <div v-if="card.icon" class="max-w-[75px] xl:max-w-[100px] flex-shrink-0 w-full pt-2 pr-4" v-html="card.icon" />
      <Space v-if="card.image||card.video||card.icon" />
      <Festival24SecondaryHeading v-if="card.heading_style==='secondary'" :layout="{heading: card.heading}" />
      <Festival24Heading v-else :layout="{heading: card.heading}" />
      <template v-if="card.content">
        <Space />
        <Festival24Prose :class="{'lg:columns-2 lg:gap-16': card.text_columns}">
          <span v-html="card.content" />
        </Festival24Prose>
      </template>
      <template v-if="card.extra_heading||card.extra_content">
        <Space />
        <Festival24SecondaryHeading v-if="card.extra_heading" :layout="{heading: card.extra_heading}" />
        <template v-if="card.extra_content">
          <Space />
          <Festival24Prose :class="{'lg:columns-2 lg:gap-16': card.text_columns}">
            <span v-html="card.extra_content" />
          </Festival24Prose>
        </template>
      </template>
      <template v-if="card.call_to_action">
        <Space />
        <Festival24Buttons :buttons="[{button: card.call_to_action, active: active}]" />
        <SiteLink :to="card.call_to_action.url|replaceSiteUrl" class-names="block absolute top-0 left-0 w-full h-full z-20">
          <span class="sr-only" v-html="card.call_to_action.title" />
        </SiteLink>
      </template>
      <template v-if="!card.call_to_action&&(card.buttons&&card.buttons.length)">
        <Space />
        <Festival24Buttons :buttons="card.buttons" />
      </template>
    </Festival24Box>
  </div>
</template>

<script>
export default {
  name: 'Festival24Card',
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      active: false
    }
  }
}
</script>
