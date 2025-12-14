<template>
  <span :class="`festival-btn-wrapper festival-btn-wrapper--${$store.state.theme} ${(alt ? ' festival-btn-wrapper--alt' : '')} ${(alt2 ? ' festival-btn-wrapper--alt2' : '')} ${(active ? ' festival-btn-wrapper--active' : '')}`">
    <SiteLink :class-names="classNames" :click-handler="clickHandler" :to="to">
      <slot />
    </SiteLink>
  </span>
</template>

<script>

export default {
  name: 'FestivalButton',
  props: {
    to: {
      type: String,
      required: true
    },
    defaultFont: {
      type: String,
      required: false,
      default: 'festival_sans'
    },
    butted: {
      type: Boolean,
      required: false,
      default: false
    },
    alt: {
      type: Boolean,
      required: false,
      default: false
    },
    alt2: {
      type: Boolean,
      required: false,
      default: false
    },
    active: {
      type: Boolean,
      required: false,
      default: false
    },
    clickHandler: {
      type: Function,
      required: false,
      default: null
    }
  },
  computed: {
    classNames () {
      return ['festival-btn fade-colours', `festival-btn--${this.$store.state.theme}`, (this.butted ? ' festival-btn--butted ' : ''), (this.alt ? ' festival-btn--alt ' : ''), (this.active ? ' festival-btn--active ' : ''), (this.alt2 ? ' festival-btn--alt2 ' : '')].join(' ')
    }
  }
}
</script>

<style>
.festival-btn {
  @apply inline-block border-5 w-auto leading-none leading-none;
}

.festival-btn--festival {
  @apply font-festival_sans border-navy text-navy bg-pink text-xs xl:text-sm  px-4 py-2 xl:py-2.5;
}

.festival-btn--festival.festival-btn:hover {
  @apply font-festival_sans_italic bg-white;
}

.festival-btn--festival.festival-btn--butted {
  @apply border-t-0;
}

.festival-btn--festival.festival-btn--alt {
  @apply bg-white;
}

.festival-btn--festival.festival-btn--alt:hover {
  @apply bg-pink;
}

.site-nav.site-nav--bsf11 li a.festival-btn--bsf11,
.festival-btn--bsf11 {
  @apply bg-white rounded-xl font-bsf11_sans border-3 lg:border-4 border-black text-2xl px-4 py-0.5 relative z-20;
}

.site-nav.site-nav--bsf11 li a.festival-btn--bsf11:hover {
  @apply font-bsf11_sans;
}

.festival-btn-wrapper--bsf11::before,
.festival-btn-wrapper--bsf11::after {
  @apply absolute top-0 left-0 transform translate-x-0 translate-y-0 transition-transform duration-100 block rounded-xl border-3 lg:border-4 border-black w-full h-full z-0;

  content: " ";
}

.festival-btn-wrapper--bsf11::before {
  @apply bg-bsf11Yellow z-10;
}

.festival-btn-wrapper--bsf11::after {
  @apply bg-bsf11Teal;
}

.festival-btn--bsf11.festival-btn--alt {
  @apply bg-bsf11Yellow;
}

.festival-btn-wrapper--bsf11.festival-btn-wrapper--alt::before {
  @apply bg-white;
}

.festival-btn--bsf11.festival-btn--alt2 {
  @apply bg-bsf11Teal;
}

.festival-btn-wrapper--bsf11.festival-btn-wrapper--alt2::after {
  @apply bg-white;
}

.festival-btn--bsf11.festival-btn--active,
.festival-btn-wrapper--bsf11.festival-btn-wrapper--active::before {
  @apply bg-bsf11Teal;
}

.festival-btn-wrapper--bsf11 {
  @apply inline-block relative;
}

.festival-btn-wrapper--bsf11:hover::before,
.festival-btn-wrapper--bsf11.festival-btn-wrapper--active::before {
  @apply translate-y-1.5 translate-x-1.5;
}

.festival-btn-wrapper--bsf11:hover::after,
.festival-btn-wrapper--bsf11.festival-btn-wrapper--active::after  {
  @apply translate-y-3 translate-x-3 delay-75;
}
</style>
