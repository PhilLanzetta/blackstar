<template>
  <div class="festival-23-box" :style="{'--box-bg': backgroundColour}" :class="{'festival-23-box--hover-bg': hoverBg, 'festival-23-box--hover-bg-alt': hoverBgAlt, 'festival-23-box--no-outline': !outline, 'festival-23-box--inverse': inverse, 'festival-23-box--sm': small, 'festival-23-box--xs': xSmall, 'text-white': bg==='bg-black'}">
    <span class="festival-23-box__top"><span /></span>
    <div class="festival-23-box__inside">
      <slot />
    </div>
    <span v-if="bottom" class="festival-23-box__bot"><span /></span>
  </div>
</template>

<script>
export default {
  name: 'Festival23Box',
  props: {
    bg: {
      type: String,
      required: false,
      default: 'bg-bsf12Bg'
    },
    hoverBg: {
      type: Boolean,
      required: false,
      default: false
    },
    hoverBgAlt: {
      type: Boolean,
      required: false,
      default: false
    },
    outline: {
      type: Boolean,
      required: false,
      default: true
    },
    inverse: {
      type: Boolean,
      required: false,
      default: false
    },
    small: {
      type: Boolean,
      required: false,
      default: false
    },
    xSmall: {
      type: Boolean,
      required: false,
      default: false
    },
    bottom: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  computed: {
    backgroundColour () {
      if (this.bg === 'bg-bsf12blue') {
        return '#72f5ff'
      }

      if (this.bg === 'bg-bsf12green') {
        return '#00ef9d'
      }

      if (this.bg === 'bg-bsf12yellow') {
        return '#e7ef5a'
      }

      if (this.bg === 'bg-black') {
        return '#000'
      }

      if (this.bg === 'bg-white') {
        return '#fff'
      }

      return '#ebe8e2'
    }
  }
}
</script>

<style scoped>
.festival-23-box {
  @apply relative flex flex-col flex-wrap select-none;
}

.festival-23-box--hover-bg:hover {
  --box-bg: #ebe8e2 !important;
}

.festival-23-box--hover-bg-alt:hover {
  --box-bg: #000 !important;

  @apply text-white;
}

.festival-23-box__top,
.festival-23-box__bot {
  @apply w-full h-6 flex relative;
}

.festival-23-box__top > span,
.festival-23-box__bot > span {
  @apply block flex-grow leading-none border-black text-xl;

  background-color: var(--box-bg);
}

.festival-23-box__top > span {
  @apply border-t-2;
}

.festival-23-box__bot > span {
  @apply border-b-2;
}

.festival-23-box__top > span::before,
.festival-23-box__top > span::after,
.festival-23-box__bot > span::before,
.festival-23-box__bot > span::after {
  @apply absolute top-0 left-0 block z-10;

  content: " ";
  background: url('assets/festival/12/corner-outline.svg') no-repeat;
  background-size: 100% 100%;
  width: 25px;
  height: 25px;
}

.festival-23-box__bot > span::before,
.festival-23-box__bot > span::after {
  margin-top: -1px;
}

.festival-23-box__bot > span::before,
.festival-23-box__top > span::after {
  @apply transform rotate-90;
}

.festival-23-box__top > span::after,
.festival-23-box__bot > span::after {
  @apply left-auto right-0;
}

.festival-23-box__top::before,
.festival-23-box__top::after,
.festival-23-box__bot::before,
.festival-23-box__bot::after {
  @apply block w-6 h-[102%];

  content: " ";
  background-color: var(--box-bg);
}

.festival-23-box__top::before {
  clip-path: polygon(0% 100%, 100% 0%, 100% 100%);
}

.festival-23-box__top::after {
  clip-path: polygon(0% 0%, 0% 100%, 100% 100%);
}

.festival-23-box__bot::before {
  clip-path: polygon(0% 0%, 100% 100%, 100% 0%);
}

.festival-23-box__bot::after {
  clip-path: polygon(100% 0%, 0% 100%, 0% 0%);
}

.festival-23-box__inside {
  @apply border-x-2 border-black w-full block flex flex-wrap flex-col flex-grow;

  background-color: var(--box-bg);
}

.festival-23-box--hover-bg:hover .festival-23-box__top > span,
.festival-23-box--hover-bg:hover .festival-23-box__bot > span,
.festival-23-box--hover-bg:hover .festival-23-box__inside,
.festival-23-box--no-outline .festival-23-box__top > span,
.festival-23-box--no-outline .festival-23-box__bot > span,
.festival-23-box--no-outline .festival-23-box__inside {
  @apply border-transparent;
}

.festival-23-box--inverse .festival-23-box__top > span,
.festival-23-box--inverse .festival-23-box__bot > span,
.festival-23-box--inverse .festival-23-box__inside{
  @apply border-white;
}

.festival-23-box--hover-bg:hover .festival-23-box__top > span::before,
.festival-23-box--hover-bg:hover .festival-23-box__top > span::after,
.festival-23-box--hover-bg:hover .festival-23-box__bot > span::before,
.festival-23-box--hover-bg:hover .festival-23-box__bot > span::after,
.festival-23-box--no-outline .festival-23-box__top > span::before,
.festival-23-box--no-outline .festival-23-box__top > span::after,
.festival-23-box--no-outline .festival-23-box__bot > span::before,
.festival-23-box--no-outline .festival-23-box__bot > span::after {
  @apply opacity-0;
}

.festival-23-box--inverse .festival-23-box__top > span::before,
.festival-23-box--inverse .festival-23-box__top > span::after,
.festival-23-box--inverse .festival-23-box__bot > span::before,
.festival-23-box--inverse .festival-23-box__bot > span::after {
  background: url('assets/festival/12/corner-outline-inverse.svg') no-repeat;
  background-size: 100% 100%;
}

.festival-23-box--sm .festival-23-box__top,
.festival-23-box--sm .festival-23-box__bot {
  @apply h-3;
}

.festival-23-box--sm  .festival-23-box__top::before {
  clip-path: polygon(-4% 96%, 100% 0%, 100% 100%);
}

.festival-23-box--sm .festival-23-box__top::after {
  clip-path: polygon(0% 0%, 0% 100%, 100% 96%);
}

.festival-23-box--sm .festival-23-box__top::before,
.festival-23-box--sm .festival-23-box__top::after,
.festival-23-box--sm .festival-23-box__bot::before,
.festival-23-box--sm .festival-23-box__bot::after {
  @apply w-3;
}

.festival-23-box--sm .festival-23-box__top > span::before,
.festival-23-box--sm .festival-23-box__top > span::after,
.festival-23-box--sm .festival-23-box__bot > span::before,
.festival-23-box--sm .festival-23-box__bot > span::after {
  width: 12px;
  height: 12px;
}

.festival-23-box--xs .festival-23-box__top > span::before,
.festival-23-box--xs .festival-23-box__top > span::after,
.festival-23-box--xs .festival-23-box__bot > span::before,
.festival-23-box--xs .festival-23-box__bot > span::after {
  width: 6px;
  height: 6px;
}

.festival-23-box--xs .festival-23-box__top::before,
.festival-23-box--xs .festival-23-box__top::after,
.festival-23-box--xs .festival-23-box__bot::before,
.festival-23-box--xs .festival-23-box__bot::after {
  @apply w-1.5;
}

.festival-23-box--xs .festival-23-box__top,
.festival-23-box--xs .festival-23-box__bot {
  @apply h-1.5;
}

.festival-23-box--sm .festival-23-box__top,
.festival-23-box--xs .festival-23-box__top {
  margin-bottom: -0.5px;
}

.festival-23-box--sm .festival-23-box__bot,
.festival-23-box--xs .festival-23-box__bot {
  margin-top: -0.5px;
}

.festival-23-box--sm.festival-23-box--inverse .festival-23-box__top > span::before,
.festival-23-box--sm.festival-23-box--inverse .festival-23-box__top > span::after,
.festival-23-box--sm.festival-23-box--inverse .festival-23-box__bot > span::before,
.festival-23-box--sm.festival-23-box--inverse .festival-23-box__bot > span::after {
  background: url('assets/festival/12/corner-outline-sm-inverse.svg') no-repeat;
  background-size: 100% 100%;
}

.festival-23-box--xs.festival-23-box--inverse .festival-23-box__top > span::before,
.festival-23-box--xs.festival-23-box--inverse .festival-23-box__top > span::after,
.festival-23-box--xs.festival-23-box--inverse .festival-23-box__bot > span::before,
.festival-23-box--xs.festival-23-box--inverse .festival-23-box__bot > span::after {
  background: url('assets/festival/12/corner-outline-xs-inverse.svg') no-repeat;
  background-size: 100% 100%;
}

.festival-23-box--sm .festival-23-box__top > span::before,
.festival-23-box--sm .festival-23-box__top > span::after,
.festival-23-box--sm .festival-23-box__bot > span::before,
.festival-23-box--sm .festival-23-box__bot > span::after {
  background: url('assets/festival/12/corner-outline-sm.svg') no-repeat;
  background-size: 100% 100%;
}

.festival-23-box--xs .festival-23-box__top > span::before,
.festival-23-box--xs .festival-23-box__top > span::after,
.festival-23-box--xs .festival-23-box__bot > span::before,
.festival-23-box--xs .festival-23-box__bot > span::after {
  background: url('assets/festival/12/corner-outline-xs.svg') no-repeat;
  background-size: 100% 100%;
}

.festival-23-box--sm .festival-23-box__top::before,
.festival-23-box--sm .festival-23-box__bot::before {
  transform: translateX(0.5px);
}

.festival-23-box--sm .festival-23-box__top::after,
.festival-23-box--sm .festival-23-box__bot::after {
  transform: translateX(-0.25px);
}
</style>
