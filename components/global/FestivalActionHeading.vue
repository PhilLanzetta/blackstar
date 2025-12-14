<template>
  <div class="festival-action-link relative z-10" :class="{'lg:flex items-start': !block, 'flex items-start': forceFlex}">
    <SiteLink :class="{'w-full': fullWidth}" :to="to" :click-handler="clickHandler" :class-names="classNames">
      <span class="flex items-center justify-start space-x-4 text-left"><span><slot /></span> <SmallArrowRight v-if="!hideArrow" class="festival-action-link__arrow block flex-shrink-0" :class="(reduced ? 'w-3 h-3' : 'w-4 h-4')" /></span>
    </SiteLink>
  </div>
</template>

<script>
import SmallArrowRight from '~/assets/festival/small-arrow-right.svg?inline'

export default {
  name: 'FestivalActionHeading',
  components: { SmallArrowRight },
  props: {
    to: {
      type: String,
      required: false,
      default: ''
    },
    backgroundClass: {
      type: String,
      required: false,
      default: 'bg-white'
    },
    borderClass: {
      type: String,
      required: false,
      default: 'border-navy'
    },
    textClass: {
      type: String,
      required: false,
      default: 'text-navy'
    },
    widthClass: {
      type: String,
      required: false,
      default: ''
    },
    butted: {
      type: Boolean,
      required: false,
      default: false
    },
    reduced: {
      type: Boolean,
      required: false,
      default: false
    },
    fullWidth: {
      type: Boolean,
      required: false,
      default: false
    },
    hideArrow: {
      type: Boolean,
      required: false,
      default: false
    },
    clickHandler: {
      type: Function,
      required: false,
      default: null
    },
    block: {
      type: Boolean,
      required: false,
      default: false
    },
    forceFlex: {
      type: Boolean,
      required: false,
      default: false
    },
    lg: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    classNames () {
      const classNames = ['font-festival_sans_light_italic border-5 block', this.backgroundClass, this.borderClass, this.widthClass]

      if (this.butted) {
        classNames.push('border-t-0')
      }

      if (this.reduced) {
        classNames.push('px-5 py-2 pr-7 text-base')
      } else if (this.lg) {
        classNames.push('px-5 py-3 xl:px-10 xl:py-7 text-base lg:text-xl xl:text-2xl')
      } else {
        classNames.push('px-5 py-4 xl:pr-7 text-base xl:text-2xl')
      }

      return classNames.join(' ')
    }
  }
}
</script>

<style>
.festival-action-link__arrow {
  @apply motion-safe:transition-transform duration-100;
}
.festival-action-link:hover .festival-action-link__arrow {
  @apply transform translate-x-1/4;
}
</style>
