<template>
  <SiteLink
    :to="to"
    :click-handler="clickHandler"
    :class-names="`festival-24-btn festival-24-btn--${modifier}` + (active ? ' festival-24-btn--active ' : '') + (small ? ' festival-24-btn--small ' : '') + ($store.state.theme ==='bsf14' ? ` festival-25-btn festival-25-btn--${modifier} ` : '')"
  >
    <svg v-if="backArrow" class="w-6 h-5 block">
      <use xlink:href="#icon-arrow-left" />
    </svg>
    <span><slot /></span><span v-if="target&&target==='_blank'"><svg
      width="10"
      height="9"
      viewBox="0 0 10 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.62267 7.37999H8.11067V2.84399L1.99067 8.96399L0.784668 7.77599L6.90467 1.65599L2.36867 1.67399V0.161987H9.60467L9.62267 7.37999Z"
        fill="currentColor"
      />
    </svg>
    </span>
  </SiteLink>
</template>

<script>
export default {
  name: 'Festival24Button',
  props: {
    to: {
      type: String,
      required: false,
      default: ''
    },
    clickHandler: {
      type: Function,
      required: false,
      default: null
    },
    target: {
      type: String,
      required: false,
      default: null
    },
    active: {
      type: Boolean,
      required: false,
      default: false
    },
    modifier: {
      type: String,
      required: false,
      default: 'default'
    },
    backArrow: {
      type: Boolean,
      required: false,
      default: false
    },
    small: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style>
.festival-24-btn {
  @apply flex items-center justify-between space-x-3 rounded-full py-1.5 px-7 w-fit sm:text-lg  border border-solid transition-colors duration-200 leading-normal;
}

.festival-24-btn--small {
  @apply rounded-md py-1 px-2 text-sm;
}

.festival-24-btn--inverse {
  @apply border-white hover:bg-white hover:text-black;
}

.festival-24-btn--default {
  @apply border-black hover:bg-black hover:text-white;
}

.festival-24-btn--default.festival-24-btn--active {
  @apply bg-black text-white;
}

.festival-24-btn--inverse-solid {
  @apply border-white bg-white text-black hover:bg-black hover:text-white;
}

.festival-24-btn--solid {
  @apply bg-black text-white hover:bg-beige hover:text-black;
}

.festival-25-btn--event-guide {
  @apply  bg-bsf14orangeTint border-bsf14orangeTint text-black hover:bg-black hover:border-black hover:text-bsf14orangeTint;
}

.festival-25-btn--film-guide {
  @apply  bg-bsf14yellow border-bsf14yellow text-black hover:bg-black hover:border-black hover:text-bsf14yellow;
}

.bsf14-wrap .festival-24-btn--solid {
  @apply border-none;
}
</style>
